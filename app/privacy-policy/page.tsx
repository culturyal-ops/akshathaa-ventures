import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Akshathaa Ventures',
  description: 'Privacy Policy for Akshathaa Ventures.',
};

const S: React.CSSProperties = { fontFamily: 'var(--font-heading)' };
const B: React.CSSProperties = { fontFamily: 'var(--font-body)' };

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: 'var(--black)', paddingTop: 120, paddingBottom: 64 }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--gold)', marginBottom: 20 }} />
          <h1 style={{ ...S, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
          <p style={{ ...B, fontSize: 14, color: 'rgba(248,245,240,0.45)', marginTop: 16 }}>
            Last updated: 31 May 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'var(--sp-15) var(--gutter)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div>
            <p style={{ ...B, fontSize: 16, lineHeight: 1.8, color: 'var(--slate)' }}>
              Akshathaa Ventures ("we", "us", or "our") is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights in relation to it.
            </p>
          </div>

          {[
            {
              title: '1. Information We Collect',
              body: `We collect information you provide directly to us, including your name, phone number, email address, and any details you share when submitting an enquiry through our website or contacting us directly.\n\nWe also collect certain technical data automatically when you visit our site, such as your IP address, browser type, pages visited, and the time and date of your visit. This data is collected through standard server logs and analytics tools.`,
            },
            {
              title: '2. How We Use Your Information',
              body: `We use the information we collect to respond to your enquiries, provide property recommendations, and communicate with you about our services. We may also use your contact details to send you updates about new listings or relevant market information, but only where you have given us permission to do so.\n\nWe do not sell, rent, or share your personal information with third parties for their own marketing purposes.`,
            },
            {
              title: '3. Data Storage and Security',
              body: `Your data is stored securely using industry-standard measures. We use Supabase as our database provider, which maintains appropriate technical and organisational safeguards. While no system is completely immune to risk, we take reasonable steps to protect your information from unauthorised access, loss, or misuse.`,
            },
            {
              title: '4. Cookies',
              body: `Our website uses cookies to improve your browsing experience and understand how visitors use our site. For full details on the cookies we use and how to manage them, please read our Cookie Policy.`,
            },
            {
              title: '5. Your Rights',
              body: `You have the right to access the personal information we hold about you, request corrections, or ask us to delete it. You may also withdraw consent for marketing communications at any time by contacting us directly.\n\nTo exercise any of these rights, please email us at info@akshathaaventures.com.`,
            },
            {
              title: '6. Third-Party Links',
              body: `Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.`,
            },
            {
              title: '7. Changes to This Policy',
              body: `We may update this policy from time to time. When we do, we will revise the "last updated" date at the top of this page. Continued use of our website after any changes constitutes your acceptance of the updated policy.`,
            },
            {
              title: '8. Contact Us',
              body: `If you have any questions about this policy or how we handle your data, please contact us at:\n\nAkshathaa Ventures\nBangalore, Karnataka, India\nEmail: info@akshathaaventures.com\nPhone: +91 98765 43210`,
            },
          ].map(section => (
            <div key={section.title}>
              <h2 style={{ ...S, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400, color: 'var(--ink)', marginBottom: 16, letterSpacing: '-0.01em' }}>
                {section.title}
              </h2>
              {section.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ ...B, fontSize: 15, lineHeight: 1.8, color: 'var(--slate)', marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div style={{ paddingTop: 16, borderTop: '1px solid var(--cream-mid)' }}>
            <Link href="/" style={{ ...B, fontSize: 13, color: 'var(--gold)', letterSpacing: '0.04em' }}>
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
