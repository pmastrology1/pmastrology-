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

export default function ConsultationPage() {
  const { toast } = useToast()
  const [showPayPal, setShowPayPal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("25.00")
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
    questions: "",
    paymentScreenshot: null as File | null, // new field
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
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
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
      // Format birth date DD-MM-YYYY
      const formattedData = {
        ...formData,
        birthDate: formData.birthDate
          ? formData.birthDate.split("-").reverse().join("-")
          : "",
      }

      // Create FormData to handle file upload
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

        // Reset form
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
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = (details: any) => {
    toast({
      title: "Consultation Booked!",
      description:
        "Your consultation has been booked successfully. We will contact you shortly to schedule your session.",
    })
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
          {/* Consultation Form */}
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
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
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

                  <div className="space-y-2">
                    <label htmlFor="questions" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Questions or Areas of Interest
                    </label>
                    <Textarea
                      id="questions"
                      value={formData.questions}
                      onChange={handleInputChange}
                      placeholder="Please describe what you'd like to discuss during your consultation..."
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Payment Screenshot Upload */}
                  <div className="space-y-2">
                    <label htmlFor="payment-screenshot" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Screenshot 
                    </label>
                    <Input
                      id="payment-screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 px-8 py-3 text-lg"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                      After submitting, we'll contact you within 72 hours to schedule your consultation.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* ----------------------- */}
          {/* Keep all sections below exactly as your original code */}
          {/* UPI & PayPal sections, How It Works, steps, buttons, images */}
          {/* ----------------------- */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-red-800 dark:text-red-400 md:text-4xl">
            30-45 MINUTES CONSULTATION VIA PHONE
          </h1>
          <p className="mb-2 text-xl font-medium text-purple-700 dark:text-purple-300">Cosmic Guidance Session</p>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Have questions about your life?</p>

          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Together we go deeper into understanding who you are at a Body, Mind & Soul level. Answering all your
            questions based on your Birth Chart and Current Transits.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
 

            {/* Indian Clients */}
            <div className="rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">For Clients In India</h2>
              <div className="mb-6">
                <p className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                  Transfer Using UPI ID (GPay, Paytm, PhonePe, YONO SBI):
                </p>
                <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-purple-700 dark:text-purple-300 font-bold text-lg text-center">astrok@ptyes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                    Copy this UPI ID for payment
                  </p>
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300 text-center font-medium">
                  30-45 Minutes Phone Consultation:{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-bold">INR 1,500</span>
                </p>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Image
                      src="/upi-qr-code.jpg"
                      alt="UPI QR Code for Payment"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">Scan QR code to pay</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    After payment, please send a screenshot to{" "}
                    <a
                      href="mailto:pmhoroscope@gmail.com"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      pmhoroscope@gmail.com
                    </a>
                  </p>
                  <p>Contact : +91 978477424 </p>
                </div>
              </div>
            </div>
                       {/* International Clients */}
            <div className="rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">
                For International Clients
              </h2>
              <div className="mb-6">
                <p className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">Secure Payment via PayPal</p>
                <div className="mb-4">
                  <select
                    className="w-full rounded-md border border-purple-200 dark:border-purple-800 p-2 focus:border-purple-400 dark:focus:border-purple-700 dark:bg-gray-800 dark:text-white"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                  >
                    <option value="25.00">30-45 Minutes Consultation $25.00 USD</option>
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
                    <PayPalButton
                      amount={selectedAmount}
                      currency={selectedCurrency}
                      onSuccess={handlePaymentSuccess}
                    />
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-purple-200 dark:border-purple-800"
                      onClick={() => setShowPayPal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Image
                    src="/paypal-logo.jpg"
                    alt="PayPal - Secure Payment"
                    width={140}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">Secure & Trusted Payment</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PayPal accepts all major credit cards and debit cards worldwide
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-900 p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-purple-900 dark:text-purple-100">How It Works</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-900 dark:text-purple-100">Fill Out the Form:</span> Complete
                the consultation booking form above with your details and questions.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-900 dark:text-purple-100">Complete Payment:</span> Choose your
                preferred payment method and complete the transaction.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-900 dark:text-purple-100">Schedule Your Call:</span> We will
                contact you within 72 hours to schedule your consultation at a time convenient for you.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-900 dark:text-purple-100">Prepare Your Questions:</span> Make a
                list of questions or concerns you'd like to address during your session.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-900 dark:text-purple-100">Receive Your Report:</span> After
                your consultation, you'll receive your detailed computer generated kundli via email within 5-7 business days.
              </li>
            </ol>
          </div>

          {/* Final Book Button */}
          <div className="mt-12 text-center">
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 dark:from-purple-600 dark:to-purple-900 px-8 py-6 text-lg"
              onClick={() => {
                window.scrollTo({
                  top: document.querySelector(".mt-12.grid")?.getBoundingClientRect().top,
                  behavior: "smooth",
                })
                setShowPayPal(true)
              }}
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
