import React from "react";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mt-8 mb-3">{title}</h2>
    <div className="text-white/80 space-y-3 leading-relaxed">{children}</div>
  </div>
);

export const PrivacyPolicyPage: React.FC = () => (
  <div className="container mx-auto px-6 py-12 max-w-4xl">
    <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
    <p className="text-white/50 text-sm mb-8">Last updated: April 6, 2026</p>

    <div className="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-10 space-y-2">
      <p>
        Welcome to GearShare ("we", "us", "our"). This Privacy Policy explains how we collect, use, disclose,
        and safeguard information when you use our web application at gearshare.site. Please read this policy
        carefully. If you disagree with its terms, please discontinue use of the application.
      </p>

      <Section title="1. Information We Collect">
        <p><strong className="text-white">Personal Data.</strong> When you register, we collect your name, email address, and password hash. You may optionally provide a phone number and business name.</p>
        <p><strong className="text-white">Geolocation Data.</strong> With your permission, we request your device's GPS location to power the nearby-parts map and part listing features. You can deny or revoke this permission in your browser or device settings at any time.</p>
        <p><strong className="text-white">Part Listings.</strong> When you list a part, we store the part details (name, number, price, condition, brand) and the GPS coordinates you provide.</p>
        <p><strong className="text-white">Usage Data.</strong> We automatically collect standard server logs including IP address, browser type, pages visited, and timestamps. This data is used for security, analytics, and debugging only.</p>
        <p><strong className="text-white">Payment Data.</strong> We do not store payment card details. All payments are processed by PayPal. We receive only a transaction reference ID after a successful payment.</p>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To operate and improve the GearShare platform.</li>
          <li>To display nearby parts and mechanics on our map.</li>
          <li>To send transactional emails (registration confirmation, order updates).</li>
          <li>To detect and prevent fraud, abuse, and security incidents.</li>
          <li>To comply with legal obligations.</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>
      </Section>

      <Section title="3. Cookies and Tracking">
        <p>We use essential cookies to maintain your login session (JWT token stored in localStorage). We do not use advertising or third-party tracking cookies. Microsoft Clarity may be enabled for anonymized heatmap analytics — this does not capture personally identifiable information.</p>
      </Section>

      <Section title="4. Data Sharing">
        <p>We share data only with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-white">Firebase (Google)</strong> — for authentication.</li>
          <li><strong className="text-white">PayPal</strong> — for payment processing.</li>
          <li><strong className="text-white">OpenStreetMap / Overpass API</strong> — to display mechanic locations (no personal data is sent).</li>
          <li><strong className="text-white">AWS Amplify</strong> — for hosting the frontend. AWS may process request logs.</li>
        </ul>
        <p>All third-party services are governed by their own privacy policies.</p>
      </Section>

      <Section title="5. Data Retention">
        <p>We retain your account data for as long as your account is active. Part listings are retained until you delete them. Server logs are retained for up to 90 days. You may request deletion of your account and associated data at any time by emailing support@gearshare.site.</p>
      </Section>

      <Section title="6. Security">
        <p>We implement industry-standard security measures including HTTPS/TLS encryption, hashed passwords (bcrypt), JWT-based authentication with expiry, and rate limiting. Despite these measures, no system is 100% secure. We encourage you to use a strong, unique password.</p>
      </Section>

      <Section title="7. Your Rights">
        <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. Israeli users are protected under the Protection of Privacy Law, 5741-1981. EU users may have additional rights under GDPR. To exercise any right, contact us at support@gearshare.site.</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>GearShare is not directed to children under 16. We do not knowingly collect data from minors. If you believe a minor has provided us with personal information, please contact us immediately.</p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>We reserve the right to update this Privacy Policy at any time. We will notify registered users by email of material changes. Continued use of GearShare after such changes constitutes acceptance of the new policy.</p>
      </Section>

      <Section title="10. Contact">
        <p>If you have questions about this policy, please contact us at:</p>
        <p><strong className="text-white">Email:</strong> <a href="mailto:support@gearshare.site" className="text-blue-300 hover:underline">support@gearshare.site</a></p>
        <p><strong className="text-white">Website:</strong> gearshare.site</p>
      </Section>
    </div>
  </div>
);
