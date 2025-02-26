import { motion } from "framer-motion";

export default function ProgressBar({
  label,
  value,
  max = 100,
  color = "bg-blue-600",
}) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>{label}</span>
        <span>{Math.round((value / max) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-3 rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
