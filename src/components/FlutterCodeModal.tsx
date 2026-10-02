import React, { useState } from 'react';
import { FLUTTER_PROJECT_FILES, FlutterFile } from '../data/flutterProjectFiles';
import {
  Code2,
  Copy,
  Check,
  Download,
  FolderTree,
  FileCode,
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  Smartphone,
  X
} from 'lucide-react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[1]); // main.dart
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (code: string, path: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleDownloadSingleFile = (file: FlutterFile) => {
    const element = document.createElement('a');
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyAllInstructions = () => {
    const fullBundle = FLUTTER_PROJECT_FILES.map(
      (f) => `// ==========================================\n// FILE: ${f.path}\n// ==========================================\n\n${f.code}\n`
    ).join('\n\n');

    navigator.clipboard.writeText(fullBundle);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const categories = [
    { key: 'core', label: 'Configuration & Entry' },
    { key: 'theme', label: 'Thème & Design' },
    { key: 'models', label: 'Modèles de Données' },
    { key: 'providers', label: 'State (Provider)' },
    { key: 'screens', label: 'Écrans & Vues' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-5xl h-[88vh] rounded-3xl border border-[#DFD3C4] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#241A16] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#3D2C25]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#02569B] text-white flex items-center justify-center font-mono font-bold shadow-md">
              <span className="text-sm">FL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-white">
                  Projet Flutter & Code Dart Complet
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#02569B]/40 text-[#40C4FF] text-[10px] font-mono font-bold border border-[#02569B]">
                  Flutter 3.x • Material 3 • Provider
                </span>
              </div>
              <p className="text-xs text-white/60">
                Code source Dart prêt pour Android & iOS reprenant 100% de la maquette
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllInstructions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#9E3D1E] hover:bg-[#853217] text-white text-xs font-bold transition-all shadow-xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Tout copié !' : 'Copier tout le projet'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Start Command Bar */}
        <div className="bg-[#2D211C] px-6 py-2.5 flex items-center justify-between border-b border-[#3D2C25] text-xs text-white/70 overflow-x-auto">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-[#F6C052]" />
            <span className="font-mono text-white/90">
              flutter create artisan_stock && cd artisan_stock
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <span>Dépendances :</span>
            <code className="bg-black/30 px-2 py-0.5 rounded text-[#40C4FF]">provider</code>
            <code className="bg-black/30 px-2 py-0.5 rounded text-[#40C4FF]">google_fonts</code>
            <code className="bg-black/30 px-2 py-0.5 rounded text-[#40C4FF]">intl</code>
          </div>
        </div>

        {/* Main Content: Sidebar + Code Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-72 bg-[#F3ECE2] border-r border-[#E2D5C6] flex flex-col overflow-y-auto p-3">
            <div className="text-[11px] font-bold text-[#7B6A60] px-2 py-1 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Arborescence Dart</span>
            </div>

            <div className="space-y-4 mt-2">
              {categories.map((cat) => {
                const files = FLUTTER_PROJECT_FILES.filter((f) => f.category === cat.key);
                if (files.length === 0) return null;

                return (
                  <div key={cat.key}>
                    <div className="text-[10px] font-bold text-[#9C8A80] px-2 mb-1">
                      {cat.label}
                    </div>
                    <div className="space-y-0.5">
                      {files.map((file) => {
                        const isSelected = selectedFile.path === file.path;
                        return (
                          <button
                            key={file.path}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-[#9E3D1E] text-white font-bold shadow-xs'
                                : 'text-[#4A3B34] hover:bg-[#EAE1D4]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#9E3D1E]'}`} />
                              <span className="truncate">{file.name}</span>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'text-[#8C7A70]'}`}>
                              {file.path.endsWith('.yaml') ? 'yaml' : 'dart'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 bg-[#1E1E1E] text-[#D4D4D4] flex flex-col overflow-hidden">
            {/* File Path & Action Toolbar */}
            <div className="bg-[#252526] px-5 py-2.5 flex items-center justify-between border-b border-[#333333]">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#40C4FF]" />
                <span className="font-mono text-xs font-bold text-white">
                  {selectedFile.path}
                </span>
                <span className="text-[11px] text-[#888888] hidden md:inline ml-2">
                  — {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingleFile(selectedFile)}
                  className="p-1.5 rounded-lg bg-[#333333] hover:bg-[#444444] text-white/80 hover:text-white transition-colors"
                  title="Télécharger ce fichier"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCopy(selectedFile.code, selectedFile.path)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#02569B] hover:bg-[#0267ba] text-white text-xs font-bold transition-all shadow-xs"
                >
                  {copiedPath === selectedFile.path ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier ce fichier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Textarea / Pre */}
            <div className="flex-1 overflow-auto p-5 font-mono text-xs leading-relaxed selection:bg-[#264F78]">
              <pre className="text-[#9CDCFE] font-mono whitespace-pre tab-4">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-t border-[#EDE4DA] flex items-center justify-between text-xs text-[#7B6A60]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9E3D1E]" />
            <span>
              <strong>100% Compatible Flutter Web, Android & iOS</strong> avec le design système de l'Atelier.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#2C1D18] hover:bg-[#432C24] text-white font-bold transition-colors"
          >
            Fermer l'explorateur
          </button>
        </div>
      </div>
    </div>
  );
};
