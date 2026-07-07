import { Metadata } from 'next';
import styles from '../privacy-policy/page.module.css';

export const metadata: Metadata = {
    title: 'Disclaimer | TemplateLayer',
    description: 'Read the TemplateLayer disclaimer regarding the accuracy of information, affiliate links, and external website content.',
    alternates: {
        canonical: 'https://templatelayer.com/disclaimer',
    },
};

export default function DisclaimerPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className="container">
                    <h1>Disclaimer</h1>
                    <p>Last updated: July 7, 2025</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className="container">
                    <div className={styles.prose}>

                        <p>
                            The information provided on TemplateLayer (<a href="https://templatelayer.com">templatelayer.com</a>) is for
                            general informational and educational purposes only. All information on the site is provided in good faith,
                            however we make no representation or warranty of any kind, express or implied, regarding the accuracy,
                            adequacy, validity, reliability, availability, or completeness of any information on the site.
                        </p>

                        <h2>1. No Professional Advice</h2>
                        <p>
                            The content published on this website — including blog articles, tutorials, reviews, and guides — is for
                            general informational purposes only. It does not constitute professional advice of any kind (technical,
                            legal, financial, or otherwise). Always seek the advice of a qualified professional before making any
                            decisions based on information found on this website.
                        </p>

                        <h2>2. Affiliate Disclaimer</h2>
                        <p>
                            TemplateLayer participates in affiliate marketing programs. This means that some of the links on our
                            website are affiliate links. If you click on an affiliate link and make a purchase, we may earn a small
                            commission at no additional cost to you.
                        </p>
                        <p>
                            We only recommend products and services that we genuinely believe offer value to our readers. Our
                            editorial opinions are not influenced by affiliate relationships. All affiliate links are clearly used
                            in the context of honest reviews and recommendations.
                        </p>

                        <h2>3. Google AdSense Disclaimer</h2>
                        <p>
                            This website uses Google AdSense to display advertisements. Google AdSense is a third-party advertising
                            service provided by Google LLC. We do not control the content of advertisements displayed on this site.
                            The appearance of an advertisement does not constitute an endorsement of the advertised product or service
                            by TemplateLayer.
                        </p>

                        <h2>4. External Links Disclaimer</h2>
                        <p>
                            Our website may contain links to external websites that are not operated by us. We have no control
                            over the content, privacy policies, or practices of any third-party websites and accept no responsibility
                            for them. We encourage you to review the terms and privacy policies of any third-party site you visit.
                        </p>

                        <h2>5. Template Usage Disclaimer</h2>
                        <p>
                            All website templates available on TemplateLayer are provided &quot;as is&quot; without warranty of any kind.
                            We do not guarantee that templates will meet your specific requirements, that they will be error-free,
                            or that defects will be corrected. You are responsible for testing any template before using it in a
                            production environment.
                        </p>
                        <p>
                            Templates are built and tested in modern browsers. We do not guarantee compatibility with all browsers,
                            devices, or operating systems. Please refer to each template&apos;s description for specific compatibility
                            information.
                        </p>

                        <h2>6. Reviews and Comparisons</h2>
                        <p>
                            Our blog articles may include reviews and comparisons of third-party products and services (such as web
                            hosting providers, website builders, and web design tools). These reviews represent our honest opinion
                            based on our research and experience. Products and services change over time, and we cannot guarantee
                            that information in our articles is current. Always verify pricing, features, and availability directly
                            with the product provider before purchasing.
                        </p>

                        <h2>7. Errors and Omissions</h2>
                        <p>
                            While we strive to keep our content accurate and up to date, we make no guarantees about the completeness,
                            accuracy, reliability, suitability, or availability of any information on this website. Any reliance you
                            place on such information is therefore strictly at your own risk.
                        </p>

                        <h2>8. Changes to This Disclaimer</h2>
                        <p>
                            We reserve the right to update this Disclaimer at any time. Changes will be reflected by updating the
                            &quot;Last updated&quot; date at the top of this page. Your continued use of the website following any changes
                            constitutes your acceptance of the updated Disclaimer.
                        </p>

                        <h2>9. Contact Us</h2>
                        <p>
                            If you have any questions about this Disclaimer, please contact us:
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
