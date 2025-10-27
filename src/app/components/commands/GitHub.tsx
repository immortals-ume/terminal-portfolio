'use client'

import React, { useEffect, useState } from "react";
import { createGitHubService, GitHubUser } from "../../../lib/github";

export default function GitHub() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const github = createGitHubService();
        const [userData, languageStats] = await Promise.all([
          github.getUser(),
          github.getLanguageStats()
        ]);
        
        setUser(userData);
        setLanguages(languageStats);
      } catch (err) {
        setError('Failed to load GitHub data');
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  if (loading) {
    return (
      <>
        Loading GitHub statistics...
        {"\n"}Fetching user data and repository analytics...
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        Error loading GitHub data: {error}
        {"\n"}Please check your GitHub username in configuration.
        {"\n"}Current username: {process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'not-configured'}
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTopLanguages = () => {
    const sorted = Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    const total = Object.values(languages).reduce((sum, size) => sum + size, 0);
    
    return sorted.map(([lang, size]) => ({
      language: lang,
      percentage: ((size / total) * 100).toFixed(1)
    }));
  };

  const topLanguages = getTopLanguages();

  return (
    <>
      GitHub Profile Statistics:
      {"\n"}
      {"\n"}👤 Profile Information:
      {"\n"}   Username: {user.login}
      {user.name && (
        <>
          {"\n"}   Name: {user.name}
        </>
      )}
      {user.bio && (
        <>
          {"\n"}   Bio: {user.bio}
        </>
      )}
      {user.location && (
        <>
          {"\n"}   Location: {user.location}
        </>
      )}
      {user.blog && (
        <>
          {"\n"}   Website: {user.blog}
        </>
      )}
      {"\n"}   Member since: {formatDate(user.created_at)}
      {"\n"}
      {"\n"}📊 Repository Statistics:
      {"\n"}   Public Repositories: {user.public_repos}
      {"\n"}   Followers: {user.followers}
      {"\n"}   Following: {user.following}
      {"\n"}
      {topLanguages.length > 0 && (
        <>
          {"\n"}💻 Top Programming Languages:
          {topLanguages.map(({ language, percentage }) => (
            <React.Fragment key={language}>
              {"\n"}   {language}: {percentage}%
            </React.Fragment>
          ))}
          {"\n"}
        </>
      )}
      {"\n"}🔗 Profile: https://github.com/{user.login}
      {"\n"}
      {"\n"}Use 'projects' command to see detailed repository information.
    </>
  );
}