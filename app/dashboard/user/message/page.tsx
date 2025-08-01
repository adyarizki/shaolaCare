'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";
import { Loader2 } from 'lucide-react'; 

const crumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Message", href: "" },
];

type Message = {
  id: string;
  nama: string;
  email: string;
  message: string;

};

export default function  MessageTable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  const router = useRouter();

  useEffect(() => {
  async function fetchData() {
    setIsLoading(true); // mulai loading
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false); // selesai loading
    }
  }

  fetchData();
}, []);

  const filteredProducts = useMemo(() => {
    return messages.filter((message) =>
      message.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, messages]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentData = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: string) => {
  const confirmDelete = confirm('Yakin ingin menghapus Message ini?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((p) => p.id !== id));
      router.push('/dashboard/user/message');
    } else {
      alert('Gagal menghapus message.');
    }
  } catch (error) {
    console.error('Error saat delete:', error);
    alert('Terjadi kesalahan saat menghapus.');
  }
};

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Message</h2>
        <Breadcrumb crumbs={crumbs} />
      </div>

      {/* <Link href="/dashboard/product/newProduct">
        <Button className="px-3 py-3 text-base bg-blue-600 ml-auto flex mt-4">Add Product</Button>
      </Link> */}

      <Input
        type="text"
        placeholder="search name product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4"
      />

    {isLoading ? (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500 mb-2" />
        <span className="text-sm text-gray-500">Memuat data message...</span>
      </div>
    ) : (
  <>
    <div className="overflow-auto">
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Nama</TableHead>
            <TableHead className='text-center'>email</TableHead>
            <TableHead className='text-center'>Message</TableHead>
            <TableHead className='text-center'>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((message) => (
            <TableRow className='text-center' key={message.id}>
              <TableCell>{message.nama}</TableCell>
              <TableCell>{message.email}</TableCell> 
                <TableCell>{message.message}</TableCell> 
              <TableCell className="flex gap-2 justify-center">
                {/* <Link href={`/dashboard/product/${product.id}`}>
                <Button className="cursor-pointer" variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                </Link> */}
                
                <Button className="cursor-pointer" variant="destructive" size="icon" onClick={() => handleDelete(message.id)}>
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
