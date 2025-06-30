"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    club: "",
    clubEmail: "",
    masterName: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert("Form submitted!");
    }, 1000);
  };

  if (!showForm) return null;

  return (
    <div className="relative min-h-screen bg-black/70 flex items-center justify-center px-2 sm:px-4">
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="absolute sm:absolute top-2 left-2 z-30 text-sm items-center text-white p-2 shadow-lg sm:flex hidden"
        aria-label="Back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span className="hidden sm:inline ml-1">Back</span>
      </button>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white border border-black rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl flex flex-col items-center"
        style={{ maxHeight: "90vh", minHeight: "50vh" }}
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex sm:hidden absolute top-2 left-2 z-30 text-sm items-center text-black p-2"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 overflow-y-auto">
          <div className="flex-1 flex flex-col gap-2 order-1">
            <h2 className="text-lg md:text-xl font-extrabold text-black text-center md:text-left">User Details</h2>
            <label className="text-xs md:text-sm text-black font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName || ""}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName || ""}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+60 12-345 6789"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
              disabled
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 order-2 md:order-3">
            <h2 className="text-lg md:text-xl font-extrabold text-black text-center md:text-left">Club Details</h2>
            <label className="text-xs md:text-sm text-black font-semibold">Club Name</label>
            <input
              type="text"
              name="club"
              placeholder="Club Name"
              value={form.club}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
              pattern=".{2,}"
              title="Club name must be at least 2 characters"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Club Email</label>
            <input
              type="email"
              name="clubEmail"
              placeholder="Club Email"
              value={form.clubEmail || ""}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Master Full Name</label>
            <input
              type="text"
              name="masterName"
              placeholder="Master Full Name"
              value={form.masterName || ""}
              onChange={handleChange}
              required
              className="w-full text-black p-2 border border-black rounded"
            />
            <label className="text-xs md:text-sm text-black font-semibold">Address</label>
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full text-black p-2 border border-black rounded resize-none md:h-auto"
              style={{ minHeight: "60px", maxHeight: "100px" }}
            />
          </div>
        </div>
        <div className="w-full border-t border-gray-200 my-4" />
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className={`w-full sm:w-48 bg-black text-white font-bold py-2 rounded hover:bg-gray-800 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}