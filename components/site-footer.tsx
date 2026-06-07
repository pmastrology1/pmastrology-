import { BRAND_NAME, BRAND_NAME_UPPER } from "@/lib/branding";
import Link from "next/link"
import { Sun } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-purple-100 dark:border-purple-900 bg-white dark:bg-gray-950 py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-purple-400 opacity-80"></div>
                <Sun className="relative h-8 w-8 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-wide text-purple-900 dark:text-purple-100">
                {BRAND_NAME_UPPER}
              </span>
            </Link>
            <p className="mt-4 text-sm text-purple-700 dark:text-purple-300">
              Illuminating paths and guiding journeys through the cosmic wisdom of astrology.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-purple-900 dark:text-purple-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/#services" },
                { name: "Packages", path: "/#packages" },
                { name: "Gallery", path: "/#gallery" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-purple-700 dark:text-purple-300 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-purple-900 dark:text-purple-100">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Personal Horoscope",
                "Relationship Compatibility",
                "Career Guidance",
                "Gemstone Consultation",
                "Vastu Guidance",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-purple-700 dark:text-purple-300 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-purple-900 dark:text-purple-100">Contact</h3>
            <address className="not-italic text-sm text-purple-700 dark:text-purple-300">
              
              <p className="mb-2">Jaipur, Rajasthan</p>
              <p className="mb-2">India</p>
              <p className="mb-2">Email: pmhoroscope@gmail.com</p>
              <p>Phone: +91 9784777424</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-purple-100 dark:border-purple-900 pt-8 text-center text-sm text-purple-700 dark:text-purple-300">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
