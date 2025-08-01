// app/dashboard/layout.tsx

// app/dashboard/layout.tsx (Server Component)
import SidebarAdmin from "@/components/sidebarAdmin";
import SidebarUser from "@/components/sidebarUser";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ Import from the config file
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin"); // Otomatis redirect jika belum login
  }

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen">
        {session.user.role === "ADMIN" ? <SidebarAdmin /> : <SidebarUser />}
        <main className="mt-23 px-4 sm:px-6 sm:ml-[17rem] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

