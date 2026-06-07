import { BRAND_NAME } from "@/lib/branding";
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SocialMediaIcons } from "@/components/social-media-icons"
import { HeroBackground } from "@/components/hero-background"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />

      <HeroBackground
        title="ABOUT US"
        description="Learn more about {BRAND_NAME} and our mission to guide you through life's journey"
      />

      <main className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm border border-purple-100 dark:border-purple-800">
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {BRAND_NAME} is recognized as the premier astrology consulting service provider in India. We are a mobile
              marketplace for astrology and its related advice services. We help customers hire trusted esoteric
              professionals for all their astrology needs.
            </p>

            <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              We have a team of young, passionate people working tirelessly to provide a trustworthy astrology
              experience by catering to their service needs wherever they are. Be it at home, or at work. Talk instantly
              to astrologers, tarot readers, vaastu experts, or numerologists.
            </p>

        

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Our mission is for our clients and partners alike to experience exceptional service, selection, quality
              and trust.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm border border-amber-100 dark:border-amber-900/50">
              <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-100">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To be the most trusted platform for astrological guidance, connecting individuals with authentic
                spiritual wisdom that transforms lives.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm border border-amber-100 dark:border-amber-900/50">
              <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-100">Our Values</h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500 dark:text-amber-400">✓</span>
                  <span>Authenticity in all astrological practices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500 dark:text-amber-400">✓</span>
                  <span>Respect for ancient wisdom and modern needs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500 dark:text-amber-400">✓</span>
                  <span>Integrity in every consultation</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm border border-amber-100 dark:border-amber-900/50">
              <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-100">Our Approach</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We combine traditional astrological knowledge with contemporary understanding to provide guidance that
                is relevant, practical, and transformative.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <SocialMediaIcons />
    </div>
  )
}
