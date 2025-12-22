import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, gradient = "from-primary to-accent", delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="card-premium p-8 hover-lift group"
    >
      <div className="relative w-16 h-16 mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 rounded-2xl group-hover:opacity-30 transition-opacity`}></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};
