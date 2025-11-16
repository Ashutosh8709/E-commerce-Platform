import { useState } from "react";
import {
  Store,
  MapPin,
  Mail,
  Phone,
  FileText,
  Check,
  AlertCircle,
  PercentCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../../services/sellerService";
import { handleSuccess, handleError } from "../../utils";

function SellerRegistrationPage() {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    email: "",
    phone: "",
    gstNumber: "",
  });
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

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "storeName":
        if (!formData.storeName.trim()) {
          newErrors.storeName = "Store name is required";
        } else if (formData.storeName.length < 3) {
          newErrors.storeName = "Store name must be at least 3 characters";
        } else {
          delete newErrors.storeName;
        }
        break;
      case "storeDescription":
        if (
          formData.storeDescription &&
          formData.storeDescription.length < 20
        ) {
          newErrors.storeDescription =
            "Description should be at least 20 characters";
        } else {
          delete newErrors.storeDescription;
        }
        break;
      case "storeAddress":
        if (!formData.storeAddress.trim()) {
          newErrors.storeAddress = "Store address is required";
        } else {
          delete newErrors.storeAddress;
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

      case "gstNumber":
        if (formData.gstNumber && formData.gstNumber.length !== 15) {
          newErrors.gstNumber = "GST number must be 15 characters";
        } else {
          delete newErrors.gstNumber;
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
      !formData?.storeName ||
      !formData?.storeAddress ||
      !formData?.email ||
      !formData?.phone;
    if (!hasErrors && !hasEmptyFields) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const res = await register(formData);

        console.log(res.data);

        if (
          !res.data?.data ||
          !res.data?.success ||
          res.data?.statusCode !== 200
        ) {
          setSubmitError("Store creation failed. Please try again.");
          handleError(res.data.message);
          return;
        }

        setSubmitSuccess(true);
        handleSuccess(res.data?.message || "Store created successfully");

        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      } catch (error) {
        setSubmitError("Failed to register store. Please try again.");
        handleError(error?.response?.data?.message);
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
          <Link
            to={"/login"}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </Link>
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
                      name="storeName"
                      placeholder="Enter your store name"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("storeName")}
                      className={`pl-12 ${getInputClassName("storeName")}`}
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
                      name="storeDescription"
                      placeholder="Tell customers about your store..."
                      value={formData.storeDescription}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("storeDescription")}
                      rows={4}
                      className={`pl-12 ${getInputClassName(
                        "storeDescription"
                      )} resize-none`}
                    />
                  </div>
                  {touched.description && errors.description && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {errors.description}
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
                      name="storeAddress"
                      placeholder="123 Main Street, City, State, ZIP"
                      value={formData.storeAddress}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("storeAddress")}
                      className={`pl-12 ${getInputClassName("storeAddress")}`}
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
                      name="gstNumber"
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
              <Link
                to={"/login"}
                className="flex-1 text-center bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                onClick={() => handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl cursor-pointer"
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
