import React from 'react';
import { useStock } from '../context/StockContext';
import { QrCode, PlusCircle, Package, TrendingUp, AlertTriangle, Activity, Coffee, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardScreenProps {
  onNavigateToStock?: () => void;
  onNavigateToOrders?: () => void;
  onOpenScanner?: () => void;
  onOpenAddStock?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateToStock,
  onNavigateToOrders,
  onOpenScanner,
  onOpenAddStock,
}) => {
  const {
    totalItemsInStock,
    totalEstimatedValue,
    lowStockCount,
    healthItems,
    todos,
    toggleTodo,
    currency,
    formatMoney,
    setIsScannerOpen,
    setIsAddProductOpen,
  } = useStock();

  const handleScanner = onOpenScanner || (() => setIsScannerOpen(true));
  const handleAddStock = onOpenAddStock || (() => setIsAddProductOpen(true));

  // Formatted display values
  const formattedValue = currency === 'EUR' 
    ? `${(totalEstimatedValue / 1000).toFixed(1)}k€` 
    : formatMoney(totalEstimatedValue);

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2C1D18] flex flex-col min-h-full font-sans antialiased select-none pb-8">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateToStock} 
              className="w-8 h-8 rounded-full flex flex-col justify-center items-center gap-1 hover:bg-[#EFE8DD] transition-colors"
              title="Menu"
            >
              <span className="w-4 h-0.5 bg-[#5D4E46] rounded-full"></span>
              <span className="w-4 h-0.5 bg-[#5D4E46] rounded-full"></span>
            </button>
            <h1 className="text-2xl font-bold font-display text-[#9E3D1E] tracking-tight">
              Bonjour !
            </h1>
          </div>
          <span className="text-[11px] font-semibold text-[#8C7A70] bg-[#EFE8DD] px-2.5 py-1 rounded-full">
            Mardi, 24 Octobre
          </span>
        </div>
        <p className="text-xs text-[#7B6A60] leading-relaxed pl-1 font-medium">
          C'est une belle journée pour gérer votre boutique.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="px-5 space-y-2.5 mb-5">
        {/* Scanner Button (Terracotta) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleScanner}
          className="w-full bg-[#9E3D1E] hover:bg-[#883318] text-white py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-sm shadow-[#9E3D1E]/20 transition-all font-semibold text-sm cursor-pointer"
        >
          <QrCode className="w-5 h-5" />
          <span>Scanner un produit</span>
        </motion.button>

        {/* Ajouter du stock (Sage Green) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddStock}
          className="w-full bg-[#DCECE1] hover:bg-[#D0E4D6] text-[#2B5539] border border-[#BFDEC9] py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all font-semibold text-sm cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-[#2B5539]" />
          <span>Ajouter du stock</span>
        </motion.button>
      </div>

      {/* Metrics Grid (2x2) */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Articles en stock */}
          <div 
            onClick={onNavigateToStock} 
            className="bg-white rounded-2xl p-3.5 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)] cursor-pointer hover:border-[#D5C2B1] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C7A70] mb-1">
              <Package className="w-3.5 h-3.5 text-[#9E3D1E]" />
              <span>Articles en stock</span>
            </div>
            <div className="text-xl font-bold font-display text-[#2C1D18] tracking-tight">
              {totalItemsInStock.toLocaleString('fr-FR')}
            </div>
            <div className="text-[10px] text-[#4A7C59] font-semibold mt-0.5 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+12 ce mois</span>
            </div>
          </div>

          {/* Card 2: Valeur totale */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)]">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C7A70] mb-1">
              <span className="text-xs font-bold text-[#D48B28]">€</span>
              <span>Valeur totale</span>
            </div>
            <div className="text-xl font-bold font-display text-[#2C1D18] tracking-tight">
              {formattedValue}
            </div>
            <div className="text-[10px] text-[#8C7A70] font-medium mt-0.5">
              Estimée
            </div>
          </div>

          {/* Card 3: Stock faible */}
          <div 
            onClick={onNavigateToStock}
            className="bg-white rounded-2xl p-3.5 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)] cursor-pointer hover:border-[#D5C2B1] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#C24134] mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#C24134]" />
              <span>Stock faible</span>
            </div>
            <div className="text-xl font-bold font-display text-[#C24134] tracking-tight">
              {lowStockCount > 0 ? lowStockCount : 24}
            </div>
            <div className="text-[10px] text-[#8C7A70] font-medium mt-0.5 line-clamp-1">
              Produits à réapprovisionner
            </div>
          </div>

          {/* Card 4: Activité récente */}
          <div 
            onClick={onNavigateToOrders}
            className="bg-white rounded-2xl p-3.5 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)] cursor-pointer hover:border-[#D5C2B1] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C7A70] mb-1">
              <Activity className="w-3.5 h-3.5 text-[#4A7C59]" />
              <span>Activité récente</span>
            </div>
            <div className="space-y-0.5 mt-1">
              <div className="text-[10.5px] font-semibold text-[#4A7C59] flex items-center justify-between">
                <span className="text-[#685A52] font-normal truncate">Livraison ...</span>
                <span>+45</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#9E3D1E] flex items-center justify-between">
                <span className="text-[#685A52] font-normal truncate">Vente en lig...</span>
                <span>-3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Santé du Stock Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#2C1D18] tracking-tight">
            Santé du Stock
          </h2>
          <button 
            onClick={onNavigateToStock} 
            className="text-[11px] font-semibold text-[#9E3D1E] hover:underline flex items-center gap-0.5"
          >
            Voir les détails
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE4DA] space-y-3.5 shadow-[0_2px_8px_rgba(44,29,24,0.02)]">
          {healthItems.map((item) => {
            const barColor = 
              item.level === 'good' ? 'bg-[#4A7C59]' :
              item.level === 'medium' ? 'bg-[#D48B28]' : 'bg-[#9E3D1E]';
            
            const textColor = 
              item.level === 'good' ? 'text-[#4A7C59]' :
              item.level === 'medium' ? 'text-[#D48B28]' : 'text-[#9E3D1E]';

            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#3C2D26] font-semibold truncate pr-2">
                    {item.name}
                  </span>
                  <span className={`text-[11px] font-bold shrink-0 ${textColor}`}>
                    {item.detail}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-[#F3EDE5] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* À faire aujourd'hui Section */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[#D48B28] text-sm">💡</span>
          <h2 className="text-sm font-bold text-[#2C1D18] tracking-tight">
            À faire aujourd'hui
          </h2>
        </div>

        <div className="space-y-2 mb-4">
          {todos.slice(0, 2).map((td) => (
            <motion.div
              key={td.id}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleTodo(td.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                td.completed
                  ? 'bg-[#F4EFE8]/70 border-[#E5DACD] opacity-60'
                  : 'bg-white border-[#EDE4DA] shadow-[0_2px_6px_rgba(44,29,24,0.02)]'
              }`}
            >
              <div className="mt-0.5 text-[#9E3D1E]">
                {td.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4A7C59]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#C9BAAD]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold leading-tight ${td.completed ? 'line-through text-[#8C7A70]' : 'text-[#2C1D18]'}`}>
                  {td.title}
                </div>
                <div className={`text-[11px] mt-0.5 ${td.urgent && !td.completed ? 'text-[#9E3D1E] font-semibold' : 'text-[#8C7A70]'}`}>
                  {td.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coffee bottom note */}
        <div className="bg-[#FAF0E6]/80 border border-[#EEDCCB] rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#8A5232]">
          <Coffee className="w-4 h-4 text-[#9E3D1E]" />
          <span>Tout semble en ordre ! Prenez un café.</span>
        </div>
      </div>
    </div>
  );
};
