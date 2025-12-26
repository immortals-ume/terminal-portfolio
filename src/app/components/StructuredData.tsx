import {personalInfo, workExperience} from '@/data/portfolio';
import { getAllSkills } from '@/data/skillsData';

export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": personalInfo.name,
        "jobTitle": personalInfo.role,
        "description": personalInfo.summary,
        "worksFor": {
            "@type": "Organization",
            "name": personalInfo.company
        },
        "url": personalInfo.website,
        "email": personalInfo.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": personalInfo.location
        },
        "sameAs": [
            `https://github.com/${personalInfo.github}`,
            `https://linkedin.com/in/${personalInfo.linkedin}`,
            personalInfo.website
        ],
        "knowsAbout": getAllSkills(),
        "hasOccupation": workExperience.filter(exp => exp.role).map(exp => ({
            "@type": "Occupation",
            "name": exp.role,
            "occupationLocation": exp.location,
            "skills": exp.technologies || []
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            suppressHydrationWarning
        />
    );
}