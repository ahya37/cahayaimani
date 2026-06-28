'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Package, TrendingUp, Users, DollarSign, Calendar, ChevronRight,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bookings, packages, formatCurrency, formatDateRange } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Booking', value: '156', change: '+12%', trend: 'up', icon: Package, color: 'bg-primary/10 text-primary' },
  { label: 'Pendapatan Bulan Ini', value: formatCurrency(580000000), change: '+8.5%', trend: 'up', icon: DollarSign, color: 'bg-success/10 text-success' },
  { label: 'Pelanggan Baru', value: '34', change: '+23%', trend: 'up', icon: Users, color: 'bg-accent/10 text-accent' },
  { label: 'Keberangkatan Bulan Ini', value: '8', change: '-2', trend: 'down', icon: Calendar, color: 'bg-warning/10 text-warning' },
];

const bookingStatusColors: Record<string, string> = {
  'confirmed': 'bg-success/10 text-success',
  'pending': 'bg-warning/10 text-warning',
  'processing': 'bg-primary/10 text-primary',
  'cancelled': 'bg-destructive/10 text-destructive',
};

const bookingStatusLabels: Record<string, string> = {
  'confirmed': 'Terkonfirmasi',
  'pending': 'Menunggu',
  'processing': 'Diproses',
  'cancelled': 'Dibatalkan',
};

export default function PartnerDashboard() {
  const recentBookings = [
    { id: '1', code: 'SH-2024-000156', customer: 'Budi Santoso', package: 'Umrah Reguler 9 Hari', amount: 28500000, status: 'confirmed', date: '2024-01-28' },
    { id: '2', code: 'SH-2024-000155', customer: 'Siti Rahayu', package: 'Umrah Plus Turki', amount: 45000000, status: 'pending', date: '2024-01-27' },
    { id: '3', code: 'SH-2024-000154', customer: 'Ahmad Yusuf', package: 'Umrah Premium B5', amount: 38500000, status: 'confirmed', date: '2024-01-26' },
    { id: '4', code: 'SH-2024-000153', customer: 'Dewi Anggraini', package: 'Umrah Reguler 9 Hari', amount: 28500000, status: 'processing', date: '2024-01-25' },
    { id: '5', code: 'SH-2024-000152', customer: 'Hendra Wijaya', package: 'Haji Plus FONABIH', amount: 185000000, status: 'pending', date: '2024-01-24' },
  ];

  const topPackages = [
    { name: 'Umrah Reguler 9 Hari', bookings: 45, revenue: 1282500000, trend: '+15%' },
    { name: 'Umrah Premium B5', bookings: 32, revenue: 1232000000, trend: '+8%' },
    { name: 'Umrah Plus Turki', bookings: 28, revenue: 1260000000, trend: '+12%' },
    { name: 'Haji Plus FONABIH', bookings: 12, revenue: 2220000000, trend: '-3%' },
  ];

  const departures = [
    { package: 'Umrah Reguler 9 Hari', date: '2024-02-15', seats: 12, status: 'ready' },
    { package: 'Umrah Premium B5', date: '2024-02-20', seats: 8, status: 'ready' },
    { package: 'Umrah Plus Turki', date: '2024-02-25', seats: 5, status: 'pending_docs' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Dashboard Partner
          </h1>
          <p className="text-muted-foreground">
            Ringkasan performa bisnis travel Anda.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/partner/reports">Lihat Laporan</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/partner/packages/create">Buat Paket Baru</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-soft transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                  stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="font-display text-xl md:text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Booking Terbaru</CardTitle>
                  <CardDescription>5 booking terakhir dari pelanggan</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/partner/bookings">
                    Lihat Semua
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{booking.customer}</span>
                          <Badge variant="outline" className="text-xs">{booking.code}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{booking.package}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(booking.amount)}</div>
                      <Badge className={cn('mt-1', bookingStatusColors[booking.status])}>
                        {bookingStatusLabels[booking.status]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Departures */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Keberangkatan Mendatang</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {departures.map((dep, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    dep.status === 'ready' ? 'bg-success/10' : 'bg-warning/10'
                  )}>
                    {dep.status === 'ready' ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{dep.package}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(dep.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' '}• {dep.seats} kursi
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Selling Packages */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Paket Terlaris</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPackages.map((pkg, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                    idx === 1 ? 'bg-slate-200 text-slate-600' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-muted text-muted-foreground'
                  )}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm line-clamp-1">{pkg.name}</div>
                    <div className="text-xs text-muted-foreground">{pkg.bookings} booking</div>
                  </div>
                  <div className={cn(
                    'text-xs font-medium px-2 py-1 rounded-full',
                    parseInt(pkg.trend) > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  )}>
                    {pkg.trend}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Grafik Pendapatan</CardTitle>
              <CardDescription>Pendapatan 6 bulan terakhir</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Mingguan</Button>
              <Button variant="outline" size="sm" className="bg-primary/10">Bulanan</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary/30 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Chart akan ditampilkan di sini</p>
              <p className="text-sm text-muted-foreground">Integrasi dengan Recharts untuk visualisasi data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
