import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";

interface SystemStats {
  startTime: Date;
  userAgent: string;
  language: string;
  timezone: string;
  screenResolution: string;
  colorDepth: number;
  cookiesEnabled: boolean;
  onlineStatus: boolean;
  connectionType: string;
  memoryInfo?: any;
}

export default function System() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [packageInfo, setPackageInfo] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    import('../../../../package.json').then(pkg => {
      setPackageInfo(pkg.default || pkg);
    }).catch(() => {
      setPackageInfo({ name: "terminal-portfolio", version: "1.0.0" });
    });

    try {
      const startTime = new Date(Date.now() - (performance?.now?.() || 0));
      
      const stats: SystemStats = {
        startTime,
        userAgent: navigator?.userAgent || 'Unknown',
        language: navigator?.language || 'Unknown',
        timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || 'Unknown',
        screenResolution: screen ? `${screen.width}x${screen.height}` : 'Unknown',
        colorDepth: screen?.colorDepth || 24,
        cookiesEnabled: navigator?.cookieEnabled ?? false,
        onlineStatus: navigator?.onLine ?? true,
        connectionType: (navigator as any)?.connection?.effectiveType || 'unknown',
        memoryInfo: (performance as any)?.memory
      };

      setSystemStats(stats);
    } catch (error) {
      setSystemStats({
        startTime: new Date(),
        userAgent: 'Unknown',
        language: 'Unknown',
        timezone: 'Unknown',
        screenResolution: 'Unknown',
        colorDepth: 24,
        cookiesEnabled: false,
        onlineStatus: true,
        connectionType: 'unknown'
      });
    }
  }, []);

  const getUptime = () => {
    if (!systemStats) return "Calculating...";
    const uptimeMs = Date.now() - systemStats.startTime.getTime();
    const seconds = Math.floor(uptimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const getBrowserInfo = () => {
    if (!systemStats) return "Unknown";
    const ua = systemStats.userAgent;
    
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
  };

  const getOSInfo = () => {
    if (!systemStats) return "Unknown";
    const ua = systemStats.userAgent;
    
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown OS';
  };

  const formatMemory = (bytes: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getNetworkStatus = () => {
    if (!systemStats) return "Unknown";
    const connection = (navigator as any).connection;
    if (!connection) return systemStats.onlineStatus ? "Online" : "Offline";
    
    return `${systemStats.onlineStatus ? "Online" : "Offline"} (${connection.effectiveType || 'unknown'})`;
  };

  if (!systemStats || !packageInfo) {
    return <>Loading system information...</>;
  }

  return (
    <>
      🖥️ System Information:
      {"\n"}
      {"\n"}📅 Current Time: {currentTime.toLocaleString()}
      {"\n"}⏰ Timezone: {systemStats.timezone}
      {"\n"}🌐 Language: {systemStats.language}
      {"\n"}
      {"\n"}💻 Application Details:
      {"\n"}   Name: {packageInfo.name}
      {"\n"}   Version: {packageInfo.version}
      {"\n"}   Theme: {theme}
      {"\n"}   Uptime: {getUptime()}
      {"\n"}
      {"\n"}🔧 Runtime Environment:
      {"\n"}   OS: {getOSInfo()}
      {"\n"}   Browser: {getBrowserInfo()}
      {"\n"}   Screen: {systemStats.screenResolution}
      {"\n"}   Color Depth: {systemStats.colorDepth}-bit
      {"\n"}
      {"\n"}🌐 Network & Storage:
      {"\n"}   Status: {getNetworkStatus()}
      {"\n"}   Cookies: {systemStats.cookiesEnabled ? "Enabled" : "Disabled"}
      {systemStats.memoryInfo && (
        <>
          {"\n"}   Memory Used: {formatMemory(systemStats.memoryInfo.usedJSHeapSize)}
          {"\n"}   Memory Limit: {formatMemory(systemStats.memoryInfo.jsHeapSizeLimit)}
        </>
      )}
      {"\n"}
      {"\n"}✅ Portfolio Status:
      {"\n"}   Interface: Responsive & Active
      {"\n"}   Commands: 15+ Available
      {"\n"}   Performance: Optimized
      {"\n"}   Security: Client-side Safe
      {"\n"}
      {"\n"}💡 Tip: This information updates in real-time!
    </>
  );
}