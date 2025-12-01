"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all tokens from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");

    // Clear all tokens from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("userToken");

    // Redirect to login page
    router.push("/admin/login");
  };
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

      <nav className="space-y-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          href="/admin/dashboard/category"
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <Package size={18} /> categories
        </Link>

        <Link
          href="/admin/dashboard/products"
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <Package size={18} /> Products
        </Link>
        <Link
          href="/admin/dashboard/settings"
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <Settings size={18} /> Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left hover:text-red-600 transition-colors"
        >
          <LogOut size={18} /> Log out
        </button>
      </nav>
    </aside>
  );
}
