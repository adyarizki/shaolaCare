import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const platforms = [
  {
    name: "Tiktok",
    logo: "/images/tiktok.png",
    color: "border-red-500 bg-red-500 text-white",
  },
  {
    name: "Tokopedia",
    logo: "/images/tokopedia.png",
    color: "border-green-500 bg-green-500 text-white",
  },
  {
    name: "Shopee",
    logo: "/images/shopee.png",
    color: "border-orange-500 bg-orange-500 text-white",
  },
];

export default function PlatformCards() {
  return (
    <div className="w-full bg-gray-100">
    <section id="cara" className="w-full py-16 px-4 max-w-7xl mx-auto ">
      <h3 className="text-2xl font-semibold text-center text-[#355372] mb-10">
        Cara Pembelian Produk
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {platforms.map((platform, idx) => (
          <Card key={idx} className="text-center border shadow-md">
            <CardContent className="flex flex-col items-center justify-between h-full py-6">
              <Image
                src={platform.logo}
                alt={platform.name}
                width={80}
                height={80}
                className="object-contain h-20 mb-4"
              />
              <div className={`w-full py-2 font-semibold ${platform.color}`}>
                {platform.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
    </div>
  );
}
