import { useState, useEffect } from "react";
import { Store, Package, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function SellerStorePage() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: "",
  });

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      loadProducts(selectedStore.id);
    }
  }, [selectedStore]);

  const loadStores = async () => {
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStores(data || []);
    } catch (error) {
      console.error("Error loading stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (storeId) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", storeId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!selectedStore) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            ...productForm,
            store_id: selectedStore.id,
            price: parseFloat(productForm.price),
            stock: parseInt(productForm.stock),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setProducts([data, ...products]);
      setShowProductForm(false);
      setProductForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image_url: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.("home")}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              Seller Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Your Stores
            </h2>
            <div className="space-y-3">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedStore?.id === store.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <h3 className="font-semibold text-slate-900">{store.name}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {store.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedStore ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Products - {selectedStore.name}
                  </h2>
                  {!showProductForm && (
                    <button
                      onClick={() => setShowProductForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Plus size={18} />
                      Add Product
                    </button>
                  )}
                </div>

                {showProductForm && (
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Add New Product
                    </h3>
                    <form onSubmit={handleCreateProduct} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Price ($) *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={productForm.price}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                price: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Category *
                          </label>
                          <select
                            required
                            value={productForm.category}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                category: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home & Kitchen">
                              Home & Kitchen
                            </option>
                            <option value="Books">Books</option>
                            <option value="Sports">Sports</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Toys">Toys</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Stock *
                          </label>
                          <input
                            type="number"
                            required
                            value={productForm.stock}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                stock: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={productForm.image_url}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              image_url: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/product.jpg"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Add Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {products.length === 0 && !showProductForm ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Package
                      size={48}
                      className="mx-auto text-slate-400 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No Products Yet
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Add your first product to start selling
                    </p>
                    <button
                      onClick={() => setShowProductForm(true)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-900">
                              {product.name}
                            </h3>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-slate-900">
                              ${product.price}
                            </span>
                            <div className="text-sm text-slate-600">
                              Stock: {product.stock}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Store size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Select a Store
                </h3>
                <p className="text-slate-600">
                  Choose a store from the left to manage its products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
