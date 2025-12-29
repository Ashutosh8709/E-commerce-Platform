import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Grid2x2 as Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getById } from "../../services/productService";
import { useProducts } from "../../hooks/useProducts";

function ProductListing() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [priceRange, setPriceRange] = useState(250);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { products, pagination, isLoading, isError, error, isFetching } =
    useProducts(page, limit, "public-products");

  const queryClient = useQueryClient();

  const categories = ["Clothing", "Shoes", "Accessories", "Bags", "Jewelry"];

  const colors = [
    { name: "White", value: "white", color: "bg-white" },
    { name: "Black", value: "black", color: "bg-black" },
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Blue", value: "blue", color: "bg-blue-500" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const totalPages = pagination?.totalPages || 1;

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-80 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Price Range
                </h3>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$0</span>
                    <span>${priceRange}+</span>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <label key={color.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 ${
                          color.color
                        } ${
                          selectedColor === color.value
                            ? "ring-2 ring-indigo-500 ring-offset-2"
                            : "border-gray-300"
                        }`}
                      ></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                        }`}
                      >
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  Showing {products.length} products
                  {isFetching && (
                    <span className="ml-2 text-xs text-gray-400">
                      (updating...)
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onMouseEnter={() =>
                    queryClient.prefetchQuery({
                      queryKey: ["product", product._id],
                      queryFn: () => getById(product._id),
                    })
                  }
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h4>
                    <p className="text-indigo-600 font-bold">
                      ₹{product.offeredPrice}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.brand}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductListing;
