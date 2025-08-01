"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Users, ShoppingCart, DollarSign, Box } from "lucide-react";
import Chart from "@/components/chart";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalProducts: 0,
    totalMessages: 0,
    totalBlogposts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="px-4 sm:px-6 min-h-screen bg-gray-50 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <CardStat
          title="Total Karyawan"
          value={stats.totalEmployees}
          icon={<Users className="text-blue-500 w-6 h-6" />}
          loading={loading}
        />
        {/* Card 2 */}
        <CardStat
          title="Pesan Masuk"
          value={stats.totalMessages}
          icon={<ShoppingCart className="text-green-500 w-6 h-6" />}
          loading={loading}
        />
        {/* Card 3 */}
        <CardStat
          title="Jumlah Blogpost"
          value={stats.totalBlogposts}
          icon={<DollarSign className="text-yellow-500 w-6 h-6" />}
          loading={loading}
        />
        {/* Card 4 */}
        <CardStat
          title="Jumlah Produk"
          value={stats.totalProducts}
          icon={<Box className="text-purple-500 w-6 h-6" />}
          loading={loading}
        />
      </div>

      {/* Chart: Stok Produk */}
      <Chart />
    </main>
  );
}

interface CardStatProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading: boolean;
}

function CardStat({ title, value, icon, loading }: CardStatProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        {loading ? (
          <Skeleton className="h-6 w-16 mt-2" />
        ) : (
          <p className="text-xl sm:text-2xl font-bold">{value}</p>
        )}
      </div>
      {icon}
    </div>
  );
}
