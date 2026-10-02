export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  stock: number;
  status: 'good' | 'low' | 'empty';
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'sale' | 'restock' | 'adjustment' | 'loss';
  quantity: number; // positive or negative
  date: string;
  timestamp: number;
  note?: string;
  author?: string;
  profit?: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  minStockAlert: number;
  image: string;
  description: string;
  variants: ProductVariant[];
  history: StockMovement[];
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  image?: string;
  variant?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  city: string;
  timeAgo: string;
  items: OrderItem[];
  status: 'to_prepare' | 'ready_to_ship' | 'shipped';
  totalAmount: number;
  createdAt: string;
}

export interface StockHealthItem {
  id: string;
  name: string;
  percentage: number;
  level: 'good' | 'medium' | 'low';
  detail: string;
}

export interface TodoItem {
  id: string;
  title: string;
  subtitle: string;
  urgent?: boolean;
  completed: boolean;
}

export type ViewMode = 'board' | 'mobile';
export type MobileTab = 'dashboard' | 'stock' | 'orders' | 'journal' | 'alerts';
