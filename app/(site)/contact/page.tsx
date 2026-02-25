import { Metadata } from 'next';
import { getFAQs } from '@/sanity/lib/queries';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Contact | TemplateForge - Get in Touch',
    description: 'Have questions about our templates? Get in touch with the TemplateForge team.',
};

const contactMethods = [
    {
        title: 'Email Us',
        description: 'For general inquiries and support',
        value: 'hello@templateforge.com',
        link: 'mailto:hello@templateforge.com',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
            </svg>
        ),
    },
    {
        title: 'Live Chat',
        description: 'Available Monday to Friday, 9am-6pm',
        value: 'Start a conversation',
        link: '#',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
    },
    {
        title: 'Twitter',
        description: 'Follow us for updates',
        value: '@templateforge',
        link: '#',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
        ),
    },
];

const fallbackFaqs = [
    { question: 'Do you offer refunds?', answer: 'Yes, we offer a 14-day money-back guarantee on all purchases through our partnered platforms.' },
    { question: 'Can I use templates for commercial projects?', answer: 'Absolutely! All our templates come with a commercial license that allows you to use them for client projects.' },
    { question: 'Do you offer customization services?', answer: 'Yes, we offer custom development services. Contact us with your requirements for a quote.' },
    { question: 'How often are templates updated?', answer: 'We regularly update our templates to ensure compatibility with the latest browsers and web standards.' },
];

export default async function ContactPage() {
    let faqs;
    try {
        const sanityFaqs = await getFAQs('contact');
        faqs = sanityFaqs?.length > 0 ? sanityFaqs : fallbackFaqs;
    } catch {
        faqs = fallbackFaqs;
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>Have questions about our templates? We&apos;d love to hear from you.</p>
                </div>
            </section>

            {/* Contact Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formWrapper}>
                        <div className={styles.formHeader}>
                            <h2>Send a Message</h2>
                            <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`section ${styles.faq}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to common questions.</p>
                    </div>

                    <div className={styles.faqList}>
                        {faqs.map((faq: { question: string; answer: string }) => (
                            <div key={faq.question} className={styles.faqItem}>
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
