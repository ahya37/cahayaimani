'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard, Package, Calendar, Users, BarChart3, Building2,
  UserCog, Settings, ChevronDown, LogOut, Bell, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Dashboard', href: '/partner', icon: LayoutDashboard },
  { name: 'Paket', href: '/partner/packages', icon: Package },
  { name: 'Booking', href: '/partner/bookings', icon: Calendar },
  { name: 'Pelanggan', href: '/partner/customers', icon: Users },
  { name: 'Laporan', href: '/partner/reports', icon: BarChart3 },
  { name: 'Perusahaan', href: '/partner/company', icon: Building2 },
  { name: 'Staf', href: '/partner/staff', icon: UserCog },
  { name: 'Pengaturan', href: '/partner/settings', icon: Settings },
];

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-white">
              Cahaya <span className="text-accent">Imani</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Partner Badge */}
        <div className="p-4">
          <div className="px-3 py-2 bg-primary/20 rounded-lg border border-primary/30">
            <div className="text-xs text-primary font-medium">PARTNER</div>
            <div className="text-sm text-white font-medium mt-0.5">Al-Amin Travel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/partner' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className="p-4 border-t border-slate-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100" />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm text-white">Admin Travel</div>
                  <div className="text-xs text-slate-400">admin@alamin.id</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/partner/profile">Profil Saya</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/partner/settings">Pengaturan</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between h-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* New Package Button */}
              <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90" asChild>
                <Link href="/partner/packages/create">
                  Buat Paket Baru
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
