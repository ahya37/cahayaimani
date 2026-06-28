'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Users, Star, Clock, CheckCircle } from 'lucide-react';
import { Package } from '@/types';
import { formatCurrency, formatDateRange, calculateDiscount } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PackageCardProps {
  pkg: Package;
  variant?: 'default' | 'horizontal' | 'compact';
}

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

export function PackageCard({ pkg, variant = 'default' }: PackageCardProps) {
  const discount = pkg.originalPrice ? calculateDiscount(pkg.originalPrice, pkg.price) : 0;
  const seatsPercentage = Math.round((pkg.seatsAvailable / pkg.seatsTotal) * 100);
  const isLowSeats = seatsPercentage <= 30;

  if (variant === 'horizontal') {
    return (
      <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
            <Image
              src={pkg.images[0]}
              alt={pkg.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-destructive text-white">
                -{discount}%
              </Badge>
            )}
            {pkg.travel.isVerified && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-1">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={cn('text-xs', categoryColors[pkg.category])}>
                  {categoryLabels[pkg.category] || pkg.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  {pkg.averageRating.toFixed(1)}
                </div>
              </div>

              <Link href={`/package/${pkg.slug}`}>
                <h3 className="font-display font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                  {pkg.name}
                </h3>
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pkg.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDateRange(pkg.departureDate, pkg.returnDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {pkg.duration} Hari
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">by</span>
                <span className="font-medium text-foreground">{pkg.travel.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <span className={cn('text-sm', isLowSeats ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                  {pkg.seatsAvailable} kursi tersisa
                </span>
              </div>
              <div className="text-right">
                {pkg.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatCurrency(pkg.originalPrice)}
                  </div>
                )}
                <div className="font-display font-bold text-lg text-primary">
                  {formatCurrency(pkg.price)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.images[0]}
          alt={pkg.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="secondary" className={cn(categoryColors[pkg.category])}>
            {categoryLabels[pkg.category] || pkg.category}
          </Badge>
          {discount > 0 && (
            <Badge className="bg-destructive text-white">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Verified Badge */}
        {pkg.travel.isVerified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-1">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium">{pkg.averageRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({pkg.totalReviews})</span>
            </div>
            <div className={cn(
              'flex items-center space-x-1 bg-white/90 backdrop-blur rounded-full px-2.5 py-1',
              isLowSeats && 'bg-destructive/90 text-white'
            )}>
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{pkg.seatsAvailable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Travel Company */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">by</span>
          <span className="text-xs font-medium text-foreground truncate">{pkg.travel.name}</span>
        </div>

        {/* Title */}
        <Link href={`/package/${pkg.slug}`}>
          <h3 className="font-display font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2 mb-3">
            {pkg.name}
          </h3>
        </Link>

        {/* Destination */}
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1.5" />
          {pkg.destination}
        </div>

        {/* Duration & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {pkg.duration} Hari
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDateRange(pkg.departureDate, pkg.returnDate)}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div className="flex-1">
            {pkg.originalPrice && (
              <div className="text-xs text-muted-foreground line-through mb-0.5">
                {formatCurrency(pkg.originalPrice)}
              </div>
            )}
            <div className="font-display font-bold text-lg text-primary">
              {formatCurrency(pkg.price)}
            </div>
            <div className="text-xs text-muted-foreground">per orang</div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href={`/package/${pkg.slug}`}>Lihat Detail</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
