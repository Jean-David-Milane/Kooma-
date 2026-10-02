import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { CustomerOrder } from '../types';
import { Package, Send, CheckCircle, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const OrdersScreen: React.FC = () => {
  const { orders, updateOrderStatus } = useStock();
  const [filter, setFilter] = useState<'to_prepare' | 'ready_to_ship' | 'all'>('to_prepare');

  const countToPrepare = orders.filter((o) => o.status === 'to_prepare').length;
  const countReadyToShip = orders.filter((o) => o.status === 'ready_to_ship').length;

  const filteredOrders = orders.filter((o) => {
    if (filter === 'to_prepare') return o.status === 'to_prepare';
    if (filter === 'ready_to_ship') return o.status === 'ready_to_ship';
    return true;
  });

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
            Vos commandes du jour
          </h2>
          <p className="text-xs text-[#7B6A60] font-medium">
            Prenez votre temps, tout est sous contrôle.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 mb-4 flex items-center gap-2">
        <button
          onClick={() => setFilter('to_prepare')}
          className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            filter === 'to_prepare'
              ? 'bg-[#9E3D1E] text-white shadow-xs'
              : 'bg-[#EFE7DE] text-[#7B6A60] hover:bg-[#E5DACD]'
          }`}
        >
          <span>À préparer</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filter === 'to_prepare' ? 'bg-white/20 text-white' : 'bg-[#DCCEC0] text-[#5D4E46]'}`}>
            {countToPrepare}
          </span>
        </button>

        <button
          onClick={() => setFilter('ready_to_ship')}
          className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            filter === 'ready_to_ship'
              ? 'bg-[#9E3D1E] text-white shadow-xs'
              : 'bg-[#EFE7DE] text-[#7B6A60] hover:bg-[#E5DACD]'
          }`}
        >
          <span>Prêt à partir</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filter === 'ready_to_ship' ? 'bg-white/20 text-white' : 'bg-[#DCCEC0] text-[#5D4E46]'}`}>
            {countReadyToShip}
          </span>
        </button>

        <button
          onClick={() => setFilter('all')}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
            filter === 'all'
              ? 'bg-[#9E3D1E] text-white shadow-xs'
              : 'bg-[#EFE7DE] text-[#7B6A60] hover:bg-[#E5DACD]'
          }`}
        >
          Toutes
        </button>
      </div>

      {/* Orders List */}
      <div className="px-5 space-y-3.5">
        {filteredOrders.map((order) => {
          const isToPrepare = order.status === 'to_prepare';
          const isReady = order.status === 'ready_to_ship';
          const isShipped = order.status === 'shipped';

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 border border-[#EDE4DA] shadow-[0_2px_8px_rgba(44,29,24,0.03)] space-y-3"
            >
              {/* Customer Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#2C1D18] tracking-tight">
                    {order.customerName}
                  </h3>
                  <div className="text-[11px] text-[#8C7A70] font-medium flex items-center gap-1 mt-0.5">
                    <span>Commande #{order.orderNumber}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      {order.city}
                    </span>
                  </div>
                </div>

                {/* Badge Status or Time */}
                {isReady ? (
                  <div className="flex items-center gap-1 bg-[#E7F3E9] text-[#3B7A57] text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B7A57]"></span>
                    <span>Emballé</span>
                  </div>
                ) : isShipped ? (
                  <div className="flex items-center gap-1 bg-[#F4EDE5] text-[#8C7A70] text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-[#3B7A57]" />
                    <span>Envoyé</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-[#FEF3C7] text-[#D48B28] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span>{order.timeAgo}</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2 py-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F5EDE3] overflow-hidden shrink-0 border border-[#EBE1D5]">
                      {it.image ? (
                        <img src={it.image} alt={it.productName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">🏺</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#2C1D18] truncate">
                        {it.productName}
                      </div>
                      <div className="text-[10.5px] text-[#8C7A70] font-medium">
                        Quantité : <span className="font-bold text-[#2C1D18]">{it.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons based on status */}
              {isToPrepare && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateOrderStatus(order.id, 'ready_to_ship')}
                  className="w-full bg-[#9E3D1E] hover:bg-[#883318] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-xs cursor-pointer transition-all"
                >
                  <Package className="w-4 h-4" />
                  <span>Préparer le colis</span>
                </motion.button>
              )}

              {isReady && (
                <div className="space-y-2">
                  <div className="text-[11px] text-[#6B7280] font-medium flex items-center gap-1.5 bg-[#F9FAFB] p-2 rounded-xl border border-[#F3F4F6]">
                    <span>📦</span>
                    <span>En attente de dépôt en point relais / poste</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateOrderStatus(order.id, 'shipped')}
                    className="w-full bg-[#4A6455] hover:bg-[#3D5346] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>C'est envoyé !</span>
                  </motion.button>
                </div>
              )}

              {isShipped && (
                <div className="text-[11px] text-[#4A7C59] font-semibold flex items-center justify-center gap-1.5 py-1 bg-[#E8F3EB] rounded-xl">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Colis expédié avec succès</span>
                </div>
              )}
            </motion.div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#EDE4DA]">
            <p className="text-xs font-semibold text-[#8C7A70]">Aucune commande dans cette section.</p>
            <p className="text-[11px] text-[#A6958A] mt-1">Toutes les expéditions sont à jour !</p>
          </div>
        )}
      </div>
    </div>
  );
};
