import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddress } from "../../hooks/useAddressQuery";
import { useCart } from "../../hooks/useCartQuery";
import { handleError } from "../../utils";
import { useOrder } from "../../hooks/useOrderQuery";

function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const { addresses } = useAddress();
  const { cart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!selectedAddress) {
      handleError("Please select a shipping address");
      return;
    }

    try {
      placeOrder(selectedAddress);
    } catch (err) {
      handleError("Failed to place order");
      navigate("/cart");
    }
  };

  const finalAmount = cart?.totalAmount - cart?.discount + 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                to={"/cart"}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                Cart
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>

            <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>

            {/* Shipping Address */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Shipping Address
              </h3>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <label
                    key={address._id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition-all ${
                      selectedAddress === address._id
                        ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping-address"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAddress === address._id
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAddress === address._id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {address.label}
                        </span>
                        <p className="text-sm text-gray-600">
                          {address.street},{address.city},{address.country}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Link to={"/address"}>Add New Address</Link>
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${cart.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium text-gray-900">
                    $5.00
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-600">Discount</span>
                  <span className="text-sm font-medium text-green-600">
                    ${cart.discount}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    ${finalAmount}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Place Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
