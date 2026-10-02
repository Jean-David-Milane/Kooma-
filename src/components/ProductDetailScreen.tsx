import React from 'react';
import { useStock } from '../context/StockContext';
import { Product } from '../types';
import { ArrowLeft, Edit2, Plus, Minus, CheckCircle, Clock, Package, Share2, Printer } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailScreenProps {
  product?: Product | null;
  onBack?: () => void;
  onEditStock?: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product: propProduct,
  onBack,
  onEditStock,
}) => {
  const { selectedProduct, updateProductStock, updateVariantStock, setProductToAdjust, setIsAdjustingStock } = useStock();
  const product = propProduct || selectedProduct;

  if (!product) {
    return (
      <div className="p-8 text-center text-xs text-[#8C7A70]">
        Aucun produit sélectionné.
      </div>
    );
  }

  const handleAdjustQuick = () => {
    setProductToAdjust(product);
    setIsAdjustingStock(true);
    if (onEditStock) onEditStock(product);
  };

  const handleIncrementTotal = () => {
    updateProductStock(product.id, product.currentStock + 1, 'restock', 'Ajout rapide +1');
  };

  const handleDecrementTotal = () => {
    if (product.currentStock > 0) {
      updateProductStock(product.id, product.currentStock - 1, 'sale', 'Vente / Retrait rapide -1');
    }
  };

  // Stock health status text
  const stockLevelRatio = Math.min(100, Math.round((product.currentStock / 30) * 100));
  const isHealthy = product.currentStock > product.minStockAlert;

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2C1D18] flex flex-col min-h-full font-sans antialiased pb-12 select-none">
      {/* Header */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white border border-[#EDE4DA] flex items-center justify-center text-[#5D4E46] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-bold text-[#2C1D18] tracking-tight">
          Détails
        </h1>
        <button
          onClick={handleAdjustQuick}
          className="w-8 h-8 rounded-full bg-white border border-[#EDE4DA] flex items-center justify-center text-[#9E3D1E] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
          title="Modifier le stock"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Image Card with En stock badge */}
      <div className="px-5 mb-4">
        <div className="w-full h-56 rounded-3xl overflow-hidden relative bg-[#EFE8DE] shadow-[0_4px_16px_rgba(44,29,24,0.04)] border border-[#EDE4DA]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3.5 right-3.5">
            <div className="bg-[#1E3B2B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
              <span>{product.currentStock > 0 ? 'En stock' : 'Rupture'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="px-5 space-y-4">
        <div>
          <div className="text-[11px] font-bold text-[#8C7A70] uppercase tracking-wider mb-0.5">
            Catégorie : {product.category}
          </div>
          <h2 className="text-xl font-bold font-display text-[#2C1D18] tracking-tight">
            {product.name}
          </h2>
          <p className="text-xs text-[#7B6A60] leading-relaxed mt-1 font-medium">
            {product.description}
          </p>
        </div>

        {/* Quantité totale disponible Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.02)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#8C7A70] font-medium">
                Quantité totale disponible
              </div>
              <div className="text-xl font-bold font-display text-[#2C1D18] mt-0.5">
                {product.currentStock} <span className="text-xs font-sans font-semibold text-[#8C7A70]">unités</span>
              </div>
            </div>

            {/* Inline stepper */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrementTotal}
                disabled={product.currentStock <= 0}
                className="w-8 h-8 rounded-full bg-[#F5EDE3] hover:bg-[#EBE0D2] disabled:opacity-40 flex items-center justify-center text-[#5D4E46] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrementTotal}
                className="w-8 h-8 rounded-full bg-[#9E3D1E] hover:bg-[#883318] text-white flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Niveau de stock Gauge */}
          <div className="space-y-1.5 pt-1 border-t border-[#F3ECE2]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#5D4E46]">
                Niveau de stock ({isHealthy ? 'Confortable' : 'Critique'})
              </span>
              <span className={`font-bold ${isHealthy ? 'text-[#3B7A57]' : 'text-[#C24134]'}`}>
                {product.currentStock} / {product.minStockAlert * 3}
              </span>
            </div>
            <div className="w-full h-2 bg-[#F3EDE5] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isHealthy ? 'bg-[#3B7A57]' : 'bg-[#D48B28]'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, (product.currentStock / 30) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section: Les différentes versions */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[#9E3D1E] text-xs">🌿</span>
              <h3 className="text-xs font-bold text-[#2C1D18]">
                Les différentes versions
              </h3>
            </div>

            <div className="bg-white rounded-2xl border border-[#EDE4DA] overflow-hidden shadow-[0_2px_8px_rgba(44,29,24,0.02)]">
              <div className="grid grid-cols-12 px-3.5 py-2 bg-[#FAF4ED] border-b border-[#EDE4DA] text-[10px] font-bold text-[#8C7A70] uppercase">
                <div className="col-span-5">Couleur / Motif</div>
                <div className="col-span-4 text-center">Combien en reste-t-il ?</div>
                <div className="col-span-3 text-right">Statut</div>
              </div>

              <div className="divide-y divide-[#F3ECE2]">
                {product.variants.map((v) => {
                  let badgeText = 'Bien rempli';
                  let badgeCol = 'bg-[#E7F3E9] text-[#3B7A57]';
                  if (v.status === 'low') {
                    badgeText = 'Bientôt vide';
                    badgeCol = 'bg-[#FEF3C7] text-[#D48B28]';
                  } else if (v.status === 'empty') {
                    badgeText = 'Épuisé';
                    badgeCol = 'bg-[#FEE2E2] text-[#C24134]';
                  } else if (v.stock < 15) {
                    badgeText = 'Ça va';
                    badgeCol = 'bg-[#E7F3E9] text-[#3B7A57]';
                  }

                  return (
                    <div key={v.id} className="grid grid-cols-12 px-3.5 py-3 items-center text-xs">
                      {/* Color name & preview circle */}
                      <div className="col-span-5 flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span className="font-semibold text-[#2C1D18] truncate text-[11px]">
                          {v.colorName}
                        </span>
                      </div>

                      {/* Stock quantity with mini adjustment */}
                      <div className="col-span-4 flex items-center justify-center gap-1.5 font-display font-bold text-xs">
                        <button
                          onClick={() => updateVariantStock(product.id, v.id, v.stock - 1)}
                          className="w-5 h-5 rounded-full bg-[#F5EDE3] hover:bg-[#EBE0D2] flex items-center justify-center text-[#5D4E46] text-[10px]"
                        >
                          -
                        </button>
                        <span className="min-w-[16px] text-center">{v.stock}</span>
                        <button
                          onClick={() => updateVariantStock(product.id, v.id, v.stock + 1)}
                          className="w-5 h-5 rounded-full bg-[#F5EDE3] hover:bg-[#EBE0D2] flex items-center justify-center text-[#5D4E46] text-[10px]"
                        >
                          +
                        </button>
                      </div>

                      {/* Status pill */}
                      <div className="col-span-3 flex justify-end">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeCol} whitespace-nowrap`}>
                          ● {badgeText}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section: L'histoire récente */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[#9E3D1E] text-xs">📜</span>
            <h3 className="text-xs font-bold text-[#2C1D18]">
              L'histoire récente
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.02)] space-y-3.5">
            {product.history && product.history.length > 0 ? (
              product.history.map((hist, idx) => (
                <div key={hist.id || idx} className="flex items-start gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D48B28] mt-1.5 shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] font-bold text-[#8C7A70]">
                      {hist.date}
                    </div>
                    <div className="text-xs text-[#2C1D18] font-medium mt-0.5 leading-snug">
                      {hist.note}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-3 text-xs text-[#8C7A70]">
                Aucun historique récent pour cet article.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
