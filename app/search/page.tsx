'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Search, SlidersHorizontal, MapPin, Calendar, Clock, Hotel, Plane, ChevronDown, X, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PackageCard } from '@/components/package-card';
import { packages, formatCurrency } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

const categories = Object.entries(categoryLabels);
const departureCities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Makassar', 'Medan'];
const airlines = ['Saudi Arabian Airlines', 'Garuda Indonesia', 'Turkish Airlines', 'Emirates', 'All Nippon Airways'];
const hotelRatings = [5, 4, 3];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<string>('');
  const [priceRange, setPriceRange] = useState([0, 200000000]);
  const [durationRange, setDurationRange] = useState([1, 45]);
  const [selectedHotelRating, setSelectedHotelRating] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = useMemo(() => {
    let result = [...packages];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg =>
        pkg.name.toLowerCase().includes(query) ||
        pkg.destination.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(pkg => selectedCategories.includes(pkg.category));
    }

    // Departure city filter
    if (selectedDepartureCity) {
      result = result.filter(pkg => pkg.departureCity === selectedDepartureCity);
    }

    // Price filter
    result = result.filter(pkg => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]);

    // Duration filter
    result = result.filter(pkg => pkg.duration >= durationRange[0] && pkg.duration <= durationRange[1]);

    // Hotel rating filter
    if (selectedHotelRating.length > 0) {
      result = result.filter(pkg => selectedHotelRating.includes(pkg.hotelRating));
    }

    // Airline filter
    if (selectedAirlines.length > 0) {
      result = result.filter(pkg => selectedAirlines.includes(pkg.airline));
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'departure':
        result.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        break;
      default:
        // popularity based on total reviews
        result.sort((a, b) => b.totalReviews - a.totalReviews);
    }

    return result;
  }, [searchQuery, selectedCategories, selectedDepartureCity, priceRange, durationRange, selectedHotelRating, selectedAirlines, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDepartureCity('');
    setPriceRange([0, 200000000]);
    setDurationRange([1, 45]);
    setSelectedHotelRating([]);
    setSelectedAirlines([]);
  };

  const activeFiltersCount = selectedCategories.length +
    (selectedDepartureCity ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200000000 ? 1 : 0) +
    (durationRange[0] > 1 || durationRange[1] < 45 ? 1 : 0) +
    selectedHotelRating.length +
    selectedAirlines.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="category" className="w-full">
        <AccordionItem value="category" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="font-semibold">Kategori</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map(([slug, label]) => (
                <label key={slug} className="flex items-center space-x-3 cursor-pointer">
                  <Checkbox
                    checked={selectedCategories.includes(slug)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, slug]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== slug));
                      }
                    }}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Departure City */}
      <div>
        <Label className="font-semibold mb-3 block">Kota Keberangkatan</Label>
        <Select value={selectedDepartureCity} onValueChange={setSelectedDepartureCity}>
          <SelectTrigger>
            <SelectValue placeholder="Semua Kota" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Kota</SelectItem>
            {departureCities.map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="font-semibold mb-3 block">
          Rentang Harga
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200000000}
            step={1000000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>{formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <Label className="font-semibold mb-3 block">
          Durasi (Hari)
        </Label>
        <div className="px-2">
          <Slider
            value={durationRange}
            onValueChange={setDurationRange}
            min={1}
            max={45}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{durationRange[0]} Hari</span>
            <span>{durationRange[1]} Hari</span>
          </div>
        </div>
      </div>

      {/* Hotel Rating */}
      <div>
        <Label className="font-semibold mb-3 block">Rating Hotel</Label>
        <div className="flex gap-2">
          {hotelRatings.map((rating) => (
            <button
              key={rating}
              onClick={() => {
                if (selectedHotelRating.includes(rating)) {
                  setSelectedHotelRating(selectedHotelRating.filter(r => r !== rating));
                } else {
                  setSelectedHotelRating([...selectedHotelRating, rating]);
                }
              }}
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors',
                selectedHotelRating.includes(rating)
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Hotel className="h-4 w-4" />
              <span className="text-sm font-medium">{rating}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="airline" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="font-semibold">Maskapai</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {airlines.map((airline) => (
                <label key={airline} className="flex items-center space-x-3 cursor-pointer">
                  <Checkbox
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAirlines([...selectedAirlines, airline]);
                      } else {
                        setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                      }
                    }}
                  />
                  <span className="text-sm">{airline}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearAllFilters}>
          Hapus Semua Filter ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-teal-700 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Temukan Paket Perjalanan Anda
          </h1>
          <p className="text-white/80 mb-6">
            Jelajahi ratusan paket umrah, tour, dan wisata halal dari travel terpercaya.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama, tujuan, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white text-foreground border-0 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Active Filters & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {activeFiltersCount > 0 && (
              <>
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {categoryLabels[cat]}
                    <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedDepartureCity && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedDepartureCity}
                    <button onClick={() => setSelectedDepartureCity('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Hapus Semua
                </Button>
              </>
            )}
            <span className="text-sm text-muted-foreground">
              {filteredPackages.length} paket ditemukan
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-primary text-white">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter</SheetTitle>
                  <SheetDescription>
                    Sesuaikan hasil pencarian dengan preferensi Anda.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Terpopuler</SelectItem>
                <SelectItem value="price-asc">Harga Terendah</SelectItem>
                <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="departure">Keberangkatan Terdekat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-5 sticky top-20">
              <h3 className="font-semibold text-lg mb-4">Filter</h3>
              <FilterContent />
            </Card>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Tidak ada paket ditemukan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Coba ubah filter atau kata kunci pencarian Anda.
                </p>
                <Button onClick={clearAllFilters}>Hapus Semua Filter</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
