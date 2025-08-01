"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Loader2 } from "lucide-react";

export default function EditBlogPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        setFormData({ title: data.title, content: data.content });
      } catch (error) {
        alert("Gagal memuat data blog post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Blog post berhasil diperbarui!");
        router.push("/dashboard/user/blog");
      } else {
        const err = await res.json();
        alert("Gagal update: " + err?.error || "Unknown error");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setUpdating(false);
    }
  };

  const crumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog Posts", href: "/dashboard/user/blog" },
    { label: "Edit Post", href: "" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <Breadcrumb crumbs={crumbs} />
        </div>

        <Card className="max-w-xl mx-auto shadow-lg mt-4">
          {loading ? (
            <CardContent className="flex flex-col items-center justify-center text-center py-16">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-500">Memuat data blog post...</p>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Edit Blog Post</CardTitle>
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
                      rows={8}
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Updating...
                      </>
                    ) : (
                      "Update Post"
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
