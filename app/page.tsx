import { prisma } from "./utils/db";

async function getPosts() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      id: true,
      createdAt: true,
      authorName: true,
      authorImage: true,
    },
  });
  return data;
}

export default async function Home() {
  const data = await getPosts();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <h2>{item.content}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
