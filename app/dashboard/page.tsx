'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, CreditCard, FileText, Package, Clock, ChevronRight, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bookings, packages, formatCurrency, formatDateRange } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Booking', value: '3', icon: Package, color: 'bg-primary/10 text-primary' },
  { label: 'Pembayaran Pending', value: '1', icon: CreditCard, color: 'bg-warning/10 text-warning' },
  { label: 'Dokumen Lengkap', value: '2', icon: FileText, color: 'bg-success/10 text-success' },
  { label: 'Perjalanan Mendatang', value: '1', icon: Calendar, color: 'bg-accent/10 text-accent' },
];

const statusColors: Record<string, string> = {
  'confirmed': 'bg-success/10 text-success',
  'pending': 'bg-warning/10 text-warning',
  'processing': 'bg-primary/10 text-primary',
  'cancelled': 'bg-destructive/10 text-destructive',
  'completed': 'bg-muted text-muted-foreground',
};

const statusLabels: Record<string, string> = {
  'confirmed': 'Terkonfirmasi',
  'pending': 'Menunggu',
  'processing': 'Diproses',
  'cancelled': 'Dibatalkan',
  'completed': 'Selesai',
};

const paymentStatusColors: Record<string, string> = {
  'paid': 'bg-success/10 text-success',
  'partial': 'bg-warning/10 text-warning',
  'unpaid': 'bg-destructive/10 text-destructive',
  'refunded': 'bg-muted text-muted-foreground',
};

export default function CustomerDashboard() {
  const upcomingBooking = bookings[0];
  const recentPackages = packages.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Selamat Datang, Ahmad
          </h1>
          <p className="text-muted-foreground">
            Kelola booking, pembayaran, dan dokumen perjalanan Anda di sini.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link href="/search">
            Cari Paket Baru
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
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
              </div>
              <div className="font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trip */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Perjalanan Mendatang</CardTitle>
                  <CardDescription>Jadwal keberangkatan Anda selanjutnya</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/bookings">
                    Lihat Semua
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingBooking ? (
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/2409097/pexels-photo-2409097.jpeg"
                        alt={upcomingBooking.packageName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={cn(statusColors[upcomingBooking.status])}>
                            {statusLabels[upcomingBooking.status]}
                          </Badge>
                          <h3 className="font-display font-semibold mt-2">{upcomingBooking.packageName}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDateRange(upcomingBooking.departureDate, upcomingBooking.departureDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {upcomingBooking.passengers.length} Jamaah
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Kode Booking</div>
                          <div className="font-mono font-medium">{upcomingBooking.code}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Pembayaran</div>
                          <div className="font-display font-bold text-primary">
                            {formatCurrency(upcomingBooking.totalAmount)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn(paymentStatusColors[upcomingBooking.paymentStatus])}>
                            {upcomingBooking.paymentStatus === 'paid' ? 'Lunas' : 'Belum Lunas'}
                          </Badge>
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/bookings/${upcomingBooking.id}`}>Detail</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Belum Ada Perjalanan</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Anda belum memiliki booking yang dikonfirmasi.
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/search">Cari Paket</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-auto py-3" asChild>
                <Link href="/dashboard/bookings">
                  <Package className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Lihat Booking</div>
                    <div className="text-xs text-muted-foreground">Status dan detail booking</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-3" asChild>
                <Link href="/dashboard/payments">
                  <CreditCard className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Pembayaran</div>
                    <div className="text-xs text-muted-foreground">Kelola pembayaran</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-3" asChild>
                <Link href="/dashboard/documents">
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Unggah Dokumen</div>
                    <div className="text-xs text-muted-foreground">Paspor, visa, dan lainnya</div>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Notifikasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Pembayaran Dikonfirmasi</div>
                  <div className="text-xs text-muted-foreground">DP Umrah Reguler telah diterima</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Dokumen Belum Lengkap</div>
                  <div className="text-xs text-muted-foreground">Upload paspor dan kartu kuning</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Keberangkatan 30 Hari</div>
                  <div className="text-xs text-muted-foreground">Minggu manasik diadakan H-7</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Rekomendasi Paket</CardTitle>
              <CardDescription>Paket terbaik untuk perjalanan Anda selanjutnya</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                Lihat Semua
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPackages.map((pkg) => (
              <Link key={pkg.id} href={`/package/${pkg.slug}`}>
                <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="relative aspect-video">
                    <Image src={pkg.images[0]} alt={pkg.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-display font-semibold line-clamp-1 mb-1">{pkg.name}</h4>
                    <div className="text-sm text-muted-foreground mb-2">{pkg.destination}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-primary">{formatCurrency(pkg.price)}</span>
                      <span className="text-xs text-muted-foreground">/ orang</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
