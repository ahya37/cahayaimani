'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Star, Users, MapPin, Plane, Clock, CheckCircle, Award, Headphones, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PackageCard } from '@/components/package-card';
import { packages, travelCompanies } from '@/lib/mock-data';

const categories = [
  {
    name: 'Umrah',
    slug: 'umrah',
    image: 'https://images.pexels.com/photos/2409097/pexels-photo-2409097.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: 120,
  },
  {
    name: 'Haji Khusus',
    slug: 'haji-khusus',
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: 45,
  },
  {
    name: 'Tour Domestik',
    slug: 'tour-domestik',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: 89,
  },
  {
    name: 'Tour Internasional',
    slug: 'tour-internasional',
    image: 'https://images.pexels.com/photos/2506910/pexels-photo-2506910.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: 156,
  },
  {
    name: 'Wisata Halal',
    slug: 'wisata-halal',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: 78,
  },
];

const features = [
  {
    icon: Shield,
    title: 'Travel Terverifikasi',
    description: 'Semua travel partner telah melewati proses verifikasi legalitas dan kualitas layanan.',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Aman',
    description: 'Transaksi Anda dijamin aman dengan payment gateway terpercaya dan escrow system.',
  },
  {
    icon: Clock,
    title: 'Booking Instan',
    description: 'Proses reservasi cepat dan mudah. Konfirmasi langsung setelah pembayaran.',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Tim customer service siap membantu Anda kapan saja sebelum dan selama perjalanan.',
  },
];

const stats = [
  { label: 'Travel Partner', value: '500+' },
  { label: 'Paket Tersedia', value: '2,000+' },
  { label: 'Customer Puas', value: '150K+' },
  { label: 'Rating Rata-rata', value: '4.8' },
];

export default function HomePage() {
  const featuredPackages = packages.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900">
          <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        </div>

        {/* Floating Images */}
        <div className="absolute right-0 top-0 h-full w-1/2 hidden xl:block">
          <div className="absolute top-20 right-32 w-80 h-60 rounded-2xl overflow-hidden shadow-premium transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.pexels.com/photos/2409097/pexels-photo-2409097.jpeg"
              alt="Makkah"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-48 right-80 w-64 h-48 rounded-2xl overflow-hidden shadow-premium transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
              alt="Istanbul"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-40 right-40 w-72 h-52 rounded-2xl overflow-hidden shadow-premium transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
              alt="Madinah"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur">
              Marketplace Terpercaya #1
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Perjalanan Ibadah & Wisata{' '}
              <span className="text-yellow-400">Terpercaya</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Temukan dan bandingkan paket umrah, haji, dan tour dari travel terpercaya.
              One platform for all your journey needs.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-premium max-w-2xl">
              <div className="flex flex-wrap gap-4 mb-4 p-4 bg-slate-50 rounded-xl">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tujuan
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <select className="flex-1 bg-transparent text-foreground focus:outline-none">
                      <option>Semua Destinasi</option>
                      <option>Makkah & Madinah</option>
                      <option>Turki</option>
                      <option>Jepang</option>
                      <option>Domestik Indonesia</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kategori
                  </label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-5 w-5 text-muted-foreground" />
                    <select className="flex-1 bg-transparent text-foreground focus:outline-none">
                      <option>Semua Kategori</option>
                      <option>Umrah</option>
                      <option>Haji Khusus</option>
                      <option>Tour Domestik</option>
                      <option>Tour Internasional</option>
                      <option>Wisata Halal</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tanggal Keberangkatan
                  </label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <input
                      type="month"
                      className="flex-1 bg-transparent text-foreground focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 h-12 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/search">
                    <span className="flex items-center justify-center gap-2">
                      Cari Paket
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Jelajahi Berdasarkan Kategori
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan paket perjalanan sesuai kebutuhan Anda, dari umrah hingga wisata halal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/search?category=${category.slug}`}>
                <Card className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-card-hover transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display font-semibold text-lg text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">{category.count} Paket</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary">Pilihan Terbaik</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Paket Populer
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Paket perjalanan terlaris pilihan jamaah dengan ulasan terbaik.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/search">
                Lihat Semua Paket
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
              Keunggulan Kami
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Mengapa Memilih Cahaya Imani?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Kami berkomitmen memberikan pengalaman terbaik untuk perjalanan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Partner Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary">Partner Terpercaya</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Travel Partner Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bermitra dengan travel-travel terverifikasi untuk pengalaman perjalanan terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelCompanies.map((travel) => (
              <Card key={travel.id} className="p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={travel.coverImage}
                      alt={travel.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-lg">{travel.name}</h3>
                      {travel.isVerified && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      {travel.rating} ({travel.totalReviews} ulasan)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {travel.description}
                </p>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border mb-4">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{travel.totalPackages}</div>
                    <div className="text-xs text-muted-foreground">Paket</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">
                      {(travel.totalCustomers / 1000).toFixed(0)}K+
                    </div>
                    <div className="text-xs text-muted-foreground">Customer</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">
                      {new Date().getFullYear() - travel.establishedYear}
                    </div>
                    <div className="text-xs text-muted-foreground">Tahun</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/travel/${travel.slug}`}>Lihat Profil</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-teal-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Anda?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Daftarkan diri Anda sekarang dan dapatkan akses ke ratusan paket perjalanan
              dari travel travel terpercaya di Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/register">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/search">Jelajahi Paket</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">SSL Secured</div>
                <div className="text-sm">Data Anda Terlindungi</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">Verified Travel</div>
                <div className="text-sm">All Partners Verified</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">Best Price</div>
                <div className="text-sm">Harga Kompetitif</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">150K+ Customers</div>
                <div className="text-sm">Trusted & Reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
