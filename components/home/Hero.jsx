"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, TrendingUp, Shield, Zap } from "lucide-react";
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
    <section className="relative overflow-hidden bg-white">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative container max-w-[1440px] mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {heroData.title}
              </h1>
              <p className="text-xl md:text-2xl text-orange-600 font-semibold mb-2">
                {heroData.subtitle}
              </p>
              <p className="text-lg text-gray-600">{heroData.text}</p>
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

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-xs font-medium text-gray-600">
                  Prix compétitifs
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <p className="text-xs font-medium text-gray-600">
                  Paiement sécurisé
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xs font-medium text-gray-600">
                  Livraison rapide
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                  <ShoppingBag className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-xs font-medium text-gray-600">
                  Support 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Image Hero */}
          <div className="flex-1 relative z-10">
            <div className="relative rounded-2xl overflow-hidden shadow-sunset-lg">
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

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

              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-sunset flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-600">
                        Expérience Premium
                      </p>
                      <p className="text-xs text-gray-600">
                        Shopping de qualité supérieure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
