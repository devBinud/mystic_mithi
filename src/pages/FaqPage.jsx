import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const faqs = [
  {
    q: 'Can I order author-signed copies directly through this website?',
    a: 'Yes, absolutely! Every book ordered directly through our official website comes personally signed by Mystic Mithi, often with a unique hand-written inscription or bookmark from _Inkling Ink.'
  },
  {
    q: 'How long does delivery take across India?',
    a: 'Orders are processed and dispatched within 24–48 hours. Standard delivery takes 3 to 6 business days depending on your location, with real-time tracking provided via SMS and WhatsApp.'
  },
  {
    q: 'Which book should I start with if I am new to Mystic Mithi?',
    a: 'Begin with "When the Mystic Meets a Starfish" — her first collection of mystical poems on love, life and inspiration, inspired by Rumi. If you are drawn to science, mythology and the wonder of the universe, "Caravan to the Cosmos" is the one for you.'
  },
  {
    q: 'Are bulk orders supported for book clubs, weddings, or literary gifting?',
    a: 'Yes! We frequently fulfill customized bulk orders with special gift packaging for book clubs, literature events, and corporate gifts. Contact us via the form or WhatsApp for customized volume pricing.'
  },
  {
    q: 'Do you ship to international readers outside India?',
    a: 'Yes, international shipping is available upon request. Please reach out via the contact form or email (mystic.mithi25@gmail.com) to calculate international postage to your country.'
  }
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="insp-page-wrapper">
      <section className="insp-faq-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">COMMON INQUIRIES</span>
            <h1 className="insp-section-title">FREQUENTLY ASKED QUESTIONS.</h1>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to know about purchasing books, delivery, and author copies.
            </p>
          </div>

          <div className="insp-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`insp-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="insp-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.q}</span>
                    <span className="mm-faq-icon" aria-hidden="true">
                      <FaPlus size={13} />
                    </span>
                  </button>
                  <div id={`faq-answer-${index}`} className="mm-faq-panel" role="region" aria-hidden={!isOpen}>
                    <div className="mm-faq-panel-inner">
                      <div className="insp-faq-answer">{faq.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
