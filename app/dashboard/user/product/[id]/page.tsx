// app/dashboard/products/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setFetchLoading(true);
        const res = await fetch(`/api/product/${id}`);

        if (!res.ok) {
          alert("Failed to fetch Product data.");
          return;
        }

        const product: Product = await res.json();
        setName(product.name);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch Product data.");
      } finally {
        setFetchLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          stock: parseInt(stock),
          price: parseFloat(price),
        }),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        router.push("/dashboard/user/product"); // Fixed redirect path
      } else {
        const errorData = await res.json();
        alert(`Failed to update product: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Card className="max-w-lg mx-auto p-6 mt-10 flex flex-col items-center justify-center text-center gap-2">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-gray-500">Memuat data produk...</p>
      </Card>
    );
  }
  const crumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Product", href: "/dashboard/user/product" },
    { label: "Update Product", href: "" },
  ];

  return (
<div className="min-h-screen bg-gray-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <Breadcrumb crumbs={crumbs} />
        </div>
    <Card className="max-w-lg mx-auto p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Name Product"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
          step="1"
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-400" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Product"
          )}
        </Button>
      </form>
    </Card>
  
    </div>  
    </div>
  );
}
