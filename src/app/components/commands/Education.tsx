import React from "react";
import { education, certifications, languages, projects } from "../../../data/portfolio";

export default function Education() {
  return (
    <>
      Education & Professional Development:
      {"\n"}
      {"\n"}🎓 FORMAL EDUCATION:
      {"\n"}┌─ {education.degree}
      {"\n"}│  🏫 Institution: {education.institution}
      {"\n"}│  📅 Duration: {education.period}
      {"\n"}│  📊 GPA: {education.gpa}
      {"\n"}│  📚 Key Courses:
      {education.relevantCourses.map((course, i) => (
        <React.Fragment key={i}>
          {"\n"}│     • {course}
        </React.Fragment>
      ))}
      {"\n"}│  💻 Notable Projects:
      {projects.slice(0, 2).map((project, i) => (
        <React.Fragment key={i}>
          {"\n"}│     • {project.name} - {project.description}
        </React.Fragment>
      ))}
      {"\n"}
      {"\n"}🏅 PROFESSIONAL CERTIFICATIONS:
      {certifications.map((cert, index) => (
        <React.Fragment key={index}>
          {"\n"}• {cert.name}
          {"\n"}  Issuer: {cert.issuer} | Year: {cert.year}
          {"\n"}  Credential ID: {cert.credentialId}
          {"\n"}
        </React.Fragment>
      ))}
      {"\n"}🌐 LANGUAGES:
      {languages.map((language, index) => (
        <React.Fragment key={index}>
          {"\n"}• {language}
        </React.Fragment>
      ))}
      {"\n"}
      {"\n"}📈 Total Certifications: {certifications.length}
      {"\n"}🎯 Focus: Backend Engineering, System Design, and Scalable Applications
    </>
  );
}