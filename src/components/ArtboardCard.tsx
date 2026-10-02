import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Maximize2, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface ArtboardCardProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onOpenMobile?: () => void;
  children: React.ReactNode;
}

export const ArtboardCard: React.FC<ArtboardCardProps> = ({
  title,
  icon,
  isActive = false,
  onOpenMobile,
  children,
}) => {
  const [isStarred, setIsStarred] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col items-center shrink-0">
      {/* Figma Frame Header */}
      <div className="w-full max-w-[340px] flex items-center justify-between py-1.5 px-2 text-[#7B6A60] text-xs font-semibold select-none mb-1">
        <div className="flex items-center gap-1.5 truncate">
          {icon}
          <span className="truncate font-bold text-[#4A3B34]">{title}</span>
        </div>

        <div className="flex items-center gap-2 text-[#9F8E85] shrink-0">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`hover:text-[#E9A844] transition-colors p-0.5 ${isStarred ? 'text-[#E9A844] fill-[#E9A844]' : ''}`}
            title="Favori"
          >
            <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => setLiked(liked === true ? null : true)}
            className={`hover:text-[#3B7A57] transition-colors p-0.5 ${liked === true ? 'text-[#3B7A57]' : ''}`}
            title="Approuver"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLiked(liked === false ? null : false)}
            className={`hover:text-[#9E3D1E] transition-colors p-0.5 ${liked === false ? 'text-[#9E3D1E]' : ''}`}
            title="Rejeter"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {onOpenMobile && (
            <button
              onClick={onOpenMobile}
              className="hover:text-[#2C1D18] p-0.5 ml-1 transition-colors"
              title="Tester en mode smartphone plein écran"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Artboard Frame Box */}
      <div
        className={`w-[340px] h-[680px] bg-[#FAF7F2] rounded-[32px] overflow-hidden border-2 shadow-[0_8px_30px_rgba(44,29,24,0.06)] flex flex-col relative transition-all ${
          isActive
            ? 'border-[#9E3D1E] ring-4 ring-[#9E3D1E]/15'
            : 'border-[#EDE4DA] hover:border-[#D5C2B1]'
        }`}
      >
        {/* Top Phone Notch / Speaker bar */}
        <div className="w-full pt-2 pb-1 flex justify-center shrink-0 bg-[#FAF7F2]">
          <div className="w-16 h-1.5 bg-[#E4DDD3] rounded-full"></div>
        </div>

        {/* Artboard Content Container with smooth scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
