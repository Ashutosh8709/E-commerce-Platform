import React, { useEffect, useState, useMemo } from "react";
import {
  Package,
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
} from "lucide-react";
import { handleError, handleSuccess } from "../../utils";
import { useProducts } from "../../hooks/useProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProd } from "../../services/productService";

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 8;

  const queryClient = useQueryClient();

  const { products, pagination, isLoading } = useProducts(
    page,
    limit,
    "admin-products"
  );

  const loading = isLoading;

  // 🔍 Filter + Sort
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "price") {
        return sortOrder === "asc"
          ? a.offeredPrice - b.offeredPrice
          : b.offeredPrice - a.offeredPrice;
      } else if (sortField === "stock") {
        return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
      }
      return 0;
    });
    return filtered;
  }, [products, search, sortField, sortOrder]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      await deleteProd(id);
    },
    onSuccess: () => {
      handleSuccess("Product deleted");
      queryClient.invalidateQueries(["admin-products"]);
    },
    onError: () => handleError("Failed to delete product"),
  });

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
  };

  const handleEdit = (id) => {
    handleSuccess(`Editing product ${id.slice(-6)}`);
    // open modal or redirect here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 sm:mb-0">
          <Package size={20} /> Products
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button className="px-4 py-2 flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
            <PlusCircle size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border-collapse">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-medium">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={() => toggleSort("name")}
              >
                Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-3">Category</th>
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={() => toggleSort("price")}
              >
                Price{" "}
                {sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={() => toggleSort("stock")}
              >
                Stock{" "}
                {sortField === "stock" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src={p.productImage}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-800 font-medium truncate max-w-[200px]">
                    {p.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600 truncate max-w-[250px]">
                    {p.product_category_tree?.[0]?.split(">>").pop().trim() ||
                      "—"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 font-semibold">
                    ₹{p?.offeredPrice?.toLocaleString() || "Not Given"}
                    <span className="text-gray-400 line-through ml-1 text-xs">
                      ₹{p?.originalPrice?.toLocaleString() || "Not Given"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      p.stock < 10
                        ? "text-red-600"
                        : p.stock < 50
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{p.brand}</td>
                  <td className="px-4 py-2 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(p._id)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
        <div>
          Page {pagination.currentPage || page} of{" "}
          {pagination.totalPages || "?"} — {pagination.totalProducts || 0} total
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg transition ${
              pagination.hasPrevPage
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!pagination.hasNextPage}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg transition ${
              pagination.hasNextPage
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
