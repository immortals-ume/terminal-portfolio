import React from "react";
import { personalInfo } from "../../../data/portfolio";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-300 mb-2">
          🏠 Welcome to {personalInfo.name}'s Portfolio
        </div>
        <div className="text-gray-300">
          {personalInfo.role} | {personalInfo.experience} Experience
        </div>
        <div className="text-gray-400">
          📍 {personalInfo.location} | 🏢 {personalInfo.company}
        </div>
      </div>

      <div className="text-center text-gray-300">
        Interactive terminal portfolio - explore my professional journey
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="text-blue-300 font-semibold mb-3 text-center">
          🧭 Navigation Commands
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-gray-300">• <span className="text-yellow-300">skills</span> - Technical expertise</div>
            <div className="text-gray-300">• <span className="text-yellow-300">timeline</span> - Work experience</div>
            <div className="text-gray-300">• <span className="text-yellow-300">projects</span> - GitHub repositories</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-300">• <span className="text-yellow-300">education</span> - Academic background</div>
            <div className="text-gray-300">• <span className="text-yellow-300">certifications</span> - Professional certs</div>
            <div className="text-gray-300">• <span className="text-yellow-300">contact</span> - Get in touch</div>
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="text-gray-400 text-sm">
            💡 Type <span className="text-green-400">help</span> for all commands | Use <span className="text-blue-300">Tab</span> for autocomplete
          </div>
        </div>
      </div>
    </div>
  );
}