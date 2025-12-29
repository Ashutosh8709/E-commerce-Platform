import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  CreditCard as Edit3,
  Trash2,
  Shield,
} from "lucide-react";

function PaymentMethods({}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      cardholderName: "John Doe",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
      cardholderName: "John Doe",
    },
    {
      id: 3,
      type: "American Express",
      last4: "1005",
      expiryMonth: "03",
      expiryYear: "2027",
      isDefault: false,
      cardholderName: "John Doe",
    },
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    // Here you would typically validate and save the card
    console.log("Adding new card:", newCard);
    setShowAddCard(false);
    setNewCard({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
      isDefault: false,
    });
  };

  const setDefaultCard = (id) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const removeCard = (id) => {
    setPaymentMethods((methods) =>
      methods.filter((method) => method.id !== id)
    );
  };

  const getCardIcon = (type) => {
    switch (type) {
      case "Visa":
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
        );
      case "Mastercard":
        return (
          <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
            MC
          </div>
        );
      case "American Express":
        return (
          <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            AMEX
          </div>
        );
      default:
        return (
          <div className="w-12 h-8 bg-gray-400 rounded flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600 mt-2">
            Manage your saved payment methods
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">
                Your payment information is secure
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                We use industry-standard encryption to protect your payment
                details. Your card information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Add New Card Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {method.type} •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear} •{" "}
                      {method.cardholderName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => setDefaultCard(method.id)}
                      className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeCard(method.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Add New Card
              </h2>

              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={newCard.cardholderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={newCard.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Month
                    </label>
                    <select
                      name="expiryMonth"
                      value={newCard.expiryMonth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">MM</option>
                      {Array.from(
                        {
                          length: 12,
                        },
                        (_, i) => (
                          <option
                            key={i + 1}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      name="expiryYear"
                      value={newCard.expiryYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">YYYY</option>
                      {Array.from(
                        {
                          length: 10,
                        },
                        (_, i) => (
                          <option key={i} value={2024 + i}>
                            {2024 + i}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={newCard.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newCard.isDefault}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Add Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No payment methods
            </h3>
            <p className="text-gray-500 mb-6">
              Add a payment method to make checkout faster and easier.
            </p>
            <button
              onClick={() => setShowAddCard(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Add Your First Card
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

export default PaymentMethods;
