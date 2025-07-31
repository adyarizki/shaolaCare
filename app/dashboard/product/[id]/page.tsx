// app/dashboard/products/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
          price: parseFloat(price) 
        }),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        router.push("/dashboard/product"); // Fixed redirect path
      } else {
        const errorData = await res.json();
        alert(`Failed to update product: ${errorData.error || 'Unknown error'}`);
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
      <Card className="max-w-lg mx-auto p-6 mt-10">
        <p>Loading product data...</p>
      </Card>
    );
  }

  return (
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Card>
  );
}