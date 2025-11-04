"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ClickableLink from "../ui/ClickableLink";
import { certifications } from "../../../data/portfolio";

function CertificationsContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-2">
        <div>🔄 Initializing certifications...</div>
      </div>
    );
  }

  const getIssuerIcon = (issuer: string) => {
    if (issuer.toLowerCase().includes('ibm')) return '🔵';
    if (issuer.toLowerCase().includes('codédx')) return '💻';
    if (issuer.toLowerCase().includes('linkedin')) return '💼';
    return '🏅';
  };

  return (
    <div className="space-y-2">
      <div>🏆 Professional Certifications ({certifications.length} total):</div>
      <br />

      {certifications.length === 0 ? (
        <div className="text-yellow-400">No certifications found.</div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={cert.credentialId || index} className="p-3 border border-gray-600 rounded bg-gray-800/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl">
                    {getIssuerIcon(cert.issuer)}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-blue-300">{cert.name}</div>
                  <div className="text-gray-300">Issuer: {cert.issuer}</div>
                  <div className="text-gray-400">
                    Issued: {cert.month} {cert.year}
                  </div>
                  
                  {cert.credentialId && (
                    <div className="text-gray-400 text-sm">
                      ID: {cert.credentialId}
                    </div>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-400">Skills:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {cert.url && (
                    <div className="mt-2">
                      <ClickableLink
                        url={cert.url}
                        text="🔗 View Certificate"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <br />
      <div className="text-gray-400">
        💡 Tip: Add more certifications in portfolio.ts
      </div>
      <div>Hint: Use `help` to see all available commands.</div>
    </div>
  );
}

const Certifications = dynamic(() => Promise.resolve(CertificationsContent), {
  ssr: false,
  loading: () => (
    <div className="space-y-2">
      <div>🔄 Loading certifications...</div>
    </div>
  )
});

export default Certifications;