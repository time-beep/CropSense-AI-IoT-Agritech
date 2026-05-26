import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { RECOMMENDATIONS } from '../../data/mockData';

const priorityStyle = {
  low: 'text-green-400/80 bg-green-500/10 border-green-500/20',
  medium: 'text-amber-400/80 bg-amber-500/10 border-amber-500/20',
  high: 'text-red-400/80 bg-red-500/10 border-red-500/20',
};

export default function RecommendationPanel({ currentRecommendation }: { currentRecommendation: string }) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">AI Recommendations</h3>
          <p className="text-white/30 text-[10px]">Powered by CropSense AI engine</p>
        </div>
      </div>

      {/* Primary recommendation */}
      <motion.div
        key={currentRecommendation}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4 p-3.5 rounded-xl bg-green-500/10 border border-green-500/20"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">✅</span>
          <div>
            <p className="text-green-400 font-semibold text-sm">{currentRecommendation}</p>
            <p className="text-white/30 text-[10px] mt-0.5">Live sensor analysis</p>
          </div>
        </div>
      </motion.div>

      {/* Additional recommendations */}
      <div className="space-y-2.5">
        {RECOMMENDATIONS.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors"
          >
            <span className="text-base flex-shrink-0 mt-0.5">{rec.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white/80 text-xs font-medium">{rec.title}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${priorityStyle[rec.priority as keyof typeof priorityStyle]}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-white/30 text-[10px] leading-relaxed">{rec.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
