import Image from "next/image";
import Link from "next/link";
import { Truck, RotateCcw, Tag, Headphones, Star, ArrowRight } from "lucide-react";

// ─── Données statiques ────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Sac en cuir véritable",
    category: "Accessoires",
    price: "89.99 €",
    originalPrice: "129.99 €",
    discount: "-31%",
    rating: 4.8,
    reviews: 142,
    image:
      "https://res.cloudinary.com/duzebhr9l/image/upload/v1760797628/buyitnow/products/umzsynq3p8hvaoli8jkc.jpg",
    badge: "Bestseller",
    badgeColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Montre classique",
    category: "Bijoux & Montres",
    price: "59.99 €",
    originalPrice: "89.99 €",
    discount: "-33%",
    rating: 4.6,
    reviews: 87,
    image:
      "https://res.cloudinary.com/duzebhr9l/image/upload/v1760797698/buyitnow/products/hhr6m635axn9nqt0gynw.jpg",
    badge: "Nouveauté",
    badgeColor: "bg-pink-500",
  },
  {
    id: 3,
    name: "Sneakers tendance",
    category: "Chaussures",
    price: "74.99 €",
    originalPrice: "99.99 €",
    discount: "-25%",
    rating: 4.9,
    reviews: 203,
    image:
      "https://res.cloudinary.com/duzebhr9l/image/upload/v1760799305/buyitnow/products/vq8vn3s70cb5wv4is7h0.jpg",
    badge: "Populaire",
    badgeColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Veste en denim",
    category: "Vêtements",
    price: "64.99 €",
    originalPrice: "94.99 €",
    discount: "-32%",
    rating: 4.7,
    reviews: 156,
    image:
      "https://res.cloudinary.com/duzebhr9l/image/upload/v1760863316/buyitnow/products/qesnmyibwgromdien091.jpg",
    badge: "Promo",
    badgeColor: "bg-orange-600",
  },
  {
    id: 5,
    name: "Lunettes de soleil",
    category: "Accessoires",
    price: "39.99 €",
    originalPrice: "59.99 €",
    discount: "-33%",
    rating: 4.5,
    reviews: 94,
    image:
      "https://res.cloudinary.com/duzebhr9l/image/upload/v1760799022/buyitnow/products/rebakyhsr1zfkvz8r4jt.jpg",
    badge: "Coup de cœur",
    badgeColor: "bg-pink-600",
  },
];

const advantages = [
  {
    icon: Truck,
    title: "Livraison rapide",
    description:
      "Commandez avant 14h et recevez votre colis dès le lendemain partout en France.",
    color: "orange",
  },
  {
    icon: RotateCcw,
    title: "Retours gratuits",
    description:
      "Pas satisfait ? Retournez votre commande sous 30 jours, sans frais et sans questions.",
    color: "pink",
  },
  {
    icon: Tag,
    title: "Meilleur prix garanti",
    description:
      "Nous nous alignons sur tout prix inférieur trouvé ailleurs pour le même produit.",
    color: "purple",
  },
  {
    icon: Headphones,
    title: "Support 7j/7",
    description:
      "Notre équipe est disponible tous les jours pour répondre à toutes vos questions.",
    color: "orange",
  },
];

const colorMap = {
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
};

// ─── Sous-composants ──────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "text-orange-400 fill-orange-400"
              : "text-gray-300 fill-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sunset-md transition-all duration-300 hover-lift border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <span
          className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs font-semibold px-2 py-0.5 rounded-full`}
        >
          {product.badge}
        </span>
        <span className="absolute top-2 right-2 bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full shadow">
          {product.discount}
        </span>
      </div>

      {/* Infos */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-base font-bold text-gray-900">
            {product.price}
          </span>
          <span className="text-xs text-gray-400 line-through">
            {product.originalPrice}
          </span>
        </div>

        <Link
          href="/shop"
          className="mt-auto w-full block text-center py-2 text-sm font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
}

function AdvantageCard({ advantage }) {
  const { bg, text } = colorMap[advantage.color];
  const Icon = advantage.icon;
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-sunset transition-all duration-300">
      <div
        className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center mb-4`}
      >
        <Icon className={`w-7 h-7 ${text}`} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        {advantage.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {advantage.description}
      </p>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

const HomeContent = () => {
  return (
    <div className="bg-gray-50">
      {/* ── Section 1 : Nos Coups de Cœur ─────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-[1440px] mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-2">
              Sélection exclusive
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Nos{" "}
              <span className="text-gradient-sunset">Coups de Cœur</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Des produits soigneusement sélectionnés pour vous offrir qualité
              et style au meilleur prix.
            </p>
          </div>

          {/* Grille produits */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bouton voir tout */}
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-sunset text-white font-semibold rounded-lg hover:shadow-sunset-lg hover-lift transition-all"
            >
              Voir tous nos produits
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2 : Pourquoi Buy It Now ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-sunset-light">
        <div className="container max-w-[1440px] mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-pink-600 uppercase tracking-wider mb-2">
              Notre engagement
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Pourquoi choisir{" "}
              <span className="text-gradient-sunset">Buy It Now</span> ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Nous mettons tout en œuvre pour vous offrir une expérience
              shopping irréprochable, de la commande à la livraison.
            </p>
          </div>

          {/* Grille avantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <AdvantageCard key={index} advantage={advantage} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 : Bannière CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-[1440px] mx-auto px-4">
          <div className="relative bg-gradient-sunset rounded-2xl overflow-hidden">
            {/* Décorations d'arrière-plan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-16 py-14">
              {/* Texte */}
              <div className="text-center md:text-left text-white">
                <p className="text-sm font-medium uppercase tracking-wider text-white/80 mb-2">
                  Offre de bienvenue
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Jusqu'à{" "}
                  <span className="text-yellow-300">-40%</span> sur vos
                  premières commandes
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  Inscrivez-vous aujourd'hui et profitez de promotions
                  exclusives réservées à nos nouveaux membres.
                </p>
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-lg hover-lift text-center whitespace-nowrap"
                >
                  Créer un compte
                </Link>
                <Link
                  href="/shop"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-center whitespace-nowrap"
                >
                  Explorer la boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
