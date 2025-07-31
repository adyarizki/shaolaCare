"use client";
import { Users, ShoppingCart, DollarSign, Box } from "lucide-react";
import Chart from "@/components/chart";

export default function DashboardPage() {
  return (
    <main className="px-4 sm:px-6  min-h-screen ">
    <h1 className="text-xl sm:text-2xl font-semibold mb-6">Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card: Total Pengguna */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-xl sm:text-2xl font-bold">1.235</p>
        </div>
        <Users className="text-blue-500 w-6 h-6" />
      </div>

      {/* Card: Total Transaksi */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Company</p>
          <p className="text-xl sm:text-2xl font-bold">3.842</p>
        </div>
        <ShoppingCart className="text-green-500 w-6 h-6" />
      </div>

      {/* Card: Pendapatan Hari Ini */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Placement Ongoing</p>
          <p className="text-xl sm:text-2xl font-bold">Rp12.300.000</p>
        </div>
        <DollarSign className="text-yellow-500 w-6 h-6" />
      </div>

      {/* Card: Jumlah Produk */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Jumlah Produk</p>
          <p className="text-xl sm:text-2xl font-bold">327</p>
        </div>
        <Box className="text-purple-500 w-6 h-6" />
      </div>
    </div>
    <Chart />
</main>
  );
}
