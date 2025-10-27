'use client'

import React from "react";
import { workExperience } from "../../../data/portfolio";

export default function Timeline() {
  const totalExperience = () => {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  return (
    <>
      Professional Timeline ({totalExperience()}+ years experience):
      {"\n"}
      {workExperience.map((item, index) => (
        <React.Fragment key={index}>
          {"\n"}┌─ [{item.period}] {item.role}
          {"\n"}│  🏢 Company: {item.company} ({item.type})
          {"\n"}│  📍 Location: {item.location}
          {"\n"}│  📝 Description: {item.description}
          {"\n"}│  💻 Tech Stack: {item.technologies.join(", ")}
          {"\n"}│  🎯 Key Achievements:
          {item.achievements.map((achievement, i) => (
            <React.Fragment key={i}>
              {"\n"}│     • {achievement}
            </React.Fragment>
          ))}
          {index < workExperience.length - 1 && (
            <>
              {"\n"}│
            </>
          )}
          {index === workExperience.length - 1 && (
            <>
              {"\n"}└─ Career started in {workExperience[workExperience.length - 1].period.split(' - ')[0]}
            </>
          )}
          {"\n"}
        </React.Fragment>
      ))}
      {"\n"}📈 Career Growth: Intern → Junior → Mid-level → Senior Developer
      {"\n"}🎯 Focus Areas: Full-stack development, Team leadership, Performance optimization
    </>
  );
}