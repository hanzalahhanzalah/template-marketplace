'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully.');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setMessage(result.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Failed to send message. Please check your connection.');
        }
    }

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" id="name" placeholder="Your name" required disabled={status === 'loading'} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" id="email" placeholder="your@email.com" required disabled={status === 'loading'} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <select name="subject" id="subject" required defaultValue="" disabled={status === 'loading'}>
                    <option value="" disabled>Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="custom">Custom Development</option>
                    <option value="partnership">Partnership</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows={6} placeholder="Your message..." required disabled={status === 'loading'}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {message && (
                <div className={`${styles.alert} ${status === 'success' ? styles.alertSuccess : styles.alertError}`}>
                    {message}
                </div>
            )}
        </form>
    );
}
