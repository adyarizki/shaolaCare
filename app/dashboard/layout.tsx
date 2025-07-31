// app/dashboard/layout.tsx
"use client";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
  
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen" >
        <Sidebar />
        <main className="mt-23 px-4 sm:px-6 sm:ml-[17rem] w-full ">{children}</main>
      </div>

    </div>
  );
}
