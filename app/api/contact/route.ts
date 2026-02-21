import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write-client';
import { Resend } from 'resend';


export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // 1. Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // 2. Save to Sanity
        console.log('--- Contact API Debug ---');
        console.log('Saving to Sanity...');
        const sanityDoc = await writeClient.create({
            _type: 'contactMessage',
            name,
            email,
            subject,
            message,
            receivedAt: new Date().toISOString(),
        });
        console.log('Sanity saved successfully:', sanityDoc._id);

        // 3. Send Email Notification (Non-blocking)
        if (process.env.RESEND_API_KEY) {
            try {
                console.log('Sending email via Resend to:', process.env.CONTACT_RECIPIENT_EMAIL);
                const res = await resend.emails.send({
                    from: 'TemplateForge <onboarding@resend.dev>',
                    to: process.env.CONTACT_RECIPIENT_EMAIL || 'hello@templateforge.com',
                    subject: `New Contact Message: ${subject}`,
                    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
                });
                console.log('Resend response:', res);
            } catch (emailError) {
                console.error('Email notification failed but Sanity save was successful:', emailError);
            }
        } else {
            console.log('RESEND_API_KEY is missing, skipping email.');
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Core Contact API Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
