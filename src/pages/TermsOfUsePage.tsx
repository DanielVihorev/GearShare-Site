import React from "react";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mt-8 mb-3">{title}</h2>
    <div className="text-white/80 space-y-3 leading-relaxed">{children}</div>
  </div>
);

export const TermsOfUsePage: React.FC = () => (
  <div className="container mx-auto px-6 py-12 max-w-4xl">
    <h1 className="text-4xl font-extrabold text-white mb-2">Terms of Use</h1>
    <p className="text-white/50 text-sm mb-8">Last updated: April 6, 2026</p>

    <div className="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-10 space-y-2">
      <p>
        These Terms of Use ("Terms") constitute a legally binding agreement between you ("User") and GearShare
        ("we", "us", "our") governing your access to and use of gearshare.site and all related services.
        By accessing the site you confirm that you have read, understood, and agree to be bound by these Terms.
        If you do not agree, discontinue use immediately.
      </p>

      <Section title="1. Eligibility">
        <p>You must be at least 18 years of age (or the age of majority in your jurisdiction) to use GearShare. By using the service you represent that you meet this requirement and that you are not prohibited from receiving services under applicable law.</p>
      </Section>

      <Section title="2. Account Registration">
        <p>You must provide accurate and complete registration information. You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account. Notify us immediately at support@gearshare.site if you suspect unauthorized access.</p>
        <p>We reserve the right to suspend or terminate accounts that violate these Terms, provide false information, or engage in fraudulent activity.</p>
      </Section>

      <Section title="3. Marketplace Rules">
        <ul className="list-disc pl-5 space-y-1">
          <li>You may only list parts that you lawfully own or are authorized to sell.</li>
          <li>All listings must be accurate — part number, condition, price, and location must truthfully describe the item.</li>
          <li>Counterfeit, stolen, or illegal parts are strictly prohibited and will result in immediate account termination and referral to authorities.</li>
          <li>You are solely responsible for the accuracy of your listings.</li>
          <li>GearShare is a peer-to-peer marketplace. We are not a party to transactions between buyers and sellers.</li>
        </ul>
      </Section>

      <Section title="4. Payments">
        <p>All payments on the platform are processed by PayPal. By completing a purchase you agree to PayPal's terms of service. GearShare does not store payment card information. Subscription fees are billed at the start of each billing cycle and are non-refundable except as required by law.</p>
        <p>Disputes about individual part transactions should first be raised with the seller. If unresolved within 5 business days, contact support@gearshare.site for escalation.</p>
      </Section>

      <Section title="5. Prohibited Conduct">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use GearShare for any unlawful purpose or in violation of applicable regulations.</li>
          <li>Scrape, crawl, or systematically download data from GearShare without written permission.</li>
          <li>Attempt to gain unauthorized access to any system or user account.</li>
          <li>Transmit spam, malware, or any harmful code.</li>
          <li>Manipulate prices, reviews, or search results through automated means.</li>
          <li>Impersonate any person or entity.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        <p>All content on GearShare — including the logo, interface design, copy, and software — is owned by or licensed to GearShare and protected by Israeli and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
        <p>By posting content (part listings, images, descriptions) you grant GearShare a non-exclusive, royalty-free, worldwide license to display that content on the platform.</p>
      </Section>

      <Section title="7. Disclaimers">
        <p>GearShare is provided "as is" and "as available" without warranties of any kind. We do not warrant that the service will be uninterrupted, error-free, or free of viruses. We are not responsible for the quality, safety, or legality of parts listed by third-party sellers.</p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>To the fullest extent permitted by law, GearShare and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, even if advised of the possibility of such damages. Our total liability to you for any claim shall not exceed the amount you paid to GearShare in the 3 months preceding the claim.</p>
      </Section>

      <Section title="9. Governing Law">
        <p>These Terms are governed by the laws of the State of Israel. Any disputes shall be resolved exclusively in the competent courts of Tel Aviv, Israel.</p>
      </Section>

      <Section title="10. Changes to Terms">
        <p>We may revise these Terms at any time. Material changes will be communicated via email to registered users. Continued use after the effective date of changes constitutes acceptance of the revised Terms.</p>
      </Section>

      <Section title="11. Contact">
        <p>For questions about these Terms, contact us at:</p>
        <p><strong className="text-white">Email:</strong> <a href="mailto:support@gearshare.site" className="text-blue-300 hover:underline">support@gearshare.site</a></p>
      </Section>
    </div>
  </div>
);
