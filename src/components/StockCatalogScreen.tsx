import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { Product } from '../types';
import { Search, Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';

interface StockCatalogScreenProps {
  onSelectProduct?: (product: Product) => void;
  onOpenAddProduct?: () => void;
  onQuickAdjust?: (product: Product) => void;
}

export const StockCatalogScreen: React.FC<StockCatalogScreenProps> = ({
  onSelectProduct,
  onOpenAddProduct,
  onQuickAdjust,
}) => {
  const { products, setSelectedProduct, setProductToAdjust, setIsAdjustingStock, setIsAddProductOpen } = useStock();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Céramiques', 'Textile de Maison', 'Senteurs & Ambiance', 'Papeterie', 'Art de la table'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleAdjustClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setProductToAdjust(product);
    setIsAdjustingStock(true);
    if (onQuickAdjust) {
      onQuickAdjust(product);
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2C1D18] flex flex-col min-h-full font-sans antialiased pb-10 select-none">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full flex flex-col justify-center items-center gap-1 hover:bg-[#EFE8DD] transition-colors">
            <span className="w-4 h-0.5 bg-[#5D4E46] rounded-full"></span>
            <span className="w-4 h-0.5 bg-[#5D4E46] rounded-full"></span>
          </div>
          <h1 className="text-2xl font-bold font-display text-[#9E3D1E] tracking-tight">
            Bonjour !
          </h1>
        </div>
        <div className="pl-1">
          <h2 className="text-base font-bold text-[#2C1D18] tracking-tight">
            Mon Stock
          </h2>
          <p className="text-xs text-[#7B6A60] font-medium">
            Voici ce que vous avez en rayon.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-5 mb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#9F8E85] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Chercher un produit..."
            className="w-full bg-white text-xs font-medium text-[#2C1D18] placeholder-[#9F8E85] pl-10 pr-4 py-2.5 rounded-2xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E] transition-all shadow-[0_2px_6px_rgba(44,29,24,0.02)]"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="px-5 mb-4 overflow-x-auto no-scrollbar flex items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#9E3D1E] text-white shadow-xs'
                : 'bg-white text-[#7B6A60] border border-[#EDE4DA] hover:bg-[#F5EDE3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="px-5 space-y-3.5">
        {filteredProducts.map((prod) => {
          const isOutOfStock = prod.currentStock === 0;
          const isLowStock = prod.currentStock > 0 && prod.currentStock <= prod.minStockAlert;
          
          let badgeText = 'Tout va bien';
          let badgeBg = 'bg-[#E7F3E9]';
          let badgeTextCol = 'text-[#3B7A57]';
          let badgeDot = 'bg-[#3B7A57]';

          if (isOutOfStock) {
            badgeText = 'Plus de stock';
            badgeBg = 'bg-[#FEE2E2]';
            badgeTextCol = 'text-[#C24134]';
            badgeDot = 'bg-[#C24134]';
          } else if (isLowStock) {
            badgeText = 'Attention : peu de stock';
            badgeBg = 'bg-[#FEF3C7]';
            badgeTextCol = 'text-[#D48B28]';
            badgeDot = 'bg-[#D48B28]';
          }

          return (
            <motion.div
              key={prod.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleCardClick(prod)}
              className="bg-white rounded-2xl overflow-hidden border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)] cursor-pointer hover:border-[#D5C2B1] transition-all group"
            >
              {/* Product Photo */}
              <div className="w-full h-36 relative bg-[#EFE8DE] overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5">
                  <button
                    onClick={(e) => handleAdjustClick(e, prod)}
                    className="bg-white/90 backdrop-blur-xs hover:bg-white text-[#2C1D18] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-white/60 flex items-center gap-1 transition-all"
                  >
                    <span>Modifier</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3.5">
                <h3 className="text-sm font-bold text-[#2C1D18] tracking-tight mb-0.5">
                  {prod.name}
                </h3>
                <div className="text-[11px] text-[#8C7A70] font-medium mb-3">
                  Réf: {prod.sku}
                </div>

                {/* Stock info and Pill */}
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#2C1D18]">
                    Quantité : <span className="font-bold text-sm font-display">{prod.currentStock}</span>
                  </div>

                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold ${badgeBg} ${badgeTextCol}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeDot}`}></span>
                    <span>{badgeText}</span>
                  </div>
                </div>

                {/* Mini Stock warning progress if low */}
                {isLowStock && (
                  <div className="mt-2.5 pt-2 border-t border-[#F3ECE2]">
                    <div className="w-full h-1.5 bg-[#F5EDE3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D48B28] rounded-full"
                        style={{ width: `${Math.min(100, (prod.currentStock / prod.minStockAlert) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-xs font-semibold text-[#8C7A70]">Aucun produit ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
              }}
              className="mt-3 text-xs font-bold text-[#9E3D1E] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Product Button */}
      <div className="px-5 mt-4">
        <button
          onClick={onOpenAddProduct || (() => setIsAddProductOpen(true))}
          className="w-full border-2 border-dashed border-[#D5C2B1] hover:border-[#9E3D1E] text-[#8C7A70] hover:text-[#9E3D1E] py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all bg-[#FAF4EC]"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un nouvel article</span>
        </button>
      </div>
    </div>
  );
};
