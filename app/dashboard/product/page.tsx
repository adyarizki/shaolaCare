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

const crumbs = [
  { label: "Admin", href: "/admin" },
  { label: "Produk", href: "" },
];

type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;

};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/product'); // pastikan ada route handler-nya
      const data = await res.json();
      setProducts(data);
    }

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentData = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const router = useRouter();
  const handleDelete = async (id: string) => {
  const confirmDelete = confirm('Yakin ingin menghapus produk ini?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      router.push('/dashboard/product');
    } else {
      alert('Gagal menghapus produk.');
    }
  } catch (error) {
    console.error('Error saat delete:', error);
    alert('Terjadi kesalahan saat menghapus.');
  }
};

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Produk</h2>
        <Breadcrumb crumbs={crumbs} />
      </div>

      <Link href="/dashboard/product/newProduct">
        <Button className="px-3 py-3 text-base bg-blue-600 ml-auto flex mt-4">Add Product</Button>
      </Link>

      <Input
        type="text"
        placeholder="search name product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4"
      />

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Name Product</TableHead>
            <TableHead className='text-center'>stock</TableHead>
            <TableHead className='text-center'>Price</TableHead>
            <TableHead className='text-center'>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((product) => (
            <TableRow className='text-center' key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.stock}</TableCell> 
              <TableCell>Rp {product.price.toLocaleString()}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Link href={`/dashboard/product/${product.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                </Link>
                
                <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
         
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-4">
        <span className="text-sm">
          Halaman {currentPage} dari {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
