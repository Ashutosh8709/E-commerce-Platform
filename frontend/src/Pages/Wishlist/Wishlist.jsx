import React, { useState } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlistQuery";

function Wishlist() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { wishlist, removeFromWishlist, addToCart } = useWishlist();

  const renderStars = (rating = 4.5) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlist !== undefined ? (
              <>
                {wishlist.length} item
                {wishlist.length !== 1 ? "s" : ""} saved for later
              </>
            ) : (
              "No items saved for later"
            )}
          </p>
        </div>

        {wishlist !== undefined && wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                  {!item.stock && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  {renderStars(5)}

                  <div className="flex items-center gap-2 mt-3 mb-4">
                    <span className="text-xl font-bold text-indigo-600">
                      ${item.offeredPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(
                        ((item.originalPrice - item.offeredPrice) /
                          item.originalPrice) *
                          100
                      )}
                      % off
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item.productId)}
                      disabled={!item.stock}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        item.stock
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {item.stock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Save items you love to your wishlist and shop them later.
            </p>
            <button
              // onClick={
              // 	onSwitchToProducts
              // }
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </main>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default Wishlist;
