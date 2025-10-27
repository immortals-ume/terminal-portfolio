'use client'

import { motion } from 'framer-motion'
import { skills, skillLevels } from '../../../data/portfolio';

const getSkillLevel = (skill: string): string => {
  if (skillLevels.expert.includes(skill)) return "Expert";
  if (skillLevels.advanced.includes(skill)) return "Advanced";
  return "Intermediate";
};

export default function Skills() {
  return (
    <div className="space-y-4">
      {Object.entries(skills).map(([category, skillList], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <div className="text-green-400 font-bold mb-2 flex items-center">
            <span className="mr-2">▶</span>
            {category}:
          </div>
          <div className="flex flex-wrap gap-2 ml-6">
            {skillList.map((skill, i) => {
              const level = getSkillLevel(skill);
              const levelColor = level === "Expert" ? "border-green-300 text-green-200" : 
                                level === "Advanced" ? "border-yellow-400 text-yellow-300" : 
                                "border-blue-400 text-blue-300";
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (categoryIndex * 0.1) + (i * 0.05) }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(0, 255, 156, 0.15)',
                    boxShadow: '0 0 10px rgba(0, 255, 156, 0.3)'
                  }}
                  className={`px-3 py-1 border rounded text-sm cursor-pointer transition-all duration-200 ${levelColor}`}
                  title={`${skill} - ${level}`}
                >
                  {skill}
                  <span className="ml-1 text-xs opacity-60">
                    {level === "Expert" ? "★★★" : level === "Advanced" ? "★★☆" : "★☆☆"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-green-400 text-sm"
      >
        ★★★ Expert | ★★☆ Advanced | ★☆☆ Intermediate
      </motion.div>
    </div>
  )
}
