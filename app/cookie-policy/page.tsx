import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | Akshathaa Ventures',
  description: 'Cookie Policy for Akshathaa Ventures.',
};

const S: React.CSSProperties = { fontFamily: 'var(--font-heading)' };
const B: React.CSSProperties = { fontFamily: 'var(--font-body)' };

export default function CookiePolicyPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: 'var(--black)', paddingTop: 120, paddingBottom: 64 }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--gold)', marginBottom: 20 }} />
          <h1 style={{ ...S, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Cookie Policy
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
              This Cookie Policy explains how Akshathaa Ventures uses cookies and similar technologies when you visit our website. It describes what these technologies are, why we use them, and your options for controlling them.
            </p>
          </div>

          {[
            {
              title: '1. What Are Cookies',
              body: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the site owner. Cookies do not contain personally identifiable information on their own, but they can be linked to personal data we hold about you.`,
            },
            {
              title: '2. Cookies We Use',
              body: `We use the following types of cookies on our website:\n\nEssential cookies: These are necessary for the website to function. They enable core features such as page navigation and access to secure areas. The site cannot function properly without them.\n\nAnalytics cookies: We use analytics tools to understand how visitors interact with our website. This helps us improve the user experience over time. The data collected is aggregated and anonymous.\n\nPreference cookies: These remember your choices and settings so we can provide a more personalised experience on return visits.`,
            },
            {
              title: '3. Third-Party Cookies',
              body: `Some cookies on our site are set by third-party services we use, such as analytics providers. These third parties have their own privacy policies and we do not control how they use the data they collect. We recommend reviewing the privacy policies of any third-party services you interact with.`,
            },
            {
              title: '4. Managing Cookies',
              body: `You can control and manage cookies in several ways. Most browsers allow you to refuse or delete cookies through their settings. Please note that disabling certain cookies may affect the functionality of our website.\n\nTo manage cookies in your browser, refer to the help documentation for your specific browser. Common options include blocking all cookies, blocking third-party cookies only, or clearing cookies when you close your browser.`,
            },
            {
              title: '5. Changes to This Policy',
              body: `We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. When we do, we will update the date at the top of this page.`,
            },
            {
              title: '6. Contact Us',
              body: `If you have questions about our use of cookies, please contact us at:\n\nAkshathaa Ventures\nBangalore, Karnataka, India\nEmail: info@akshathaaventures.com\nPhone: +91 98765 43210`,
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

          <div style={{ paddingTop: 16, borderTop: '1px solid var(--cream-mid)', display: 'flex', gap: 24 }}>
            <Link href="/privacy-policy" style={{ ...B, fontSize: 13, color: 'var(--gold)', letterSpacing: '0.04em' }}>
              Privacy Policy
            </Link>
            <Link href="/" style={{ ...B, fontSize: 13, color: 'var(--gold)', letterSpacing: '0.04em' }}>
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
