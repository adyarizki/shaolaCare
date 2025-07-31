"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const data = [
  { name: "Jan", students: 120 },
  { name: "Feb", students: 150 },
  { name: "Mar", students: 170 },
  { name: "Apr", students: 90 },
  { name: "Mei", students: 200 },
  { name: "Jun", students: 160 },
];

export default function StudentChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistik Jumlah Siswa per Bulan</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
