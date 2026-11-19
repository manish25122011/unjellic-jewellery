import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gem, Award, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section style={{ background: '#fcfbf9', borderBottom: '1px solid #eae6dc', padding: '70px 0 50px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="subtitle">THE HERITAGE &bull; THE VISION</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.4rem', margin: '10px 0 16px', lineHeight: 1.15 }}>
            Crafting Heirlooms to Transcend Generations
          </h1>
          <div className="gold-divider" />
          <p style={{ color: '#55524c', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8 }}>
            Born from an unwavering devotion to architectural balance, pure gemstones, and 
            sustainable gold metallurgy, The Unjellic Jewellery exists to capture life&rsquo;s most 
            sacred milestones.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="subtitle">OUR ORIGINS</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', margin: '8px 0 20px', lineHeight: 1.25 }}>
              The Story of The Unjellic
            </h2>
            <p style={{ color: '#55524c', fontSize: '0.98rem', lineHeight: 1.8, marginBottom: '18px' }}>
              Founded with the belief that fine jewellery should be both breathtakingly exquisite and 
              strictly ethical, The Unjellic was created to redefine high jewellery for the modern connoisseur. 
              Every curve, prong, and bevel is hand-drafted in our private atelier.
            </p>
            <p style={{ color: '#55524c', fontSize: '0.98rem', lineHeight: 1.8, marginBottom: '24px' }}>
              We collaborate exclusively with master bench jewelers who have spent lifetimes honing 
              the subtle arts of micro-pavé setting, hand-engraving, and metal alloy tempering. By bypassing 
              traditional retail markups, we deliver uncompromised archival quality directly to you.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #eae6dc', paddingTop: '20px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#c5a059', margin: '0 0 4px' }}>
                  25+ Years
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#6b6860', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Atelier Bench Mastery
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#c5a059', margin: '0 0 4px' }}>
                  10,000+
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#6b6860', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Heirlooms Created
                </p>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #eae6dc' }}>
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
                alt="Jewellery Crafting Process"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                right: '-14px',
                width: '60px',
                height: '60px',
                borderTop: '3px solid #c5a059',
                borderRight: '3px solid #c5a059'
              }}
            />
          </div>
        </div>
      </section>

      {/* Craftsmanship & Quality Section */}
      <section className="section-padding" style={{ background: '#fcfbf9', borderTop: '1px solid #eae6dc', borderBottom: '1px solid #eae6dc' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">THE FOUR ATELIER PILLARS</span>
            <h2>Uncompromising Craftsmanship</h2>
            <div className="gold-divider" />
            <p>
              Every jewel bearing the Unjellic hallmark undergoes a rigorous 32-step inspection process 
              from raw ingot to final velvet casing.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#fff', border: '1px solid #eae6dc', borderRadius: '4px', padding: '36px 26px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gem size={26} color="#c5a059" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>
                100% Ethical Diamonds
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                We work exclusively with certified conflict-free natural diamonds and zero-emission lab-grown 
                brilliants, guaranteeing full provenance transparency.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eae6dc', borderRadius: '4px', padding: '36px 26px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={26} color="#c5a059" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>
                Recycled 18K Solid Gold
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                All our yellow, white, and rose golds are crafted using 100% recycled solid gold alloyed with 
                premium metals for enduring lustre and hypoallergenic safety.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eae6dc', borderRadius: '4px', padding: '36px 26px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={26} color="#c5a059" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>
                Hand-Set Stones
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Never machine-cast stones. Each diamond is handset under high-powered stereoscopic microscopes 
                with precision-burnished prongs for flawless light entry.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eae6dc', borderRadius: '4px', padding: '36px 26px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={26} color="#c5a059" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>
                GIA &amp; IGI Certified
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Every center stone over 0.50 ct is accompanied by an independent grading dossier verifying 
                cut, color, clarity, and exact carat dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Invitation */}
      <section className="section-padding" style={{ background: '#121212', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <span className="subtitle" style={{ color: 'var(--gold-light)' }}>
            BESPOKE CONSULTATIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#fff', margin: '10px 0 16px' }}>
            Experience The Atelier in Person
          </h2>
          <p style={{ color: '#b5b0a3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '32px' }}>
            Book a private one-on-one session with our master gemologists in our Madison Avenue boutique, 
            or schedule a virtual diamond consultation from the comfort of your home.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gold">
              Schedule Private Viewing <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
              Browse Digital Catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
