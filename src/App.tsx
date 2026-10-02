import React, { useState } from 'react';
import { StockProvider, useStock } from './context/StockContext';
import { HeaderNav } from './components/HeaderNav';
import { ArtboardCard } from './components/ArtboardCard';
import { DashboardScreen } from './components/DashboardScreen';
import { StockCatalogScreen } from './components/StockCatalogScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { StockAdjustmentScreen } from './components/StockAdjustmentScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { ScannerModal } from './components/ScannerModal';
import { AddProductModal } from './components/AddProductModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { AiAssistantBar } from './components/AiAssistantBar';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  RotateCcw,
  FileText,
  Smartphone,
  Tag,
  Search,
  Sparkles,
  ChevronDown,
  Code2
} from 'lucide-react';

function AppContent() {
  const [viewMode, setViewMode] = useState<'board' | 'mobile'>('board');
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);
  const {
    isScannerOpen,
    setIsScannerOpen,
    isAddProductOpen,
    setIsAddProductOpen,
    selectedProduct,
    setSelectedProduct,
  } = useStock();

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Application Header */}
      <HeaderNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
      />

      {/* Main Viewport */}
      {viewMode === 'board' ? (
        <main className="flex-1 relative overflow-auto p-6 md:p-10 bg-[#F5EFE6] bg-[radial-gradient(#D8C9B9_1.2px,transparent_1.2px)] [background-size:24px_24px]">
          {/* Left Canvas Mini-Toolbar (from Figma design board in screenshot) */}
          <aside className="hidden xl:flex flex-col gap-3 fixed left-5 top-20 z-20">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2.5 border border-[#EDE4DA] shadow-lg flex flex-col gap-2.5 items-center text-[#7B6A60]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] flex items-center justify-center font-mono font-bold text-xs text-[#2C1D18] border border-[#EDE4DA]">
                ⌘
              </div>
              <span className="w-5 h-px bg-[#EDE4DA]"></span>
              <button
                onClick={() => setIsFlutterCodeOpen(true)}
                className="p-2 rounded-xl bg-[#02569B] text-white hover:bg-[#0267ba] transition-colors"
                title="Code Source Flutter & Dart"
              >
                <Code2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#FAF7F2] text-[#2C1D18] transition-colors" title="Outlined">
                <span className="text-[10px] font-bold bg-[#EFE7DC] px-1.5 py-0.5 rounded-md">Outlined</span>
              </button>
              <button className="p-2 rounded-xl hover:bg-[#FAF7F2] hover:text-[#9E3D1E] transition-colors" title="Recherche">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#FAF7F2] hover:text-[#9E3D1E] transition-colors" title="Tableau de Bord">
                <LayoutDashboard className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#FAF7F2] hover:text-[#9E3D1E] transition-colors" title="Étiquettes">
                <Tag className="w-4 h-4 text-[#9E3D1E]" />
              </button>
              {/* Color dots */}
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E3D1E]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B7A57]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D48B28]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C1D18]"></span>
              </div>
            </div>

            {/* Bottom Left Floating Badge: Journal de l'agent */}
            <div
              onClick={() => setIsFlutterCodeOpen(true)}
              className="bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 border border-[#EDE4DA] shadow-md flex items-center gap-2 text-xs font-bold text-[#4A3B34] cursor-pointer hover:bg-white transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#02569B]" />
              <span>Projet Flutter (Dart)</span>
              <ChevronDown className="w-3 h-3 text-[#7B6A60]" />
            </div>
          </aside>

          {/* Artboards Grid / Canvas (Matching the exact arrangement from the image) */}
          <div className="flex items-start gap-8 pb-32 pt-2 px-2 overflow-x-auto min-w-max">
            {/* 1. Tableau de Bord */}
            <ArtboardCard
              title="Tableau de Bord"
              icon={<LayoutDashboard className="w-3.5 h-3.5 text-[#9E3D1E]" />}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <DashboardScreen
                onNavigateToStock={() => {}}
                onNavigateToOrders={() => {}}
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenAddStock={() => setIsAddProductOpen(true)}
              />
            </ArtboardCard>

            {/* 2. Prototype : Tableau de Bord (Live smartphone interactive preview) */}
            <ArtboardCard
              title="Prototype : Tableau de Bord"
              icon={<Smartphone className="w-3.5 h-3.5 text-[#3B7A57]" />}
              isActive={true}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <div
                onClick={() => setViewMode('mobile')}
                className="w-full h-full bg-[#241A16] text-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center cursor-pointer group relative overflow-hidden"
              >
                <div className="w-16 h-28 rounded-2xl border-2 border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#E9A844] transition-all">
                  <Smartphone className="w-8 h-8 text-white/60 group-hover:text-[#E9A844]" />
                </div>
                <div className="text-base font-bold font-display text-white tracking-tight">
                  Prototype
                </div>
                <div className="text-xs text-white/60 mt-1">
                  Double-cliquez pour ouvrir en mode mobile
                </div>
                <div className="mt-4 px-3 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20 group-hover:bg-[#9E3D1E] transition-colors">
                  Lancer l'interactif ↗
                </div>
              </div>
            </ArtboardCard>

            {/* 3. Mon Stock (Selected active frame in screenshot) */}
            <ArtboardCard
              title="Mon Stock"
              icon={<Package className="w-3.5 h-3.5 text-[#9E3D1E]" />}
              isActive={true}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <StockCatalogScreen
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenAddProduct={() => setIsAddProductOpen(true)}
              />
            </ArtboardCard>

            {/* 4. Commandes et Envois */}
            <ArtboardCard
              title="Commandes et Envois"
              icon={<ShoppingBag className="w-3.5 h-3.5 text-[#D48B28]" />}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <OrdersScreen />
            </ArtboardCard>

            {/* 5. Changer le Stock */}
            <ArtboardCard
              title="Changer le Stock"
              icon={<RotateCcw className="w-3.5 h-3.5 text-[#9E3D1E]" />}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <StockAdjustmentScreen />
            </ArtboardCard>

            {/* 6. Fiche Produit */}
            <ArtboardCard
              title="Fiche Produit"
              icon={<FileText className="w-3.5 h-3.5 text-[#3B7A57]" />}
              onOpenMobile={() => setViewMode('mobile')}
            >
              <ProductDetailScreen product={selectedProduct} />
            </ArtboardCard>

            {/* 7. Code Flutter Export Artboard */}
            <ArtboardCard
              title="Code Source Flutter & Dart"
              icon={<Code2 className="w-3.5 h-3.5 text-[#02569B]" />}
              onOpenMobile={() => setIsFlutterCodeOpen(true)}
            >
              <div
                onClick={() => setIsFlutterCodeOpen(true)}
                className="w-full h-full bg-[#1A2633] text-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center cursor-pointer group relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#02569B] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-lg">
                  <Code2 className="w-8 h-8 text-[#40C4FF]" />
                </div>
                <div className="text-base font-bold font-display text-white tracking-tight">
                  Projet Flutter Dart
                </div>
                <p className="text-xs text-[#90CAF9] mt-1 max-w-[220px]">
                  9 fichiers Dart complets (Providers, Thème, Écrans & Modèles)
                </p>
                <div className="mt-4 px-3.5 py-2 rounded-xl bg-[#02569B] text-white text-xs font-bold border border-[#40C4FF]/40 group-hover:bg-[#0267ba] transition-colors flex items-center gap-1.5 shadow-md">
                  <span>Explorer le code Dart ↗</span>
                </div>
              </div>
            </ArtboardCard>
          </div>

          {/* Floating AI Prompt Bar at bottom center */}
          <AiAssistantBar />
        </main>
      ) : (
        /* Mobile Simulator Mode */
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-[#F3ECE2]">
          <div className="mb-4 text-center">
            <h2 className="text-base font-bold text-[#2C1D18]">
              Simulateur Mobile Interactif
            </h2>
            <p className="text-xs text-[#7B6A60]">
              Naviguez entre le tableau de bord, le catalogue, les commandes et les fiches articles.
            </p>
          </div>

          <MobileDeviceFrame />
        </main>
      )}

      {/* Modals */}
      <FlutterCodeModal
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StockProvider>
      <AppContent />
    </StockProvider>
  );
}
