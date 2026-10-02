import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { QrCode, X, Camera, Zap, Check, Search, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose }) => {
  const { products, setSelectedProduct, setProductToAdjust, setIsAdjustingStock, triggerConfetti } = useStock();
  const [scannedCode, setScannedCode] = useState('');
  const [detectedProduct, setDetectedProduct] = useState<typeof products[0] | null>(null);
  const [flashlight, setFlashlight] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = (product: typeof products[0]) => {
    setDetectedProduct(product);
    setScannedCode(product.sku);
    triggerConfetti();
  };

  const handleConfirmProduct = () => {
    if (detectedProduct) {
      setSelectedProduct(detectedProduct);
      setProductToAdjust(detectedProduct);
      setIsAdjustingStock(true);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#FAF7F2] rounded-3xl overflow-hidden max-w-md w-full border border-[#EDE4DA] shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#2C1D18] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#E9A844]" />
              <h2 className="text-sm font-bold tracking-tight">
                Scanner un Code Produit
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scanner Viewfinder simulation */}
          <div className="p-5 flex flex-col items-center">
            <div className="w-full h-52 bg-[#1A120F] rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-2 border-[#3D2C24]">
              {/* Scan grid effect */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Viewfinder corners */}
              <div className="w-40 h-40 border-2 border-dashed border-[#E9A844]/80 rounded-2xl relative flex items-center justify-center">
                {/* Laser animation */}
                <motion.div
                  animate={{ y: [-60, 60, -60] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="w-full h-0.5 bg-[#E9A844] shadow-[0_0_12px_#E9A844]"
                />
                <Camera className="w-8 h-8 text-white/40 absolute" />
              </div>

              {/* Flashlight toggle */}
              <button
                onClick={() => setFlashlight(!flashlight)}
                className={`absolute bottom-3 right-3 p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  flashlight ? 'bg-[#E9A844] text-[#2C1D18]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{flashlight ? 'Torche ON' : 'Torche'}</span>
              </button>

              <div className="absolute top-3 left-3 bg-black/50 text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                Positionnez le code-barres ou QR au centre
              </div>
            </div>

            {/* Quick detection result if scanned */}
            {detectedProduct ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-4 bg-white rounded-2xl p-3.5 border-2 border-[#3B7A57] flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5EDE3]">
                    <img src={detectedProduct.image} alt={detectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2C1D18]">
                      {detectedProduct.name}
                    </div>
                    <div className="text-[11px] text-[#8C7A70]">
                      SKU: {detectedProduct.sku} • Stock: {detectedProduct.currentStock}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmProduct}
                  className="bg-[#9E3D1E] hover:bg-[#883318] text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Ouvrir</span>
                </button>
              </motion.div>
            ) : (
              <p className="text-[11px] text-[#8C7A70] mt-3 text-center">
                Ou cliquez sur un article pour simuler une lecture instantanée :
              </p>
            )}

            {/* Quick simulate buttons for testing */}
            <div className="w-full mt-3 grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {products.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSimulateScan(p)}
                  className="p-2 bg-white rounded-xl border border-[#EDE4DA] hover:border-[#9E3D1E] text-left flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Package className="w-3.5 h-3.5 text-[#9E3D1E] shrink-0" />
                  <span className="text-[11px] font-semibold text-[#2C1D18] truncate">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
