import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend only if API key is provided
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save the message to the database
    const { error: dbError } = await supabase
      .from('messages')
      .insert([{
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        status: 'new' as const,
      }]);

    if (dbError) {
      console.error('Error saving message to database:', dbError);
    }

    // Send email notification using Resend
    if (resend && process.env.CONTACT_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL,
          subject: `New Contact Form Message from ${name}`,
          text: `
Name: ${name}
Email: ${email}

Message:
${message}
          `,
          html: `
<h2>New Contact Form Message</h2>
<p><strong>From:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<br>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails, as message is saved in DB
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
