'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search, User, Heart, ChevronDown, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const categories = [
  { name: 'Umrah', href: '/search?category=umrah' },
  { name: 'Haji Khusus', href: '/search?category=haji-khusus' },
  { name: 'Tour Domestik', href: '/search?category=tour-domestik' },
  { name: 'Tour Internasional', href: '/search?category=tour-internasional' },
  { name: 'Wisata Halal', href: '/search?category=wisata-halal' },
];

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Paket', href: '/search' },
  { name: 'Travel', href: '/travel' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Demo: not logged in

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-primary">
            Cahaya <span className="text-accent">Imani</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                Kategori <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100" />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/bookings">Booking Saya</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          )}

          {/* Partner Button */}
          <Button variant="outline" className="hidden lg:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link href="/partner">Partner Travel</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="border-t pt-4">
              <p className="px-3 text-xs font-semibold uppercase text-muted-foreground mb-2">Kategori</p>
              <nav className="flex flex-col space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t pt-4 flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
              <Button variant="outline" className="border-primary text-primary" asChild>
                <Link href="/partner">Partner Travel</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
