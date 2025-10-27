import React, { useEffect, useState } from "react";

export default function System() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const systemInfo = {
    os: "Portfolio OS v2.1.0",
    kernel: "Matrix-Linux 5.15.0",
    uptime: "24 days, 7 hours, 42 minutes",
    memory: "8.2GB / 16GB (51% used)",
    cpu: "Intel i7-12700K @ 3.60GHz",
    gpu: "NVIDIA RTX 3080",
    network: "Connected (Low latency)",
    processes: "127 running",
    load: "0.45, 0.52, 0.48"
  };

  return (
    <>
      System Information:
      {"\n"}
      {"\n"}Current Time: {currentTime.toLocaleString()}
      {"\n"}Operating System: {systemInfo.os}
      {"\n"}Kernel: {systemInfo.kernel}
      {"\n"}Uptime: {systemInfo.uptime}
      {"\n"}Memory Usage: {systemInfo.memory}
      {"\n"}CPU: {systemInfo.cpu}
      {"\n"}GPU: {systemInfo.gpu}
      {"\n"}Network Status: {systemInfo.network}
      {"\n"}Running Processes: {systemInfo.processes}
      {"\n"}Load Average: {systemInfo.load}
      {"\n"}
      {"\n"}Portfolio Status: ✅ All systems operational
      {"\n"}Matrix Rain: ✅ Active
      {"\n"}Terminal Interface: ✅ Responsive
      {"\n"}Command Parser: ✅ Online
    </>
  );
}