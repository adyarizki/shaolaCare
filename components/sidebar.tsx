'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  BriefcaseBusiness,
  Menu,
  Settings
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/product', label: 'Product', icon: Package },
  { href: '/dashboard/employee', label: 'Employee', icon: BriefcaseBusiness },
  { href: '/dashboard/signup', label: 'Register', icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-1 bg-white rounded shadow-md"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Sidebar"
      >
        <Menu />
      </button>

      {/* Sidebar Container */}
      <aside
  className={`fixed top-20 left-4 z-40 h-[calc(100vh-4rem)] w-64 bg-[#2c3e50]  shadow-lg rounded-3xl px-6 py-4 transform transition-transform duration-300 ease-in-out
  ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:block`}
>

        <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex font-semibold items-center gap-3 px-3 py-2 rounded-lg text-sm  transition
              ${
                pathname === href
                  ? 'bg-[#34495e] text-white'
                  : 'text-gray-200 hover:bg-[#3d566e]'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
