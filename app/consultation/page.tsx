"use client"

import type React from "react"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SocialMediaIcons } from "@/components/social-media-icons"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"

export default function ConsultationPage() {
  const { toast } = useToast()
  const [showPayPal, setShowPayPal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("25.00")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    questions: "",
    paymentScreenshot: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const fieldMap: { [key: string]: string } = {
      "first-name": "firstName",
      "last-name": "lastName",
      "email": "email",
      "phone": "phone",
      "birth-date": "birthDate",
      "birth-time": "birthTime",
      "birth-place": "birthPlace",
      "questions": "questions",
    }

    const field = fieldMap[id]
    if (field) {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formattedData = {
        ...formData,
        birthDate: formData.birthDate
          ? formData.birthDate.split("-").reverse().join("-")
          : "",
      }

      const body = new FormData()
      Object.entries(formattedData).forEach(([key, value]) => {
        if (key === "paymentScreenshot" && value) {
          body.append(key, value)
        } else {
          body.append(key, value as string)
        }
      })

      const response = await fetch("/api/send-consultation-email", {
        method: "POST",
        body,
      })

      if (response.ok) {
        toast({
          title: "Form Submitted Successfully!",
          description: "Your consultation request has been sent. We will contact you within 72 hours.",
        })

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          birthDate: "",
          birthTime: "",
          birthPlace: "",
          questions: "",
          paymentScreenshot: null,
        })
      } else {
        throw new Error("Failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form, please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />

      <HeroBackground
        title="BOOK A CONSULTATION"
        description="Schedule a personalized astrological consultation with our expert astrologers"
      />

      <main className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">

          {/* FORM */}
          <div className="mb-16 rounded-lg overflow-hidden shadow-lg border border-purple-100 dark:border-purple-800">
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 p-6 text-white">
              <h2 className="text-3xl font-bold text-center">Submit Request For Consultation</h2>
              <p className="text-center mt-2 opacity-90">Please provide your details for the consultation</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="first-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                      <Input id="last-name" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="birth-date" className="text-sm font-medium">Birth Date</label>
                      <Input id="birth-date" type="date" value={formData.birthDate} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="birth-time" className="text-sm font-medium">Birth Time</label>
                      <Input id="birth-time" type="time" value={formData.birthTime} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="birth-place" className="text-sm font-medium">Birth Place</label>
                      <Input id="birth-place" value={formData.birthPlace} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="questions" className="text-sm font-medium">Questions</label>
                    <Textarea
                      id="questions"
                      value={formData.questions}
                      onChange={handleInputChange}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* FILE UPLOAD */}
                  <div className="space-y-2">
                    <label htmlFor="payment-screenshot" className="text-sm font-medium">
                      Payment Screenshot
                    </label>
                    <Input id="payment-screenshot" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-red-800 md:text-4xl">
            30-45 MINUTES CONSULTATION VIA PHONE
          </h1>

          <div className="mt-12 grid gap-12 md:grid-cols-2">

            {/* INDIAN CLIENTS SECTION — SAME */}
            <div className="rounded-lg border p-6 shadow-md bg-white dark:bg-gray-900">
              <h2 className="mb-6 text-2xl font-bold">For Clients In India</h2>

              <p className="mb-2 font-medium">Transfer Using UPI ID:</p>

              <div className="p-3 bg-purple-50 rounded-lg border text-center">
                <p className="font-bold text-lg">astrok@ptyes</p>
              </div>

              <p className="mt-6 text-center font-medium">
                30-45 Minutes Phone Consultation:{" "}
                <span className="font-bold text-purple-700">INR 1,500</span>
              </p>

              <div className="flex justify-center my-4">
                <Image
                  src="/upi-qr-code.jpg"
                  alt="UPI QR"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>

              <p className="text-center text-sm">
                After payment send screenshot to{" "}
                <a href="mailto:pmhoroscope@gmail.com" className="text-purple-600">
                  pmhoroscope@gmail.com
                </a>
              </p>

              <p className="text-center">WhatsApp / UPI: +91 978477424</p>
            </div>

            {/* INTERNATIONAL CLIENTS SECTION */}
            <div className="rounded-lg border p-6 shadow-md bg-white dark:bg-gray-900">
              <h2 className="mb-6 text-2xl font-bold">For International Clients</h2>

              <p className="mb-4 font-medium">Secure Payment via PayPal</p>

              <select
                className="w-full rounded-md border p-2 mb-4"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(e.target.value)}
              >
                <option value="25.00">30-45 Minutes Consultation $25.00 USD</option>
              </select>

              {/* NEW PAYPAL BUTTON WITH LINK */}
              <a
                href="https://www.paypal.com/ncp/payment/NXE6UYDNTW3W2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 mb-4">
                  Pay with PayPal
                </Button>
              </a>

              <div className="flex justify-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Image
                    src="/paypal-logo.jpg"
                    alt="PayPal"
                    width={140}
                    height={40}
                  />
                </div>
              </div>

              <p className="text-sm text-center mt-2">
                PayPal accepts all major credit & debit cards worldwide.
              </p>
            </div>
          </div>

          {/* HOW IT WORKS — SAME */}
          <div className="mt-12 rounded-lg border p-6 shadow-md bg-white dark:bg-gray-900">
            <h2 className="mb-6 text-2xl font-bold">How It Works</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>Fill the consultation booking form.</li>
              <li>Complete payment using UPI or PayPal.</li>
              <li>We will contact you within 72 hours to schedule your call.</li>
              <li>Prepare your questions.</li>
              <li>You will receive your computer generated kundli within 5–7 days.</li>
            </ol>
          </div>

          {/* FINAL BUTTON */}
          <div className="mt-12 text-center">
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-6 text-lg"
              onClick={() => setShowPayPal(true)}
            >
              Book Your Consultation Now
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
      <SocialMediaIcons />
    </div>
  )
}
