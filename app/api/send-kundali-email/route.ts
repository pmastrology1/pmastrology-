import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    // 1️⃣ Parse form data (works for file uploads)
    const formData = await request.formData()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const birthDate = formData.get("birthDate") as string
    const birthTime = formData.get("birthTime") as string
    const birthPlace = formData.get("birthPlace") as string
    const questions = formData.get("questions") as string
    const paymentScreenshot = formData.get("paymentScreenshot") as File | null

    // 2️⃣ Prepare email text
    const message = `
New Kundali Request:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Birth Details:
- Date: ${birthDate}
- Time: ${birthTime}
- Place: ${birthPlace}

Questions / Notes:
${questions || "N/A"}
    `

    // 3️⃣ Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 4️⃣ Create mail options
    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: "New Horoscope Report Request",
      text: message,
    }

    // 5️⃣ If payment screenshot is attached, convert to Buffer & attach
    if (paymentScreenshot) {
      const arrayBuffer = await paymentScreenshot.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      mailOptions.attachments = [
        {
          filename: paymentScreenshot.name,
          content: buffer,
        },
      ]
    }

    // 6️⃣ Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully!" })
  } catch (error: any) {
    console.error("❌ Error sending email:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send email", error: error.message },
      { status: 500 }
    )
  }
}
