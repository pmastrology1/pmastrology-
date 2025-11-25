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
  const [selectedAmount, setSelectedAmount] = useState("25.00")
  const [selectedCurrency] = useState("USD")
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
      description: "Your consultation has been booked successfully. We will contact you shortly to schedule your session.",
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
