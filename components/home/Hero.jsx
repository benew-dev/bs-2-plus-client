"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useSwipeable } from "react-swipeable";

const Hero = ({ homePageData }) => {
  console.log("Data", homePageData);
  // États pour le carrousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Valeurs par défaut si pas de données
  const defaultSections = [
    {
      title: "Bienvenue sur Buy It Now",
      subtitle: "Votre destination shopping de confiance",
      text: "Découvrez des milliers de produits de qualité à des prix imbattables",
      image: null,
    },
  ];

  // Récupérer les sections depuis homePageData
  const sections = useMemo(() => {
    if (
      !homePageData ||
      !homePageData.sections ||
      homePageData.sections.length === 0
    ) {
      return defaultSections;
    }
    return homePageData.sections;
  }, [homePageData]);

  const totalSlides = sections.length;

  // Auto-scroll toutes les 5 secondes
  useEffect(() => {
    if (!isAutoScrolling || totalSlides <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (prevSlide >= totalSlides - 1) {
          return 0;
        }
        return prevSlide + 1;
      });
    }, 5000); // 5 secondes

    return () => clearInterval(interval);
  }, [isAutoScrolling, totalSlides]);

  // Réactiver l'auto-scroll après 10 secondes d'inactivité
  useEffect(() => {
    if (!isAutoScrolling) {
      const timeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isAutoScrolling]);

  // Handlers de swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
        setIsAutoScrolling(false);
      }
    },
    onSwipedRight: () => {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
        setIsAutoScrolling(false);
      }
    },
    onSwiping: () => {
      setIsAutoScrolling(false);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 50,
    swipeDuration: 500,
    rotationAngle: 15,
  });

  // Navigation handlers
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoScrolling(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    setIsAutoScrolling(false);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    setIsAutoScrolling(false);
  }, [totalSlides]);

  // Section actuelle
  const currentSection = sections[currentSlide];
  const hasImage =
    currentSection?.image &&
    (currentSection.image.publicId || currentSection.image.public_id);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative container max-w-[1440px] mx-auto px-4 py-16 md:py-24">
        {/* Carrousel avec swipe */}
        <div {...handlers} className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              {/* Main Title */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 transition-all duration-500">
                  {currentSection?.title || "Bienvenue sur Buy It Now"}
                </h1>
                <p className="text-xl md:text-2xl text-orange-600 font-semibold mb-2 transition-all duration-500">
                  {currentSection?.subtitle ||
                    "Votre destination shopping de confiance"}
                </p>
                <p className="text-lg text-gray-600 transition-all duration-500">
                  {currentSection?.text ||
                    "Découvrez des milliers de produits de qualité"}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="group px-8 py-4 bg-gradient-sunset text-white font-semibold rounded-lg hover:shadow-sunset-lg hover-lift transition-all flex items-center justify-center"
                >
                  Parcourir la boutique
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-md border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center"
                >
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Image Hero avec transition */}
            <div className="flex-1 relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-sunset-lg">
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10"></div>

                <div className="relative w-full h-[500px] lg:h-[600px] transition-all duration-500">
                  {hasImage ? (
                    <CldImage
                      src={
                        currentSection.image.publicId ||
                        currentSection.image.public_id
                      }
                      alt={currentSection.title || "Buy It Now"}
                      fill
                      className="object-cover transition-opacity duration-500"
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    />
                  ) : (
                    <img
                      src="/images/eiffel-tower.jpg"
                      alt="Buy It Now"
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows (visible seulement si plusieurs sections) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Section précédente"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Section suivante"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Dots Navigation (visible seulement si plusieurs sections) */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2 z-10 relative">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "bg-orange-600 w-8 h-3"
                    : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                }`}
                aria-label={`Aller à la section ${index + 1}`}
                aria-current={index === currentSlide ? "true" : "false"}
              />
            ))}
          </div>
        )}

        {/* Indicateur de section (texte) */}
        {totalSlides > 1 && (
          <div className="text-center mt-4 z-10 relative">
            <p className="text-sm text-gray-500">
              Section {currentSlide + 1} / {totalSlides}
            </p>
          </div>
        )}
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
