"use client";

import Link from "next/link";
import { ShoppingBag, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { CldImage } from "next-cloudinary";

const Hero = ({ homePageData }) => {
  // Valeurs par défaut si pas de données
  const defaultData = {
    title: "Bienvenue sur Buy It Now",
    subtitle: "Votre destination shopping de confiance",
    text: "Découvrez des milliers de produits de qualité à des prix imbattables",
    image: null,
  };

  const heroData = homePageData || defaultData;
  const hasImage = heroData.image && heroData.image.publicId;

  return (
    <section className="relative overflow-hidden bg-gradient-sunset-lighter">
      {/* Animated Background avec couleurs Sunset */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container max-w-[1440px] mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                <span className="text-gradient-sunset">{heroData.title}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2">
                {heroData.subtitle}
              </p>
              <p className="text-lg text-gray-600">{heroData.text}</p>
            </div>

            {/* CTA Buttons avec gradient */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/shop"
                className="group px-8 py-4 bg-gradient-sunset text-white font-semibold rounded-lg hover:shadow-sunset-lg transition-all shadow-sunset flex items-center justify-center transform hover:-translate-y-1"
              >
                Parcourir la boutique
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gradient-sunset-soft transition-all shadow-lg border-2 border-transparent hover:border-gradient-sunset flex items-center justify-center"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          {/* Image Hero */}
          <div className="flex-1 relative z-10">
            <div className="relative rounded-3xl overflow-hidden shadow-sunset-lg">
              {/* Gradient overlay sunset */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-pink-500/20 to-transparent z-10"></div>

              <div className="relative w-full h-[500px] lg:h-[600px]">
                {hasImage ? (
                  <CldImage
                    src={heroData.image.publicId}
                    alt={heroData.title}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                ) : (
                  <img
                    src="/images/eiffel-tower.jpg"
                    alt="Buy It Now"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Badge avec gradient */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sunset">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-sunset flex items-center justify-center flex-shrink-0 glow-sunset">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gradient-sunset">
                        Expérience Premium
                      </p>
                      <p className="text-xs text-gray-600">
                        Shopping de qualité supérieure
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border glow avec couleurs sunset */}
              <div className="absolute inset-0 border-2 border-orange-300/30 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator avec gradient */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#wave-gradient)"
          />
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
