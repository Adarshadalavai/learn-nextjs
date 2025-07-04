import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { BlogPostsGrid } from "@/components/general/BlogPostGrid";

async function getData(userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for loading state
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Dashboard() {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();

  // const data = await getData(user?.id as string);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id} /> 
        ))}
      </div> */}

      <Suspense fallback={<BlogPostsGrid />}>
        <DashboardBlogs />
      </Suspense>
    </div>
  );
}

async function DashboardBlogs() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return <div>No user found.</div>;
  }

  const data = await getData(user.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}
