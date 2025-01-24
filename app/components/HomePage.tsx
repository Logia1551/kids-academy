"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText, Globe, Play, Book, Trophy, Snowflake, Star, BookOpen, Palette } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Enhanced color gradient function for dynamic styling
const generateGradient = (color1: string, color2: string) => 
  `linear-gradient(45deg, ${color1}, ${color2})`;

// Define a type for section content
type SectionContent = {
  title: string;
  content: string[];
  icon: React.ReactElement;
  backgroundGradient: string;
  detailList: { icon: React.ReactElement; title: string; description: string }[];
};

// Define a type for sections
type Sections = {
  [key in 'lkpd' | 'budaya']: SectionContent;
};

// Snowflake Particle Component
const SnowflakeParticle = ({ x, y, size, delay, duration }: { 
  x: number, 
  y: number, 
  size: number, 
  delay: number, 
  duration: number 
}) => {
  return (
    <motion.div
      initial={{ 
        y: -50, 
        x: x,
        opacity: 0.7,
        scale: 0.5
      }}
      animate={{ 
        y: window.innerHeight + 50,
        x: x + (Math.random() * 100 - 50),
        opacity: [0.7, 0.4, 0],
        rotate: 360
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: 'fixed',
        zIndex: 50,
        color: 'rgba(255,255,255,0.8)',
        pointerEvents: 'none'
      }}
    >
      <Snowflake 
        size={size} 
        className="opacity-50" 
        strokeWidth={1}
      />
    </motion.div>
  );
};

// Snow Background Component
const SnowBackground = () => {
  const [snowflakes, setSnowflakes] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const snowflakeCount = 50;
      const newSnowflakes = Array.from({ length: snowflakeCount }).map((_, index) => {
        const x = Math.random() * window.innerWidth;
        const size = Math.random() * 15 + 5;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 10;

        return (
          <SnowflakeParticle 
            key={`snowflake-${index}`}
            x={x}
            y={0}
            size={size}
            delay={delay}
            duration={duration}
          />
        );
      });

      setSnowflakes(newSnowflakes);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes}
    </div>
  );
};

