import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { X, Plus, Slash, Sparkles, Mic, ArrowUp, CheckCircle, ChevronDown, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiAssistantBarProps {
  onOpenAddProduct?: () => void;
  onOpenScanner?: () => void;
}

export const AiAssistantBar: React.FC<AiAssistantBarProps> = ({
  onOpenAddProduct,
  onOpenScanner,
}) => {
  const {
    products,
    updateProductStock,
    updateOrderStatus,
    orders,
    setIsAddProductOpen,
    setIsScannerOpen,
    triggerConfetti,
  } = useStock();

  const [promptText, setPromptText] = useState('');
  const [activeContext, setActiveContext] = useState<string | null>('Mon Stock');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleExecutePrompt = (customQuery?: string) => {
    const query = (customQuery || promptText).toLowerCase().trim();
    if (!query) return;

    if (query.includes('tasse') || query.includes('aube')) {
      const prod = products.find((p) => p.name.toLowerCase().includes('tasse'));
      if (prod) {
        updateProductStock(prod.id, prod.currentStock + 10, 'restock', 'Réassort assisté (+10 tasses)');
        setFeedback('✓ +10 Tasses Artisanales ajoutées au stock avec succès !');
      }
    } else if (query.includes('commande') || query.includes('preparer') || query.includes('préparer')) {
      orders.forEach((o) => {
        if (o.status === 'to_prepare') {
          updateOrderStatus(o.id, 'ready_to_ship');
        }
      });
      setFeedback('✓ Toutes les commandes en attente sont désormais prêtes à expédier !');
    } else if (query.includes('scanner') || query.includes('scan')) {
      setIsScannerOpen(true);
      setFeedback('✓ Ouverture du scanner de code...');
    } else if (query.includes('ajouter') || query.includes('creer') || query.includes('créer')) {
      setIsAddProductOpen(true);
      setFeedback('✓ Ouverture du formulaire d\'ajout...');
    } else if (query.includes('alerte') || query.includes('rupture')) {
      setFeedback(`✓ Diagnostic : ${products.filter((p) => p.currentStock <= p.minStockAlert).length} articles nécessitent un réassort urgent.`);
    } else {
      // Default smart response
      setFeedback(`✓ Action enregistrée pour : "${query}". Votre boutique est synchronisée !`);
      triggerConfetti();
    }

    setPromptText('');
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-40 bg-[#2C1D18] text-[#FAF7F2] p-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#E9A844]/40 hover:scale-105 transition-all"
      >
        <Sparkles className="w-4 h-4 text-[#E9A844]" />
        <span className="text-xs font-bold">Assistant Boutique</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto w-full max-w-xl bg-[#E4DDD3]/95 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-[#D5C7B8] text-[#2C1D18]"
      >
        {/* Top Context Pill & Minimize */}
        <div className="flex items-center justify-between mb-1.5 px-1">
          {activeContext ? (
            <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D9CDBE] px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#5D4E46] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#9E3D1E]"></span>
              <span>{activeContext}</span>
              <button
                onClick={() => setActiveContext(null)}
                className="hover:text-[#9E3D1E] ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] font-semibold text-[#7B6A60] flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-[#9E3D1E]" />
              <span>Assistant Boutique Artisanale</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-[#7B6A60] hover:text-[#2C1D18] p-1 rounded-full text-xs"
              title="Réduire"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Input area */}
        <div className="relative mb-2">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecutePrompt()}
            placeholder="Que souhaitez-vous modifier ou créer ?"
            className="w-full bg-transparent text-sm font-semibold text-[#2C1D18] placeholder-[#7B6A60] px-2 py-1 focus:outline-none"
          />
        </div>

        {/* Feedback message if any */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[11px] font-bold text-[#3B7A57] bg-[#E7F3E9] px-3 py-1 rounded-xl mb-2 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{feedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Tool Icons (as in the screenshot) */}
        <div className="flex items-center justify-between pt-1 border-t border-[#D5C7B8]/60 text-[#5D4E46]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExecutePrompt('ajouter produit')}
              className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
              title="Ajouter"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleExecutePrompt('tasse réassort')}
              className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
              title="Commandes"
            >
              <Slash className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleExecutePrompt('préparer commandes')}
              className="px-2 py-1 rounded-full bg-[#FAF7F2] hover:bg-white text-[10.5px] font-bold transition-colors shadow-xs flex items-center gap-1"
            >
              <span>📦 Livraisons</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Model indicator */}
            <div className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#5D4E46] border border-[#D9CDBE]">
              <span className="w-2 h-2 rounded-full bg-[#E9A844]"></span>
              <span>3 Flash</span>
              <ChevronDown className="w-3 h-3 text-[#7B6A60]" />
            </div>

            {/* Mic button */}
            <button
              onClick={() => handleExecutePrompt('faire inventaire')}
              className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-[#5D4E46] transition-colors"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            {/* Send button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleExecutePrompt()}
              className="w-7 h-7 rounded-full bg-[#2C1D18] hover:bg-[#432F27] text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
