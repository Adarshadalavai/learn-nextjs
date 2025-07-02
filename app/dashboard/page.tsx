import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        This is the dashboard page. You can manage your content here.
      </p>
    </div>
  );
}
