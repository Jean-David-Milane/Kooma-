import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { Product, CustomerOrder } from '../types';
import { DashboardScreen } from './DashboardScreen';
import { StockCatalogScreen } from './StockCatalogScreen';
import { OrdersScreen } from './OrdersScreen';
import { StockAdjustmentScreen } from './StockAdjustmentScreen';
import { ProductDetailScreen } from './ProductDetailScreen';
import { LayoutDashboard, Package, ShoppingBag, PlusCircle, ArrowLeftRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ScreenId = 'dashboard' | 'stock' | 'orders' | 'adjust' | 'detail';

interface MobileDeviceFrameProps {
  initialScreen?: ScreenId;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ initialScreen = 'dashboard' }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(initialScreen);
  const { selectedProduct, setSelectedProduct, orders } = useStock();

  const toPrepareOrdersCount = orders.filter((o) => o.status === 'to_prepare').length;

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setActiveScreen('detail');
  };

  const handleOpenAdjust = (p?: Product) => {
    if (p) setSelectedProduct(p);
    setActiveScreen('adjust');
  };

  return (
    <div className="w-[360px] h-[720px] bg-[#FAF7F2] rounded-[38px] overflow-hidden border-[6px] border-[#2C1D18] shadow-[0_20px_60px_rgba(44,29,24,0.2)] flex flex-col relative select-none">
      {/* Top Phone Speaker / Notch */}
      <div className="w-full pt-2.5 pb-1 flex justify-center shrink-0 bg-[#FAF7F2] z-30">
        <div className="w-20 h-2 bg-[#D9CDBE] rounded-full"></div>
      </div>

      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-16">
        <AnimatePresence mode="wait">
          {activeScreen === 'dashboard' && (
            <motion.div
              key="dash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >
              <DashboardScreen
                onNavigateToStock={() => setActiveScreen('stock')}
                onNavigateToOrders={() => setActiveScreen('orders')}
              />
            </motion.div>
          )}

          {activeScreen === 'stock' && (
            <motion.div
              key="stock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >
              <StockCatalogScreen
                onSelectProduct={handleSelectProduct}
                onQuickAdjust={handleOpenAdjust}
              />
            </motion.div>
          )}

          {activeScreen === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >
              <OrdersScreen />
            </motion.div>
          )}

          {activeScreen === 'adjust' && (
            <motion.div
              key="adjust"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-full"
            >
              <StockAdjustmentScreen
                onBack={() => setActiveScreen('stock')}
                onSuccess={() => setActiveScreen('stock')}
              />
            </motion.div>
          )}

          {activeScreen === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-full"
            >
              <ProductDetailScreen
                onBack={() => setActiveScreen('stock')}
                onEditStock={() => setActiveScreen('adjust')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Floating Navigation Bar (Mobile Nav) */}
      <div className="absolute bottom-0 inset-x-0 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EDE4DA] px-4 py-2 flex items-center justify-around z-30">
        {/* Dashboard Tab */}
        <button
          onClick={() => setActiveScreen('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
            activeScreen === 'dashboard' ? 'text-[#9E3D1E] font-bold' : 'text-[#8C7A70] hover:text-[#2C1D18]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeScreen === 'dashboard' ? 'bg-[#9E3D1E]/10' : ''}`}>
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="text-[10px]">Accueil</span>
        </button>

        {/* Stock Tab */}
        <button
          onClick={() => setActiveScreen('stock')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
            activeScreen === 'stock' || activeScreen === 'detail' ? 'text-[#9E3D1E] font-bold' : 'text-[#8C7A70] hover:text-[#2C1D18]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeScreen === 'stock' || activeScreen === 'detail' ? 'bg-[#9E3D1E]/10' : ''}`}>
            <Package className="w-4 h-4" />
          </div>
          <span className="text-[10px]">Stock</span>
        </button>

        {/* Quick Adjust Button */}
        <button
          onClick={() => setActiveScreen('adjust')}
          className="flex flex-col items-center -mt-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#9E3D1E] text-white flex items-center justify-center shadow-lg shadow-[#9E3D1E]/30 hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[9.5px] font-bold text-[#9E3D1E] mt-0.5">Ajuster</span>
        </button>

        {/* Orders Tab */}
        <button
          onClick={() => setActiveScreen('orders')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all relative ${
            activeScreen === 'orders' ? 'text-[#9E3D1E] font-bold' : 'text-[#8C7A70] hover:text-[#2C1D18]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeScreen === 'orders' ? 'bg-[#9E3D1E]/10' : ''}`}>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-[10px]">Commandes</span>
          {toPrepareOrdersCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#9E3D1E] text-white text-[9px] font-bold flex items-center justify-center">
              {toPrepareOrdersCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
