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
  { code: "+355", label: "🇦🇱 Shqipëri (+355)" },
  { code: "+383", label: "🇽🇰 Kosovë (+383)" },
  { code: "+389", label: "🇲🇰 Maqedonia e Veriut (+389)" },
  { code: "+382", label: "🇲🇪 Mali i Zi (+382)" },
  { code: "+30", label: "🇬🇷 Greqi (+30)" },
  { code: "+39", label: "🇮🇹 Itali (+39)" },
  { code: "+49", label: "🇩🇪 Gjermani (+49)" },
  { code: "+44", label: "🇬🇧 United Kingdom (+44)" },
  { code: "+33", label: "🇫🇷 Francë (+33)" },
  { code: "+1", label: "🇺🇸 USA / 🇨🇦 Kanada (+1)" },
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
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

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
      newErrors.first_name = "Emri është i detyrueshëm. Shembull: Maria";
    } else if (!nameRegex.test(formData.first_name.trim())) {
      newErrors.first_name = "Vendosni një emër të vlefshëm. Shembull: Maria";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Mbiemri është i detyrueshëm. Shembull: Hoxha";
    } else if (!nameRegex.test(formData.last_name.trim())) {
      newErrors.last_name = "Vendosni një mbiemër të vlefshëm. Shembull: Hoxha";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email-i është i detyrueshëm";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Email-i nuk është i saktë. Shembull: emri@gmail.com";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Numri i WhatsApp është i detyrueshëm. Shembull: 685656565";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Shkruani vetëm numra, pa hapësira. Shembull: 685656565";
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const cleanEmail = loginEmail.trim().toLowerCase();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: loginPassword,
      });

      if (error || !data.user) {
        setMessage("Email ose fjalëkalim i pasaktë.");
        return;
      }

      if (cleanEmail === ADMIN_EMAIL) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "/admin";
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_agreements")
        .select(
          "auth_user_id, full_name, first_name, last_name, email, phone, country_code, university, study_field"
        )
        .eq("auth_user_id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile load error:", profileError);
      }

      const currentUser = profile || {
        auth_user_id: data.user.id,
        full_name:
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "Student",
        email: data.user.email || cleanEmail,
      };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      window.location.href = "/dashboard";
    } catch (loginError) {
      console.error("Login error:", loginError);
      setMessage("Ndodhi një gabim gjatë hyrjes. Ju lutemi provoni përsëri.");
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_30%),#fafafa] px-5 pb-10 pt-24 lg:px-10 lg:pb-14 lg:pt-28">  <div className="mx-auto grid w-full max-w-[1440px] items-stretch overflow-hidden rounded-[28px] border border-zinc-100 bg-white shadow-[0_28px_80px_rgba(24,24,27,0.12)] lg:grid-cols-[0.9fr_1.1fr]">  <div className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:p-12">
          <img
            src="/images/home/testimonials-background.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.42] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#090714]/95 via-[#160d2d]/90 to-violet-950/85" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="relative flex h-full flex-col">
          <div>
            <img
              src="/images/home/logo2.png"
              alt="temadiplome.ce"
              className="mb-10 h-11 w-auto object-contain"
            />

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300">
              Platforma juaj akademike
            </p>

            <h1 className="mb-5 max-w-md font-serif text-4xl font-bold leading-[1.08] sm:text-5xl">
              Hyr ose krijo llogarinë tënde.
            </h1>

            <p className="mb-9 max-w-md text-sm leading-7 text-zinc-300 sm:text-base">
              Për të bërë porosi, për të ndjekur statusin e punimit dhe për të
              pasur dashboard-in personal, duhet të identifikoheni në platformë.
            </p>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-500/20 text-violet-200 backdrop-blur">
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
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-500/20 text-violet-200 backdrop-blur">
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
            className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white">
            ← Kthehu në faqen kryesore
          </Link>
          </div>
        </div>

        <div className="p-6 sm:p-9 lg:p-12">
          <div className="mb-7 lg:hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
              temadiplome.ce
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-zinc-950">
              Hyr ose krijo llogarinë tënde.
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Menaxho porositë, statusin dhe materialet nga një vend i vetëm.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-2 rounded-2xl bg-zinc-100/80 p-1.5">
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
              <h2 className="mb-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
                Login
              </h2>

              <p className="mb-8 text-sm leading-6 text-zinc-500 sm:text-base">
                Vendos email-in dhe password-in për të vazhduar.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
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
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-violet-200/60 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white py-3.5 font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  Regjistrohu këtu
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
                Regjistrohu
              </h2>

              <p className="mb-8 text-sm leading-6 text-zinc-500 sm:text-base">
                Krijo llogarinë për të bërë porosi dhe për të ndjekur statusin e
                punimit.
              </p>

              <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      name="first_name"
                      type="text"
                      placeholder="Emri"
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
                      placeholder="Mbiemri"
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
                  <div className="grid grid-cols-[minmax(190px,0.85fr)_minmax(0,2fr)] gap-3">
  <select
    name="country_code"
    value={formData.country_code}
    onChange={handleRegisterChange}
    className="h-[68px] w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
  >
    {countryCodes.map((country) => (
      <option key={country.code} value={country.code}>
        {country.label}
      </option>
    ))}
  </select>

                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="WhatsApp, p.sh. 685656565"
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
                    className="w-full cursor-not-allowed rounded-xl border border-violet-200 bg-violet-50 px-4 py-3.5 font-semibold text-zinc-900"
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
                        className="font-medium text-violet-700 underline"
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
                        className="font-medium text-violet-700 underline"
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
                        className="font-medium text-violet-700 underline"
                      >
                        Academic Integrity
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError message={errors.accepted_academic_integrity} />
                </div>

                {message && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-violet-200/60 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white py-3.5 font-semibold text-violet-700 transition hover:bg-violet-50"
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