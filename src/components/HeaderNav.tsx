import React from 'react';
import { useStock } from '../context/StockContext';
import { LayoutGrid, Smartphone, QrCode, Plus, RotateCcw, Printer, CircleDollarSign, Code2 } from 'lucide-react';

interface HeaderNavProps {
  viewMode: 'board' | 'mobile';
  setViewMode: (m: 'board' | 'mobile') => void;
  onOpenFlutterCode: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ viewMode, setViewMode, onOpenFlutterCode }) => {
  const {
    currency,
    setCurrency,
    setIsScannerOpen,
    setIsAddProductOpen,
    resetToDefault,
    totalItemsInStock,
    lowStockCount,
  } = useStock();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE4DA] px-4 lg:px-6 py-2.5 flex items-center justify-between">
      {/* Left: Branding & Tag */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#9E3D1E] text-white flex items-center justify-center font-display font-bold text-base shadow-xs shadow-[#9E3D1E]/20">
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold font-display text-[#2C1D18] tracking-tight">
              ArtisanStock
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFE7DC] text-[#7B6A60]">
              Studio Céramique & Créateurs
            </span>
          </div>
          <p className="text-[11px] text-[#8C7A70] hidden sm:block">
            {totalItemsInStock} articles en rayon • {lowStockCount} alertes réassort
          </p>
        </div>
      </div>

      {/* Center: View Switcher (Board vs Smartphone vs Flutter Code) */}
      <div className="flex items-center bg-[#EFE8DD] p-1 rounded-2xl border border-[#DFD3C4] shadow-xs">
        <button
          onClick={() => setViewMode('board')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'board'
              ? 'bg-white text-[#9E3D1E] shadow-xs'
              : 'text-[#6D5E56] hover:text-[#2C1D18]'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Vue Tableau (Figma)</span>
          <span className="md:hidden">Tableau</span>
        </button>

        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'mobile'
              ? 'bg-white text-[#9E3D1E] shadow-xs'
              : 'text-[#6D5E56] hover:text-[#2C1D18]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Prototype Interactif</span>
          <span className="md:hidden">Mobile</span>
        </button>
      </div>

      {/* Right: Quick actions & Flutter Code Exporter */}
      <div className="flex items-center gap-2">
        {/* Flutter / Dart Code Button */}
        <button
          onClick={onOpenFlutterCode}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#02569B] hover:bg-[#0267ba] text-white transition-all shadow-xs"
          title="Consulter et exporter le code source Flutter & Dart complet"
        >
          <Code2 className="w-3.5 h-3.5 text-[#40C4FF]" />
          <span>Code Flutter (Dart)</span>
        </button>

        {/* Currency Switcher */}
        <button
          onClick={() => setCurrency(currency === 'EUR' ? 'FCFA' : 'EUR')}
          className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white border border-[#EDE4DA] hover:bg-[#F3ECE2] text-[#4A3B34] transition-colors flex items-center gap-1 shadow-xs"
          title="Basculer entre Euro (€) et FCFA"
        >
          {currency === 'EUR' ? (
            <>
              <span className="text-[#9E3D1E] font-bold">€</span>
              <span className="text-[11px]">EUR</span>
            </>
          ) : (
            <>
              <CircleDollarSign className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span className="text-[11px]">FCFA</span>
            </>
          )}
        </button>

        {/* Scanner */}
        <button
          onClick={() => setIsScannerOpen(true)}
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#9E3D1E] hover:bg-[#883318] text-white transition-colors shadow-xs"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Scanner</span>
        </button>

        {/* Add Product */}
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#DCECE1] hover:bg-[#D0E4D6] text-[#2B5539] border border-[#BFDEC9] transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#2B5539]" />
          <span className="hidden sm:inline">Nouvel Article</span>
        </button>

        {/* Print inventory */}
        <button
          onClick={handlePrint}
          className="w-8 h-8 rounded-xl bg-white border border-[#EDE4DA] hover:bg-[#F3ECE2] text-[#6D5E56] hidden md:flex items-center justify-center transition-colors"
          title="Imprimer l'inventaire"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>

        {/* Reset */}
        <button
          onClick={resetToDefault}
          className="w-8 h-8 rounded-xl bg-white border border-[#EDE4DA] hover:bg-[#F3ECE2] text-[#6D5E56] flex items-center justify-center transition-colors"
          title="Réinitialiser les données d'exemple"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
