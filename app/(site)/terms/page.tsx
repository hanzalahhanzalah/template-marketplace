import { Metadata } from 'next';
import styles from '../privacy-policy/page.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service | TemplateLayer',
    description: 'Read the TemplateLayer Terms of Service to understand the rules and conditions for using our website and templates.',
    alternates: {
        canonical: 'https://templatelayer.com/terms',
    },
};

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p>Last updated: July 7, 2025</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className="container">
                    <div className={styles.prose}>

                        <p>
                            Please read these Terms of Service (&quot;Terms&quot;) carefully before using{' '}
                            <a href="https://templatelayer.com">templatelayer.com</a> (the &quot;Site&quot;) operated by TemplateLayer
                            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using the Site, you agree to be bound by these Terms.
                            If you do not agree with any part of these Terms, you may not use the Site.
                        </p>

                        <h2>1. Use of the Website</h2>
                        <p>
                            You agree to use this website only for lawful purposes and in a manner that does not infringe the
                            rights of others. You must not use the site in any way that:
                        </p>
                        <ul>
                            <li>Violates any applicable local, national, or international law or regulation</li>
                            <li>Is fraudulent, harmful, threatening, abusive, or otherwise objectionable</li>
                            <li>Transmits any unsolicited or unauthorized advertising or promotional material (spam)</li>
                            <li>Attempts to gain unauthorized access to any part of the website or its related systems</li>
                        </ul>

                        <h2>2. Intellectual Property</h2>
                        <p>
                            All content on this website — including text, graphics, logos, blog articles, code snippets, and
                            template designs — is the property of TemplateLayer and is protected by applicable copyright and
                            intellectual property laws. You may not reproduce, distribute, or create derivative works from
                            any content on this site without our explicit written permission.
                        </p>

                        <h2>3. Template License</h2>
                        <p>
                            Templates available on TemplateLayer are provided under specific license terms outlined on each
                            product page and on our <a href="/license">License page</a>. By downloading or purchasing a
                            template, you agree to the applicable license terms.
                        </p>
                        <p>
                            Free templates are provided for personal and commercial use, unless otherwise stated. Premium
                            templates are licensed on a per-purchase basis. Reselling or redistributing templates as your own
                            is strictly prohibited.
                        </p>

                        <h2>4. Blog Content and Articles</h2>
                        <p>
                            The blog articles on TemplateLayer are provided for informational and educational purposes only.
                            We do our best to ensure accuracy, but we cannot guarantee that all information is current, complete,
                            or error-free. We are not responsible for any actions taken based on information found in our articles.
                        </p>

                        <h2>5. Third-Party Links and Affiliate Links</h2>
                        <p>
                            Our website contains links to third-party websites and services, some of which may be affiliate
                            links. We are not responsible for the content or practices of linked websites. The inclusion of
                            any link does not imply our endorsement of the linked site.
                        </p>

                        <h2>6. Advertising</h2>
                        <p>
                            TemplateLayer displays advertisements served by Google AdSense and potentially other advertising
                            networks. These advertisements are provided by third parties and we are not responsible for their
                            content. Clicking on advertisements is at your own discretion.
                        </p>

                        <h2>7. Disclaimer of Warranties</h2>
                        <p>
                            This website and all its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any
                            warranties of any kind, either express or implied. We do not warrant that the website will be
                            uninterrupted, error-free, or free of viruses or other harmful components.
                        </p>

                        <h2>8. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, TemplateLayer shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages arising from your use of the website,
                            its content, or templates — even if we have been advised of the possibility of such damages.
                        </p>

                        <h2>9. Privacy</h2>
                        <p>
                            Your use of this website is also governed by our{' '}
                            <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.
                            Please review our Privacy Policy to understand our practices.
                        </p>

                        <h2>10. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                            posting to the website. Your continued use of the site after changes are posted constitutes your
                            acceptance of the revised Terms.
                        </p>

                        <h2>11. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
                            arising under these Terms shall be subject to the exclusive jurisdiction of the relevant courts.
                        </p>

                        <h2>12. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> <a href="mailto:info@templatelayer.com">info@templatelayer.com</a></li>
                            <li><strong>Contact page:</strong> <a href="https://templatelayer.com/contact">templatelayer.com/contact</a></li>
                        </ul>

                    </div>
                </div>
            </section>
        </div>
    );
}
