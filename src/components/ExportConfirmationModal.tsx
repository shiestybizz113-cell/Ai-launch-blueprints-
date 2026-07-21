import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, FileCode, Printer } from 'lucide-react';

export function ExportConfirmationModal({ isOpen, onClose, onConfirm, fileSize }: { isOpen: boolean, onClose: () => void, onConfirm: (format: 'pdf' | 'markdown') => void, fileSize: string }) {
  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 dark:text-white">Export Blueprint</h3>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Estimated Size: {fileSize}</p>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => onConfirm('pdf')} className="p-3 border dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors">
                      <FileText className="w-4 h-4 text-blue-500"/> PDF Download
                    </button>
                    <button onClick={() => onConfirm('markdown')} className="p-3 border dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors">
                      <FileCode className="w-4 h-4 text-indigo-500"/> Markdown
                    </button>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                  <button onClick={handlePrint} className="w-full p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-white text-sm font-bold transition-all shadow-sm">
                    <Printer className="w-4 h-4"/> Print View / Save as PDF
                  </button>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
