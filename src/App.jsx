import { useState, useEffect, useRef } from 'react';

// --- Inline SVG Icons ---
const IconBase = ({ size = 24, className = "", children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

const Clock = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconBase>;
const Shield = (props) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></IconBase>;
const TrendingUp = (props) => <IconBase {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></IconBase>;
const Users = (props) => <IconBase {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
const AlertTriangle = (props) => <IconBase {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></IconBase>;
const CheckCircle = (props) => <IconBase {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconBase>;
const MenuIcon = (props) => <IconBase {...props}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></IconBase>;
const XIcon = (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>;
const ArrowRight = (props) => <IconBase {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></IconBase>;
const Zap = (props) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconBase>;

// --- Scroll animation component ---
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = {
    primary: '#7667FF',
    secondary: '#FF6B6B',
  };

  const navItems = [
    { label: 'Constat', id: 'constat' },
    { label: 'Méthode', id: 'methode' },
    { label: 'Vécu', id: 'temoignages' },
    { label: 'Offre', id: 'offre' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openBooking = () => {
    window.open('https://cal.com/fabrice-liut/45-min-meeting', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-gray-200 font-sans overflow-hidden relative">

      {/* --- Animated Background Blobs --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen blur-[100px] opacity-20 animate-pulse"
          style={{ backgroundColor: colors.primary, animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-screen blur-[120px] opacity-10 animate-pulse"
          style={{ backgroundColor: colors.secondary, animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full mix-blend-screen blur-[80px] opacity-10"
          style={{ backgroundColor: colors.primary }} />
      </div>

      {/* --- Navigation --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#0F0F11]/95 backdrop-blur-xl border-white/10 py-3 shadow-lg'
            : 'bg-[#0F0F11]/60 backdrop-blur-md border-white/5 py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tighter text-white z-50 relative group cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            LIUT<span className="group-hover:text-white transition-colors duration-300" style={{ color: colors.primary }}>.ME</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide text-gray-300">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-white transition-all relative py-1 group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7667FF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden md:block px-5 py-2 text-xs font-bold uppercase tracking-wider border border-white/20 rounded hover:bg-white hover:text-black transition-all cursor-pointer"
              onClick={openBooking}
            >
              Contact
            </button>
            <button className="md:hidden text-white z-50 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-3xl font-bold text-white hover:text-[#7667FF] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={openBooking}
            className="mt-8 px-8 py-3 bg-[#7667FF] text-white rounded font-bold cursor-pointer"
          >
            Prendre RDV
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 px-6 max-w-5xl mx-auto text-center md:text-left z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-bold text-[#7667FF] mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7667FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7667FF]" />
            </span>
            PROGRAMME D&apos;AUTONOMIE
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
            Si demain, vous disparaissiez pour{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">
                3 mois
              </span>
              <svg
                className="absolute bottom-2 left-0 w-full h-3 z-0 opacity-60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="#FF6B6B" strokeWidth="8" fill="none" />
              </svg>
            </span>
            ...
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-normal mb-12 max-w-2xl leading-relaxed">
            Sans prévenir. Sans téléphone. Sans emails.
            <br />
            Quel serait l&apos;impact <span className="text-white font-medium border-b border-white/30">réel</span> sur votre industrie ?
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start justify-center md:justify-start">
            <button
              onClick={openBooking}
              className="group relative px-8 py-4 bg-[#7667FF] text-white font-bold text-lg rounded-xl overflow-hidden shadow-[0_0_30px_-10px_#7667FF] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_#7667FF] cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="flex items-center gap-3">
                Faire le test (45 min offertes) <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* --- Le Diagnostic --- */}
      <section id="constat" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <h2 className="text-4xl font-bold text-white mb-8">
              Le symptôme de <br />
              <span className="text-[#9CA3AF]">l&apos;indispensable</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                La réponse est souvent brutale :{' '}
                <span className="text-white font-semibold bg-white/10 px-2 py-1 rounded border border-white/5 shadow-inner">
                  &quot;Ce serait la crise. Tout risque de s&apos;effondrer.&quot;
                </span>
              </p>
              <p>
                C&apos;est un risque majeur pour la pérennité de votre entreprise (valorisation en baisse) et un risque
                personnel pour vous (charge mentale explosive).
              </p>
            </div>
            <div className="mt-10 p-6 border-l-4 bg-gradient-to-r from-[#7667FF]/10 to-transparent backdrop-blur-md rounded-r-xl border-[#7667FF]">
              <p className="text-white italic text-lg font-medium">
                &quot;Votre rôle est d&apos;apporter la vision, la stratégie et de gérer les relations clés. Pas de faire
                tourner la boutique au quotidien.&quot;
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#7667FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="bg-[#151518] p-8 rounded-2xl border border-white/10 relative z-10 backdrop-blur-xl shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FF6B6B]/20 text-[#FF6B6B]">
                    <AlertTriangle size={24} />
                  </div>
                  Les Risques Actuels
                </h3>
                <ul className="space-y-6">
                  {[
                    "Goulot d'étranglement décisionnel",
                    "Équipes déresponsabilisées ('J'attends le chef')",
                    "Valorisation de l'entreprise affaiblie",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-200 font-medium">
                      <span className="w-2 h-2 rounded-full shadow-[0_0_10px_#FF6B6B]" style={{ backgroundColor: colors.secondary }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- La Méthode --- */}
      <section id="methode" className="py-32 px-6 relative z-10 bg-[#0F0F11]/50">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">La Disparition Progressive</h2>
            <p className="text-gray-300 text-lg">
              On ne change pas une culture en un jour.
              <br /> Nous simulons votre absence, graduellement, pour{' '}
              <span className="text-white underline decoration-[#7667FF] decoration-2 underline-offset-4">
                corriger en temps réel
              </span>
              .
            </p>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#7667FF] via-[#FF6B6B] to-[#7667FF] opacity-40" />

          <div className="space-y-20">
            {[
              {
                title: 'Le Micro-Test',
                time: '3h → 1 jour',
                desc: 'On observe les premiers réflexes : qui vous appelle ? Pourquoi ?',
                obj: 'Identifier les interruptions non critiques.',
                color: colors.primary,
                icon: <Clock size={20} />,
              },
              {
                title: "L'Absence Courte",
                time: '2 jours → 4 jours',
                desc: "C'est là que les processus manquants apparaissent. On corrige immédiatement.",
                obj: 'Délégations opérationnelles & Accès info.',
                color: '#A78BFA',
                icon: <Zap size={20} />,
              },
              {
                title: 'Le Crash Test',
                time: '1 → 2 semaines',
                desc: "Sans contact. Votre équipe doit gérer seule. C'est l'objectif final.",
                obj: 'Autonomie totale & Sécurité.',
                color: colors.secondary,
                icon: <Shield size={20} />,
              },
            ].map((step, index) => (
              <Reveal key={index}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 relative pl-12 md:pl-0">
                  <div
                    className="absolute left-[-5px] md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#0F0F11] z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:order-1' : 'md:order-3 text-left'}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#7667FF] font-mono text-sm mb-3 tracking-wider uppercase font-bold">{step.time}</p>
                    <p className="text-gray-300">{step.desc}</p>
                  </div>

                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'} w-full`}>
                    <div className="bg-[#1A1A1E] p-6 rounded-xl border border-white/10 shadow-lg hover:border-white/20 transition-colors group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded bg-white/5 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all">
                          {step.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Objectif</span>
                      </div>
                      <p className="text-white font-medium">{step.obj}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-24 p-8 rounded-2xl text-center border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="text-gray-300 relative z-10 max-w-2xl mx-auto leading-relaxed">
                <span className="block text-[#FF6B6B] font-bold mb-2 flex items-center justify-center gap-2">
                  <AlertTriangle size={18} /> Note Importante
                </span>
                Pendant vos absences, vous n&apos;êtes pas en vacances. Nous travaillons en &quot;back-office&quot; pour ajuster
                votre posture, gérer le stress du lâcher-prise et préparer la restructuration.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Cas Concrets --- */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-bold text-white mb-16 text-center">Avant / Après</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <TrendingUp size={28} />,
                title: 'PMI Métallurgie',
                context: '45 salariés, flux tendu',
                before: 'Le dirigeant validait chaque changement de planning.',
                after: "Mise en place d'un pilotage visuel autonome. Les chefs d'équipe ont désormais l'autorité maintenance.",
              },
              {
                icon: <Users size={28} />,
                title: 'PMI Ingénierie',
                context: '20 ingénieurs, projets sur-mesure',
                before: 'Dirigeant seul point de contact crédible pour les clients.',
                after: "Binôme Lead Tech/Chargé d'Affaires. Le silence du dirigeant a forcé la confiance client.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="group bg-[#151518] border border-white/10 p-8 rounded-2xl hover:border-[#7667FF]/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[#7667FF]/10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#7667FF] to-[#5a4ddb] text-white flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-[#7667FF]/20 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 font-mono">{card.context}</p>

                  <div className="space-y-5 mt-auto">
                    <div className="pl-4 border-l-2 border-[#FF6B6B]/40">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <span className="text-[#FF6B6B] font-bold text-xs uppercase block mb-1">Avant</span> {card.before}
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-[#7667FF]/60">
                      <p className="text-gray-100 text-sm leading-relaxed">
                        <span className="text-[#7667FF] font-bold text-xs uppercase block mb-1">Maintenant</span> {card.after}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Témoignages --- */}
      <section id="temoignages" className="py-32 px-6 bg-[#0F0F11] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-bold text-white mb-16">Vécu par vos pairs</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Au retour, non seulement l'usine n'avait pas brûlé, mais mon responsable prod avait pris une initiative que je n'aurais jamais osé prendre.",
                author: 'Marc D.',
                role: 'Automobile',
              },
              {
                text: "J'ai réalisé que j'étais le bouchon de ma propre entreprise. Aujourd'hui, je travaille 2 fois moins sur l'opérationnel.",
                author: 'Sophie L.',
                role: 'Plasturgie',
              },
              {
                text: "Ce n'est pas juste de la délégation, c'est de la sécurisation d'actif. Je dors beaucoup mieux.",
                author: 'Jean-François P.',
                role: 'Agroalimentaire',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-[#151518] p-8 rounded-2xl border border-white/10 shadow-md relative hover:bg-[#1A1A1E] transition-colors">
                  <div className="text-5xl text-[#7667FF] absolute top-4 left-4 opacity-20 font-serif">&ldquo;</div>
                  <p className="text-lg text-gray-300 italic mb-8 relative z-10 leading-relaxed pt-2">{t.text}</p>
                  <div>
                    <p className="text-white font-bold">{t.author}</p>
                    <p className="text-gray-500 text-sm uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- L'Offre --- */}
      <section id="offre" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] to-black z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7667FF] rounded-full mix-blend-screen blur-[150px] opacity-10 animate-pulse z-0" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="bg-[#151518] border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden group hover:border-[#7667FF]/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 bg-[#FF6B6B] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-bl-xl shadow-lg">
                Personnalisable
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Autonomie &amp; Sécurité</h2>
              <p className="text-gray-400 mb-10">Accompagnement opérationnel sur 3 mois</p>

              <div className="flex items-baseline justify-center gap-2 mb-10">
                <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">2 800€</span>
                <span className="text-xl text-gray-500">HT / mois</span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

              <ul className="text-left space-y-5 mb-12 max-w-md mx-auto">
                {[
                  'Audit initial & Cartographie des risques',
                  "Planification séquencée des 'disparitions'",
                  'Coaching dirigeant pendant les phases OFF',
                  'Restructuration des processus & délégations',
                  'Disponibilité WhatsApp/Tel illimitée',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-300">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#7667FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openBooking}
                className="w-full md:w-auto px-12 py-5 bg-[#7667FF] text-white font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(118,103,255,0.3)] hover:bg-[#6557d8] hover:shadow-[0_4px_30px_rgba(118,103,255,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                Démarrer la discussion
              </button>

              <p className="text-xs text-gray-500 mt-8 leading-relaxed max-w-sm mx-auto">
                Tarif indicatif basé sur ~2j d&apos;implication/mois.
                <br /> Le rythme s&apos;adapte à la maturité de vos équipes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-white/5 text-center md:text-left bg-[#0F0F11] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-white mb-2">
              LIUT<span style={{ color: colors.primary }}>.ME</span>
            </div>
            <p className="text-gray-500 text-sm">Accompagnement stratégique pour dirigeants industriels.</p>
          </div>
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/liut/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://liut.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}