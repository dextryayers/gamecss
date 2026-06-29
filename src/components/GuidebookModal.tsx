import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Code, Sparkles, Move, RotateCw, Maximize, Clock, Box, Layout, Layers, ArrowRight, ArrowDown } from 'lucide-react';
import { useGameStore } from '../game/store';

const content = {
  en: {
    title: 'CSS Guidebook',
    desc: 'Master the CSS properties used in the maze.',
    sections: [
      {
        id: 'transform-translate',
        icon: <Move size={20} />,
        title: 'Transform: Translate',
        desc: 'Moves an element along the X and Y axes.',
        code: 'transform: translate(x, y);\ntransform: translateX(x);\ntransform: translateY(y);',
        detail: 'Values can be in pixels (px), percentages (%), or viewport units (vw, vh). For this maze, each cell is usually a fixed pixel size, so you often use pixels to move exactly to the next cell.'
      },
      {
        id: 'transform-rotate',
        icon: <RotateCw size={20} />,
        title: 'Transform: Rotate',
        desc: 'Rotates an element around a fixed point (usually its center).',
        code: 'transform: rotate(angle);',
        detail: 'Angles are typically specified in degrees (deg) or radians (rad). Positive values rotate clockwise, while negative values rotate counter-clockwise. Example: rotate(90deg).'
      },
      {
        id: 'transform-scale',
        icon: <Maximize size={20} />,
        title: 'Transform: Scale',
        desc: 'Resizes an element making it larger or smaller.',
        code: 'transform: scale(number);\ntransform: scale(x, y);',
        detail: 'A value of 1 represents the original size. Values greater than 1 increase the size, while values between 0 and 1 decrease it. Example: scale(1.5) makes it 50% larger.'
      },
      {
        id: 'multiple-transforms',
        icon: <Sparkles size={20} />,
        title: 'Multiple Transforms',
        desc: 'You can chain multiple transform functions together.',
        code: 'transform: translateX(100px) rotate(90deg) scale(1.2);',
        detail: 'The order matters! Transforms are applied from right to left (or outside-in depending on how you think about coordinate systems). Typically, it is best to translate first, then rotate/scale.'
      },
      {
        id: 'transition',
        icon: <Clock size={20} />,
        title: 'Transitions',
        desc: 'Smoothly animates changes to CSS properties over a specified duration.',
        code: 'transition: [property] [duration] [timing-function] [delay];\ntransition: all 300ms ease-in-out;',
        detail: 'In the game, adding a transition makes the player move smoothly instead of teleporting instantly. You can use values like "linear", "ease", "ease-in-out" for the timing function.'
      },
      {
        id: 'margin',
        icon: <ArrowRight size={20} />,
        title: 'Margin',
        desc: 'Creates space outside the border of an element.',
        code: 'margin: 20px;\nmargin: 10px 20px 10px 20px;\nmargin-left: auto;',
        detail: 'Margin is used to push other elements away. You can specify it for all sides or individual sides (margin-top, margin-right, margin-bottom, margin-left). It can also be used to center block elements using margin: auto.'
      },
      {
        id: 'padding',
        icon: <Box size={20} />,
        title: 'Padding',
        desc: 'Creates space inside the element, between the content and the border.',
        code: 'padding: 20px;\npadding: 10px 20px;\npadding-top: 15px;',
        detail: 'Unlike margin, padding is part of the element\'s background. It pushes the content inward. Similar to margin, it can be applied to all sides or specific sides.'
      },
      {
        id: 'position',
        icon: <Layers size={20} />,
        title: 'Positioning',
        desc: 'Specifies the positioning method used for an element.',
        code: 'position: relative;\nposition: absolute;\nposition: fixed;\nposition: sticky;',
        detail: 'relative: Normal flow, but can be offset. absolute: Removed from normal flow, positioned relative to the nearest positioned ancestor. fixed: Positioned relative to the viewport. sticky: Toggles between relative and fixed based on scroll position.'
      },
      {
        id: 'top-left',
        icon: <ArrowDown size={20} />,
        title: 'Top, Right, Bottom, Left',
        desc: 'Offsets positioned elements from their reference point.',
        code: 'top: 50px;\nleft: 100px;\nbottom: 0;\nright: -20px;',
        detail: 'These properties only work if the position property is set to something other than static (e.g., relative, absolute, fixed). They determine exactly where the element is placed.'
      },
      {
        id: 'flexbox',
        icon: <Layout size={20} />,
        title: 'Flexbox (Display: flex)',
        desc: 'A one-dimensional layout method for laying out items in rows or columns.',
        code: 'display: flex;\njustify-content: center;\nalign-items: center;',
        detail: 'Flexbox is great for aligning items in a single direction. justify-content aligns items on the main axis (usually horizontal), while align-items aligns them on the cross axis.'
      },
      {
        id: 'grid',
        icon: <Layout size={20} />,
        title: 'CSS Grid (Display: grid)',
        desc: 'A two-dimensional layout system for the web.',
        code: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 16px;',
        detail: 'Grid allows you to define rows and columns to place items in a two-dimensional layout. It is perfect for dividing a page into major regions or defining the relationship between UI components.'
      }
    ]
  },
  id: {
    title: 'Buku Panduan CSS',
    desc: 'Kuasai properti CSS yang digunakan di dalam labirin.',
    sections: [
      {
        id: 'transform-translate',
        icon: <Move size={20} />,
        title: 'Transform: Translate',
        desc: 'Memindahkan elemen sepanjang sumbu X dan Y.',
        code: 'transform: translate(x, y);\ntransform: translateX(x);\ntransform: translateY(y);',
        detail: 'Nilai bisa berupa piksel (px), persentase (%), atau unit viewport (vw, vh). Untuk labirin ini, setiap sel biasanya memiliki ukuran piksel tetap, jadi Anda sering menggunakan piksel untuk berpindah tepat ke sel berikutnya.'
      },
      {
        id: 'transform-rotate',
        icon: <RotateCw size={20} />,
        title: 'Transform: Rotate',
        desc: 'Memutar elemen di sekitar titik tetap (biasanya di tengahnya).',
        code: 'transform: rotate(sudut);',
        detail: 'Sudut biasanya ditentukan dalam derajat (deg) atau radian (rad). Nilai positif berputar searah jarum jam, sedangkan nilai negatif berputar berlawanan arah jarum jam. Contoh: rotate(90deg).'
      },
      {
        id: 'transform-scale',
        icon: <Maximize size={20} />,
        title: 'Transform: Scale',
        desc: 'Mengubah ukuran elemen menjadi lebih besar atau lebih kecil.',
        code: 'transform: scale(angka);\ntransform: scale(x, y);',
        detail: 'Nilai 1 mewakili ukuran asli. Nilai lebih dari 1 memperbesar ukuran, sedangkan nilai antara 0 dan 1 memperkecilnya. Contoh: scale(1.5) membuatnya 50% lebih besar.'
      },
      {
        id: 'multiple-transforms',
        icon: <Sparkles size={20} />,
        title: 'Multiple Transforms (Transformasi Ganda)',
        desc: 'Anda dapat merangkai beberapa fungsi transformasi sekaligus.',
        code: 'transform: translateX(100px) rotate(90deg) scale(1.2);',
        detail: 'Urutannya penting! Transformasi diterapkan dari kanan ke kiri (atau dari luar ke dalam tergantung pada bagaimana Anda memikirkan sistem koordinat). Biasanya, paling baik melakukan translasi dulu, baru rotasi/skala.'
      },
      {
        id: 'transition',
        icon: <Clock size={20} />,
        title: 'Transitions (Transisi)',
        desc: 'Menganimasikan perubahan properti CSS dengan mulus selama durasi tertentu.',
        code: 'transition: [properti] [durasi] [fungsi-waktu] [jeda];\ntransition: all 300ms ease-in-out;',
        detail: 'Di dalam game, menambahkan transisi membuat pemain bergerak mulus daripada berteleportasi secara instan. Anda dapat menggunakan nilai seperti "linear", "ease", "ease-in-out" untuk fungsi waktunya.'
      },
      {
        id: 'margin',
        icon: <ArrowRight size={20} />,
        title: 'Margin (Batas Luar)',
        desc: 'Menciptakan ruang di luar batas elemen.',
        code: 'margin: 20px;\nmargin: 10px 20px 10px 20px;\nmargin-left: auto;',
        detail: 'Margin digunakan untuk mendorong elemen lain menjauh. Anda dapat menentukannya untuk semua sisi atau sisi individual (margin-top, margin-right, margin-bottom, margin-left). Margin juga dapat digunakan untuk menengahkan elemen blok dengan margin: auto.'
      },
      {
        id: 'padding',
        icon: <Box size={20} />,
        title: 'Padding (Batas Dalam)',
        desc: 'Menciptakan ruang di dalam elemen, antara konten dan batas (border).',
        code: 'padding: 20px;\npadding: 10px 20px;\npadding-top: 15px;',
        detail: 'Tidak seperti margin, padding adalah bagian dari latar belakang elemen. Ini mendorong konten ke dalam. Sama seperti margin, ini dapat diterapkan ke semua sisi atau sisi tertentu.'
      },
      {
        id: 'position',
        icon: <Layers size={20} />,
        title: 'Position (Posisi)',
        desc: 'Menentukan metode posisi yang digunakan untuk sebuah elemen.',
        code: 'position: relative;\nposition: absolute;\nposition: fixed;\nposition: sticky;',
        detail: 'relative: Aliran normal, tapi posisinya bisa digeser. absolute: Dihapus dari aliran normal, diposisikan relatif terhadap elemen induk terdekat yang diposisikan (non-static). fixed: Diposisikan relatif terhadap layar peramban (viewport). sticky: Berubah antara relative dan fixed tergantung guliran layar.'
      },
      {
        id: 'top-left',
        icon: <ArrowDown size={20} />,
        title: 'Top, Right, Bottom, Left (Atas, Kanan, Bawah, Kiri)',
        desc: 'Menggeser elemen yang memiliki posisi (positioned) dari titik acuannya.',
        code: 'top: 50px;\nleft: 100px;\nbottom: 0;\nright: -20px;',
        detail: 'Properti ini hanya bekerja jika properti position diatur ke selain statis (misalnya relative, absolute, fixed). Mereka menentukan di mana persisnya elemen itu ditempatkan.'
      },
      {
        id: 'flexbox',
        icon: <Layout size={20} />,
        title: 'Flexbox (Display: flex)',
        desc: 'Metode tata letak satu dimensi untuk mengatur item dalam baris atau kolom.',
        code: 'display: flex;\njustify-content: center;\nalign-items: center;',
        detail: 'Flexbox sangat bagus untuk menyelaraskan item dalam satu arah. justify-content menyelaraskan item pada sumbu utama (biasanya horizontal), sementara align-items menyelaraskannya pada sumbu silang.'
      },
      {
        id: 'grid',
        icon: <Layout size={20} />,
        title: 'CSS Grid (Display: grid)',
        desc: 'Sistem tata letak dua dimensi untuk web.',
        code: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 16px;',
        detail: 'Grid memungkinkan Anda mendefinisikan baris dan kolom untuk menempatkan item dalam tata letak dua dimensi. Ini sempurna untuk membagi halaman ke dalam wilayah utama atau mendefinisikan hubungan antar komponen UI.'
      }
    ]
  }
};

