import React, { useState } from "react";
import {
  Store,
  Upload,
  MapPin,
  Mail,
  Phone,
  FileText,
  Image,
  ArrowLeft,
  Check,
  AlertCircle,
  PercentCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function SellerRegistrationPage({ onSwitchToLogin, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    gstNumber: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: "Logo file must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, logo: "Please upload an image file" }));
        return;
      }

      setLogoFile(file);
      setErrors((prev) => ({ ...prev, logo: "" }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!formData.name.trim()) {
          newErrors.name = "Store name is required";
        } else if (formData.name.length < 3) {
          newErrors.name = "Store name must be at least 3 characters";
        } else {
          delete newErrors.name;
        }
        break;
      case "description":
        if (formData.description && formData.description.length < 20) {
          newErrors.description =
            "Description should be at least 20 characters";
        } else {
          delete newErrors.description;
        }
        break;
      case "address":
        if (!formData.address.trim()) {
          newErrors.address = "Store address is required";
        } else {
          delete newErrors.address;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        } else if (
          !phoneRegex.test(formData.phone) ||
          formData.phone.replace(/\D/g, "").length < 10
        ) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field);
    });

    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields =
      !formData.name || !formData.address || !formData.email || !formData.phone;

    if (!hasErrors && !hasEmptyFields) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        console.log("Store registration submitted:", {
          ...formData,
          logo: logoFile ? logoFile.name : "No logo",
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSubmitSuccess(true);

        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 2000);
      } catch (error) {
        setSubmitError("Failed to register store. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getInputClassName = (field) => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2";

    if (touched[field] && errors[field]) {
      return `${baseClasses} border-red-400 focus:ring-red-400/50 bg-red-50`;
    } else if (touched[field] && !errors[field] && formData) {
      return `${baseClasses} border-green-400 focus:ring-green-400/50 bg-green-50`;
    } else {
      return `${baseClasses} border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-400/50 bg-white`;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your store has been submitted for review. We'll notify you once it's
            approved and ready to go live.
          </p>
          <button
            onClick={onSwitchToLogin}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Store className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Become a Seller</h1>
                <p className="text-blue-100">
                  Create your store and start selling
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">
                    Registration Failed
                  </h4>
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Store Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name *
                  </label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your store name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("name")}
                      className={`pl-12 ${getInputClassName("name")}`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="description"
                      placeholder="Tell customers about your store..."
                      value={formData.description}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("description")}
                      rows={4}
                      className={`pl-12 ${getInputClassName(
                        "description"
                      )} resize-none`}
                    />
                  </div>
                  {touched.description && errors.description && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Logo
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500 text-center px-2">
                              Upload Logo
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        <Image className="w-4 h-4 inline mr-1" />
                        Upload your store logo
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• JPG, PNG or GIF format</li>
                        <li>• Maximum size: 5MB</li>
                        <li>• Square images work best</li>
                      </ul>
                      {logoFile && (
                        <p className="text-sm text-green-600 mt-2 font-medium">
                          <Check className="w-4 h-4 inline mr-1" />
                          {logoFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {errors.logo && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {errors.logo}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main Street, City, State, ZIP"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("address")}
                      className={`pl-12 ${getInputClassName("address")}`}
                    />
                  </div>
                  {touched.address && errors.address && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Email */}
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="store@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("email")}
                        className={`pl-12 ${getInputClassName("email")}`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-600 text-sm mt-1 ml-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("phone")}
                        className={`pl-12 ${getInputClassName("phone")}`}
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-red-600 text-sm mt-1 ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number *
                  </label>
                  <div className="relative">
                    <PercentCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your GST Number"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("gstNumber")}
                      className={`pl-12 ${getInputClassName("gstNumber")}`}
                    />
                  </div>
                  {touched.gstNumber && errors.gstNumber && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {" "}
                      {errors.gstNumber}{" "}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your store will be reviewed by our team
                before going live. This typically takes 1-2 business days.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Register Store"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have a store?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerRegistrationPage;
