'use client'

import React, { useEffect, useState } from "react";

interface CodingStats {
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  languagesUsed: number;
  projectsCompleted: number;
  linesOfCode: number;
  issuesResolved: number;
  pullRequests: number;
}

export default function Stats() {
  const [stats, setStats] = useState<CodingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockStats: CodingStats = {
        totalCommits: 1247,
        currentStreak: 23,
        longestStreak: 87,
        languagesUsed: 12,
        projectsCompleted: 34,
        linesOfCode: 125000,
        issuesResolved: 156,
        pullRequests: 89
      };
      
      setStats(mockStats);
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <>
        Fetching coding statistics...
        {"\n"}Analyzing GitHub activity...
        {"\n"}Calculating metrics...
      </>
    );
  }

  if (!stats) {
    return (
      <>
        Unable to load coding statistics.
        {"\n"}Please check your GitHub integration.
      </>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getStreakEmoji = (streak: number): string => {
    if (streak >= 50) return "🔥🔥🔥";
    if (streak >= 20) return "🔥🔥";
    if (streak >= 7) return "🔥";
    return "⭐";
  };

  return (
    <>
      Developer Statistics Dashboard:
      {"\n"}
      {"\n"}📈 GITHUB ACTIVITY:
      {"\n"}   Total Commits: {formatNumber(stats.totalCommits)} commits
      {"\n"}   Current Streak: {stats.currentStreak} days {getStreakEmoji(stats.currentStreak)}
      {"\n"}   Longest Streak: {stats.longestStreak} days
      {"\n"}   Pull Requests: {stats.pullRequests} merged
      {"\n"}   Issues Resolved: {stats.issuesResolved} closed
      {"\n"}
      {"\n"}💻 CODE METRICS:
      {"\n"}   Lines of Code: {formatNumber(stats.linesOfCode)}+ written
      {"\n"}   Languages Used: {stats.languagesUsed} different languages
      {"\n"}   Projects Completed: {stats.projectsCompleted} repositories
      {"\n"}
      {"\n"}🏆 ACHIEVEMENTS:
      {"\n"}   ✅ Consistent Contributor (20+ day streak)
      {"\n"}   ✅ Polyglot Programmer (10+ languages)
      {"\n"}   ✅ Project Finisher (30+ completed projects)
      {"\n"}   ✅ Bug Hunter (100+ issues resolved)
      {"\n"}   ✅ Code Reviewer (50+ PRs reviewed)
      {"\n"}
      {"\n"}📊 PRODUCTIVITY INSIGHTS:
      {"\n"}   Average commits/day: {(stats.totalCommits / 365).toFixed(1)}
      {"\n"}   Code quality score: 94/100
      {"\n"}   Collaboration index: High
      {"\n"}   Learning velocity: Accelerating
      {"\n"}
      {"\n"}🎯 CURRENT GOALS:
      {"\n"}   • Maintain 30+ day commit streak
      {"\n"}   • Contribute to 5 open source projects
      {"\n"}   • Master 2 new technologies this quarter
      {"\n"}   • Mentor junior developers
      {"\n"}
      {"\n"}Last updated: {new Date().toLocaleDateString()}
    </>
  );
}