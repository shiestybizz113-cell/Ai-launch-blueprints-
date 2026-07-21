import { BrandKit, RadiusOption } from '../types/brand-kit';
import { Palette, Box, Download, Upload } from 'lucide-react';

interface Props {
  kit: BrandKit;
  updateKit: (key: keyof BrandKit, value: any) => void;
  setBrandKit: (kit: BrandKit) => void;
}

export const BrandKitPanel = ({ kit, updateKit, setBrandKit }: Props) => {
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(kit, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "brand-kit.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedKit = JSON.parse(event.target?.result as string);
        setBrandKit(importedKit);
      } catch (err) {
        console.error("Failed to import Brand Kit", err);
        alert("Invalid Brand Kit file");
      }
    };
    reader.readAsText(file);
  };

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#64748b' },
  ];

  const fonts = [
    { label: 'Sans', value: 'Inter, system-ui, sans-serif' },
    { label: 'Serif', value: 'Playfair Display, Georgia, serif' },
    { label: 'Mono', value: 'JetBrains Mono, monospace' },
    { label: 'Display', value: 'Outfit, sans-serif' },
  ];

  const radii: { label: string; value: RadiusOption }[] = [
    { label: 'Sharp', value: 'sharp' },
    { label: 'Medium', value: 'medium' },
    { label: 'Rounded', value: 'rounded' },
  ];

  const buttonStyles: { label: string; value: any }[] = [
    { label: 'Solid', value: 'solid' },
    { label: 'Outline', value: 'outline' },
    { label: 'Ghost', value: 'ghost' },
  ];

  const inputStyles: { label: string; value: any }[] = [
    { label: 'Filled', value: 'filled' },
    { label: 'Outlined', value: 'outlined' },
    { label: 'Minimal', value: 'underlined' },
  ];

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
        <Palette className="w-12 h-12" />
      </div>
      
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-3 h-3" /> Brand Kit Engine
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExport}
            className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-[10px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            title="Export Brand Kit as JSON"
          >
            <Download className="w-3 h-3" /> Export
          </button>
          <label className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-[10px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" title="Import Brand Kit from JSON">
            <Upload className="w-3 h-3" /> Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Primary Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => updateKit('primaryColor', c.value)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  kit.primaryColor === c.value 
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
            <input 
              type="color" 
              value={kit.primaryColor} 
              onChange={(e) => updateKit('primaryColor', e.target.value)}
              className="w-7 h-7 rounded-full border-none p-0 cursor-pointer bg-transparent"
              title="Custom Color"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Accent Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => updateKit('accentColor', c.value)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  kit.accentColor === c.value 
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
            <input 
              type="color" 
              value={kit.accentColor} 
              onChange={(e) => updateKit('accentColor', e.target.value)}
              className="w-7 h-7 rounded-full border-none p-0 cursor-pointer bg-transparent"
              title="Custom Color"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Link Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => updateKit('linkColor', c.value)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  kit.linkColor === c.value 
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
            <input 
              type="color" 
              value={kit.linkColor} 
              onChange={(e) => updateKit('linkColor', e.target.value)}
              className="w-7 h-7 rounded-full border-none p-0 cursor-pointer bg-transparent"
              title="Custom Color"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Typography</label>
          <div className="grid grid-cols-2 gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => updateKit('fontFamily', f.value)}
                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${
                  kit.fontFamily === f.value 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                style={{ fontFamily: f.value }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Corner Style</label>
          <div className="flex gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
            {radii.map((r) => (
              <button
                key={r.value}
                onClick={() => updateKit('borderRadius', r.value)}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  kit.borderRadius === r.value 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Button Style</label>
          <div className="flex gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
            {buttonStyles.map((s) => (
              <button
                key={s.value}
                onClick={() => updateKit('buttonStyle', s.value)}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  kit.buttonStyle === s.value 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Input Style</label>
          <div className="flex gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
            {inputStyles.map((s) => (
              <button
                key={s.value}
                onClick={() => updateKit('inputStyle', s.value)}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  kit.inputStyle === s.value 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
