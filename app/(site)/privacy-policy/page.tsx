import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy | TemplateLayer',
    description: 'Read the TemplateLayer Privacy Policy to understand how we collect, use, and protect your personal information.',
    alternates: {
        canonical: 'https://templatelayer.com/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = 'July 7, 2025';

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: {lastUpdated}</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className="container">
                    <div className={styles.prose}>

                        <p>
                            Welcome to TemplateLayer (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our website{' '}
                            <a href="https://templatelayer.com">templatelayer.com</a>. Please read this policy carefully.
                            If you disagree with its terms, please discontinue use of the site.
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways including:</p>
                        <h3>Personal Data</h3>
                        <p>
                            When you use our contact form, we collect your name, email address, and the message you submit.
                            This information is used solely to respond to your inquiry.
                        </p>
                        <h3>Usage Data</h3>
                        <p>
                            We automatically collect certain information when you visit our website, including your IP address,
                            browser type, operating system, referring URLs, pages viewed, and the time and date of your visit.
                            This data is collected via analytics tools (such as Google Analytics) to help us understand how
                            visitors use our site.
                        </p>
                        <h3>Cookies and Tracking Technologies</h3>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our website. Cookies are small
                            data files stored on your device. You can instruct your browser to refuse all cookies or to indicate
                            when a cookie is being sent. However, if you do not accept cookies, some portions of our site may
                            not function properly.
                        </p>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Respond to your messages and inquiries submitted via the contact form</li>
                            <li>Improve and optimize our website content and user experience</li>
                            <li>Analyze usage patterns and site performance via analytics</li>
                            <li>Display relevant advertisements through Google AdSense</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2>3. Google AdSense and Advertising</h2>
                        <p>
                            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to
                            serve ads based on your prior visits to our website or other websites. Google&apos;s use of advertising
                            cookies enables it and its partners to serve ads based on your visit to our site and/or other sites
                            on the Internet.
                        </p>
                        <p>
                            You may opt out of personalized advertising by visiting{' '}
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                                Google Ads Settings
                            </a>
                            . For more information on how Google uses data from sites that use its services, visit:{' '}
                            <a
                                href="https://policies.google.com/technologies/partner-sites"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Privacy & Terms
                            </a>
                            .
                        </p>

                        <h2>4. Google Analytics</h2>
                        <p>
                            We use Google Analytics to analyze the use of our website. Google Analytics gathers information
                            about website use by means of cookies. The information gathered is used to create reports about
                            the use of our website. Google&apos;s privacy policy is available at:{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                                https://policies.google.com/privacy
                            </a>
                            .
                        </p>

                        <h2>5. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites, including template marketplaces and hosting
                            providers. We have no control over the content, privacy policies, or practices of any third-party
                            sites. We encourage you to review the privacy policy of every site you visit.
                        </p>

                        <h2>6. Affiliate Links</h2>
                        <p>
                            Some links on TemplateLayer may be affiliate links. This means we may earn a commission if you
                            click on a link and make a purchase, at no additional cost to you. We only recommend products and
                            services we genuinely believe in.
                        </p>

                        <h2>7. Data Retention</h2>
                        <p>
                            We retain personal data (such as contact form submissions) only as long as necessary to fulfill
                            the purpose for which it was collected, or as required by law. Analytics data is retained according
                            to Google Analytics default retention settings.
                        </p>

                        <h2>8. Your Rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Object to or restrict our processing of your data</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at{' '}
                            <a href="mailto:info@templatelayer.com">info@templatelayer.com</a>.
                        </p>

                        <h2>9. Children&apos;s Privacy</h2>
                        <p>
                            Our website is not directed to children under the age of 13. We do not knowingly collect personal
                            information from children under 13. If you are a parent or guardian and believe your child has
                            provided us with personal information, please contact us immediately.
                        </p>

                        <h2>10. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by updating
                            the &quot;Last updated&quot; date at the top of this page. Your continued use of our website after any
                            changes constitutes your acceptance of the updated policy.
                        </p>

                        <h2>11. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> <a href="mailto:info@templatelayer.com">info@templatelayer.com</a></li>
                            <li><strong>Website:</strong> <a href="https://templatelayer.com/contact">templatelayer.com/contact</a></li>
                        </ul>

                    </div>
                </div>
            </section>
        </div>
    );
}
