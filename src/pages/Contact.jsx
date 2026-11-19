import React, { useState } from 'react';
import { faqs } from '../data/products';
import { useToast } from '../context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

const Contact = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Bespoke Engagement Ring Commission',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a detailed inquiry message (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted fields in the inquiry form.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your inquiry has been received. Our concierge will contact you within 24 hours.', 'success');
    setFormData({
      name: '',
      email: '',
      topic: 'Bespoke Engagement Ring Commission',
      message: ''
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <section style={{ background: '#fcfbf9', borderBottom: '1px solid #eae6dc', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span className="subtitle">PRIVATE CONCIERGE</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '8px 0 14px' }}>
            We Await Your Message
          </h1>
          <div className="gold-divider" />
          <p style={{ color: '#6b6860', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
            Whether scheduling a private boutique viewing, inquiring about a bespoke diamond commission, 
            or requesting ring resizing guidance, our master jewelers are delighted to assist you.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          {/* Left: Contact Form */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #eae6dc',
              borderRadius: '4px',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
              Send an Inquiry
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6b6860', marginBottom: '24px' }}>
              Fill out the form below. A dedicated jewellery specialist will respond within 24 hours.
            </p>

            {submitted && (
              <div
                style={{
                  background: '#e8f5e9',
                  border: '1px solid #c8e6c9',
                  color: '#2e7d32',
                  padding: '16px 20px',
                  borderRadius: '4px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.88rem'
                }}
              >
                <CheckCircle2 size={20} color="#2e7d32" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Inquiry Dispatched Successfully!</strong>
                  <div>Thank you for reaching out to The Unjellic. We look forward to connecting with you.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sophia Martinez"
                  className="form-input"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="sophia@example.com"
                  className="form-input"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Service Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Bespoke Engagement Ring Commission">Bespoke Engagement Ring Commission</option>
                  <option value="Private Atelier Boutique Appointment">Private Atelier Boutique Appointment</option>
                  <option value="Ring Sizing & Maintenance Support">Ring Sizing &amp; Maintenance Support</option>
                  <option value="Order Tracking & Insured Shipping">Order Tracking &amp; Insured Shipping</option>
                  <option value="General Gemological Inquiry">General Gemological Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your desired gemstone, metal, ring size or occasion..."
                  className="form-textarea"
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', padding: '16px' }}
              >
                <Send size={16} /> Submit Message to Atelier
              </button>
            </form>
          </div>

          {/* Right: Flagship & Atelier Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div
              style={{
                background: '#fcfbf9',
                border: '1px solid #eae6dc',
                borderRadius: '4px',
                padding: '36px'
              }}
            >
              <span className="subtitle">FLAGSHIP ATELIER</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '6px 0 16px' }}>
                Madison Avenue Salon
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#55524c', lineHeight: 1.7, marginBottom: '24px' }}>
                Located in the heart of Manhattan&rsquo;s historic luxury corridor, our boutique invites 
                you to examine rare diamonds under natural light in total privacy.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={18} color="#c5a059" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Flagship Address:</strong>
                    <div style={{ color: '#6b6860' }}>540 Madison Avenue, 9th Floor, New York, NY 10022</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Phone size={18} color="#c5a059" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Private Concierge Telephone:</strong>
                    <div style={{ color: '#6b6860' }}>+1 (800) 555-UNJELLIC</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Mail size={18} color="#c5a059" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Direct Email:</strong>
                    <div style={{ color: '#6b6860' }}>concierge@unjellic.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Clock size={18} color="#c5a059" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Salon Visiting Hours:</strong>
                    <div style={{ color: '#6b6860' }}>Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM EST</div>
                    <div style={{ color: '#6b6860' }}>Sunday: Private appointments by prior arrangement</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Assurance Box */}
            <div
              style={{
                background: '#121212',
                color: '#fff',
                padding: '28px',
                borderRadius: '4px',
                border: '1px solid #292620'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Sparkles size={18} color="#c5a059" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', margin: 0 }}>
                  Complimentary Virtual Consultation
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#b5b0a3', lineHeight: 1.6, margin: 0 }}>
                Can&rsquo;t visit New York? Book a high-definition video session with our gemologists to examine diamonds 
                in 360-degree high magnification and discuss custom settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-padding" style={{ background: '#fcfbf9', borderTop: '1px solid #eae6dc' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="subtitle">ATELIER ADVICE</span>
            <h2>Frequently Asked Questions</h2>
            <div className="gold-divider" />
            <p>Answers to common questions regarding diamond certifications, ring sizing, and shipping.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #eae6dc',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#1c1b18'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} color="#c5a059" /> : <ChevronDown size={18} color="#6b6860" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: '#55524c', lineHeight: 1.7, borderTop: '1px solid #f6f3ec' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

