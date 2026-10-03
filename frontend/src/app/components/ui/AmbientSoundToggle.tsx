import { Music, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAmbientAudio } from '@/lib/audio/useAmbientAudio';

export function AmbientSoundToggle() {
  const { enabled, toggle } = useAmbientAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      className="fixed bottom-6 left-6 z-[100]"
    >
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={enabled ? 'إيقاف الموسيقى الخلفية' : 'تشغيل الموسيقى الخلفية'}
        aria-pressed={enabled}
        title={enabled ? 'إيقاف الموسيقى الخلفية' : 'تشغيل الموسيقى الخلفية'}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
          enabled
            ? 'bg-red-900/40 border-yellow-500/30 text-yellow-300 hover:bg-red-900/60'
            : 'bg-black/40 border-white/20 text-white/60 hover:bg-black/60'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {enabled ? (
            <motion.span
              key="on"
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center relative"
              aria-hidden
            >
              {/* Animated subtle pulse ring for premium feel */}
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-yellow-400/20 rounded-full"
              />
              <Music size={22} strokeWidth={2} className="relative z-10" />
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -30 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center"
              aria-hidden
            >
              <VolumeX size={22} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
