"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import { useState } from "react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock), 
      }),
    });

    if (res.ok) {
      alert("Produk berhasil ditambahkan!");
      setFormData({ name: "", price: "", stock: "" });
    } else {
      alert("Gagal menambahkan produk.");
    }
  };

  const crumbs = [
    { label: "Admin", href: "/admin" },
    { label: "Product", href: "/admin/product" },
    { label: "Add Product", href: "" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <Breadcrumb crumbs={crumbs} />
        </div>
        <Card className="max-w-lg mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                Simpan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
