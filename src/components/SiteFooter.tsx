import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">GF Shop</h2>
            <p className="text-secondary-foreground/80">
              GF Shope – Your go-to destination for quality products at
              unbeatable prices. From fashion to daily essentials, we bring you
              the best for less.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore More</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  Mirpur-1, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  info.jhshakil@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  +8801851891846
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-6">
          <div className="flex justify-center items-center gap-4">
            <p className="text-sm text-secondary-foreground/70">
              © 2024 <span className="text-primary font-medium">funcraft</span>.
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
