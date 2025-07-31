'use client';
import Image from "next/image";
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-16">
      <Image
        src="/images/404notfound.png"
        alt="Not Found"
        width={200}
        height={100}
        unoptimized
      />
      <p className="text-xl text-gray-700 mb-4">
        Oops! The page you are looking for was not found.
      </p>
      <p className="text-gray-500 mb-7">
        Either the address is wrong, or the page is no longer available.
      </p>

      <Link href="/">
        <div className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-600 transition font-bold cursor-pointer">
          Back to Home
        </div>
      </Link>
    </main>
  );
}
