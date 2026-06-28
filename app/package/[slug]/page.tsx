'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin, Calendar, Clock, Users, Star, CheckCircle, Share2, Heart,
  Plane, Hotel, UtensilsCrossed, Shield, ChevronLeft, ChevronRight,
  Phone, Mail, Globe, MessageCircle, ChevronDown, Minus, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from '@/components/ui/carousel';
import { packages, reviews, formatCurrency, formatDateRange, calculateDiscount } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  'umrah': 'Umrah',
  'haji-khusus': 'Haji Khusus',
  'tour-domestik': 'Tour Domestik',
  'tour-internasional': 'Tour Internasional',
  'wisata-halal': 'Wisata Halal',
  'study-tour': 'Study Tour',
  'corporate-gathering': 'Corporate Gathering',
  'mice': 'MICE',
};

const categoryColors: Record<string, string> = {
  'umrah': 'bg-primary/10 text-primary',
  'haji-khusus': 'bg-accent/10 text-accent',
  'tour-domestik': 'bg-success/10 text-success',
  'tour-internasional': 'bg-blue-500/10 text-blue-600',
  'wisata-halal': 'bg-primary/10 text-primary',
  'study-tour': 'bg-purple-500/10 text-purple-600',
  'corporate-gathering': 'bg-orange-500/10 text-orange-600',
  'mice': 'bg-pink-500/10 text-pink-600',
};

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = packages.find(p => p.slug === slug) || packages[0];
  const [currentImage, setCurrentImage] = useState(0);
  const [participantCount, setParticipantCount] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = pkg.originalPrice ? calculateDiscount(pkg.originalPrice, pkg.price) : 0;
  const seatsPercentage = Math.round((pkg.seatsAvailable / pkg.seatsTotal) * 100);
  const isLowSeats = seatsPercentage <= 30;
  const packageReviews = reviews.filter(r => r.packageId === pkg.id);
  const totalPrice = pkg.price * participantCount;

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Breadcrumb */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span>/</span>
            <Link href="/search" className="hover:text-primary">Paket</Link>
            <span>/</span>
            <Link href={`/search?category=${pkg.category}`} className="hover:text-primary">
              {categoryLabels[pkg.category]}
            </Link>
            <span>/</span>
            <span className="text-foreground">{pkg.name}</span>
          </nav>
        </div>
      </div>

      {/* Gallery & Info Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-background rounded-2xl overflow-hidden shadow-soft">
              <div className="relative aspect-[16/9]">
                <Image
                  src={pkg.images[currentImage]}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-white text-sm">
                    -{discount}%
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 p-4 overflow-x-auto">
                {pkg.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={cn(
                      'relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                      currentImage === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'
                    )}
                  >
                    <Image src={img} alt={`Image ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Package Header */}
            <div className="bg-background rounded-2xl p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={categoryColors[pkg.category]}>
                      {categoryLabels[pkg.category]}
                    </Badge>
                    {pkg.travel.isVerified && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{pkg.averageRating.toFixed(1)}</span>
                      <span>({pkg.totalReviews} ulasan)</span>
                    </div>
                    <span>•</span>
                    <span>by <span className="text-primary font-medium">{pkg.travel.name}</span></span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(isWishlisted && 'text-destructive')}
                  >
                    <Heart className={cn('h-5 w-5', isWishlisted && 'fill-destructive')} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Destinasi</span>
                  </div>
                  <p className="font-medium">{pkg.destination}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Keberangkatan</span>
                  </div>
                  <p className="font-medium">{formatDateRange(pkg.departureDate, pkg.returnDate)}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Durasi</span>
                  </div>
                  <p className="font-medium">{pkg.duration} Hari</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Kursi Tersedia</span>
                  </div>
                  <p className={cn('font-medium', isLowSeats && 'text-destructive')}>
                    {pkg.seatsAvailable} dari {pkg.seatsTotal}
                  </p>
                </div>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-muted-foreground">
                {pkg.description}
              </p>
            </div>

            {/* Tabs Section */}
            <Card className="overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b px-6">
                  <TabsList className="h-12 bg-transparent w-full justify-start gap-6">
                    <TabsTrigger value="overview" className="data-[state=active]:border-primary data-[state=active]:border-b-2">Ringkasan</TabsTrigger>
                    <TabsTrigger value="itinerary" className="data-[state=active]:border-primary data-[state=active]:border-b-2">Itinerary</TabsTrigger>
                    <TabsTrigger value="facilities" className="data-[state=active]:border-primary data-[state=active]:border-b-2">Fasilitas</TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:border-primary data-[state=active]:border-b-2">Ulasan</TabsTrigger>
                    <TabsTrigger value="faq" className="data-[state=active]:border-primary data-[state=active]:border-b-2">FAQ</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="p-6 space-y-6">
                  {/* Travel Info */}
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <h3 className="font-semibold mb-3">Diselenggarakan oleh</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
                        <Image src={pkg.travel.coverImage} alt={pkg.travel.name} width={56} height={56} className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{pkg.travel.name}</h4>
                          {pkg.travel.isVerified && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {pkg.travel.rating}
                          </span>
                          <span>•</span>
                          <span>{pkg.travel.totalPackages} Paket</span>
                          <span>•</span>
                          <span>{pkg.travel.establishedYear}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/travel/${pkg.travel.slug}`}>Lihat Profil</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Informasi Penting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                        <Plane className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Maskapai</p>
                          <p className="font-medium">{pkg.airline}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                        <Hotel className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Hotel</p>
                          <p className="font-medium">{pkg.hotelName} ({pkg.hotelRating} ★)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Kota Keberangkatan</p>
                          <p className="font-medium">{pkg.departureCity}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Visa</p>
                          <p className="font-medium">{pkg.isVisaIncluded ? 'Termasuk' : 'Tidak Termasuk'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-success">Termasuk</h3>
                      <ul className="space-y-2">
                        {pkg.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-muted-foreground">Tidak Termasuk</h3>
                      <ul className="space-y-2">
                        {pkg.excluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-4 w-4 text-muted-foreground mt-0.5">•</span>
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="p-6">
                  <div className="relative">
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {pkg.itinerary.map((day, idx) => (
                        <div key={idx} className="relative flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium z-10">
                            {day.day}
                          </div>
                          <div className="flex-1 pb-6">
                            <h4 className="font-semibold text-lg">{day.title}</h4>
                            <p className="text-muted-foreground text-sm mb-3">{day.description}</p>
                            {day.activities.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {day.activities.map((activity, i) => (
                                  <Badge key={i} variant="secondary">{activity}</Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="facilities" className="p-6">
                  <h3 className="font-semibold mb-4">Fasilitas yang Disediakan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pkg.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold">Ulasan Pelanggan</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-5 w-5',
                                star <= Math.round(pkg.averageRating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted'
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {pkg.averageRating.toFixed(1)} dari {pkg.totalReviews} ulasan
                        </span>
                      </div>
                    </div>
                  </div>

                  {packageReviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Belum ada ulasan untuk paket ini.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {packageReviews.map((review) => (
                        <div key={review.id} className="p-4 bg-secondary/50 rounded-xl">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar>
                              <AvatarImage src={review.customerAvatar} />
                              <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{review.customerName}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={cn(
                                      'h-3 w-3',
                                      star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted'
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          {review.reply && (
                            <div className="mt-4 ml-8 p-3 bg-muted rounded-lg">
                              <p className="text-sm font-medium text-primary mb-1">Balasan dari {pkg.travel.name}</p>
                              <p className="text-sm text-muted-foreground">{review.reply.content}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="faq" className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {pkg.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-20 p-6 shadow-soft">
              <div className="mb-4">
                {pkg.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatCurrency(pkg.originalPrice)}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-primary">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-muted-foreground">/ orang</span>
                </div>
              </div>

              {/* Participant Count */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Jumlah Peserta</Label>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setParticipantCount(Math.max(1, participantCount - 1))}
                    disabled={participantCount <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold text-lg">{participantCount}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setParticipantCount(Math.min(pkg.seatsAvailable, participantCount + 1))}
                    disabled={participantCount >= pkg.seatsAvailable}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between py-3 border-y border-border mb-4">
                <span className="text-muted-foreground">Total Harga</span>
                <span className="font-display font-bold text-xl">{formatCurrency(totalPrice)}</span>
              </div>

              {/* Seat Info */}
              {isLowSeats && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Tersisa {pkg.seatsAvailable} kursi</span>
                  </div>
                  <p className="text-xs mt-1">Segera booking sebelum kehabisan!</p>
                </div>
              )}

              <Button className="w-full h-12 bg-primary hover:bg-primary/90 mb-3" asChild>
                <Link href={`/booking/${pkg.slug}?participants=${participantCount}`}>
                  Booking Sekarang
                </Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/contact?package=${pkg.slug}`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Tanya Travel
                </Link>
              </Button>

              {/* Terms Preview */}
              <div className="mt-6 pt-4 border-t border-border">
                <Accordion type="single" collapsible>
                  <AccordionItem value="terms" className="border-0">
                    <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:text-foreground">
                      Syarat & Ketentuan
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {pkg.termsConditions.map((term, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {term}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>

            {/* Contact Travel */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Hubungi Travel</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`tel:${pkg.travel.phone}`}>
                    <Phone className="h-4 w-4 mr-3" />
                    {pkg.travel.phone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`mailto:${pkg.travel.email}`}>
                    <Mail className="h-4 w-4 mr-3" />
                    {pkg.travel.email}
                  </a>
                </Button>
                {pkg.travel.website && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={pkg.travel.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-3" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Label } from '@/components/ui/label';
