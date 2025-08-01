'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";
import { Loader2 } from 'lucide-react'; 

const crumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Blog", href: "" },
];

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function BlogTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  const router = useRouter();

 useEffect(() => {
  async function fetchData() {
    setIsLoading(true); // mulai loading
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false); // selesai loading
    }
  }

  fetchData();
}, []);


  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  const totalPages = Math.ceil(filteredBlogs .length / itemsPerPage);
  const currentData = filteredBlogs .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus blog ini?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((e) => e.id !== id));
        router.refresh();
      } else {
        alert('Gagal menghapus blog.');
      }
    } catch (error) {
      console.error('Error saat delete:', error);
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Blog</h2>
        <Breadcrumb crumbs={crumbs} />
      </div>

      <Link href="/dashboard/admin/blog/newBlog">
        <Button className="px-3 py-3 text-base bg-blue-600 ml-auto flex mt-4">Add Blog</Button>
      </Link>

      <Input
        type="text"
        placeholder="Search Blog name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4"
      />

     {isLoading ? (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500 mb-2" />
        <span className="text-sm text-gray-500">Memuat data Blog...</span>
      </div>
    ) : (
  <>
  <div className="overflow-auto">
    <Table className="mt-4 min-w-[800px]">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="text-center">Content</TableHead>
          <TableHead className="text-center">Create At</TableHead>
          <TableHead className="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentData.map((blog) => (
          <TableRow className="text-center" key={blog.id}>
            <TableCell>{blog.title}</TableCell>
            <TableCell className="whitespace-pre-wrap text-left">
                {blog.content.length > 100
                ? blog.content.slice(0, 100) + "..."
                : blog.content}
            </TableCell>
                        <TableCell>{blog.createdAt}</TableCell>
            <TableCell className="flex gap-2 justify-center">
              <Link href={`/dashboard/admin/blog/${blog.id}`}>
                <Button className="cursor-pointer" variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
              <Button className="cursor-pointer" variant="destructive" size="icon" onClick={() => handleDelete(blog.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
    <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
  <span className="text-sm">
    Halaman {currentPage} dari {totalPages}
  </span>
  <div className="space-x-2">
    <Button
      className="cursor-pointer"
      variant="outline"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Prev
    </Button>
    <Button
    className="cursor-pointer"
      variant="outline"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
</div>
  </>
)}
    </Card>
  );
}
