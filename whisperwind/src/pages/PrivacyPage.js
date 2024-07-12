import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="privacy-container container mt-5">
      <h1 className="text-center mb-4">Privacy Policy</h1>
      <p>At WhisperWind, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

      <h2 className="mt-4">Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li><strong>Personal identification information:</strong> Name, email address, phone number, etc.</li>
        <li><strong>Technical data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        <li><strong>Usage data:</strong> Information about how you use our website, products, and services.</li>
        <li><strong>Marketing and communications data:</strong> Your preferences in receiving marketing from us and your communication preferences.</li>
      </ul>

      <h2 className="mt-4">How We Use Your Information</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>To manage your account and provide our services to you.</li>
        <li>To manage our relationship with you, which will include notifying you about changes to our terms or privacy policy.</li>
        <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting, and hosting of data).</li>
        <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
      </ul>

      <h2 className="mt-4">Data Retention</h2>
      <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

      <h2 className="mt-4">Your Legal Rights</h2>
      <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of the personal data that we hold about you.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>

      <h2 className="mt-4">Contact Us</h2>
      <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
      <p>Email: <a href="mailto:support@whisperwind.com">support@whisperwind.com</a></p>

      <h2 className="mt-4">Data Deletion Instructions</h2>
      <p>If you wish to delete your personal data, please follow these steps:</p>
      <ul>
        <li>Send an email to <a href="mailto:support@whisperwind.com">support@whisperwind.com</a> with the subject "Data Deletion Request".</li>
        <li>Include your username and the email address associated with your account in the email body.</li>
        <li>We will process your request within 30 days and confirm the deletion of your data via email.</li>
      </ul>
    </div>
  );
};

export default PrivacyPage;
