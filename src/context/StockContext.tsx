import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CustomerOrder, StockHealthItem, TodoItem, StockMovement, ProductVariant } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_HEALTH_ITEMS, INITIAL_TODOS } from '../data/initialData';
import confetti from 'canvas-confetti';

interface StockContextType {
  products: Product[];
  orders: CustomerOrder[];
  healthItems: StockHealthItem[];
  todos: TodoItem[];
  currency: 'EUR' | 'FCFA';
  setCurrency: (c: 'EUR' | 'FCFA') => void;
  formatMoney: (amount: number) => string;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isAdjustingStock: boolean;
  setIsAdjustingStock: (open: boolean) => void;
  productToAdjust: Product | null;
  setProductToAdjust: (p: Product | null) => void;
  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  
  // Actions
  updateProductStock: (productId: string, newTotal: number, type: 'sale' | 'restock' | 'adjustment', note?: string, author?: string) => void;
  updateVariantStock: (productId: string, variantId: string, newStock: number) => void;
  addProduct: (newProd: Omit<Product, 'id' | 'history'>) => void;
  toggleTodo: (id: string) => void;
  addTodo: (title: string, subtitle?: string, urgent?: boolean) => void;
  updateOrderStatus: (orderId: string, status: 'to_prepare' | 'ready_to_ship' | 'shipped') => void;
  resetToDefault: () => void;
  triggerConfetti: () => void;
  
  // Computed
  totalItemsInStock: number;
  totalEstimatedValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  recentMovements: StockMovement[];
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('artisan_stock_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('artisan_stock_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [healthItems, setHealthItems] = useState<StockHealthItem[]>(() => {
    const saved = localStorage.getItem('artisan_stock_health_v2');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_ITEMS;
  });

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('artisan_stock_todos_v2');
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });

  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[1]); // Default to Tasse Artisanale 'Aube'
  const [productToAdjust, setProductToAdjust] = useState<Product | null>(INITIAL_PRODUCTS[1]);
  const [isAdjustingStock, setIsAdjustingStock] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('artisan_stock_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('artisan_stock_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('artisan_stock_health_v2', JSON.stringify(healthItems));
  }, [healthItems]);

  useEffect(() => {
    localStorage.setItem('artisan_stock_todos_v2', JSON.stringify(todos));
  }, [todos]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#A04322', '#D48B28', '#4A7C59', '#E9A844', '#E29578']
    });
  };

  const formatMoney = (amount: number) => {
    if (currency === 'EUR') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
      }).format(amount);
    } else {
      // FCFA (1 EUR approx 655.957 FCFA)
      const fcfa = Math.round(amount * 655.957);
      return new Intl.NumberFormat('fr-FR').format(fcfa) + ' FCFA';
    }
  };

  const updateProductStock = (
    productId: string,
    newTotal: number,
    type: 'sale' | 'restock' | 'adjustment',
    note?: string,
    author: string = 'Vous (Boutique)'
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const diff = newTotal - p.currentStock;
        const movement: StockMovement = {
          id: 'mov-' + Date.now(),
          productId: p.id,
          productName: p.name,
          type,
          quantity: diff,
          date: 'Aujourd\'hui, ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now(),
          note: note || (diff > 0 ? `Réassort de +${diff} articles` : `Ajustement de ${diff} articles`),
          author,
          profit: diff < 0 ? Math.abs(diff) * (p.sellingPrice - p.purchasePrice) : undefined
        };

        const updatedHistory = [movement, ...(p.history || [])];

        const updated = {
          ...p,
          currentStock: Math.max(0, newTotal),
          history: updatedHistory
        };

        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(updated);
        }
        return updated;
      })
    );
    triggerConfetti();
  };

  const updateVariantStock = (productId: string, variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedVariants = p.variants.map((v) => {
          if (v.id !== variantId) return v;
          const clamped = Math.max(0, newStock);
          const status: 'good' | 'low' | 'empty' = clamped === 0 ? 'empty' : clamped <= 8 ? 'low' : 'good';
          return { ...v, stock: clamped, status };
        });
        const totalStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
        const updated = { ...p, variants: updatedVariants, currentStock: totalStock };
        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(updated);
        }
        return updated;
      })
    );
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'history'>) => {
    const id = 'prod-' + Date.now();
    const created: Product = {
      ...newProd,
      id,
      history: [
        {
          id: 'mov-' + Date.now(),
          productId: id,
          productName: newProd.name,
          type: 'restock',
          quantity: newProd.currentStock,
          date: 'Aujourd\'hui, ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now(),
          note: 'Création initiale du produit',
          author: 'Admin Boutique'
        }
      ]
    };
    setProducts((prev) => [created, ...prev]);
    setSelectedProduct(created);
    triggerConfetti();
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((td) => (td.id === id ? { ...td, completed: !td.completed } : td))
    );
  };

  const addTodo = (title: string, subtitle: string = 'Ajouté manuellement', urgent: boolean = false) => {
    const newTodo: TodoItem = {
      id: 'td-' + Date.now(),
      title,
      subtitle,
      urgent,
      completed: false
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: 'to_prepare' | 'ready_to_ship' | 'shipped') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    triggerConfetti();
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setHealthItems(INITIAL_HEALTH_ITEMS);
    setTodos(INITIAL_TODOS);
    setSelectedProduct(INITIAL_PRODUCTS[1]);
    localStorage.clear();
  };

  const totalItemsInStock = products.reduce((acc, p) => acc + p.currentStock, 0);
  const totalEstimatedValue = products.reduce((acc, p) => acc + p.currentStock * p.sellingPrice, 0);
  const lowStockCount = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStockAlert).length;
  const outOfStockCount = products.filter((p) => p.currentStock === 0).length;

  const recentMovements = products
    .flatMap((p) => p.history || [])
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  return (
    <StockContext.Provider
      value={{
        products,
        orders,
        healthItems,
        todos,
        currency,
        setCurrency,
        formatMoney,
        selectedProduct,
        setSelectedProduct,
        isAdjustingStock,
        setIsAdjustingStock,
        productToAdjust,
        setProductToAdjust,
        isScannerOpen,
        setIsScannerOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        updateProductStock,
        updateVariantStock,
        addProduct,
        toggleTodo,
        addTodo,
        updateOrderStatus,
        resetToDefault,
        triggerConfetti,
        totalItemsInStock,
        totalEstimatedValue,
        lowStockCount,
        outOfStockCount,
        recentMovements,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
