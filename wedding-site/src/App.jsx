import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const MAP_LINKS = {
  groom: "https://maps.google.com/your-link-1",
  bride: "https://maps.google.com/your-link-2",
  church: "https://maps.google.com/your-link-3",
  venue: "https://maps.google.com/your-link-4"
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(""); 
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('July 5, 2026 17:30:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else { clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    // This timer controls how long the "zooming" animation lasts before the envelope vanishes
    setTimeout(() => { setIsExited(true); }, 1000); 
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    if (guestCount === "") return alert("Please select the number of guests.");
    setLoading(true);
    const { error } = await supabase.from('rsvps').insert([{ 
      name: name.trim(), 
      phone: phone.trim(), 
      total_guests: parseInt(guestCount) 
    }]);
    if (!error) setSubmitted(true);
    else alert(error.code === '23505' ? "Already RSVP'd!" : "Error: " + error.message);
    setLoading(false);
  };

  return (
    <>
      {/* ✉️ INTERACTIVE ENVELOPE LAYER */}
      <div className={`envelope-wrapper ${isExited ? 'hidden' : ''}`}>
        <div className={`envelope-hero ${isOpen ? 'open' : ''}`} onClick={handleOpen}>
          <img 
            src="/58ed44acd7aa33cb2c0729f019194bea.png" 
            alt="Wedding Envelope" 
            className="main-envelope-img" 
          />
          <div className="tap-hint-romantic">Tap to Open</div>
        </div>
      </div>

      {/* 🏛️ MAIN INVITE STAGE */}
      <main className="canva-stage">
        <div className="digital-invitation">
          <div className="floral-base">
            <div className="lace-overlay"></div>
            <div className="scrollable-content">
              
              <header className="canva-box text-center">
                <p className="text-[7px] uppercase tracking-[0.4em] text-gray-400 mb-2">Together with their families</p>
                <h1 className="text-3xl font-serif text-gray-800 leading-tight">Aggelos & Savvina</h1>
                <div className="h-px w-12 bg-gray-200 mx-auto my-5"></div>
                <p className="italic font-serif text-gray-500 text-xs">05 . 07 . 2026</p>
              </header>

              <div className="timer-box mb-6">
                <div className="flex justify-center space-x-6">
                  {['days', 'hours', 'min', 'sec'].map((unit, i) => (
                    <div key={unit} className="text-center">
                      <span className="text-2xl font-serif text-gray-800">
                        {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i]}
                      </span>
                      <span className="block text-[7px] uppercase tracking-widest text-gray-400">{unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <section className="canva-box mb-6">
                <h3 className="text-[9px] uppercase tracking-widest text-gray-400 mb-8">Schedule</h3>
                <div className="space-y-8 text-[10px] text-center">
                  <div>
                    <p className="font-bold text-gray-800 uppercase">Groom's Changing — 13:30</p>
                    <a href={MAP_LINKS.groom} target="_blank" rel="noreferrer" className="canva-btn">VIEW MAP</a>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 uppercase">Bride's Changing — 15:30</p>
                    <a href={MAP_LINKS.bride} target="_blank" rel="noreferrer" className="canva-btn">VIEW MAP</a>
                  </div>
                  <div className="pt-2">
                    <p className="font-serif italic text-base text-gray-800">The Ceremony</p>
                    <p className="mb-1 text-gray-500">Panagías Chryssospiliótissas — 17:30</p>
                    <a href={MAP_LINKS.church} target="_blank" rel="noreferrer" className="canva-btn">CHURCH MAP</a>
                  </div>
                  <div className="pt-2">
                    <p className="font-serif italic text-base text-gray-800">The Celebration</p>
                    <p className="mb-1 text-gray-500">Tsantali Country Club — 19:30</p>
                    <a href={MAP_LINKS.venue} target="_blank" rel="noreferrer" className="canva-btn">VENUE MAP</a>
                  </div>
                </div>
              </section>

              <section className="canva-box mb-12">
                {!submitted ? (
                  <form onSubmit={handleRSVP} className="space-y-6 px-4">
                    <h2 className="font-serif text-2xl text-gray-700 tracking-widest uppercase">RSVP</h2>
                    <input type="text" placeholder="FULL NAME" required className="canva-input" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="tel" placeholder="MOBILE NUMBER" required className="canva-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <select required className="canva-input text-gray-400" value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
                      <option value="" disabled>Number of Guests</option>
                      <option value="0">0 (Respectfully Decline)</option>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                    </select>
                    <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 text-[9px] tracking-[0.3em] uppercase">
                      {loading ? 'Processing...' : 'Confirm Attendance'}
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center">
                    <p className="font-serif italic text-2xl text-gray-800">Thank You.</p>
                    <p className="text-[9px] text-gray-400 uppercase mt-2">Response Saved</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}