import { useState } from "react";
import axios from "axios";

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/enquiry", form);
      alert("Enquiry Sent Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send enquiry");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-md space-y-5 border border-white/40"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Send Us an <span className="text-blue-600">Enquiry</span>
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Enter your enquiry..."
          className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          rows="5"
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
        >
          SEND ENQUIRY
        </button>

        <p className="text-center text-gray-500 text-sm">
          We will get back to you within 24 hours ✨
        </p>
      </form>
    </div>
  );
};

export default EnquiryForm;