import React from "react";
import { personalInfo } from "../../../data/portfolio";

export default function Home() {
  return (
    <>
      Welcome to my interactive terminal portfolio!
      {"\n"}
      {"\n"}I'm {personalInfo.name}, a {personalInfo.role} with {personalInfo.experience} of experience
      {"\n"}in backend development, system design, and scalable applications.
      {"\n"}
      {"\n"}🚀 Currently working at {personalInfo.company} as {personalInfo.role}
      {"\n"}💻 Specialized in Java, Spring Boot, ReactJS, and cloud technologies
      {"\n"}🏗️ Built systems handling millions of requests with high performance
      {"\n"}📍 Based in {personalInfo.location}
      {"\n"}
      {"\n"}Quick navigation:
      {"\n"}- Type 'skills' to see my technical stack
      {"\n"}- Type 'timeline' to explore my work experience
      {"\n"}- Type 'projects' to see my key projects
      {"\n"}- Type 'github' for my GitHub stats
      {"\n"}- Type 'contact' to get in touch
      {"\n"}- Type 'help' for all available commands
      {"\n"}
      {"\n"}Pro tip: Use Tab for autocomplete and arrow keys for command history!
    </>
  );
}