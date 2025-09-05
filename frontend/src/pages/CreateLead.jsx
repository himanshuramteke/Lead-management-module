import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { createLead } from "../apis/leads";
import { Save } from "lucide-react";

const CreateLead = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    source: "other",
    status: "new",
    priority: "medium",
    notes: "",
    lastContactDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (value.length > 15)
          return "Phone number cannot be longer than 15 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "phone"];

    requiredFields.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        ...form,
        notes: form.notes ? [{ content: form.notes }] : [],
        // Convert empty string to undefined for optional fields
        lastContactDate: form.lastContactDate || undefined,
        company: form.company || undefined,
      };

      await createLead(formData);
      toast.success("Lead created successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error creating lead:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Error creating lead. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Create Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                errors.firstName ? "border-red-500" : "border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                errors.lastName ? "border-red-500" : "border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                errors.email ? "border-red-500" : "border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={15}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                errors.phone ? "border-red-500" : "border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social_media">Social Media</option>
            <option value="email_campaign">Email Campaign</option>
            <option value="other">Other</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 rounded bg-gray-700 text-white resize-none"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Last Contact Date (optional)
            </label>
            <input
              name="lastContactDate"
              type="date"
              value={form.lastContactDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-2 py-2 rounded transition-colors ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white`}
          >
            <Save size={18} />
            <span>{isSubmitting ? "Creating Lead..." : "Save Lead"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateLead;
