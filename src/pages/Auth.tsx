import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, UserPlus, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "temadiplome.ce@gmail.com";

type AuthMode = "login" | "register";

type FormErrors = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  university?: string;
  study_field?: string;
  password?: string;
  confirm_password?: string;
  signature_name?: string;
  accepted_privacy?: string;
  accepted_terms?: string;
  accepted_academic_integrity?: string;
};

const countryCodes = [
  { code: "+355", label: "Shqipëri (+355)" },
  { code: "+383", label: "Kosovë (+383)" },
  { code: "+39", label: "Itali (+39)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+49", label: "Gjermani (+49)" },
  { code: "+33", label: "Francë (+33)" },
  { code: "+1", label: "USA / Kanada (+1)" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-red-600 font-medium">{message}</p>;
}

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+355",
    phone: "",
    university: "",
    study_field: "",
    password: "",
    confirm_password: "",
    accepted_terms: false,
    accepted_privacy: false,
    accepted_academic_integrity: false,
  });

  const fullName =
    `${formData.first_name.trim()} ${formData.last_name.trim()}`.trim();

  const inputClass =
    "w-full border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400";

  const errorInputClass =
    "border-red-300 focus:border-red-400 focus:ring-red-100";

  const clearFieldError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    setMessage("");

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const checked = target.checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    clearFieldError(name as keyof FormErrors);
  };

  const validateRegister = () => {
    const newErrors: FormErrors = {};

    const nameRegex = /^[A-Za-zÀ-ž\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9]{7,12}$/;

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Emri është i detyrueshëm. Shembull: Sonila";
    } else if (!nameRegex.test(formData.first_name.trim())) {
      newErrors.first_name = "Vendosni një emër të vlefshëm. Shembull: Sonila";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Mbiemri është i detyrueshëm. Shembull: Balla";
    } else if (!nameRegex.test(formData.last_name.trim())) {
      newErrors.last_name = "Vendosni një mbiemër të vlefshëm. Shembull: Balla";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email-i është i detyrueshëm. Shembull: emri@gmail.com";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Email-i nuk është i saktë. Shembull: emri@gmail.com";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Numri i WhatsApp është i detyrueshëm. Shembull: 685671586";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Shkruani vetëm numra, pa hapësira. Shembull: 685671586";
    }

    if (!formData.university.trim()) {
      newErrors.university =
        "Universiteti është i detyrueshëm. Shembull: Universiteti i Tiranës";
    }

    if (!formData.study_field.trim()) {
      newErrors.study_field =
        "Dega e studimit është e detyrueshme. Shembull: Ekonomi";
    }

    if (!formData.password) {
      newErrors.password =
        "Password-i është i detyrueshëm. Duhet të ketë të paktën 8 karaktere.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password-i duhet të ketë të paktën 8 karaktere.";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Ju lutemi konfirmoni password-in.";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Password-et nuk përputhen.";
    }

    if (!formData.accepted_privacy) {
      newErrors.accepted_privacy =
        "Duhet të pranoni Privacy Policy për të vazhduar.";
    }

    if (!formData.accepted_terms) {
      newErrors.accepted_terms =
        "Duhet të pranoni Terms & Conditions për të vazhduar.";
    }

    if (!formData.accepted_academic_integrity) {
      newErrors.accepted_academic_integrity =
        "Duhet të pranoni Academic Integrity për të vazhduar.";
    }

    if (!fullName) {
      newErrors.signature_name =
        "Firma elektronike krijohet automatikisht nga emri dhe mbiemri.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const cleanEmail = loginEmail.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: loginPassword,
    });

    if (error) {
      console.error("Login error:", error);
      setLoading(false);
      setMessage("Email ose password i pasaktë.");
      return;
    }

    const loggedEmail = data.user.email?.toLowerCase();

    if (loggedEmail === ADMIN_EMAIL) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          auth_user_id: data.user.id,
          email: data.user.email,
          full_name: "Admin",
          role: "admin",
        })
      );

      setLoading(false);
      window.location.href = "/admin";
      return;
    }

    const { data: profile } = await supabase
      .from("user_agreements")
      .select(
        "auth_user_id, first_name, last_name, full_name, email, phone, country_code, university, study_field, signature_name"
      )
      .eq("auth_user_id", data.user.id)
      .maybeSingle();

    const currentUser = profile || {
      auth_user_id: data.user.id,
      email: data.user.email,
      
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    setLoading(false);
    window.location.href = "/dashboard";
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!validateRegister()) {
      return;
    }

    setLoading(true);

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPhone = formData.phone.trim();
    const signatureName = fullName;

    if (cleanEmail === ADMIN_EMAIL) {
      setLoading(false);
      setMessage("Ky email është i rezervuar për administratorin.");
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: cleanEmail,
      password: formData.password,
    });

    if (authError) {
      console.error("Auth signup error:", authError);
      setLoading(false);
      setMessage(`Regjistrimi nuk u krye: ${authError.message}`);
      return;
    }

    const userData = {
      auth_user_id: authData.user?.id,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      full_name: fullName,
      email: cleanEmail,
      country_code: formData.country_code,
      phone: `${formData.country_code}${cleanPhone}`,
      university: formData.university.trim(),
      study_field: formData.study_field.trim(),
      signature_name: signatureName,
      accepted_terms: formData.accepted_terms,
      accepted_privacy: formData.accepted_privacy,
      accepted_academic_integrity: formData.accepted_academic_integrity,
      agreement_version: "v1.0",
      created_at: new Date().toISOString(),
      role: "student",
    };

    const { error: agreementError } = await supabase
      .from("user_agreements")
      .insert([userData]);

    if (agreementError) {
      console.error("Agreement insert error:", agreementError);
      setLoading(false);
      setMessage(
        `Regjistrimi nuk u ruajt në database: ${agreementError.message}`
      );
      return;
    }

    await supabase.functions.invoke("send-notification", {
      body: {
        type: "registration",
        data: userData,
      },
    });

    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              temadiplome.ce
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
              Hyr ose krijo llogarinë tënde.
            </h1>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Për të bërë porosi, për të ndjekur statusin e punimit dhe për të
              pasur dashboard-in personal, duhet të identifikoheni në platformë.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Akses i sigurt</h3>
                  <p className="text-sm text-zinc-400">
                    Llogaria përdoret për menaxhimin e kërkesave dhe porosive.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Pranim i kushteve</h3>
                  <p className="text-sm text-zinc-400">
                    Gjatë regjistrimit ruhen kushtet e pranuara, firma
                    elektronike dhe të dhënat e klientit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mt-10"
          >
            ← Kthehu në faqen kryesore
          </Link>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-2 bg-zinc-100 rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
                setErrors({});
              }}
              className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Hyr në llogari
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("register");
                setMessage("");
                setErrors({});
              }}
              className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                mode === "register"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Regjistrohu
            </button>
          </div>

          {mode === "login" ? (
            <>
              <h2 className="text-3xl font-bold text-zinc-950 mb-3">
                Login
              </h2>

              <p className="text-zinc-600 mb-8">
                Vendos email-in dhe password-in për të vazhduar.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="p.sh. emri@gmail.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setMessage("");
                    }}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Shkruani password-in"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setMessage("");
                    }}
                    required
                    className={inputClass}
                  />
                </div>

                {message && (
                  <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl py-3.5 font-bold transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Duke hyrë..." : "Hyr dhe vazhdo"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-8 border-t border-zinc-100 pt-6">
                <p className="text-sm text-zinc-600 mb-3">
                  Nuk keni ende llogari?
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setMessage("");
                    setErrors({});
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-xl py-3.5 font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  Regjistrohu këtu
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-zinc-950 mb-3">
                Regjistrohu
              </h2>

              <p className="text-zinc-600 mb-8">
                Krijo llogarinë për të bërë porosi dhe për të ndjekur statusin e
                punimit.
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      name="first_name"
                      type="text"
                      placeholder="Emri, p.sh. Sonila"
                      value={formData.first_name}
                      onChange={handleRegisterChange}
                      required
                      className={`${inputClass} ${
                        errors.first_name ? errorInputClass : ""
                      }`}
                    />
                    <FieldError message={errors.first_name} />
                  </div>

                  <div>
                    <input
                      name="last_name"
                      type="text"
                      placeholder="Mbiemri, p.sh. Balla"
                      value={formData.last_name}
                      onChange={handleRegisterChange}
                      required
                      className={`${inputClass} ${
                        errors.last_name ? errorInputClass : ""
                      }`}
                    />
                    <FieldError message={errors.last_name} />
                  </div>
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email, p.sh. emri@gmail.com"
                    value={formData.email}
                    onChange={handleRegisterChange}
                    required
                    className={`${inputClass} ${
                      errors.email ? errorInputClass : ""
                    }`}
                  />
                  <FieldError message={errors.email} />
                </div>

                <div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password, minimumi 8 karaktere"
                    value={formData.password}
                    onChange={handleRegisterChange}
                    required
                    className={`${inputClass} ${
                      errors.password ? errorInputClass : ""
                    }`}
                  />
                  <FieldError message={errors.password} />
                </div>

                <div>
                  <input
                    name="confirm_password"
                    type="password"
                    placeholder="Konfirmo password-in"
                    value={formData.confirm_password}
                    onChange={handleRegisterChange}
                    required
                    className={`${inputClass} ${
                      errors.confirm_password ? errorInputClass : ""
                    }`}
                  />
                  <FieldError message={errors.confirm_password} />
                </div>

                <div>
                  <div className="flex gap-2">
                    <select
                      name="country_code"
                      value={formData.country_code}
                      onChange={handleRegisterChange}
                      className="w-40 border border-zinc-200 rounded-xl px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="WhatsApp, p.sh. 685671586"
                      value={formData.phone}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/\D/g, "");
                        setFormData((prev) => ({
                          ...prev,
                          phone: onlyNumbers,
                        }));
                        clearFieldError("phone");
                        setMessage("");
                      }}
                      required
                      className={`${inputClass} ${
                        errors.phone ? errorInputClass : ""
                      }`}
                    />
                  </div>
                  <FieldError message={errors.phone} />
                </div>

                <div>
                  <input
                    name="university"
                    type="text"
                    placeholder="Universiteti, p.sh. Universiteti i Tiranës"
                    value={formData.university}
                    onChange={handleRegisterChange}
                    required
                    className={`${inputClass} ${
                      errors.university ? errorInputClass : ""
                    }`}
                  />
                  <FieldError message={errors.university} />
                </div>

                <div>
                  <input
                    name="study_field"
                    type="text"
                    placeholder="Dega e studimit, p.sh. Ekonomi"
                    value={formData.study_field}
                    onChange={handleRegisterChange}
                    required
                    className={`${inputClass} ${
                      errors.study_field ? errorInputClass : ""
                    }`}
                  />
                  <FieldError message={errors.study_field} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Firma elektronike
                  </label>

                  <input
                    type="text"
                    value={fullName || "Plotëso emrin dhe mbiemrin"}
                    readOnly
                    className="w-full border border-amber-200 bg-amber-50 rounded-xl px-4 py-3 text-zinc-900 font-semibold cursor-not-allowed"
                  />

                  <p className="text-xs text-zinc-500 mt-1.5">
                    Firma elektronike krijohet automatikisht nga emri dhe
                    mbiemri dhe ruhet në kontratën e bashkëpunimit.
                  </p>

                  <FieldError message={errors.signature_name} />
                </div>

                <p className="text-sm text-zinc-500">
                  Ju lutemi lexoni dokumentet ligjore përpara se të vazhdoni.
                </p>

                <div className="space-y-3 text-sm text-zinc-700">
                  <label className="flex gap-2 items-start">
                    <input
                      type="checkbox"
                      name="accepted_privacy"
                      checked={formData.accepted_privacy}
                      onChange={handleRegisterChange}
                      required
                    />
                    <span>
                      Kam lexuar dhe pranoj{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 underline font-medium"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError message={errors.accepted_privacy} />

                  <label className="flex gap-2 items-start">
                    <input
                      type="checkbox"
                      name="accepted_terms"
                      checked={formData.accepted_terms}
                      onChange={handleRegisterChange}
                      required
                    />
                    <span>
                      Kam lexuar dhe pranoj{" "}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 underline font-medium"
                      >
                        Terms & Conditions
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError message={errors.accepted_terms} />

                  <label className="flex gap-2 items-start">
                    <input
                      type="checkbox"
                      name="accepted_academic_integrity"
                      checked={formData.accepted_academic_integrity}
                      onChange={handleRegisterChange}
                      required
                    />
                    <span>
                      Kuptoj dhe pranoj{" "}
                      <a
                        href="/academic-integrity"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 underline font-medium"
                      >
                        Academic Integrity
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError message={errors.accepted_academic_integrity} />
                </div>

                {message && (
                  <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl py-3.5 font-bold transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Duke u regjistruar..." : "Regjistrohu dhe vazhdo"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-8 border-t border-zinc-100 pt-6">
                <p className="text-sm text-zinc-600 mb-3">
                  Keni tashmë llogari?
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                    setErrors({});
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-xl py-3.5 font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  Hyr në llogari
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}