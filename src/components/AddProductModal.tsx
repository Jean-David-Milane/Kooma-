import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { X, Plus, Package, Tag, Layers, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_IMAGES = [
  { label: 'Céramique Grès', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tasse Café', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Linge en Lin', url: 'https://images.unsplash.com/photo-1595079672139-bfd9472e3794?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bougies', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vase Argile', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Papeterie Kraft', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
];

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const { addProduct } = useStock();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Céramiques');
  const [sku, setSku] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(6.0);
  const [sellingPrice, setSellingPrice] = useState(16.0);
  const [currentStock, setCurrentStock] = useState(15);
  const [minStockAlert, setMinStockAlert] = useState(5);
  const [image, setImage] = useState(SAMPLE_IMAGES[0].url);
  const [description, setDescription] = useState('');

  const categories = ['Céramiques', 'Textile de Maison', 'Senteurs & Ambiance', 'Papeterie', 'Art de la table', 'Maroquinerie'];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSku = sku.trim() || `ART-${Math.floor(100 + Math.random() * 900)}`;

    addProduct({
      name: name.trim(),
      category,
      sku: generatedSku,
      purchasePrice: Number(purchasePrice) || 0,
      sellingPrice: Number(sellingPrice) || 0,
      currentStock: Number(currentStock) || 0,
      minStockAlert: Number(minStockAlert) || 5,
      image,
      description: description.trim() || 'Création artisanale confectionnée avec soin dans notre atelier.',
      variants: [
        { id: 'v-1', name: 'Naturel / Standard', colorName: 'Grès Naturel', colorHex: '#D7C4B7', stock: Number(currentStock), status: 'good' }
      ]
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="bg-[#FAF7F2] rounded-3xl overflow-hidden max-w-lg w-full border border-[#EDE4DA] shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#FAF4EC] border-b border-[#EDE4DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#9E3D1E]" />
              <h2 className="text-sm font-bold text-[#2C1D18] tracking-tight">
                Nouvel Article de Stock
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#EDE4DA] hover:bg-[#EFE8DE] flex items-center justify-center text-[#5D4E46] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
            {/* Nom */}
            <div>
              <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                Nom de l'article *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Tasse Émaillée 'Sauge', Saladier Grès..."
                className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
              />
            </div>

            {/* Catégorie & SKU */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Code / SKU
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Ex: CER-099"
                  className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                />
              </div>
            </div>

            {/* Stock Initial & Seuil Alerte */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Stock initial (unités)
                </label>
                <input
                  type="number"
                  min="0"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(parseInt(e.target.value) || 0)}
                  className="w-full bg-white text-xs font-bold text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Seuil d'alerte faible
                </label>
                <input
                  type="number"
                  min="1"
                  value={minStockAlert}
                  onChange={(e) => setMinStockAlert(parseInt(e.target.value) || 5)}
                  className="w-full bg-white text-xs font-bold text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                />
              </div>
            </div>

            {/* Prix Achat & Prix Vente */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Prix d'achat (€)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                  Prix de vente (€)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3.5 py-2.5 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
                />
              </div>
            </div>

            {/* Photo Selection */}
            <div>
              <label className="text-xs font-bold text-[#2C1D18] block mb-1.5">
                Photo de l'article
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setImage(img.url)}
                    className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all cursor-pointer ${
                      image === img.url ? 'border-[#9E3D1E] ring-2 ring-[#9E3D1E]/20' : 'border-[#EDE4DA] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] font-bold py-0.5 text-center">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-[#2C1D18] block mb-1">
                Description & Histoire
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails de fabrication, argile, émaux..."
                className="w-full bg-white text-xs font-medium text-[#2C1D18] px-3.5 py-2 rounded-xl border border-[#EDE4DA] focus:outline-none focus:border-[#9E3D1E]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#9E3D1E] hover:bg-[#883318] text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Enregistrer le produit</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
