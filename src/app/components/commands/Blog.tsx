/**
 * Blog Component
 *
 * Displays blog posts and articles in a grid layout with hover effects.
 *
 * Features:
 * - Responsive grid layout
 * - Hover effects with animations
 * - Reading time estimates
 * - Tags and categories
 * - External links to blog posts
 * - Theme-aware styling
 * - Memoized for performance
 *
 * @component
 * @example
 * ```tsx
 * <Blog />
 * ```
 */

'use client'

import React from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import ClickableLink from "../ui/ClickableLink";
import { blogPosts } from "@/data/portfolio";

const Blog: React.FC = React.memo(() => {
  const colors = useThemeColors();

  if (blogPosts.length === 0) {
    return (
      <div
        className="flex flex-col gap-2 p-8 text-center"
        style={{ color: colors.textPrimary }}
        role="status"
        aria-live="polite"
      >
        <div className="text-xl mb-2">
          <span aria-hidden="true">📝</span> No blog posts yet
        </div>
        <div
          className="text-sm opacity-75"
          style={{ color: colors.textSecondary }}
        >
          Check back soon for technical articles and insights!
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ color: colors.accent }}
      >
        <span aria-hidden="true">📝</span>
        <span>Blog & Articles</span>
        <span className="text-sm opacity-70 font-normal">
          ({blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'})
        </span>
      </div>

      <div
        className="skills-grid mb-8"
        role="list"
        aria-label={`${blogPosts.length} blog posts`}
      >
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="group p-4 rounded-lg border transition-all duration-300 ease-out cursor-pointer relative animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0 flex flex-col gap-3 hover:-translate-y-0.5"
            style={{
              borderColor: colors.accent,
              backgroundColor: colors.bgSecondary,
              animationDelay: `${index * 0.05}s`,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.neonSoft}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
            role="listitem"
          >
            <div
              className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-xs font-semibold border"
              style={{
                backgroundColor: `${colors.accent}20`,
                borderColor: colors.accent,
                color: colors.accent,
              }}
            >
              #{index + 1}
            </div>

            <div
              className="text-[0.7rem] px-1.5 py-0.5 rounded inline-block border"
              style={{
                color: colors.accent,
                backgroundColor: `${colors.accent}10`,
                borderColor: `${colors.accent}30`,
              }}
            >
              {post.category}
            </div>

            <div
              className="text-base font-semibold pr-10"
              style={{ color: colors.textPrimary }}
            >
              {post.title}
            </div>

            <div
              className="text-sm leading-6 flex-1 min-h-[2.5rem]"
              style={{ color: colors.textSecondary }}
            >
              {post.description}
            </div>

            <div
              className="flex justify-between items-center text-xs pt-2 border-t"
              style={{ borderTopColor: `${colors.accent}20` }}
            >
              <span style={{ color: colors.textSecondary }}>
                📅 {post.date}
              </span>
              <span style={{ color: colors.textSecondary }}>
                ⏱️ {post.readTime}
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded border"
                    style={{
                      color: colors.accent,
                      backgroundColor: `${colors.accent}10`,
                      borderColor: `${colors.accent}30`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span
                    className="self-center"
                    style={{ color: colors.textSecondary }}
                  >
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {post.url && (
              <div className="pt-2">
                <ClickableLink
                  url={post.url}
                  text="📖 Read Article"
                  ariaLabel={`Read article: ${post.title}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="pt-4 text-xs opacity-75 border-t"
        style={{
          borderTopColor: `${colors.accent}20`,
          color: colors.textSecondary,
        }}
        aria-label="Usage tip"
      >
        💡 Hover over posts for enhanced view • More articles coming soon!
      </div>
    </div>
  );
});

Blog.displayName = 'Blog';

export default Blog;
