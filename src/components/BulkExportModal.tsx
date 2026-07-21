import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function BulkExportModal({ isOpen, onClose, sections }: { isOpen: boolean, onClose: () => void, sections: string[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const handleExport = async () => {
    const doc = new jsPDF();
    for (const sectionId of selected) {
        const element = document.querySelector(`.section-${sectionId}`) as HTMLElement;
        if(element) {
            const canvas = await html2canvas(element);
            doc.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 150);
            doc.addPage();
        }
    }
    doc.save("bulk-export.pdf");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-lg space-y-4">
                <div className="flex justify-between"><h3>Bulk Export</h3><button onClick={onClose}><X /></button></div>
                {sections.map(s => <div key={s} onClick={() => setSelected(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])} className={`p-2 border rounded cursor-pointer ${selected.includes(s) ? 'bg-blue-100' : ''}`}>{s}</div>)}
                <button onClick={handleExport} className="w-full p-2 bg-blue-600 text-white rounded">Export PDF</button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
