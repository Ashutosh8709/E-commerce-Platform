import React, { useState } from "react";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

function HelpSupport({}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqData = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll find tracking information and real-time updates on your order status. You can also use the tracking number sent to your email.',
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. To initiate a return, go to your order history and select "Return Item". Some restrictions apply to certain product categories.',
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination. You'll receive tracking information once your order ships.",
    },
    {
      id: 4,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties and taxes, which are the responsibility of the customer.",
    },
    {
      id: 5,
      question: "How can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. Once an order has been processed for shipping, changes may not be possible. Please contact us as soon as possible for assistance.",
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and various digital wallets. All payments are processed securely using industry-standard encryption.",
    },
    {
      id: 7,
      question: "How do I create an account?",
      answer:
        'Click on the "Sign Up" button in the top right corner of our website. Fill in your email address, create a password, and provide some basic information. You\'ll receive a confirmation email to verify your account.',
    },
    {
      id: 8,
      question: "Is my personal information secure?",
      answer:
        "Yes, we take your privacy and security seriously. We use SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent. Read our Privacy Policy for more details.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or get in touch with our support
            team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, order issues, returns..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    <p className="text-sm text-gray-500">Available 24/7</p>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phone Support
                    </h3>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  1-800-SWIFT-CART
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email Support
                    </h3>
                    <p className="text-sm text-gray-500">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <p className="text-gray-900">support@swiftcart.com</p>
              </div>
            </div>
          </div>

          {/* FAQ and Contact Form */}
          <div className="lg:col-span-2 space-y-12">
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <Minus className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order-issue">Order Issue</option>
                      <option value="return-refund">Return & Refund</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="account">Account Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Please describe your issue or question in detail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-900">
                Track Order
              </span>
            </button>
            <button className="flex items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-900">
                Return Item
              </span>
            </button>
            <button className="flex items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-900">
                Size Guide
              </span>
            </button>
            <button className="flex items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-900">
                Shipping Info
              </span>
            </button>
          </div>
        </div>
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

export default HelpSupport;
