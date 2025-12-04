import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Clock,
  Tag,
  TrendingUp,
  Sparkles,
  Zap,
} from "lucide-react";
import { getNew, getById } from "../../services/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function DealsNewArrivalsPage() {
  const [activeTab, setActiveTab] = useState("deals");

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => getNew(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["newProducts"],
      queryFn: () => getNew(),
    });
  }, [queryClient]);

  const newArrivals = data?.data?.data || [];

  const hotDeals = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      originalPrice: 299.99,
      salePrice: 149.99,
      discount: 50,
      image:
        "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "2 hours",
      category: "Electronics",
      badge: "Hot Deal",
    },
    {
      id: 2,
      name: "Designer Leather Jacket",
      originalPrice: 499.99,
      salePrice: 299.99,
      discount: 40,
      image:
        "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "5 hours",
      category: "Fashion",
      badge: "Limited",
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      originalPrice: 399.99,
      salePrice: 199.99,
      discount: 50,
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "1 day",
      category: "Wearables",
      badge: "Flash Sale",
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      originalPrice: 899.99,
      salePrice: 599.99,
      discount: 33,
      image:
        "https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "3 days",
      category: "Photography",
      badge: "Deal",
    },
    {
      id: 5,
      name: "Modern Coffee Maker",
      originalPrice: 199.99,
      salePrice: 99.99,
      discount: 50,
      image:
        "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "12 hours",
      category: "Home",
      badge: "Hot Deal",
    },
    {
      id: 6,
      name: "Gaming Mouse Pro",
      originalPrice: 129.99,
      salePrice: 64.99,
      discount: 50,
      image:
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
      timeLeft: "8 hours",
      category: "Gaming",
      badge: "Flash Sale",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative mb-10 h-64 rounded-2xl overflow-hidden flex items-center justify-center text-white bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(79, 70, 229, 0.8), rgba(124, 58, 237, 0.8)), url("https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200")',
          }}
        >
          <div className="text-center space-y-4 px-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Amazing Deals & Latest Arrivals
            </h1>
            <p className="text-lg md:text-xl">
              Discover exclusive offers and newest additions to our collection
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("deals")}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
              activeTab === "deals"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
            }`}
          >
            <Tag className="w-5 h-5" />
            Hot Deals
            {activeTab === "deals" && <Zap className="w-4 h-4 animate-pulse" />}
          </button>

          <button
            onClick={() => setActiveTab("new-arrivals")}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
              activeTab === "new-arrivals"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            New Arrivals
            {activeTab === "new-arrivals" && (
              <TrendingUp className="w-4 h-4 animate-pulse" />
            )}
          </button>
        </div>

        {activeTab === "deals" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-7 h-7 text-orange-500" />
                Flash Deals - Limited Time Only
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Deals ending soon</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {deal.discount}% OFF
                    </div>

                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {deal.badge}
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-lg">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors shadow-lg">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      {deal.timeLeft} left
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {deal.category}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">
                      {deal.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-indigo-600">
                        ${deal.salePrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${deal.originalPrice}
                      </span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        Save ${(deal.originalPrice - deal.salePrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border-2 border-orange-100">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-center gap-2 text-orange-600">
                  <Zap className="w-8 h-8 animate-pulse" />
                  <h3 className="text-2xl font-black">
                    More Deals Coming Soon
                  </h3>
                </div>
                <p className="text-gray-700">
                  Subscribe to get notified about exclusive flash sales and
                  special offers
                </p>
                <button
                  // onClick={onSwitchToSignup}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg text-base font-bold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                >
                  Get Notified
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "new-arrivals" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-indigo-600" />
                Just Arrived - Fresh & Trending
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Updated daily</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.productImage}
                      alt={item.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Just In
                    </div>

                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-lg">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="inline-block text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-indigo-600">
                        &#8377;{item.offeredPrice}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {item.stock > 0 ? "In Stock" : "Out Of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border-2 border-indigo-100">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-center gap-2 text-indigo-600">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <h3 className="text-2xl font-black">Stay Ahead of Trends</h3>
                </div>
                <p className="text-gray-700">
                  Be the first to know when new products arrive in our store
                </p>
                <button
                  // onClick={onSwitchToProducts}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg text-base font-bold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                >
                  Browse All Products
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default DealsNewArrivalsPage;
