"use client"

import { useEffect, useState } from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useToast } from "@/hooks/use-toast"

interface PayPalButtonProps {
  amount: string
  currency: string
  showSpinner?: boolean
  onSuccess?: (details: any) => void
}

export function PayPalButton({ amount, currency, showSpinner = true, onSuccess }: PayPalButtonProps) {
  const { toast } = useToast()
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    setScriptLoaded(true)
  }, [])

  // Read client ID from env – REQUIRED for both sandbox and live
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  if (!clientId) {
    // Fail fast if env is not set, instead of silently using "test" / sandbox
    if (typeof window !== "undefined") {
      console.error("Missing NEXT_PUBLIC_PAYPAL_CLIENT_ID for PayPal JS SDK")
    }
    return (
      <div className="py-4 text-center text-red-600">
        Payment configuration error. Please try again later.
      </div>
    )
  }

  const handleCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: currency,
          },
          description: "Astrological Consultation",
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    })
  }

  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      toast({
        title: "Payment Successful!",
        description: `Transaction completed by ${details.payer.name.given_name}. Thank you for your payment!`,
      })

      if (onSuccess) {
        onSuccess(details)
      }

      // TODO: here you can:
      // 1. Call your backend to store the order/payment
      // 2. Trigger email confirmations
      // 3. Navigate to a thank‑you page
    })
  }

  const handleError = (err: any) => {
    toast({
      title: "Payment Error",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
    console.error("PayPal error:", err)
  }

  if (!scriptLoaded) {
    return showSpinner ? <div className="py-4 text-center">Loading payment options...</div> : null
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,       // live or sandbox ID comes from env
        currency: currency,
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={handleError}
      />
    </PayPalScriptProvider>
  )
}
