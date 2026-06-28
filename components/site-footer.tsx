import Link from "next/link";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "Tentang Kami", href: "/about" },
    { name: "Karir", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Pusat Bantuan", href: "/faq" },
    { name: "Hubungi Kami", href: "/contact" },
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy-policy" },
  ],
  categories: [
    { name: "Umrah", href: "/search?category=umrah" },
    { name: "Haji Khusus", href: "/search?category=haji-khusus" },
    { name: "Tour Domestik", href: "/search?category=tour-domestik" },
    { name: "Tour Internasional", href: "/search?category=tour-internasional" },
    { name: "Wisata Halal", href: "/search?category=wisata-halal" },
  ],
  partner: [
    { name: "Daftar Partner", href: "/partner/register" },
    { name: "Partner Dashboard", href: "/partner" },
    { name: "Panduan Partner", href: "/partner/guide" },
    { name: "Partner Support", href: "/partner/support" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Dapatkan Penawaran Terbaik
              </h3>
              <p className="text-slate-400">
                Subscribe untuk mendapatkan promo dan info paket perjalanan
                terbaru.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex h-11 w-full sm:w-72 rounded-xl border border-slate-700 bg-slate-800 px-4 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Cahaya <span className="text-accent">Imani</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Marketplace Umrah, Tour & Travel terpercaya di Indonesia. Temukan
              paket perjalanan terbaik dengan harga kompetitif dan pelayanan
              premium.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@cahayaimani.id</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Jl. Asia Afrika No. 112 Bandung, Jawa Barat 40111, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kategori</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Partner</h4>
            <ul className="space-y-3">
              {footerLinks.partner.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2024 Cahaya Imani. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