const HomePage = () => {
  // Enhanced Color Palettes with Gradients
  const colorSchemes = {
    mipa: {
      primary: '#3498DB',
      secondary: '#48D1CC',
      accent: '#2C3E50',
      background: '#FFFFFF',
      gradient: generateGradient('#3498DB', '#48D1CC')
    },
    budayaPendidikan: {
      primary: '#8E44AD',
      secondary: '#F5D6BA',
      accent: '#7F8C8D',
      background: '#F5F5F5',
      gradient: generateGradient('#8E44AD', '#F5D6BA')
    }
  };

  const [activeSection, setActiveSection] = useState<'lkpd' | 'budaya'>('lkpd');
  const [isSnowEnabled, setIsSnowEnabled] = useState(true);

  // Scroll Animation Variants
  const scrollAnimationVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 120,
        damping: 10,
        duration: 0.6
      }
    }
  };

  const sections: Sections = {
    lkpd: {
      title: 'Lembar Kerja Peserta Didik (LKPD)',
      content: [
        'Panduan praktis untuk kegiatan belajar mandiri',
        'Membantu siswa mengembangkan keterampilan praktis',
        'Dirancang sesuai kurikulum pendidikan terkini',
        'Tersedia dalam berbagai mata pelajaran'
      ],
      icon: <FileText 
        className="w-24 h-24 drop-shadow-lg hover:rotate-12 transition-transform" 
        style={{
          color: colorSchemes.mipa.primary,
          background: `radial-gradient(circle, ${colorSchemes.mipa.secondary}40, transparent 70%)`,
          borderRadius: '50%',
          padding: '20px'
        }} 
      />,
      backgroundGradient: generateGradient('#3498DB20', '#48D1CC20'),
      detailList: [
        {
          icon: <Star className="w-12 h-12 text-blue-500" />,
          title: 'Materi Berkualitas',
          description: 'Konten LKPD disusun oleh tim ahli pendidikan'
        },
        {
          icon: <BookOpen className="w-12 h-12 text-green-500" />,
          title: 'Interaktif',
          description: 'Desain yang memudahkan siswa belajar mandiri'
        }
      ]
    },
    budaya: {
      title: 'Tradisi Budaya Bali',
      content: [
        'Menjelajahi keunikan tradisi masyarakat Bali',
        'Memahami makna simbolik setiap upacara',
        'Menghargai kearifan lokal Nusantara',
        'Pengalaman belajar yang mendalam'
      ],
      icon: <Globe 
        className="w-24 h-24 drop-shadow-lg hover:rotate-6 transition-transform" 
        style={{
          color: colorSchemes.budayaPendidikan.primary,
          background: `radial-gradient(circle, ${colorSchemes.budayaPendidikan.secondary}40, transparent 70%)`,
          borderRadius: '50%',
          padding: '20px'
        }} 
      />,
      backgroundGradient: generateGradient('#8E44AD20', '#F5D6BA20'),
      detailList: [
        {
          icon: <Palette className="w-12 h-12 text-purple-500" />,
          title: 'Ragam Budaya',
          description: 'Menyajikan keberagaman budaya Nusantara'
        },
        {
          icon: <Globe className="w-12 h-12 text-indigo-500" />,
          title: 'Perspektif Global',
          description: 'Memahami konteks budaya dalam skala global'
        }
      ]
    }
  };

  const features = [
    {
      icon: <Play 
        className="w-16 h-16 transition-all hover:scale-110" 
        style={{
          color: colorSchemes.mipa.primary,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
        }} 
      />,
      title: 'Video Interaktif',
      description: 'Pelajaran menarik dengan video animasi'
    },
    {
      icon: <Book 
        className="w-16 h-16 transition-all hover:scale-110" 
        style={{
          color: colorSchemes.mipa.secondary,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
        }} 
      />,
      title: 'Modul Belajar',
      description: 'Materi lengkap dan terstruktur'
    },
    {
      icon: <Trophy 
        className="w-16 h-16 transition-all hover:scale-110" 
        style={{
          color: colorSchemes.budayaPendidikan.primary,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
        }} 
      />,
      title: 'Tantangan Belajar',
      description: 'Kuis dan permainan edukatif'
    }
  ];

  const budayaTraditions = [
    {
      title: 'Meamuk-amukan',
      description: 'Tradisi dari Desa Padangbulia, Sukasada, Buleleng, dilakukan menjelang Hari Raya Nyepi. Tradisi ini melibatkan dua orang yang seolah-olah berkelahi dengan menyemburkan api dari daun kelapa kering yang diikat menyerupai sapu.',
      image: '/meamuk.jpg'
    },
    {
      title: 'Ayunan Jantra',
      description: 'Tradisi di Desa Tenganan Pegringsingan, Karangasem, dilakukan setelah Perang Pandan. Ayunan ini melibatkan remaja laki-laki dan perempuan dalam kegiatan simbolik tentang kesiapan menghadapi kehidupan yang beragam.',
      image: '/jantra.jpg'
    },
    {
      title: 'Mageret Pandan',
      description: 'Upacara perang pandan yang menggunakan daun pandan berduri sebagai simbol gada. Diadakan di Desa Tenganan pada bulan kelima kalender Bali, melibatkan berbagai generasi dari anak-anak hingga orang tua dalam pertarungan simbolik.',
      image: '/mageret.jpg'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative"
      style={{ 
        backgroundColor: colorSchemes.mipa.background,
        backgroundImage: `radial-gradient(circle at top left, ${colorSchemes.mipa.secondary}20, transparent 50%)` 
      }}
    >
      {/* Snow Toggle Button */}
      <motion.button
        onClick={() => setIsSnowEnabled(!isSnowEnabled)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          backgroundColor: 'rgba(255,255,255,0.2)',
          padding: '10px',
          borderRadius: '50%'
        }}
      >
        <Snowflake 
          color={isSnowEnabled ? 'white' : 'gray'} 
          fill={isSnowEnabled ? 'white' : 'transparent'}
        />
      </motion.button>

      {/* Snow Background (Conditionally Rendered) */}
      <AnimatePresence>
        {isSnowEnabled && <SnowBackground />}
      </AnimatePresence>

      {/* [Rest of the component remains the same as in previous submission] */}
      {activeSection === 'budaya' && (
        <motion.div 
          key="budaya-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
          style={{ 
            background: sections[activeSection].backgroundGradient,
            borderRadius: '20px',
            padding: '30px'
          }}
        >
          {/* Title with solid background */}
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-bold py-4"
              style={{ 
                backgroundColor: colorSchemes.budayaPendidikan.primary,
                color: 'white',
                borderRadius: '10px'
              }}
            >
              {sections[activeSection].title}
            </h2>
          </div>

          {/* Tradition Boxes */}
          <div className="grid md:grid-cols-2 gap-8">
            {budayaTraditions.map((tradition, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="grid grid-cols-2 gap-4 p-6 rounded-xl"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px rgba(142, 68, 173, 0.1)',
                  borderLeft: `5px solid ${colorSchemes.budayaPendidikan.primary}`
                }}
              >
                {/* Image */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl overflow-hidden"
                >
                  <Image 
                    src={tradition.image} 
                    alt={tradition.title} 
                    width={400} 
                    height={400} 
                    className="object-cover w-full h-full aspect-square"
                  />
                </motion.div>

                {/* Description */}
                <div className="flex flex-col justify-center pl-4">
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colorSchemes.budayaPendidikan.primary }}
                  >
                    {tradition.title}
                  </h3>
                  <p 
                    className="text-base"
                    style={{ color: colorSchemes.budayaPendidikan.accent }}
                  >
                    {tradition.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

{/* Features Section */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  style={{ backgroundColor: colorSchemes.budayaPendidikan.background }}
  className="py-16"
>
  <motion.h2 
    variants={scrollAnimationVariants}
    className="text-3xl font-bold text-center mb-12"
    style={{ color: colorSchemes.budayaPendidikan.accent }}
  >
    Mengapa Pilih Kami?
  </motion.h2>
  <motion.div 
    variants={scrollAnimationVariants}
    className="container mx-auto px-4 grid md:grid-cols-3 gap-8"
  >
    {features.map((feature, index) => (
      <motion.div 
        key={index}
        variants={scrollAnimationVariants}
        whileHover={{ scale: 1.05 }}
        style={{
          backgroundColor: colorSchemes.budayaPendidikan.secondary,
          color: colorSchemes.budayaPendidikan.accent
        }}
        className="p-8 rounded-xl text-center hover:shadow-xl transition"
      >
        <div className="flex justify-center mb-6">{feature.icon}</div>
        <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
        <p>{feature.description}</p>
      </motion.div>
    ))}
  </motion.div>
</motion.section>

{/* Footer */}
<footer 
  className="py-12"
  style={{ 
    backgroundColor: colorSchemes.mipa.accent,
    color: 'white' 
  }}
>
  <div className="container mx-auto px-4 text-center">
    <p>&copy; 2024 Kids Academy. Hak Cipta Dilindungi.</p>
  </div>
</footer>
</motion.div>
);
};

export default HomePage;