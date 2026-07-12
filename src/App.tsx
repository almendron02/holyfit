import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Clock, 
  Utensils, 
  Truck, 
  Heart, 
  Menu, 
  X, 
  Star, 
  Send,
  Sparkles,
  ChevronRight,
  Users,
  Target,
  ArrowLeft,
  Search
} from 'lucide-react';

// Import local high-quality images generated for this site
import steakImg from './assets/images/holy_steak_1783664247929.jpg';
import vegImg from './assets/images/holy_vegetables_1783664260072.jpg';
import storyImg from './assets/images/holy_story_1783783772816.jpg';

const logoImg = 'https://i.imgur.com/Zo972fL.png';
const chefImg = 'https://i.imgur.com/GPnoIR2.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScrollHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollHeader);
  }, [lastScrollY]);

  // Parallax background refs
  const heroRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLDivElement>(null);
  const subscribeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth, noticeable parallax movement for the chef in the hero section
  const chefParallax = useTransform(heroScrollY, [0, 1], ["0px", "180px"]);

  const { scrollYProgress: planesY } = useScroll({
    target: planesRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: subscribeY } = useScroll({
    target: subscribeRef,
    offset: ["start end", "end start"]
  });

  // Significantly stronger, highly visible parallax effects for backgrounds
  const planesParallax = useTransform(planesY, [0, 1], ["-30%", "30%"]);
  const subscribeParallax = useTransform(subscribeY, [0, 1], ["-30%", "30%"]);

  // Interactive plate builder states
  const [protein, setProtein] = useState('Pollo a la Plancha');
  const [carb, setCarb] = useState('Quinoa con Hierbas');
  const [veggie, setVeggie] = useState('Brócoli al Vapor');

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Page routing state: 'home' | 'historia' | 'faq'
  const [currentPage, setCurrentPage] = useState<'home' | 'historia' | 'faq'>('home');
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  // Navigation Items
  const navItems = [
    { id: 'inicio', label: 'inicio' },
    { id: 'nuestra-historia', label: 'nuestra historia' },
    { id: 'arma-tu-plato', label: 'arma tu plato' },
    { id: 'testimonios', label: 'testimonios' },
    { id: 'preguntas-frecuentes', label: 'preguntas frecuentes' },
    { id: 'contacto', label: 'contacto' },
  ];

  // Scrollspy to underline active section
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const item of navItems) {
        if (item.id === 'nuestra-historia' || item.id === 'preguntas-frecuentes') continue;
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'nuestra-historia') {
      setCurrentPage('historia');
      setActiveSection('nuestra-historia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'preguntas-frecuentes') {
      setCurrentPage('faq');
      setActiveSection('preguntas-frecuentes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      setActiveSection(id);
      // Wait for state rendering to complete, then scroll to section
      setTimeout(() => {
        if (id === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 80);
    }
  };

  // Nutrition stats calculation for interactive custom plate
  const getCalories = () => {
    let cal = 380;
    if (protein === 'Salmón Fresco') cal += 120;
    if (protein === 'Res Premium') cal += 90;
    if (carb === 'Camote Asado') cal += 40;
    return cal;
  };

  const getProteinGrams = () => {
    if (protein === 'Pollo a la Plancha') return '42g';
    if (protein === 'Salmón Fresco') return '38g';
    if (protein === 'Res Premium') return '45g';
    return '26g'; // Tofu
  };

  // FAQ Items
  const faqItems = [
    {
      question: '¿Cuáles son las zonas de entrega?',
      answer: 'Atendemos desde Homestead hasta Miami Gardens, ofreciendo una entrega premium y confiable en todo el sur de Florida.'
    },
    {
      question: '¿Cómo se preparan mis comidas?',
      answer: 'Nuestra cocina local utiliza ingredientes frescos y preparación artesanal para garantizar la máxima calidad y sabor.'
    },
    {
      question: '¿Qué horarios tienen disponibles?',
      answer: 'Ofrecemos horarios flexibles para adaptarnos a tu agenda, asegurando que tu comida llegue fresca y en perfectas condiciones.'
    },
    {
      question: '¿Cómo puedo suscribirme?',
      answer: 'Puedes suscribirte fácilmente en nuestra página principal. Elige tu plan mensual o semanal y recibe tus comidas directamente en casa.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#17181D] antialiased selection:bg-[#B6DF6B]/30 select-none">
      
      {/* HEADER / NAVIGATION */}
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          lastScrollY > 20 
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm py-2.5 md:py-4 px-4 md:px-12 lg:px-24' 
            : 'bg-transparent py-3.5 md:py-6 px-4 md:px-12 lg:px-24'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo container */}
          <div 
            onClick={() => handleNav('inicio')}
            className="flex items-center cursor-pointer"
            id="logo"
          >
            <img 
              src={logoImg} 
              alt="holy logo" 
              className="h-11 md:h-16 w-auto object-contain select-none" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav Pill */}
          <nav className="hidden lg:flex items-center bg-white rounded-full px-8 py-3 border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] select-none">
            <ul className="flex items-center gap-8 text-[15px] font-semibold tracking-wide">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="relative py-1 text-[#17181D] hover:text-[#007A3D] transition duration-200 cursor-pointer capitalize"
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#007A3D] rounded-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-full bg-white border border-gray-200 shadow-sm cursor-pointer"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6 text-[#17181D]" />
          </button>
        </div>
      </motion.header>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#17181D]/90 z-[999] backdrop-blur-md flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <img 
              src={logoImg} 
              alt="holy logo" 
              className="h-11 object-contain brightness-0 invert" 
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="my-auto">
            <ul className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-2xl font-bold text-white hover:text-[#B6DF6B] transition capitalize cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Holy Fit Meals.
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <>
          {/* SECTION 1 — HERO */}
          <section 
            id="inicio" 
            ref={heroRef}
            className="relative w-full min-h-[580px] sm:min-h-[720px] lg:h-[750px] xl:h-[810px] bg-[#E6F5CC] overflow-hidden flex flex-col justify-between lg:flex-row lg:items-end lg:justify-start px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-0"
          >
        {/* Left Side: Chef Image */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex items-end justify-center lg:justify-start self-end shrink-0 z-10 overflow-hidden order-2 lg:order-1">
          <motion.img 
            src={chefImg} 
            alt="Chef Holy Fit Meals" 
            className="w-[72%] sm:w-[55%] md:w-[46%] lg:w-[84%] max-h-[520px] lg:max-h-[660px] xl:max-h-[710px] object-contain object-bottom select-none pointer-events-none"
            style={{ y: chefParallax }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Side: Text & CTA */}
        <div className="w-full lg:w-[58%] xl:w-[60%] h-full flex flex-col justify-center pb-8 lg:pb-16 pt-16 lg:pt-12 pl-0 lg:pl-12 xl:pl-20 z-20 text-left order-1 lg:order-2">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-black text-[#17181D] leading-[0.88] tracking-tighter mb-6 md:mb-8"
          >
            construye tu<br />
            salud con<br />
            Holy Fit
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-[25px] leading-relaxed text-[#17181D]/90 font-normal mb-8 md:mb-10 max-w-[760px]"
          >
            Comidas saludables preparadas con excelencia para que el tiempo
            de tu vida se invierta en lo que realmente importa.
          </motion.p>

          <button 
            onClick={() => handleNav('arma-tu-plato')}
            className="bg-[#007A3D] text-white font-bold rounded-full text-base md:text-lg lg:text-[26px] w-full max-w-[280px] md:max-w-[340px] h-[60px] md:h-[74px] flex items-center justify-center shadow-lg transition-all hover:bg-[#006633] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Comienza tu plan
          </button>
        </div>
      </section>

      {/* SECTION 2 — CÓMO FUNCIONA */}
      <section 
        id="como-funciona" 
        className="bg-white pt-8 pb-12 md:pt-16 md:pb-24 lg:pt-20 lg:pb-36 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16 lg:mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-7xl lg:text-[85px] font-black text-[#17181D] tracking-tighter mb-4 md:mb-6"
            >
              Cómo Funciona
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              En Holy Fit Meals diseñamos un proceso artesanal y riguroso para que disfrutes de comida excelente todos los días.
            </motion.p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F7F7F7] rounded-[2rem] p-6 md:p-8 border border-gray-100/80 flex flex-col items-center hover:scale-[1.02] transition duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.01)]"
            >
              <span className="text-[#007A3D] text-[54px] md:text-[80px] lg:text-[100px] font-black leading-none mb-2 md:mb-4 tracking-tighter select-none">
                01
              </span>
              <h3 className="text-lg md:text-xl lg:text-[24px] font-black text-[#17181D] mb-2 md:mb-4 tracking-tight">
                Elige tu plan
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-[280px]">
                Selecciona el plan que mejor se adapte a tus objetivos y estilo de vida.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F7F7F7] rounded-[2rem] p-6 md:p-8 border border-gray-100/80 flex flex-col items-center hover:scale-[1.02] transition duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.01)]"
            >
              <span className="text-[#007A3D] text-[54px] md:text-[80px] lg:text-[100px] font-black leading-none mb-2 md:mb-4 tracking-tighter select-none">
                02
              </span>
              <h3 className="text-lg md:text-xl lg:text-[24px] font-black text-[#17181D] mb-2 md:mb-4 tracking-tight">
                Cocina nuestra
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-[280px]">
                Nuestro equipo prepara tus comidas con la mejor calidad y frescura.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F7F7F7] rounded-[2rem] p-6 md:p-8 border border-gray-100/80 flex flex-col items-center hover:scale-[1.02] transition duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.01)]"
            >
              <span className="text-[#007A3D] text-[54px] md:text-[80px] lg:text-[100px] font-black leading-none mb-2 md:mb-4 tracking-tighter select-none">
                03
              </span>
              <h3 className="text-lg md:text-xl lg:text-[24px] font-black text-[#17181D] mb-2 md:mb-4 tracking-tight">
                Disfruta
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-[280px]">
                Recibe tus comidas listas para disfrutar en tu hogar sin esfuerzo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PLANES DE ALIMENTACIÓN & BENEFITS */}
      <section 
        id="arma-tu-plato" 
        className="bg-white relative overflow-hidden"
      >
        {/* Banner with dark overlay */}
        <div ref={planesRef} className="relative w-full h-[280px] md:h-[400px] lg:h-[480px] flex items-center justify-center select-none overflow-hidden">
          {/* Background Image with Parallax */}
          <motion.img 
            src={vegImg} 
            alt="Planes de Alimentación" 
            className="absolute inset-0 w-full h-[160%] object-cover"
            style={{ y: planesParallax, top: "-30%" }}
            referrerPolicy="no-referrer"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#17181D]/45 z-10"></div>
          
          {/* Centered Text */}
          <div className="relative z-20 text-center px-4 max-w-5xl">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-7xl lg:text-[85px] font-black text-white leading-none tracking-tighter mb-4 md:mb-6"
            >
              Planes de Alimentación
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-xl lg:text-[24px] text-white/95 max-w-4xl mx-auto leading-relaxed"
            >
              Selecciona el plan que mejor se adapte a tus metas fitness y descubre la excelencia en comidas preparadas.
            </motion.p>
          </div>
        </div>

        {/* Split layout: text and cards */}
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
            
            {/* Left Column Heading */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.h3 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-6xl lg:text-[85px] font-black text-[#17181D] leading-[0.9] tracking-tighter mb-4 md:mb-6 text-left"
              >
                Ahorra<br />
                tiempo<br />
                para tus<br />
                metas
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-gray-500 text-sm md:text-lg lg:text-xl max-w-md leading-relaxed"
              >
                Descubre cómo optimizar tus metas diarias con nuestros cuatro pilares de excelencia nutricional.
              </motion.p>
            </div>

            {/* Right Column Benefit Cards - hidden on mobile, visible on md and up */}
            <div className="hidden md:grid lg:col-span-7 grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* Card 1: Saving time */}
              <div className="bg-[#B6DF6B] rounded-[2rem] w-full max-w-[340px] min-h-[120px] py-4 flex items-center gap-4 px-6 shadow-sm border border-black/5 hover:scale-[1.03] transition duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-7 h-7 text-[#007A3D]" />
                </div>
                <div>
                  <h4 className="text-[22px] lg:text-[25px] font-black text-[#17181D] leading-none tracking-tight">
                    Salvando tu<br />tiempo
                  </h4>
                </div>
              </div>

              {/* Card 2: Premium Ingredients */}
              <div className="bg-[#F7C46B] rounded-[2rem] w-full max-w-[340px] min-h-[120px] py-4 flex items-center gap-4 px-6 shadow-sm border border-black/5 hover:scale-[1.03] transition duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Utensils className="w-7 h-7 text-[#FF6A00]" />
                </div>
                <div>
                  <h4 className="text-[22px] lg:text-[25px] font-black text-[#17181D] leading-none tracking-tight">
                    Ingredientes<br />premium
                  </h4>
                </div>
              </div>

              {/* Card 3: Local convenience */}
              <div className="bg-[#FF6A00] rounded-[2rem] w-full max-w-[340px] min-h-[120px] py-4 flex items-center gap-4 px-6 shadow-sm border border-black/5 hover:scale-[1.03] transition duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Truck className="w-7 h-7 text-[#FF6A00]" />
                </div>
                <div>
                  <h4 className="text-[22px] lg:text-[25px] font-black text-white leading-none tracking-tight">
                    Conveniencia<br />local
                  </h4>
                </div>
              </div>

              {/* Card 4: Health Excellence */}
              <div className="bg-[#17181D] rounded-[2rem] w-full max-w-[340px] min-h-[120px] py-4 flex items-center gap-4 px-6 shadow-sm border border-black/5 hover:scale-[1.03] transition duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Heart className="w-7 h-7 text-[#007A3D]" />
                </div>
                <div>
                  <h4 className="text-[22px] lg:text-[25px] font-black text-white leading-none tracking-tight">
                    Excelencia en<br />salud
                  </h4>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* INTERACTIVE PLAN BUILDER "ARMA TU PLATO" */}
        <div className="max-w-7xl mx-auto px-6 pb-24 lg:pb-36">
          <div className="bg-[#F7F7F7] rounded-[3rem] p-8 md:p-12 lg:p-16 border border-gray-100 shadow-sm">
            <div className="max-w-4xl mx-auto">
              
              {/* Selector Header */}
              <div className="text-center mb-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F5CC] text-[#007A3D] text-sm font-semibold mb-4"
                >
                  <Sparkles className="w-4 h-4" /> Personalizador Inteligente
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-5xl font-black text-[#17181D] mb-4 tracking-tight"
                >
                  Arma Tu Plato Ideal
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-gray-500 text-lg"
                >
                  Configura tus ingredientes para conocer el perfil nutricional instantáneo de tu comida ideal.
                </motion.p>
              </div>

              {/* Selection Options - Beautifully stacked on mobile, side-by-side on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {/* Protein Selection */}
                <div className="w-full space-y-4 bg-white p-6 rounded-3xl border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-gray-300 transition duration-200">
                  <span className="block font-bold text-lg text-gray-700">1. Proteína Principal</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Pollo a la Plancha', 'Salmón Fresco', 'Res Premium', 'Tofu Orgánico'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setProtein(opt)}
                        className={`py-3 px-4 rounded-2xl border-2 text-xs md:text-sm font-bold transition-all ${
                          protein === opt 
                            ? 'bg-[#007A3D] text-white border-[#007A3D] shadow-md scale-[1.01]' 
                            : 'bg-white text-gray-700 border-gray-200/80 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Carbohydrate Selection */}
                <div className="w-full space-y-4 bg-white p-6 rounded-3xl border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-gray-300 transition duration-200">
                  <span className="block font-bold text-lg text-gray-700">2. Acompañamiento</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Quinoa con Hierbas', 'Arroz Integral', 'Camote Asado', 'Arroz de Coliflor'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setCarb(opt)}
                        className={`py-3 px-4 rounded-2xl border-2 text-xs md:text-sm font-bold transition-all ${
                          carb === opt 
                            ? 'bg-[#007A3D] text-white border-[#007A3D] shadow-md scale-[1.01]' 
                            : 'bg-white text-gray-700 border-gray-200/80 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vegetable Selection */}
                <div className="w-full space-y-4 bg-white p-6 rounded-3xl border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-gray-300 transition duration-200">
                  <span className="block font-bold text-lg text-gray-700">3. Vegetal Adicional</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Brócoli al Vapor', 'Espárragos Asados', 'Vegetales Mixtos', 'Espinacas al Ajillo'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setVeggie(opt)}
                        className={`py-3 px-4 rounded-2xl border-2 text-xs md:text-sm font-bold transition-all ${
                          veggie === opt 
                            ? 'bg-[#007A3D] text-white border-[#007A3D] shadow-md scale-[1.01]' 
                            : 'bg-white text-gray-700 border-gray-200/80 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Summary Panel */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm max-w-md mx-auto">
                <div className="grid grid-cols-2 divide-x divide-gray-100 text-center">
                  <div className="px-4">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Calorías</span>
                    <span className="text-2xl md:text-3xl font-black text-[#17181D]">{getCalories()} kcal</span>
                  </div>
                  <div className="px-4">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Proteínas</span>
                    <span className="text-2xl md:text-3xl font-black text-[#007A3D]">{getProteinGrams()}</span>
                  </div>
                </div>
              </div>

              {/* CTA Inside Selector */}
              <div className="text-center mt-10">
                <button
                  onClick={() => {
                    const plateDetails = `¡Hola! Me gustaría solicitar el plato personalizado que acabo de armar en el sitio web:\n\n` +
                      `- Proteína: ${protein} (${getProteinGrams()} de proteína)\n` +
                      `- Carbohidrato: ${carb}\n` +
                      `- Vegetal Adicional: ${veggie}\n\n` +
                      `Nutrición estimada: ${getCalories()} kcal.`;
                    setContactMessage(plateDetails);
                    const el = document.getElementById('contacto');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-[#007A3D] text-white text-lg font-bold px-12 py-4.5 rounded-full shadow-md hover:bg-[#006633] transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  Ordenar
                </button>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* SECTION 4 — CTA FOOD BANNER */}
      <section ref={subscribeRef} className="relative w-full h-[280px] md:h-[400px] lg:h-[480px] flex items-center justify-center select-none overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.img 
          src={steakImg} 
          alt="Steak cooked medium-rare close-up background" 
          className="absolute inset-0 w-full h-[160%] object-cover"
          style={{ y: subscribeParallax, top: "-30%" }}
          referrerPolicy="no-referrer"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-[#17181D]/40 z-10"></div>

        {/* Centered Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-black text-white leading-none tracking-tighter mb-4 md:mb-8"
          >
            Suscríbete y Simplifica
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleNav('arma-tu-plato')}
            className="bg-[#007A3D] text-white font-bold rounded-full text-base lg:text-[22px] w-full max-w-[220px] md:max-w-[260px] h-[56px] md:h-[70px] flex items-center justify-center shadow-lg transition-all hover:bg-[#006633] hover:scale-[1.02] active:scale-95 cursor-pointer mx-auto"
          >
            Comienza tu plan
          </motion.button>
        </div>
      </section>

      {/* SECTION — TESTIMONIOS */}
      <section 
        id="testimonios" 
        className="py-24 lg:py-36 bg-[#F7F7F7] px-6 relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Star review */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-400 mb-8 flex justify-center gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-current text-amber-400" />
            ))}
          </motion.div>
          
          <motion.blockquote 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl lg:text-[34px] font-semibold text-[#17181D] leading-relaxed italic mb-8"
          >
            "Holy Fit ha cambiado por completo mi rutina. Las comidas son deliciosas, frescas y me ahorran horas de cocina cada semana."
          </motion.blockquote>
          
          <motion.cite 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="not-italic block"
          >
            <div className="font-bold text-xl text-[#007A3D] tracking-wide">
              Carlos R., Miami, FL
            </div>
            <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-semibold">
              Atleta & Cliente Mensual
            </div>
          </motion.cite>
        </div>
      </section>



      {/* CONTACT SECTION */}
      <section 
        id="contacto" 
        className="py-24 lg:py-32 bg-white px-6 border-t border-gray-100"
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-[60px] font-black text-[#17181D] tracking-tighter mb-4"
            >
              Contacto
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-500 text-lg"
            >
              ¿Listo para comenzar o tienes alguna duda? Envíanos un mensaje y nos pondremos en contacto contigo de inmediato.
            </motion.p>
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert('¡Gracias por escribirnos! Tu solicitud ha sido enviada.'); 
              setContactName('');
              setContactEmail('');
              setContactMessage('');
            }} 
            className="space-y-6 text-left"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
              <input 
                type="text" 
                required 
                placeholder="Tu nombre"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#007A3D] text-lg bg-[#F7F7F7] font-medium transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                required 
                placeholder="tu@correo.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#007A3D] text-lg bg-[#F7F7F7] font-medium transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tu Mensaje</label>
              <textarea 
                rows={6} 
                required 
                placeholder="Cuéntanos qué necesitas (detalles de tu plan, dirección de entrega, etc.)"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-6 py-4 rounded-[1.8rem] border border-gray-200 focus:outline-none focus:border-[#007A3D] text-lg bg-[#F7F7F7] font-medium resize-none transition-all"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#007A3D] text-white font-bold rounded-full h-[70px] flex items-center justify-center text-lg md:text-xl hover:bg-[#006633] transition-all hover:scale-[1.01] active:scale-95 cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              Enviar Mensaje <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
        </>
      )}

      {currentPage === 'historia' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 md:pt-32 pb-24 md:pb-36"
        >
          {/* Subpage Header Banner */}
          <div className="bg-[#E6F5CC] py-16 md:py-24 px-6 text-center select-none mb-16 md:mb-24">
            <div className="max-w-4xl mx-auto">
              <span className="text-[#007A3D] font-bold uppercase tracking-wider text-xs md:text-sm">Conócenos</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#17181D] tracking-tighter mt-3 mb-6">
                Nuestra Historia
              </h1>
              <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                Conoce el nacimiento y trayectoria de un proyecto dedicado a democratizar la nutrición de élite con practicidad y fe.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Split layout: Story text and Story Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
              
              {/* Left Column: Story Text */}
              <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left">
                <div>
                  <span className="text-[#007A3D] font-bold uppercase tracking-wider text-xs md:text-sm">Nuestra Trayectoria</span>
                  <h2 className="text-3xl md:text-5xl lg:text-[56px] font-black text-[#17181D] tracking-tighter mt-2 leading-[0.95]">
                    El Nacimiento de Holy Fit
                  </h2>
                </div>

                <div className="space-y-4 text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                  <p>
                    Nuestra historia comenzó en una mudanza familiar en el sur de Florida. En medio de la organización, mi padre me pidió que le mostrara una de mis comidas preparadas. Su comentario fue simple pero profundo: <span className="font-bold text-[#17181D] italic">"Serías mi primer cliente si comenzaras a venderlas"</span>.
                  </p>
                  <p>
                    Así nació Holy Fit Meals, con el firme propósito de democratizar la nutrición de élite. Integramos salud y practicidad para impulsar tus metas con excelencia. Creemos en brindarte la energía real que exige tu día a día activamente.
                  </p>
                  <p>
                    Desde ese día, nuestro compromiso ha sido el mismo: seleccionar los ingredientes más frescos, diseñar menús equilibrados y ofrecer un servicio impecable. Queremos ser el pilar que sostiene tu disciplina diaria, permitiéndote enfocar tu valioso tiempo en lo que verdaderamente importa en tu vida.
                  </p>
                </div>
              </div>

              {/* Right Column: Story Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 max-w-md w-full">
                  <img 
                    src={storyImg} 
                    alt="El Nacimiento de Holy Fit" 
                    className="w-full h-auto object-cover max-h-[300px] md:max-h-[420px] lg:max-h-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Values Sub-section */}
            <div className="border-t border-gray-100 pt-12 md:pt-16 lg:pt-24">
              <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <h3 className="text-2xl md:text-5xl font-black text-[#17181D] tracking-tighter">
                  Nuestros Valores
                </h3>
                <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto mt-2 md:mt-4">
                  La base de nuestra misión es la integridad y el compromiso con tu bienestar.
                </p>
              </div>

              {/* 4 Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
                {[
                  {
                    title: "Fe",
                    desc: "Confianza y fe en la capacidad de cada persona para alcanzar sus metas.",
                    icon: Sparkles,
                    bgColor: "bg-[#E6F5CC]",
                    iconColor: "text-[#007A3D]",
                  },
                  {
                    title: "Salud",
                    desc: "Alimentación de alta calidad diseñada para nutrir tu cuerpo y mente.",
                    icon: Heart,
                    bgColor: "bg-[#F7C46B]/20",
                    iconColor: "text-[#FF6A00]",
                  },
                  {
                    title: "Familia",
                    desc: "Un servicio humilde que empieza con el apoyo de quienes más amas.",
                    icon: Users,
                    bgColor: "bg-red-50",
                    iconColor: "text-red-500",
                  },
                  {
                    title: "Disciplina",
                    desc: "El compromiso diario con tu bienestar y tu estilo de vida fitness.",
                    icon: Target,
                    bgColor: "bg-gray-100",
                    iconColor: "text-gray-800",
                  }
                ].map((val) => {
                  const IconComponent = val.icon;
                  return (
                    <div
                      key={val.title}
                      className="bg-[#F7F7F7] rounded-[2rem] p-6 md:p-8 text-left border border-gray-100 hover:scale-[1.02] transition duration-200"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${val.bgColor} flex items-center justify-center mb-4 md:mb-6`}>
                        <IconComponent className={`w-6 h-6 ${val.iconColor}`} />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-[#17181D] mb-2 md:mb-3">{val.title}</h4>
                      <p className="text-gray-500 text-xs md:text-sm lg:text-base leading-relaxed">{val.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* CTA card at bottom of story */}
              <div className="bg-[#17181D] text-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-xl">
                <span className="text-[#B6DF6B] font-bold uppercase tracking-wider text-xs md:text-sm">Da el primer paso</span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-6">
                  ¿Listo para transformar tu alimentación?
                </h3>
                <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                  Nuestros planes están estructurados meticulosamente para que logres la consistencia que siempre has deseado.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => handleNav('arma-tu-plato')}
                    className="bg-[#007A3D] text-white font-bold rounded-full px-8 py-4 text-base hover:bg-[#006633] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg w-full sm:w-auto"
                  >
                    Comenzar Plan
                  </button>
                  <button 
                    onClick={() => handleNav('inicio')}
                    className="border border-white/30 text-white font-bold rounded-full px-8 py-4 text-base hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> Volver al Inicio
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}

      {currentPage === 'faq' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 md:pt-32 pb-24 md:pb-36"
        >
          {/* Subpage Header Banner */}
          <div className="bg-[#E6F5CC] py-16 md:py-24 px-6 text-center select-none mb-12 md:mb-16">
            <div className="max-w-4xl mx-auto">
              <span className="text-[#007A3D] font-bold uppercase tracking-wider text-xs md:text-sm">Ayuda & Soporte</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#17181D] tracking-tighter mt-3 mb-6">
                Preguntas Frecuentes
              </h1>
              <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                Encuentra respuestas rápidas e información detallada sobre nuestros planes, preparación y entregas.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6">
            {/* Search Bar for FAQ */}
            <div className="relative mb-12 max-w-xl mx-auto shadow-sm rounded-full">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                placeholder="Busca tu duda (ej. entrega, horario, menú)..."
                className="block w-full pl-12 pr-6 py-4.5 bg-[#F7F7F7] border border-gray-200 rounded-full focus:outline-none focus:border-[#007A3D] focus:ring-1 focus:ring-[#007A3D] text-[#17181D] placeholder-gray-400 font-medium text-base transition-all"
              />
              {faqSearchQuery && (
                <button 
                  onClick={() => setFaqSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 text-sm font-semibold"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Q&A List */}
            <div className="space-y-6 mb-16 md:mb-24">
              {faqItems.filter(item => 
                item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
              ).length > 0 ? (
                faqItems.filter(item => 
                  item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                  item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
                ).map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-8 md:p-10 bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-gray-200 transition-all text-left"
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#17181D] mb-4 flex items-start gap-3">
                      <span className="text-[#007A3D] font-extrabold text-xl">¿</span>
                      <span>{item.question}</span>
                    </h3>
                    <div className="w-full border-t border-gray-100 my-4"></div>
                    <p className="text-sm md:text-lg text-gray-500 leading-relaxed pl-5">
                      {item.answer}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 text-gray-400 font-medium">
                  No encontramos respuestas que coincidan con "{faqSearchQuery}". Intenta con otros términos.
                </div>
              )}
            </div>

            {/* FAQ Help CTA */}
            <div className="bg-[#F7F7F7] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
              <h3 className="text-xl md:text-3xl font-black text-[#17181D] mb-4">
                ¿Aún tienes preguntas?
              </h3>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
                Estamos aquí para ayudarte. Escríbenos directamente y resolveremos cualquier inquietud de inmediato.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => handleNav('contacto')}
                  className="bg-[#007A3D] text-white font-bold rounded-full px-8 py-4 text-sm md:text-base hover:bg-[#006633] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md w-full sm:w-auto"
                >
                  Enviar Mensaje
                </button>
                <button 
                  onClick={() => handleNav('inicio')}
                  className="border border-gray-300 text-gray-700 font-bold rounded-full px-8 py-4 text-sm md:text-base hover:bg-white hover:border-gray-400 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-white"
                >
                  <ArrowLeft className="w-5 h-5" /> Volver al Inicio
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#E6F5CC] py-16 px-6 md:px-12 lg:px-24 border-t border-[#CBE0A4] select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNav('inicio')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img 
              src={logoImg} 
              alt="holy logo" 
              className="h-8 object-contain mix-blend-multiply" 
              referrerPolicy="no-referrer"
            />
            <span className="font-extrabold text-lg text-[#17181D]">Holy Fit Meals</span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold capitalize text-[#17181D]">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="hover:text-[#007A3D] transition duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} Holy Fit Meals. Todos los derechos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}
