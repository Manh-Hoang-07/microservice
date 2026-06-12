import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const postData = JSON.parse(
  readFileSync(join(__dirname, '../data/posts.json'), 'utf-8'),
);

interface PostEntry {
  name: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  image?: string | null;
  status: string;
  post_type: string;
  is_featured: boolean;
  is_pinned: boolean;
  published_at?: string | null;
  group_id?: number | string | null;
  categories: string[];
  tags: string[];
}

export async function seedPosts(
  prisma: PrismaClient,
  categorySlugToId: Map<string, bigint>,
  tagSlugToId: Map<string, bigint>,
) {
  const posts = postData as PostEntry[];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  ⏭ Post "${post.name}" already exists, skipping`);
      continue;
    }

    const record = await prisma.post.create({
      data: {
        name: post.name,
        slug: post.slug,
        excerpt: post.excerpt ?? null,
        content: post.content ?? null,
        image: post.image ?? null,
        status: post.status,
        postType: post.post_type,
        isFeatured: post.is_featured,
        isPinned: post.is_pinned,
        publishedAt: post.published_at ? new Date(post.published_at) : null,
        groupId: post.group_id != null ? BigInt(post.group_id) : null,
      },
    });

    // Stats row (cho thong ke luot xem)
    await prisma.stats.create({ data: { postId: record.id } });

    // Create PostCategory relationships
    for (const catSlug of post.categories) {
      const categoryId = categorySlugToId.get(catSlug);
      if (categoryId) {
        await prisma.postCategory.create({
          data: { postId: record.id, categoryId: categoryId },
        });
      }
    }

    // Create PostTag relationships
    for (const tagSlug of post.tags) {
      const tagId = tagSlugToId.get(tagSlug);
      if (tagId) {
        await prisma.postTag.create({
          data: { postId: record.id, tagId: tagId },
        });
      }
    }

    console.log(`  ✔ Post: ${post.name}`);
  }

  console.log(`  ✔ Total posts processed: ${posts.length}`);
}
