import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Upload,
  Send,
  CheckCircle2,
  X,
  MessageCircle,
  Landmark,
  Globe,
} from "lucide-react";
import { supabase, SITE_CONFIG } from "../lib/supabase";
import TermsPopup from "../components/TermsPopup";

const studyLevels = ["Bachelor", "Master", "Profesional", "Tjetër"];

const workTypes = [
  "Temë diplome Bachelor",
  "Temë diplome Master",
  "Detyrë Kursi",
  "Ese",
  "Analizë",
  "PowerPoint",
  "Statistikë SPSS",
  "Tjetër",
];

const subjectAreas = [
  "Ekonomi",
  "Financë",
  "Infermieri",
  "Juridik",
  "Marketing",
  "Psikologji",
  "Edukim",
  "IT",
  "Turizëm",
  "Tjetër",
];

const serviceOptions = [
  { label: "Konsultim (Falas)", price: 0, priceLabel: "Falas", isFree: true },
  {
    label: "Strukturim dhe Organizim i punimit",
    price: 1000,
    priceLabel: "1 000 L",
  },
  { label: "Referenca në APA Style", price: 1000, priceLabel: "1 000 L" },
  { label: "Analizë Statistikore SPSS", price: 5000, priceLabel: "5 000 L" },
  { label: "PowerPoint Mbrojtje Diplome", price: 3500, priceLabel: "3 500 L" },
  { label: "Diplomë Bachelor", price: 18500, priceLabel: "18 500 L" },
  { label: "Diplomë Master", price: 25500, priceLabel: "25 500 L" },
  {
    label: "Detyrë Kursi (çmim me marrëveshje)",
    price: 0,
    priceLabel: "WhatsApp",
    isWhatsApp: true,
  },
];

const payMethods = [
  { val: "bank", label: "Bank Transfer", icon: Landmark },
  { val: "moneygram", label: "MoneyGram", icon: Globe },
  { val: "ria", label: "Ria", icon: Globe },
  { val: "western", label: "Western Union", icon: Globe },
];

type FormErrors = {
  topic?: string;
  study_level?: string;
  work_type?: string;
  subject_area?: string;
  deadline?: string;
  description?: string;
};

type UserProfile = {
  auth_user_id?: string;
  full_name: string;
  email: string;
  phone: string;
  country_code?: string;
  university: string;
  study_field: string;
};

const ic =
  "w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-zinc-50 focus:bg-white transition-colors";

