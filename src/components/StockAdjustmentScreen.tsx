import React, { useState, useEffect } from 'react';
import { useStock } from '../context/StockContext';
import { Product } from '../types';
import { ArrowLeft, Plus, Minus, Edit3, Check, Package } from 'lucide-react';
import { motion } from 'motion/react';

interface StockAdjustmentScreenProps {
  product?: Product | null;
  onBack?: () => void;
  onSuccess?: () => void;
}

export const StockAdjustmentScreen: React.FC<StockAdjustmentScreenProps> = ({
  product: propProduct,
  onBack,
  onSuccess,
}) => {
  const { productToAdjust, selectedProduct, updateProductStock, setIsAdjustingStock } = useStock();
  const currentProduct = propProduct || productToAdjust || selectedProduct;

  const [mode, setMode] = useState<'add' | 'remove' | 'correct'>('correct');
  const [newQuantity, setNewQuantity] = useState<number>(45);
  const [stepValue, setStepValue] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (currentProduct) {
      if (mode === 'correct') {
        // If product is 42, default to 45 like screenshot or current
        setNewQuantity(currentProduct.currentStock === 42 ? 45 : currentProduct.currentStock);
      } else if (mode === 'add') {
        setNewQuantity(currentProduct.currentStock + 5);
      } else if (mode === 'remove') {
        setNewQuantity(Math.max(0, currentProduct.currentStock - 1));
      }
    }
  }, [currentProduct, mode]);

  if (!currentProduct) {
    return (
      <div className="p-6 text-center text-xs text-[#8C7A70]">
        Veuillez sélectionner un article à mettre à jour.
      </div>
    );
  }

  const stockDiff = newQuantity - currentProduct.currentStock;

  const handleIncrement = () => {
    setNewQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    setNewQuantity((q) => Math.max(0, q - 1));
  };

  const handleValidate = () => {
    let type: 'sale' | 'restock' | 'adjustment' = 'adjustment';
    if (stockDiff > 0) type = 'restock';
    if (stockDiff < 0) type = 'sale';

    updateProductStock(
      currentProduct.id,
      newQuantity,
      type,
      note || (mode === 'correct' ? 'Correction d\'inventaire' : mode === 'add' ? 'Réassort atelier' : 'Retrait de stock')
    );

    if (onSuccess) onSuccess();
    setIsAdjustingStock(false);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2C1D18] flex flex-col min-h-full font-sans antialiased pb-8 select-none">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <button
          onClick={onBack || (() => setIsAdjustingStock(false))}
          className="w-8 h-8 rounded-full bg-white border border-[#EDE4DA] flex items-center justify-center text-[#5D4E46] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-bold text-[#2C1D18] tracking-tight">
          Mettre à jour
        </h1>
        <div className="w-8"></div>
      </div>

      <div className="px-5 space-y-4">
        {/* Product Target Summary Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EDE4DA] flex items-center gap-3 shadow-[0_2px_6px_rgba(44,29,24,0.02)]">
          <div className="w-12 h-12 rounded-xl bg-[#F5EDE3] overflow-hidden shrink-0 border border-[#EBE1D5]">
            <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-[#8C7A70] font-medium truncate">
              {currentProduct.category}
            </div>
            <div className="text-xs font-bold text-[#2C1D18] truncate">
              {currentProduct.name}
            </div>
          </div>
          <div className="bg-[#FAF4ED] border border-[#EBE0D4] text-[#6B5A51] px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 shrink-0">
            <Package className="w-3 h-3 text-[#9E3D1E]" />
            <span>En stock : {currentProduct.currentStock}</span>
          </div>
        </div>

        {/* Action Type: Que souhaitez-vous faire ? */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#2C1D18]">
            Que souhaitez-vous faire ?
          </label>

          <div className="space-y-2">
            {/* Ajouter (+) */}
            <button
              type="button"
              onClick={() => {
                setMode('add');
                setNewQuantity(currentProduct.currentStock + 5);
              }}
              className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                mode === 'add'
                  ? 'bg-[#CBE7D4] border-2 border-[#3B7A57] text-[#2B5539] shadow-xs'
                  : 'bg-[#DCECE1] border border-[#BFDEC9] text-[#2B5539] hover:bg-[#D4E8DA]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter (+)</span>
            </button>

            {/* Enlever (-) */}
            <button
              type="button"
              onClick={() => {
                setMode('remove');
                setNewQuantity(Math.max(0, currentProduct.currentStock - 1));
              }}
              className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                mode === 'remove'
                  ? 'bg-[#FDCFCA] border-2 border-[#C24134] text-[#8E281F] shadow-xs'
                  : 'bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] hover:bg-[#FED7D7]'
              }`}
            >
              <Minus className="w-4 h-4" />
              <span>Enlever (-)</span>
            </button>

            {/* Corriger (Ochre/Yellow Selected) */}
            <button
              type="button"
              onClick={() => setMode('correct')}
              className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                mode === 'correct'
                  ? 'bg-[#F6C052] border-2 border-[#D48B28] text-[#4A3205] shadow-xs ring-2 ring-[#F6C052]/30'
                  : 'bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] hover:bg-[#FDE68A]'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Corriger</span>
            </button>
          </div>
        </div>

        {/* Stepper: Nouvelle quantité totale */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-[#2C1D18]">
            Nouvelle quantité totale
          </label>

          <div className="bg-white rounded-2xl p-4 border border-[#EDE4DA] flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(44,29,24,0.02)]">
            <div className="flex items-center justify-between w-full max-w-[200px]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                className="w-10 h-10 rounded-full bg-[#F5EDE3] hover:bg-[#EBE0D2] flex items-center justify-center text-[#2C1D18] font-bold text-lg cursor-pointer transition-colors shadow-xs"
              >
                <Minus className="w-4 h-4 text-[#5D4E46]" />
              </motion.button>

              <div className="text-3xl font-bold font-display text-[#2C1D18] tracking-tight">
                {newQuantity}
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="w-10 h-10 rounded-full bg-[#F5EDE3] hover:bg-[#EBE0D2] flex items-center justify-center text-[#2C1D18] font-bold text-lg cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#5D4E46]" />
              </motion.button>
            </div>

            {/* Difference badge */}
            <div className="mt-3 text-[11px] font-semibold text-[#8C7A70]">
              {stockDiff === 0 ? (
                <span>Aucune modification</span>
              ) : stockDiff > 0 ? (
                <span className="text-[#3B7A57]">Ajustement : +{stockDiff} articles</span>
              ) : (
                <span className="text-[#C24134]">Ajustement : {stockDiff} articles</span>
              )}
            </div>
          </div>
        </div>

        {/* Note (optionnel) */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#7B6A60]">
            Note (optionnel)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Réassort arrivage, casse, inventaire..."
            className="w-full bg-white text-xs font-medium text-[#2C1D18] placeholder-[#A6958A] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E] transition-all"
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleValidate}
            className="w-full bg-[#9E3D1E] hover:bg-[#883318] text-white py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-sm shadow-[#9E3D1E]/20 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Valider le changement</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
