"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

export default function AddBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      alert("Blog berhasil ditambahkan!");
      router.push("/dashboard/admin/blog");
    } else {
      alert("Gagal menambahkan blog.");
    }
  };

   const crumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog health", href: "/dashboard/admin/blog" },
    { label: "Add Blog", href: "" },
  ];

  return (
    
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <Breadcrumb crumbs={crumbs} />
        </div>
        <Card className="max-w-2xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle>Tambah Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </span>
                ) : (
                  "Simpan"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
