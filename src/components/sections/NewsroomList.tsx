"use client";

import { useMemo, useState } from "react";
import { PostListingRow } from "@/components/ui/PostListingRow";
import { CategoryFilter, type CategoryChip } from "@/components/ui/CategoryFilter";
import { FadeRise } from "@/components/motion/FadeRise";

export type NewsroomListItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  dek: string;
  readingTime: number;
};

const ALL = "All";

export function NewsroomList({ posts }: { posts: NewsroomListItem[] }) {
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo<CategoryChip[]>(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
    return [{ value: ALL, count: posts.length }, ...sorted];
  }, [posts]);

  const visible = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {categories.length > 2 && (
        <FadeRise className="mb-10 md:mb-14">
          <CategoryFilter
            categories={categories}
            active={active}
            onChange={setActive}
          />
        </FadeRise>
      )}
      {visible.length === 0 ? (
        <p className="font-sans text-body text-ink-muted">No posts in this category.</p>
      ) : (
        visible.map((post, i) => (
          <FadeRise key={post.slug}>
            <PostListingRow
              date={post.date}
              category={post.category}
              title={post.title}
              dek={post.dek}
              readingTime={post.readingTime}
              href={`/newsroom/${post.slug}`}
              isFirst={i === 0}
            />
          </FadeRise>
        ))
      )}
    </>
  );
}
