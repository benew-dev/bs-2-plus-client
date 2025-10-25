import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-auto relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>

      <div className="container max-w-[1440px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient-sunset">
              Buy It Now
            </h3>
            <p className="text-gray-300 text-sm">
              Votre destination pour le shopping en ligne de qualité. Découvrez
              notre vaste sélection de produits à des prix compétitifs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-transparent hover:bg-gradient-sunset hover:bg-clip-text transition-all"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/me"
                  className="text-gray-300 hover:text-transparent hover:bg-gradient-sunset hover:bg-clip-text transition-all"
                >
                  Mon compte
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-transparent hover:bg-gradient-sunset hover:bg-clip-text transition-all"
                >
                  Panier
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Nous contacter</h3>
            <address className="text-gray-300 text-sm not-italic space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-orange-400">📧</span>
                Email: contact@buyitnow.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-pink-400">📞</span>
                Téléphone: +33 1 23 45 67 89
              </p>
            </address>
          </div>
        </div>

        {/* Border avec gradient */}
        <div className="mt-8 pt-6 border-t border-gradient-sunset">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Buy It Now. Tous droits réservés.
            <span className="ml-2 text-transparent bg-gradient-sunset bg-clip-text font-semibold">
              Made with ❤️
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
