import { useState } from "react";
import { supabase } from "../lib/supabase";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    study_field: "",
    signature_name: "",
    accepted_terms: false,
    accepted_privacy: false,
    accepted_academic_integrity: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.accepted_terms ||
      !formData.accepted_privacy ||
      !formData.accepted_academic_integrity
    ) {
      setMessage("Duhet të pranoni dokumentet ligjore për të vazhduar.");
      return;
    }

    if (formData.signature_name.trim() !== formData.full_name.trim()) {
      setMessage("Firma elektronike duhet të jetë e njëjtë me emrin dhe mbiemrin.");
      return;
    }

    setLoading(true);

    const userData = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      university: formData.university,
      study_field: formData.study_field,
      signature_name: formData.signature_name,
      accepted_terms: formData.accepted_terms,
      accepted_privacy: formData.accepted_privacy,
      accepted_academic_integrity: formData.accepted_academic_integrity,
      agreement_version: "v1.0",
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("user_agreements").insert([userData]);

    if (error) {
      console.error(error);
      setLoading(false);
      setMessage("Regjistrimi nuk u ruajt në database. Kontrollo tabelën në Supabase.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Regjistrohu</h1>

        <p className="text-gray-600 mb-6">
          Krijoni llogarinë tuaj për të bërë porosi, për të ndjekur statusin e
          punimit dhe për të aksesuar materialet/kursin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            type="text"
            placeholder="Emër dhe mbiemër"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="phone"
            type="text"
            placeholder="Numër telefoni / WhatsApp"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="university"
            type="text"
            placeholder="Universiteti"
            value={formData.university}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="study_field"
            type="text"
            placeholder="Dega e studimit"
            value={formData.study_field}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <p className="text-sm text-gray-500">
            Ju lutemi lexoni dokumentet ligjore përpara se të vazhdoni.
          </p>

          <div className="space-y-3 text-sm text-gray-700">
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                name="accepted_privacy"
                checked={formData.accepted_privacy}
                onChange={handleChange}
                required
              />
              <span>
                Kam lexuar dhe pranoj{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                name="accepted_terms"
                checked={formData.accepted_terms}
                onChange={handleChange}
                required
              />
              <span>
                Kam lexuar dhe pranoj{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  Terms & Conditions
                </a>
                .
              </span>
            </label>

            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                name="accepted_academic_integrity"
                checked={formData.accepted_academic_integrity}
                onChange={handleChange}
                required
              />
              <span>
                Kuptoj dhe pranoj{" "}
                <a
                  href="/academic-integrity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  Academic Integrity
                </a>
                .
              </span>
            </label>
          </div>

          <input
            name="signature_name"
            type="text"
            placeholder="Shkruaj emrin tënd si firmë elektronike"
            value={formData.signature_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold"
          >
            {loading ? "Duke u regjistruar..." : "Regjistrohu dhe vazhdo"}
          </button>

          {message && <p className="text-sm text-red-600">{message}</p>}
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Keni llogari?{" "}
          <a href="/login" className="text-blue-600 underline">
            Hyni këtu
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;