"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ClickableLink from "../ui/ClickableLink";

interface CredlyBadge {
  id: string;
  name: string;
  description: string;
  image_url: string;
  issued_at: string;
  expires_at?: string;
  issuer: {
    name: string;
  };
  public_url: string;
  state: string;
}

interface CredlyResponse {
  data: CredlyBadge[];
  metadata: {
    total_count: number;
  };
}

function CertificationsContent() {
  const [certifications, setCertifications] = useState<CredlyBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchCredlyBadges = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // You'll need to replace this with your actual Credly user ID or email
      // This is a mock implementation - you'll need to set up a proper API endpoint
      const credlyUserId = process.env.NEXT_PUBLIC_CREDLY_USER_ID || "your-credly-user-id";
      
      // Note: Credly API requires authentication and CORS handling
      // You might need to create a Next.js API route to proxy this request
      const response = await fetch(`/api/credly?userId=${credlyUserId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch certifications: ${response.statusText}`);
      }
      
      const data: CredlyResponse = await response.json();
      setCertifications(data.data || []);
    } catch (err) {
      console.error("Error fetching Credly badges:", err);
      setError(err instanceof Error ? err.message : "Failed to load certifications");
      
      // Fallback to static data from portfolio.ts
      const { certifications: staticCerts } = await import("../../../data/portfolio");
      setCertifications(staticCerts.map((cert, index) => ({
        id: `static-${index}`,
        name: cert.name,
        description: `Certification from ${cert.issuer}`,
        image_url: "/badge-placeholder.svg",
        issued_at: `${cert.year}-01-01`,
        issuer: { name: cert.issuer },
        public_url: `#${cert.credentialId}`,
        state: "accepted"
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchCredlyBadges();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="space-y-2">
        <div>🔄 Initializing certifications...</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div>🔄 Loading certifications from Credly...</div>
        <div className="text-green-400">Fetching latest badges...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-red-400">⚠️ Error loading certifications: {error}</div>
        <div className="text-yellow-400">Showing cached data instead...</div>
        <div className="mt-4">
          {certifications.map((cert, _index) => (
            <div key={cert.id} className="mb-3 p-2 border-l-2 border-blue-400">
              <div className="font-semibold text-blue-300">{cert.name}</div>
              <div className="text-gray-300">Issuer: {cert.issuer.name}</div>
              <div className="text-gray-400">Issued: {formatDate(cert.issued_at)}</div>
              {cert.public_url !== `#${cert.id}` && (
                <div>
                  <ClickableLink url={cert.public_url} text="View Certificate" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div>🏆 Professional Certifications ({certifications.length} badges):</div>
      <div className="text-green-400">✅ Successfully loaded from Credly API</div>
      <br />
      
      {certifications.length === 0 ? (
        <div className="text-yellow-400">No certifications found. Check your Credly profile settings.</div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3 border border-gray-600 rounded bg-gray-800/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {cert.image_url && cert.image_url !== "/badge-placeholder.svg" ? (
                    <img 
                      src={cert.image_url} 
                      alt={cert.name}
                      className="w-12 h-12 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "🏅";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center text-2xl">🏅</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-blue-300">{cert.name}</div>
                  <div className="text-gray-300">Issuer: {cert.issuer.name}</div>
                  <div className="text-gray-400">
                    Issued: {formatDate(cert.issued_at)}
                    {cert.expires_at && (
                      <span> • Expires: {formatDate(cert.expires_at)}</span>
                    )}
                  </div>
                  
                  {cert.description && (
                    <div className="text-sm text-gray-400 mt-1">{cert.description}</div>
                  )}
                  
                  <div className="mt-2">
                    <ClickableLink 
                      url={cert.public_url} 
                      text="🔗 View on Credly" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <br />
      <div className="text-gray-400">
        💡 Tip: Use `certifications refresh` to reload from Credly
      </div>
      <div>Hint: Use `help` to see all available commands.</div>
    </div>
  );
}

// Export as dynamic component to prevent SSR hydration issues
const Certifications = dynamic(() => Promise.resolve(CertificationsContent), {
  ssr: false,
  loading: () => (
    <div className="space-y-2">
      <div>🔄 Loading certifications...</div>
    </div>
  )
});

export default Certifications;