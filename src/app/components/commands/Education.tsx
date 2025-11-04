import React from "react";
import { education } from "../../../data/portfolio";

export default function Education() {
  return (
    <div className="space-y-4">
      <div className="text-blue-300 font-semibold">
        🎓 Educational Background
      </div>
      
      {education && education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="p-3 border border-gray-600 rounded bg-gray-800/30">
              <div className="font-semibold text-green-400 mb-2">
                {edu.degree}
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="text-gray-300">
                  🏫 <span className="font-medium">Institution:</span> {edu.institution}
                </div>
                <div className="text-gray-300">
                  📅 <span className="font-medium">Duration:</span> {edu.period}
                </div>
                
                {edu.gpa && (
                  <div className="text-gray-300">
                    📊 <span className="font-medium">Academic Standing:</span> {edu.gpa}
                  </div>
                )}
                
                {edu.description && (
                  <div className="text-gray-400 mt-2">
                    {edu.description}
                  </div>
                )}
                
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="mt-3">
                    <div className="text-gray-300 font-medium mb-2">📚 Key Courses:</div>
                    <div className="grid grid-cols-1 gap-1">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <div key={courseIndex} className="text-gray-400 text-xs ml-4">
                          • {course}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-yellow-400">No education data available.</div>
      )}
      
      <div className="text-gray-400 text-sm mt-4">
        💡 Use 'certifications' for professional certifications and 'projects' for project portfolio
      </div>
    </div>
  );
}