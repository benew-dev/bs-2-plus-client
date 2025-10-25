"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react"; // ✅ AJOUT

const ProductItem = ({ product }) => {
  const { user, toggleFavorite } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);
  const { data: session } = useSession(); // ✅ AJOUT - Écouter les changements de session

  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // ✅ AMÉLIORATION - Synchroniser avec user ET session
  useEffect(() => {
    // Utiliser session.user en priorité si disponible, sinon user du contexte
    const currentUser = session?.user || user;

    if (currentUser?.favorites) {
      const favorite = currentUser.favorites.some(
        (fav) => fav.productId?.toString() === product._id?.toString(),
      );
      setIsFavorite(favorite);
    } else {
      setIsFavorite(false);
    }
  }, [session?.user?.favorites, user?.favorites, product._id]); // ✅ Écouter les deux sources

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info("Connectez-vous pour ajouter aux favoris");
      return;
    }

    if (isTogglingFavorite) return;

    try {
      setIsTogglingFavorite(true);

      // ✅ OPTIMISTIC UPDATE LOCAL immédiat
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      // Appeler l'API
      const result = await toggleFavorite(
        product._id,
        product.name,
        product.images?.[0] || { public_id: null, url: null },
        "toggle",
      );

      // ✅ Si échec, revert l'état local
      if (!result.success) {
        setIsFavorite(!newFavoriteState); // Revert
        console.error("❌ Échec de la mise à jour des favoris");
      } else {
        console.log("✅ Favori mis à jour avec succès");
      }
    } catch (error) {
      // ✅ Revert en cas d'erreur
      setIsFavorite(!isFavorite);
      console.error("❌ Error toggling favorite:", error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      addItemToCart({ product: product._id });
      toast.success("Produit ajouté au panier !");
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <article className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/shop/${product._id}`} className="block">
        {/* Image du produit */}
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500 p-3"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-300 text-sm">Pas d'image</div>
            </div>
          )}

          {/* Badge nouveau */}
          {new Date(product.createdAt) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <div className="absolute top-2 left-2 bg-gradient-sunset text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sunset">
              Nouveau
            </div>
          )}

          {/* ✅ Bouton favori avec état visuel immédiat */}
          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite || !user}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              isFavorite
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-white/90 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
            }`}
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            {isTogglingFavorite ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite ? "fill-current" : ""
                }`}
              />
            )}
          </button>
        </div>

        {/* Informations produit */}
        <div className="p-4 space-y-3">
          {/* Nom du produit */}
          <h3 className="font-semibold text-base text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-transparent group-hover:bg-gradient-sunset group-hover:bg-clip-text transition-all">
            {product.name}
          </h3>

          {/* Note et avis */}
          {product.ratings > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-700">
                  {product.ratings.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({product.numOfReviews || 0} avis)
              </span>
            </div>
          )}

          {/* Prix */}
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-transparent bg-gradient-sunset bg-clip-text">
              {product.price.toFixed(2)} €
            </p>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            {product.stock > 0 ? (
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-sunset" />
                En stock ({product.stock})
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                Rupture de stock
              </span>
            )}
          </div>

          {/* Bouton Ajouter au panier */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-sunset text-white rounded-lg hover:shadow-sunset transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none font-medium"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>
              {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
            </span>
          </button>
        </div>
      </Link>
    </article>
  );
};

export default ProductItem;
