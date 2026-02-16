'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { client } from '@/sanity/lib/client';

interface SiteSettings {
    logoText: string;
    logoAccent: string;
    footerDescription: string;
    siteName: string;
    socialLinks: {
        twitter?: string;
        facebook?: string;
        instagram?: string;
        github?: string;
    } | null;
}

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState<SiteSettings>({
        logoText: 'template',
        logoAccent: 'forge',
        footerDescription: 'Free website templates for your next project. Clean, modern, and easy to customize.',
        siteName: 'TemplateForge',
        socialLinks: null,
    });

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(`
                    *[_type == "siteSettings"][0] {
                        logoText, logoAccent, footerDescription, siteName, socialLinks
                    }
                `);
                if (data) {
                    setSettings({
                        logoText: data.logoText || 'template',
                        logoAccent: data.logoAccent || 'forge',
                        footerDescription: data.footerDescription || settings.footerDescription,
                        siteName: data.siteName || 'TemplateForge',
                        socialLinks: data.socialLinks || null,
                    });
                }
            } catch {
                // Use defaults
            }
        }
        fetchSettings();
    }, []);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerMain}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>{settings.logoText}</span>
                            <span className={styles.logoAccent}>{settings.logoAccent}</span>
                            <span className={styles.logoDot}>.</span>
                        </Link>
                        <p>{settings.footerDescription}</p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linkGroup}>
                        <h4>Templates</h4>
                        <nav>
                            <Link href="/templates">All Templates</Link>
                            <Link href="/templates?category=business">Business</Link>
                            <Link href="/templates?category=portfolio">Portfolio</Link>
                            <Link href="/templates?category=ecommerce">E-Commerce</Link>
                        </nav>
                    </div>

                    {/* Resources */}
                    <div className={styles.linkGroup}>
                        <h4>Resources</h4>
                        <nav>
                            <Link href="/blog">Blog</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact</Link>
                            <Link href="#">License</Link>
                        </nav>
                    </div>

                    {/* Social */}
                    <div className={styles.linkGroup}>
                        <h4>Follow Us</h4>
                        <nav>
                            <a href={settings.socialLinks?.twitter || '#'} target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href={settings.socialLinks?.facebook || '#'} target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href={settings.socialLinks?.instagram || '#'} target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href={settings.socialLinks?.github || '#'} target="_blank" rel="noopener noreferrer">GitHub</a>
                        </nav>
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.footerBottom}>
                    <p>&copy; {currentYear} {settings.siteName}. All rights reserved.</p>
                    <div className={styles.legal}>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