function F({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-900 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-red-600 font-medium">{message}</p>;
}

export default function OrderWork() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [form, setForm] = useState({
    topic: "",
    study_level: "",
    work_type: "",
    subject_area: "",
    deadline: "",
    has_existing_material: false,
    description: "",
    budget_note: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedService, setSelectedService] = useState("");
  const [payMethod, setPayMethod] = useState("bank");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsShake, setTermsShake] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const savedUser = localStorage.getItem("currentUser");

      if (!isLoggedIn || !savedUser) {
        window.location.href = "/auth";
        return;
      }

      const localUser = JSON.parse(savedUser);

      if (
        localUser.full_name &&
        localUser.email &&
        localUser.phone &&
        localUser.university &&
        localUser.study_field
      ) {
        setUserProfile(localUser);
        setProfileLoading(false);
        return;
      }

      const { data: authData } = await supabase.auth.getUser();
      const authUserId = authData.user?.id || localUser.auth_user_id;
      const email = authData.user?.email || localUser.email;

      if (!authUserId && !email) {
        window.location.href = "/auth";
        return;
      }

      let query = supabase
        .from("user_agreements")
        .select(
          "auth_user_id, full_name, email, phone, country_code, university, study_field"
        )
        .limit(1);

      if (authUserId) {
        query = query.eq("auth_user_id", authUserId);
      } else {
        query = query.eq("email", email);
      }

      const { data, error } = await query.single();

      if (error || !data) {
        console.error("User profile load error:", error);
        setError(
          "Nuk u gjetën të dhënat e profilit. Ju lutemi dilni dhe hyni përsëri."
        );
        setProfileLoading(false);
        return;
      }

      setUserProfile(data as UserProfile);
      localStorage.setItem("currentUser", JSON.stringify(data));
      setProfileLoading(false);
    };

    loadUserProfile();
  }, []);

  const selected = serviceOptions.find((s) => s.label === selectedService);
  const totalPrice = selected?.price ?? 0;
  const isFree = selected?.isFree;
  const isWhatsApp = selected?.isWhatsApp;

  const clearFieldError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    setError("");

    if (!selectedService) {
      setError("Ju lutemi zgjidhni një shërbim.");
      return false;
    }

    if (!form.topic.trim()) {
      newErrors.topic =
        "Tema e përzgjedhur është e detyrueshme. Shembull: Ndikimi i marketingut digjital në sjelljen e konsumatorit.";
    } else if (form.topic.trim().length < 10) {
      newErrors.topic =
        "Tema duhet të jetë më e qartë. Shembull: Ndikimi i marketingut digjital në sjelljen e konsumatorit.";
    }

    if (!form.study_level) {
      newErrors.study_level =
        "Zgjidhni nivelin e studimit. Shembull: Bachelor";
    }

    if (!form.work_type) {
      newErrors.work_type =
        "Zgjidhni llojin e punimit. Shembull: Temë diplome Bachelor";
    }

    if (!form.subject_area) {
      newErrors.subject_area =
        "Zgjidhni fushën e studimit. Shembull: Ekonomi";
    }

    if (!form.deadline) {
      newErrors.deadline = "Afati i dorëzimit është i detyrueshëm.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Përshkrimi është i detyrueshëm. Shembull: Dua ndihmë për strukturimin e temës...";
    } else if (form.description.trim().length < 15) {
      newErrors.description =
        "Përshkrimi duhet të jetë më i plotë. Shembull: Tema ime është për marketingun digjital...";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userProfile) {
      setError("Nuk u gjet profili i përdoruesit. Ju lutemi hyni përsëri.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!termsChecked) {
      setTermsShake(true);
      setTimeout(() => setTermsShake(false), 500);
      return;
    }

    setLoading(true);
    setError("");

    const uploadedFiles: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("order-files")
        .upload(fileName, file);

      if (!upErr) {
        const { data: urlData } = supabase.storage
          .from("order-files")
          .getPublicUrl(fileName);

        uploadedFiles.push(urlData.publicUrl);
      } else {
        console.error("File upload error:", upErr);
      }
    }

    const budgetNote = selectedService
      ? `${selectedService} - ${selected?.priceLabel} | Pagesa: ${
          payMethods.find((m) => m.val === payMethod)?.label
        }`
      : form.budget_note;

    const { error: insertErr } = await supabase.from("orders").insert({
      full_name: userProfile.full_name,
      email: userProfile.email,
      phone: userProfile.phone,
      university: userProfile.university,
      field_of_study: userProfile.study_field,
      topic: form.topic.trim(),
      study_level: form.study_level,
      work_type: form.work_type,
      subject_area: form.subject_area,
      deadline: form.deadline,
      has_existing_material: form.has_existing_material,
      description: form.description.trim(),
      uploaded_files: uploadedFiles,
      budget_note: budgetNote,
      status: "submitted",
      payment_status: isFree ? "not_required" : "pending",
    });

    setLoading(false);

    if (insertErr) {
      console.error("Order insert error:", insertErr);
      setError("Diçka shkoi keq. Ju lutemi provoni sërish.");
      return;
    }

    setSubmitted(true);
  };

  if (profileLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Duke ngarkuar profilin...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="container-academic max-w-lg">
          <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-zinc-100">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-3">
              Faleminderit!
            </h2>

            <p className="text-zinc-600 mb-5 leading-relaxed">
              Kërkesa juaj u pranua. Ekipi ynë do t'ju kontaktojë{" "}
              <strong>brenda 1 ore</strong> në WhatsApp ose email me detajet e
              ardhshme.
            </p>

            {selectedService && !isFree && !isWhatsApp && totalPrice > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left mb-6">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">
                  Si funksionon pagesa
                </p>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-900 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="text-zinc-700 leading-snug">
                      <strong>Kesti i parë</strong> paguhet pasi ju sjellim
                      projekt propozimin ose pjesën e parë të punës.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="text-zinc-700 leading-snug">
                      <strong>Kesti i fundit</strong> paguhet pasi lajmëroheni
                      që punimi ka përfunduar. Pastaj ju dorëzojmë punimin e
                      plotë.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 flex justify-between text-sm">
                  <span className="text-zinc-600">Totali:</span>
                  <span className="font-bold text-zinc-900">
                    {totalPrice.toLocaleString()} L
                  </span>
                </div>

                <p className="text-xs text-zinc-500 mt-1">
                  Metodë pagese:{" "}
                  {payMethods.find((m) => m.val === payMethod)?.label}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" /> Na kontaktoni në WhatsApp
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedService("");
                  setFiles([]);
                  setTermsChecked(false);
                  setForm({
                    topic: "",
                    study_level: "",
                    work_type: "",
                    subject_area: "",
                    deadline: "",
                    has_existing_material: false,
                    description: "",
                    budget_note: "",
                  });
                }}
                className="btn-outline w-full"
              >
                Dërgo kërkesë tjetër
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-10">
        <span className="section-label">Porosit</span>
        <h1 className="section-title mt-2 mb-3">Plotëso kërkesën tënde</h1>
        <p className="section-subtitle mx-auto">
          Na dërgoni detajet dhe ju kontaktojmë brenda 1 ore.
        </p>
      </section>

      <section className="container-academic max-w-3xl">
        <form onSubmit={submit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {userProfile && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-2">
                Profili juaj
              </h3>

              <p className="text-sm text-zinc-700">
                <strong>{userProfile.full_name}</strong> · {userProfile.email} ·{" "}
                {userProfile.phone}
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                {userProfile.university} · {userProfile.study_field}
              </p>

              <p className="text-xs text-zinc-500 mt-3">
                Këto të dhëna merren automatikisht nga regjistrimi.
              </p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">
              Zgjidh shërbimin
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {serviceOptions.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => {
                    setSelectedService(s.label);
                    setError("");
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all text-left ${
                    selectedService === s.label
                      ? "border-amber-400 bg-amber-50"
                      : "border-zinc-100 hover:border-zinc-300"
                  }`}
                >
                  <span
                    className={`font-medium leading-tight ${
                      selectedService === s.label
                        ? "text-zinc-900"
                        : "text-zinc-600"
                    }`}
                  >
                    {s.label}
                  </span>

                  <span
                    className={`ml-2 flex-shrink-0 font-bold text-sm ${
                      s.isFree
                        ? "text-green-600"
                        : s.isWhatsApp
                        ? "text-zinc-400"
                        : "text-amber-600"
                    }`}
                  >
                    {s.priceLabel}
                  </span>
                </button>
              ))}
            </div>

            {isWhatsApp && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Për Detyrën e Kursit, diskutojmë çmimin në WhatsApp sipas
                  kërkesave dhe specifikimeve tuaja.
                </p>
              </div>
            )}

            {selectedService && !isFree && !isWhatsApp && totalPrice > 0 && (
              <div className="mt-4 bg-zinc-950 rounded-2xl p-5">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">
                  Si funksionon pagesa
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      n: "1",
                      title: "Kesti i parë",
                      sub: "Paguhet pasi ju sjellim projekt propozimin ose pjesën e parë",
                      bg: "bg-amber-400",
                      tc: "text-zinc-900",
                    },
                    {
                      n: "2",
                      title: "Kesti i fundit",
                      sub: "Paguhet pasi lajmëroheni që punimi ka përfunduar",
                      bg: "bg-zinc-700",
                      tc: "text-white",
                    },
                  ].map((phase) => (
                    <div
                      key={phase.n}
                      className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-3"
                    >
                      <span
                        className={`w-7 h-7 rounded-full ${phase.bg} ${phase.tc} text-xs font-bold flex items-center justify-center flex-shrink-0`}
                      >
                        {phase.n}
                      </span>

                      <div>
                        <p className="text-white text-sm font-semibold">
                          {phase.title}
                        </p>
                        <p className="text-zinc-400 text-xs">{phase.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-between text-sm border-t border-white/10 pt-3">
                  <span className="text-zinc-400">Totali:</span>
                  <span className="font-bold text-amber-400 text-lg">
                    {totalPrice.toLocaleString()} L
                  </span>
                </div>
              </div>
            )}
          </div>

          {selectedService && !isFree && !isWhatsApp && (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
              <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">
                Mënyra e pagesës
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {payMethods.map((m) => (
                  <button
                    key={m.val}
                    type="button"
                    onClick={() => setPayMethod(m.val)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                      payMethod === m.val
                        ? "border-amber-400 bg-amber-50 text-amber-700"
                        : "border-zinc-100 text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                    {m.label}
                  </button>
                ))}
              </div>

              <p className="text-xs text-zinc-400 mt-3">
                Detajet e llogarisë dërgohen pas konfirmimit të porosisë.
              </p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">
              Detajet e punimit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <F label="Tema e përzgjedhur / Titulli i temës" required>
                  <input
                    type="text"
                    required
                    value={form.topic}
                    onChange={(e) => {
                      setForm({ ...form, topic: e.target.value });
                      clearFieldError("topic");
                    }}
                    className={`${ic} ${
                      errors.topic
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : ""
                    }`}
                    placeholder="p.sh. Ndikimi i marketingut digjital në sjelljen e konsumatorit"
                  />
                  <FieldError message={errors.topic} />
                </F>
              </div>

              <F label="Niveli i studimit" required>
                <select
                  required
                  value={form.study_level}
                  onChange={(e) => {
                    setForm({ ...form, study_level: e.target.value });
                    clearFieldError("study_level");
                  }}
                  className={`${ic} ${
                    errors.study_level
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : ""
                  }`}
                >
                  <option value="">Zgjidh nivelin</option>
                  {studyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.study_level} />
              </F>

              <F label="Lloji i punimit" required>
                <select
                  required
                  value={form.work_type}
                  onChange={(e) => {
                    setForm({ ...form, work_type: e.target.value });
                    clearFieldError("work_type");
                  }}
                  className={`${ic} ${
                    errors.work_type
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : ""
                  }`}
                >
                  <option value="">Zgjidh llojin e punimit</option>
                  {workTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.work_type} />
              </F>

              <F label="Fusha e studimit" required>
                <select
                  required
                  value={form.subject_area}
                  onChange={(e) => {
                    setForm({ ...form, subject_area: e.target.value });
                    clearFieldError("subject_area");
                  }}
                  className={`${ic} ${
                    errors.subject_area
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : ""
                  }`}
                >
                  <option value="">Zgjidh fushën</option>
                  {subjectAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.subject_area} />
              </F>

              <F label="Afati i dorëzimit" required>
                <input
                  type="date"
                  required
                  value={form.deadline}
                  onChange={(e) => {
                    setForm({ ...form, deadline: e.target.value });
                    clearFieldError("deadline");
                  }}
                  className={`${ic} ${
                    errors.deadline
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : ""
                  }`}
                />
                <FieldError message={errors.deadline} />
              </F>

              <F label="Ka material ekzistues?" required>
                <div className="flex gap-4 pt-2">
                  {["Po", "Jo"].map((value) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        checked={
                          value === "Po"
                            ? form.has_existing_material
                            : !form.has_existing_material
                        }
                        onChange={() =>
                          setForm({
                            ...form,
                            has_existing_material: value === "Po",
                          })
                        }
                        className="w-4 h-4 accent-amber-400"
                      />
                      <span className="text-sm text-zinc-700">{value}</span>
                    </label>
                  ))}
                </div>
              </F>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">
              Përshkrimi dhe materialet
            </h3>

            <F label="Përshkrim i kërkesës" required>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                  clearFieldError("description");
                }}
                className={`${ic} resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : ""
                }`}
                placeholder="p.sh. Dua ndihmë për strukturimin e temës mbi marketingun digjital..."
              />
              <FieldError message={errors.description} />
            </F>

            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Ngarko skedarë (opsionale)
              </label>

              <label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-2 border-2 border-dashed border-zinc-200 rounded-xl p-5 cursor-pointer hover:border-amber-400 transition-colors text-center"
              >
                <Upload className="w-6 h-6 text-zinc-400" />
                <span className="text-sm text-zinc-500">
                  Word, PDF, Excel, foto
                </span>

                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) setFiles(Array.from(e.target.files));
                  }}
                  className="hidden"
                  id="file-upload"
                  accept=".doc,.docx,.pdf,.xls,.xlsx,.png,.jpg,.jpeg"
                />
              </label>

              {files.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-zinc-50 rounded-xl px-3 py-2"
                    >
                      <span className="text-xs text-zinc-700 truncate">
                        {f.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setFiles(files.filter((_, j) => j !== i))
                        }
                        className="text-red-400 ml-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <TermsPopup inline onAccept={() => setTermsChecked(true)} />

          {termsShake && !termsChecked && (
            <p className="text-xs text-red-500 text-center font-medium">
              Duhet të pranosh Marrëveshjen e Bashkëpunimit para se të
              vazhdosh.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full justify-center py-4 text-base transition-opacity ${
              !termsChecked ? "opacity-60" : ""
            }`}
          >
            {loading ? "Duke dërguar..." : "Dërgo kërkesën"}{" "}
            <Send className="w-5 h-5" />
          </button>

          <p className="text-xs text-zinc-400 text-center">
            Ekipi ynë ju kontakton brenda <strong>1 ore</strong>. Konsultimi
            është gjithmonë falas.
          </p>
        </form>
      </section>
    </div>
  );
}