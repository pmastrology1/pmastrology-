"use client"

import type React from "react"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SocialMediaIcons } from "@/components/social-media-icons"
import { PayPalButton } from "@/components/paypal-button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"

export default function KundaliReportPage() {
  const { toast } = useToast()
  const [showPayPal, setShowPayPal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("4.00")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    additionalNotes: "",
  })

  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)

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
      "additional-notes": "additionalNotes",
    }

    const field = fieldMap[id]
    if (field) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Check if payment screenshot is uploaded
  if (!paymentScreenshot) {
    toast({
      title: "Payment Screenshot Required",
      description: "Please upload your payment screenshot to proceed.",
      variant: "destructive",
    })
    return
  }

  setIsSubmitting(true)

  try {
    // Format birth date to DD-MM-YYYY
    let formattedDate = formData.birthDate
    if (formattedDate) {
      const [year, month, day] = formattedDate.split("-")
      formattedDate = `${day}-${month}-${year}`
    }

    const dataToSend = new FormData()
    dataToSend.append("firstName", formData.firstName)
    dataToSend.append("lastName", formData.lastName)
    dataToSend.append("email", formData.email)
    dataToSend.append("phone", formData.phone)
    dataToSend.append("birthDate", formattedDate)
    dataToSend.append("birthTime", formData.birthTime)
    dataToSend.append("birthPlace", formData.birthPlace)
    dataToSend.append("additionalNotes", formData.additionalNotes)
    dataToSend.append("paymentScreenshot", paymentScreenshot)

    const response = await fetch("/api/send-consultation-email", {
      method: "POST",
      body: dataToSend,
    })

    if (response.ok) {
      toast({
        title: "Request Submitted Successfully!",
        description: "Your Kundali report request has been sent. You’ll receive your report via email within 48 hours.",
      })

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        birthTime: "",
        birthPlace: "",
        additionalNotes: "",
      })
      setPaymentScreenshot(null)
    } else {
      throw new Error("Failed to send email")
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to submit request. Please try again or contact us directly.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}

  const handlePaymentSuccess = (details: any) => {
    toast({
      title: "Kundali Booked!",
      description:
        "Your Kundali is booked , we will mail you them shortly.",
    })
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />

      <HeroBackground
        title="ORDER YOUR KUNDALI & DETAILED ASTRO REPORT"
        description="Get your personalized Computer generated Kundali / Horoscope chart with complete detailed dasha sequence and all yogas just for 200 rupees"
      />

      <main className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Kundali Form */}
          <div className="mb-16 rounded-lg overflow-hidden shadow-lg border border-purple-100 dark:border-purple-800">
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 p-6 text-white">
              <h2 className="text-3xl font-bold text-center">Submit Details For Kundali Report</h2>
              <p className="text-center mt-2 opacity-90">
                Fill your accurate birth details to receive a complete and personalized report
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="first-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name
                      </label>
                      <Input
                        id="last-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="birth-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Birth Date
                      </label>
                      <Input
                        id="birth-date"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="birth-time" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Birth Time
                      </label>
                      <Input
                        id="birth-time"
                        type="time"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="birth-place" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Birth Place
                      </label>
                      <Input
                        id="birth-place"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label htmlFor="additional-notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Notes or Focus Areas
                    </label>
                    <Textarea
                      id="additional-notes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Mention if you want focus on career, marriage, finance, health, etc."
                      className="min-h-[120px]"
                    />
                  </div> */}

                  <div className="space-y-2">
                    <label htmlFor="payment-screenshot" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Screenshot <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="payment-screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 px-8 py-3 text-lg"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                      You’ll receive your report within 48 hours via email after successful payment.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-red-800 dark:text-red-400 md:text-4xl">
            Personalized Online Kundali / Horoscope Report
          </h1>
          <p className="mb-2 text-xl font-medium text-purple-700 dark:text-purple-300">
            Get Your Horoscope & Detailed Life Report
          </p>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Receive your computer-generated Kundali chart and a detailed PDF report of 150 pages covering all key aspects of life.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">


            {/* Indian Clients */}
            <div className="rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">For Clients in India</h2>
              <p className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                Pay via UPI (GPay, Paytm, PhonePe):
              </p>
              <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border">
                <p className="text-purple-700 dark:text-purple-300 font-bold text-lg text-center">astrok@ptyes</p>
              </div>
              <p className="text-center mb-4 text-gray-700 dark:text-gray-300 font-medium">
                Detailed Kundali Report:{" "}
                <span className="text-purple-700 dark:text-purple-300 font-bold">INR 200</span>
              </p>
              <div className="flex justify-center mb-4">
                <Image
                  src="/upi-qr-code.jpg"
                  alt="UPI QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Send payment screenshot to{" "}
                <a href="mailto:pmhoroscope@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                  pmhoroscope@gmail.com
                </a>
              </p>
              <p>Contact : +91 978477424 </p>
            </div>
                        {/* International Clients (PayPal) */}
            <div className="rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">
                For International Clients
              </h2>
              <div className="mb-6">
                <p className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                  Secure Payment via PayPal
                </p>
                <div className="mb-4">
                  <select
                    className="w-full rounded-md border p-2 dark:bg-gray-800 dark:text-white"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                  >
                    <option value="4.00">Detailed Kundali Report $4.00 USD</option>
                  </select>
                </div>

                {!showPayPal ? (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 mb-4"
                    onClick={() => setShowPayPal(true)}
                  >
                    Pay with PayPal
                  </Button>
                ) : (
                  <div className="mb-4">
                    <PayPalButton amount={selectedAmount} currency={selectedCurrency} onSuccess={handlePaymentSuccess} />
                    <Button variant="outline" className="w-full mt-2" onClick={() => setShowPayPal(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Image
                  src="/paypal-logo.jpg"
                  alt="PayPal"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="mt-12 rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">How It Works</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong>Fill Out the Form:</strong> Provide accurate birth details and email.</li>
              <li><strong>Complete Payment:</strong> Pay via PayPal or UPI to confirm your order.</li>
              <li><strong>Report Preparation:</strong> Our astrologer will analyze your chart.</li>
              <li><strong>Receive Your Report:</strong> You’ll receive a detailed PDF report via email within 5–7 days.</li>
            </ol>
          </div>
        </div>
      </main>

      <SiteFooter />
      <SocialMediaIcons />
    </div>
  )
}