export default function GuidebookModal() {
  const { isGuidebookOpen, toggleGuidebook, language, setLanguage } = useGameStore();
  
  if (!isGuidebookOpen) return null;
  
  const currentLang = content[language];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex flex-col items-center p-4 sm:p-8 bg-black/95 overflow-hidden"
      >
        {/* Terminal chrome bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-20">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze@v1.0 — guidebook</span>
        </div>

        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-4 md:mb-6 mt-10 md:mt-10 shrink-0">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            <div className="p-2 md:p-3 rounded-xl border text-cyan-400 hidden sm:block"
              style={{ background: 'rgba(0,229,255,0.08)', borderColor: 'rgba(0,229,255,0.25)' }}>
              <Book size={24} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 font-pixel">{currentLang.title}</h2>
              <p className="text-slate-500 font-mono text-xs md:text-sm">{currentLang.desc}</p>
            </div>
            <button 
              onClick={() => toggleGuidebook(false)}
              className="md:hidden p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 shrink-0 self-start mt-1"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex rounded-lg p-1 border w-full md:w-auto"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'en' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
                style={language === 'en' ? { background: '#00e5ff', color: '#070714' } : {}}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'id' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
                style={language === 'id' ? { background: '#00e5ff', color: '#070714' } : {}}
              >
                ID
              </button>
            </div>
            <button 
              onClick={() => toggleGuidebook(false)}
              className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 shrink-0"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-4xl overflow-y-auto pb-12 pr-2 custom-scrollbar">
          <div className="space-y-6">
            {currentLang.sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl p-4 md:p-6 border transition-colors"
                style={{
                  background: '#0f0f20',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="text-cyan-400 shrink-0">
                    {section.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{section.title}</h3>
                </div>
                
                <p className="text-sm md:text-base text-slate-300 mb-3 md:mb-4 leading-relaxed">{section.desc}</p>
                
                <div className="rounded-xl p-3 md:p-4 border relative overflow-hidden group mb-3 md:mb-4"
                  style={{ background: '#070714', borderColor: 'rgba(0,229,255,0.08)' }}>
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Code size={16} className="text-cyan-500" />
                  </div>
                  <pre className="font-mono text-xs md:text-sm text-cyan-300 whitespace-pre-wrap overflow-x-auto custom-scrollbar">
                    <code>{section.code}</code>
                  </pre>
                </div>
                
                <div className="text-xs md:text-sm text-slate-400 leading-relaxed p-3 md:p-4 rounded-xl border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.04)' }}>
                  {section.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
