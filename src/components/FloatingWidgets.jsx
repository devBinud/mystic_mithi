import { useState, useEffect } from 'react'
import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa6'

export default function FloatingWidgets() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        const roundedProgress = Math.min(100, Math.max(0, Math.round(currentProgress)));
        setScrollProgress(roundedProgress);
        setShowScrollTop(window.scrollY > 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Mystic Mithi, I am interested in purchasing your books / literary inquiries.")}`;
  const phoneUrl = "tel:+917002974378";

  // SVG progress circle calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="floating-widgets-stack">
      {/* Scroll Percentage & Back to Top Widget */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="floating-btn scroll-top-btn" 
          title={`Scroll to top (${scrollProgress}%)`}
          aria-label="Scroll to top"
        >
          <svg className="progress-ring" width="100%" height="100%" viewBox="0 0 50 50">
            <circle
              className="progress-ring__circle-bg"
              stroke="#DDE1DD"
              strokeWidth="3.5"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
            <circle
              className="progress-ring__circle"
              stroke="var(--primary)"
              strokeWidth="3.5"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
          </svg>
          <div className="scroll-percentage-text">
            <span className={`percent-val ${scrollProgress >= 100 ? 'hundred-percent' : ''}`}>{scrollProgress}%</span>
            <FaArrowUp className="arrow-icon" size={14} />
          </div>
        </button>
      )}

      {/* Floating Call Button */}
      <a 
        href={phoneUrl} 
        className="floating-btn call-btn" 
        title="Call Us (+91 70029 74378)"
        aria-label="Call Us"
      >
        <FaPhone size={18} />
        <span className="btn-mobile-label">Call Us</span>
        <span className="tooltip-text">Call Us</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn whatsapp-btn" 
        title="WhatsApp Booking"
        aria-label="WhatsApp Booking"
      >
        <FaWhatsapp size={22} />
        <span className="btn-mobile-label">WhatsApp</span>
        <span className="tooltip-text">Chat on WhatsApp</span>
      </a>
    </div>
  )
}
