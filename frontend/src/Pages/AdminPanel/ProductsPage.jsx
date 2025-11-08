import React, { use } from "react";
import { Package, PlusCircle } from "lucide-react";
import { useAdminData } from "../../hooks/useAdminData";
function ProductsPage() {
  const { products } = useAdminData();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Package size={20} /> Products
      </h2>
      <button className="mb-4 px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
        <PlusCircle size={16} /> Add Product
      </button>
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Category</th>
            <th className="text-left px-4 py-2">Price</th>
            <th className="text-left px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-sm text-gray-800">{p.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{p.category}</td>
              <td className="px-4 py-2 text-sm text-gray-600">₹{p.price}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
