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
    primary: '#7568FF',
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
    <div className="min-h-screen bg-[#0B0C0E] text-[#EEEEF0] font-sans overflow-hidden relative">

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
            ? 'bg-[#0B0C0E]/95 backdrop-blur-xl border-white/10 py-3 shadow-lg'
            : 'bg-[#0B0C0E]/60 backdrop-blur-md border-white/5 py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tighter text-white z-50 relative group cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            Liut<span className="group-hover:text-white transition-colors duration-300" style={{ color: colors.primary }}>.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 bg-[#141518]/70 px-6 py-2.5 rounded-full border border-[#2E3138]/50 backdrop-blur-sm text-[13px] font-medium text-[#8A8F98]">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-[#EEEEF0] transition-all relative py-1 group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7568FF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-medium bg-[#7568FF] border border-[#7568FF] text-white hover:bg-[#6457E5] shadow-[0_0_20px_-5px_rgba(117,104,255,0.4)] transition-all cursor-pointer"
              onClick={openBooking}
            >
              Prendre 45 min
              <ArrowRight size={14} className="opacity-80" />
            </button>
            <button className="md:hidden text-white z-50 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-[#0B0C0E]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-3xl font-bold text-white hover:text-[#7568FF] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={openBooking}
            className="mt-8 px-8 py-3 bg-[#7568FF] text-white rounded-full font-medium cursor-pointer"
          >
            Prendre 45 min
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 px-6 max-w-5xl mx-auto text-center md:text-left z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7568FF]/30 bg-[#7568FF]/5 text-[11px] font-mono uppercase tracking-wider text-[#7568FF] mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7568FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7568FF]" />
            </span>
            PROGRAMME AUTONOMIE & SÉCURITÉ
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

          <p className="text-xl md:text-2xl text-[#8A8F98] font-normal mb-12 max-w-2xl leading-relaxed">
            Sans prévenir. Sans téléphone. Sans emails.
            <br />
            Quel serait l&apos;impact <span className="text-[#EEEEF0] font-medium border-b border-white/30">réel</span> sur votre entreprise ?
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start justify-center md:justify-start">
            <button
              onClick={openBooking}
              className="group relative px-8 py-4 bg-[#7568FF] text-white font-bold text-lg rounded-xl overflow-hidden shadow-[0_0_30px_-10px_#7568FF] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_#7568FF] cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="flex items-center gap-3">
                Faire le test (45 min offertes) <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          <button
            onClick={() => scrollToSection('methode')}
            className="mt-4 text-[13px] text-[#8A8F98] hover:text-[#EEEEF0] underline decoration-[#2E3138] hover:decoration-[#EEEEF0] underline-offset-4 transition-all cursor-pointer"
          >
            Pas sûr(e) ? Lisez d&apos;abord comment ça marche.
          </button>
        </Reveal>
      </section>

      {/* --- Le Diagnostic --- */}
      <section id="constat" className="py-32 px-6 relative z-10 border-t border-[#2E3138]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="mb-4">
              <span className="text-[#7568FF] font-mono text-[11px] uppercase tracking-wider mb-4 block">/// Constat</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-8">
              Tout repose <br />
              <span className="text-[#8A8F98]">sur vous.</span>
            </h2>
            <div className="space-y-6 text-[17px] text-[#8A8F98] leading-relaxed">
              <p>
                La réponse est souvent brutale :{' '}
                <span className="text-[#EEEEF0] font-semibold bg-white/10 px-2 py-1 rounded border border-white/5 shadow-inner">
                  &quot;Sans moi, ça s&apos;arrête.&quot;
                </span>
              </p>
              <p>
                Votre organisation repose trop sur vous. Chaque décision passe par vous, vos équipes attendent votre feu vert, et votre agenda est rempli de réunions opérationnelles.
              </p>
              <p>
                C&apos;est un risque majeur pour la pérennité de votre entreprise — et un épuisement personnel que vous connaissez trop bien.
              </p>
            </div>
            <div className="mt-10 p-6 border-l-4 bg-gradient-to-r from-[#7568FF]/10 to-transparent backdrop-blur-md rounded-r-xl border-[#7568FF]">
              <p className="text-white italic text-lg font-medium">
                &quot;Votre rôle, c&apos;est la vision et la stratégie. Pas de faire tourner la boutique au quotidien.&quot;
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#7568FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="bg-[#141518] p-8 rounded-2xl border border-[#2E3138] relative z-10 backdrop-blur-xl shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FF6B6B]/20 text-[#FF6B6B]">
                    <AlertTriangle size={24} />
                  </div>
                  Vous reconnaissez-vous ?
                </h3>
                <ul className="space-y-6">
                  {[
                    "Vous êtes sur le chemin critique de chaque décision",
                    "Vos équipes attendent votre validation pour avancer",
                    "Votre absence de 2 jours crée déjà du retard",
                    "Votre entreprise vaut moins sans vous dedans",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#EEEEF0] font-medium">
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
      <section id="methode" className="py-32 px-6 relative z-10 border-t border-[#2E3138]">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Reveal>
            <span className="text-[#7568FF] font-mono text-[11px] uppercase tracking-wider mb-4 block">/// Méthode</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">La Disparition Progressive</h2>
            <p className="text-[#8A8F98] text-lg">
              On ne change pas une culture en un jour.
              <br /> On simule votre absence, graduellement, pour{' '}
              <span className="text-[#EEEEF0] underline decoration-[#7568FF] decoration-2 underline-offset-4">
                corriger en temps réel
              </span>
              . Pas de grand plan théorique — du terrain.
            </p>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#7568FF] via-[#FF6B6B] to-[#7568FF] opacity-40" />

          <div className="space-y-20">
            {[
              {
                title: 'Le Micro-Test',
                time: '3h → 1 jour',
                desc: 'On observe les premiers réflexes : qui vous appelle ? Pourquoi ? Quelles décisions restent bloquées sans vous ?',
                obj: 'Identifier les dépendances non critiques.',
                color: colors.primary,
                icon: <Clock size={20} />,
              },
              {
                title: "L'Absence Courte",
                time: '2 jours → 4 jours',
                desc: "C'est là que les processus manquants apparaissent. On corrige immédiatement avec vos équipes, pas pour elles.",
                obj: 'Délégations opérationnelles & flux autonomes.',
                color: '#A78BFA',
                icon: <Zap size={20} />,
              },
              {
                title: 'Le Crash Test',
                time: '1 → 2 semaines',
                desc: "Sans contact. Votre équipe gère seule. C'est l'objectif final — votre entreprise tourne sans vous.",
                obj: 'Autonomie totale & sécurisation.',
                color: colors.secondary,
                icon: <Shield size={20} />,
              },
            ].map((step, index) => (
              <Reveal key={index}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 relative pl-12 md:pl-0">
                  <div
                    className="absolute left-[-5px] md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#0B0C0E] z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:order-1' : 'md:order-3 text-left'}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#7568FF] font-mono text-sm mb-3 tracking-wider uppercase font-bold">{step.time}</p>
                    <p className="text-[#8A8F98]">{step.desc}</p>
                  </div>

                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'} w-full`}>
                    <div className="bg-[#141518] p-6 rounded-xl border border-[#2E3138] shadow-lg hover:border-[#3E4149] transition-colors group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded bg-[#7568FF]/10 text-[#7568FF] group-hover:scale-110 transition-all">
                          {step.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8A8F98]">Objectif</span>
                      </div>
                      <p className="text-white font-medium">{step.obj}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-24 p-8 rounded-2xl text-center border border-[#2E3138] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="text-[#8A8F98] relative z-10 max-w-2xl mx-auto leading-relaxed">
                <span className="block text-[#FF6B6B] font-bold mb-2 flex items-center justify-center gap-2">
                  <AlertTriangle size={18} /> Note importante
                </span>
                Pendant vos absences, vous n&apos;êtes pas en vacances. On travaille en back-office pour ajuster votre posture, structurer la délégation et préparer le terrain. C&apos;est du Design Organisationnel appliqué — pas du coaching de surface.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Cas Concrets --- */}
      <section className="py-32 px-6 relative z-10 border-t border-[#2E3138]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-[#7568FF] font-mono text-[11px] uppercase tracking-wider mb-4 block text-center">/// Terrain</span>
            <h2 className="text-4xl font-bold text-white mb-16 text-center">Avant / Après</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <TrendingUp size={28} />,
                title: 'PME Industrielle',
                context: '45 salariés — production en flux tendu',
                before: 'Le dirigeant validait chaque changement de planning. Toute absence créait des retards en chaîne.',
                after: "Pilotage visuel autonome. Les chefs d'équipe prennent des décisions terrain sans remonter au dirigeant.",
              },
              {
                icon: <Users size={28} />,
                title: 'Agence de services',
                context: '18 collaborateurs — projets sur-mesure',
                before: 'La dirigeante était le seul point de contact crédible pour les clients. Impossible de prendre du recul.',
                after: "Binôme Lead/Chargé d'affaires formé. Le silence de la dirigeante a forcé la confiance client envers l'équipe.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="group bg-[#141518] border border-[#2E3138] p-8 rounded-2xl hover:border-[#7568FF]/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[#7568FF]/10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#7568FF] to-[#5a4ddb] text-white flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-[#7568FF]/20 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-[#8A8F98] text-sm mb-8 font-mono">{card.context}</p>

                  <div className="space-y-5 mt-auto">
                    <div className="pl-4 border-l-2 border-[#FF6B6B]/40">
                      <p className="text-[#8A8F98] text-sm leading-relaxed">
                        <span className="text-[#FF6B6B] font-bold text-xs uppercase block mb-1">Avant</span> {card.before}
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-[#7568FF]/60">
                      <p className="text-[#EEEEF0] text-sm leading-relaxed">
                        <span className="text-[#7568FF] font-bold text-xs uppercase block mb-1">Maintenant</span> {card.after}
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
      <section id="temoignages" className="py-32 px-6 relative border-t border-[#2E3138]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-[#7568FF] font-mono text-[11px] uppercase tracking-wider mb-4 block">/// Vécu</span>
            <h2 className="text-4xl font-bold text-white mb-16">Vécu par vos pairs</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Au retour, non seulement l'entreprise n'avait pas brûlé, mais mon responsable avait pris une initiative que je n'aurais jamais osé prendre.",
                author: 'Marc D.',
                role: 'PME industrielle — 45 salariés',
              },
              {
                text: "J'ai réalisé que j'étais le bouchon de ma propre boîte. Aujourd'hui, je travaille 2 fois moins sur l'opérationnel. Mon agenda a changé de visage.",
                author: 'Sophie L.',
                role: 'Agence — 22 collaborateurs',
              },
              {
                text: "Ce n'est pas juste de la délégation. C'est de la sécurisation d'actif. Mon entreprise vaut plus parce qu'elle ne dépend plus de moi.",
                author: 'Jean-François P.',
                role: 'PMI agroalimentaire — 60 salariés',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-[#141518] p-8 rounded-2xl border border-[#2E3138] shadow-md relative hover:bg-[#1A1B1E] transition-colors">
                  <div className="text-5xl text-[#7568FF] absolute top-4 left-4 opacity-20 font-serif">&ldquo;</div>
                  <p className="text-lg text-[#8A8F98] italic mb-8 relative z-10 leading-relaxed pt-2">{t.text}</p>
                  <div>
                    <p className="text-white font-bold">{t.author}</p>
                    <p className="text-[#8A8F98] text-sm">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- L'Offre --- */}
      <section id="offre" className="py-32 px-6 relative overflow-hidden border-t border-[#2E3138]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E] to-black z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7568FF] rounded-full mix-blend-screen blur-[150px] opacity-10 animate-pulse z-0" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="bg-[#141518] border border-[#2E3138] rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden group hover:border-[#7568FF]/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 bg-[#FF6B6B] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-bl-xl shadow-lg">
                Personnalisable
              </div>

              <span className="text-[#7568FF] font-mono text-[11px] uppercase tracking-wider mb-4 block">/// Programme</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Autonomie &amp; Sécurité</h2>
              <p className="text-[#8A8F98] mb-10">Accompagnement opérationnel sur 3 mois<br />Pour dirigeants de PME &amp; PMI (10–90 salariés)</p>

              <div className="flex items-baseline justify-center gap-2 mb-10">
                <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">2 800€</span>
                <span className="text-xl text-[#8A8F98]">HT / mois</span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

              <ul className="text-left space-y-5 mb-12 max-w-md mx-auto">
                {[
                  'Immersion terrain & cartographie des risques',
                  "Planification séquencée des 'disparitions'",
                  'Coaching dirigeant pendant les phases OFF',
                  'Restructuration des processus & délégations',
                  'Disponibilité directe illimitée',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#8A8F98]">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#7568FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openBooking}
                className="w-full md:w-auto px-12 py-5 bg-[#7568FF] text-white font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(117,104,255,0.3)] hover:bg-[#6457E5] hover:shadow-[0_4px_30px_rgba(117,104,255,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                Prendre 45 min
              </button>

              <p className="text-xs text-[#8A8F98] mt-8 leading-relaxed max-w-sm mx-auto">
                Tarif indicatif basé sur ~2j d&apos;implication/mois.
                <br /> Le rythme s&apos;adapte à la maturité de vos équipes.
              </p>
              <p className="text-[13px] text-[#8A8F98] mt-6">
                Pas sûr(e) ? Pas grave. On parle, on voit si ça colle.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-[#2E3138] text-center md:text-left bg-[#0B0C0E] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-white mb-2">
              Liut<span style={{ color: colors.primary }}>.</span>
            </div>
            <p className="text-[#8A8F98] text-sm">Associé opérationnel & stratégique pour dirigeants.</p>
          </div>
          <div className="flex gap-8">
            <a href="https://liut.me/" target="_blank" rel="noopener noreferrer" className="text-[#8A8F98] hover:text-white transition-colors text-sm">
              liut.me
            </a>
            <a href="https://offres.liut.me/" target="_blank" rel="noopener noreferrer" className="text-[#8A8F98] hover:text-white transition-colors text-sm">
              Toutes les offres
            </a>
            <a href="https://www.linkedin.com/in/liut/" target="_blank" rel="noopener noreferrer" className="text-[#8A8F98] hover:text-white transition-colors text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}