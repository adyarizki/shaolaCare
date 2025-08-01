'use client';
import { useSession, signOut } from "next-auth/react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, UserRound, Share2, Lock, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
   const { data: session } = useSession();


  return (
    <nav className="w-full bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="ml-8 text-2xl font-extrabold text-[#3f4d67]">ShaolaCare</div>

      {/* Profile Dropdown */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition focus:outline-none">
            <UserRound/>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            className="w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {/* Header Profile */}
            <div className="bg-[#2c3e50] p-4 flex items-center gap-3 text-white">
              <UserRound/>
              <div>
                <p className="font-bold text-sm flex items-center gap-1">
                  {session?.user?.name} 👋
                </p>
                <p className="text-xs text-white/80">{session?.user?.email}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white p-4 space-y-2">
              <DropdownMenu.Item className="flex items-center gap-2 text-sm cursor-pointer py-1 not-only:hover:bg-gray-100 hover:text-[#2c3e50]">
                <UserCheck size={16} />
                Role Sebagai : {session?.user?.role}
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item className="flex items-center gap-2 text-sm cursor-pointer py-1 hover:bg-gray-100 hover:text-[#2c3e50]">
                <Lock size={16} />
                Change Password
              </DropdownMenu.Item> */}
            </div>

            {/* Logout Button */}
            <div className="p-4 pt-2">
              <DropdownMenu.Item 
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="w-full bg-[#2c3e50] text-white py-2 rounded text-center flex items-center justify-center gap-2 hover:bg-[#3d566e]">
                <LogOut size={16} />
                Logout
              </DropdownMenu.Item>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
}
