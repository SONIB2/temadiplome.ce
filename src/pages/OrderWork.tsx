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
  User,
  BookOpen,
  CreditCard,
  CalendarDays,
  FileText,
  ShieldCheck,
  ChevronDown,
  Sparkles,
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
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100";

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
  const [showAgreement, setShowAgreement] = useState(false);

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

if (insertErr) {
  console.error("Order insert error:", insertErr);
  setLoading(false);
  setError("Diçka shkoi keq. Ju lutemi provoni sërish.");
  return;
}

await supabase.functions.invoke("send-notification", {
  body: {
    type: "order",
    data: {
      full_name: userProfile.full_name,
      email: userProfile.email,
      phone: userProfile.phone,
      topic: form.topic.trim(),
      service: selectedService,
      deadline: form.deadline,
      description: form.description.trim(),
      payment: budgetNote,
    },
  },
});

setLoading(false);
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
    <main className="w-full max-w-full overflow-x-hidden bg-zinc-50 pb-10 pt-24 lg:pt-28">
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          {/* HERO */}
          <div className="relative overflow-hidden rounded-[26px] bg-[#0b0718] px-5 py-7 text-white shadow-[0_24px_70px_rgba(7,9,21,0.16)] sm:px-8 sm:py-9 lg:px-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                  <Sparkles className="h-4 w-4" />
                  Porosi e re
                </div>

                <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  Plotëso kërkesën tënde
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                  Na dërgo detajet e punimit. Ekipi ynë do të të kontaktojë
                  brenda 1 ore për konfirmimin dhe hapat e mëtejshëm.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs">
                {["Shërbimi", "Detajet", "Konfirmimi"].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur"
                  >
                    <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-zinc-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6">
            {error && (
              <div className="mb-5 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              {/* LEFT SIDE */}
              <div className="min-w-0 space-y-5">
                {/* PROFILE */}
                {userProfile && (
                  <section className="rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-5 shadow-[0_12px_36px_rgba(76,29,149,0.05)] sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
                        <User className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                          Profili yt
                        </p>

                        <h2 className="mt-1 font-serif text-xl font-bold text-zinc-950">
                          {userProfile.full_name}
                        </h2>

                        <p className="mt-1 break-words text-xs leading-5 text-zinc-500 sm:text-sm">
                          {userProfile.email} · {userProfile.phone}
                        </p>

                        <p className="text-xs leading-5 text-zinc-500 sm:text-sm">
                          {userProfile.university} · {userProfile.study_field}
                        </p>

                        <p className="mt-2 text-[10px] text-zinc-400 sm:text-xs">
                          Të dhënat merren automatikisht nga regjistrimi.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* SERVICES */}
                <section className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                        Hapi 1
                      </p>

                      <h2 className="font-serif text-xl font-bold text-zinc-950">
                        Zgjidh shërbimin
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {serviceOptions.map((service) => {
                      const active = selectedService === service.label;

                      return (
                        <button
                          key={service.label}
                          type="button"
                          onClick={() => {
                            setSelectedService(service.label);
                            setError("");
                          }}
                          className={`flex min-h-[70px] items-center justify-between gap-3 rounded-[16px] border p-4 text-left transition ${
                            active
                              ? "border-violet-500 bg-violet-50 shadow-[0_10px_26px_rgba(109,40,217,0.10)]"
                              : "border-zinc-100 bg-white hover:border-violet-200 hover:bg-violet-50/30"
                          }`}
                        >
                          <div className="min-w-0">
                            <p
                              className={`text-sm font-semibold leading-5 ${
                                active ? "text-violet-900" : "text-zinc-700"
                              }`}
                            >
                              {service.label}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              service.isFree
                                ? "bg-emerald-50 text-emerald-700"
                                : service.isWhatsApp
                                ? "bg-zinc-100 text-zinc-500"
                                : active
                                ? "bg-violet-700 text-white"
                                : "bg-violet-50 text-violet-700"
                            }`}
                          >
                            {service.priceLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {isWhatsApp && (
                    <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      Çmimi i detyrës së kursit përcaktohet sipas volumit,
                      afatit dhe kërkesave.
                    </div>
                  )}
                </section>

                {/* PAYMENT METHOD */}
                {selectedService && !isFree && !isWhatsApp && (
                  <section className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <CreditCard className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                          Pagesa
                        </p>
                        <h2 className="font-serif text-xl font-bold text-zinc-950">
                          Zgjidh mënyrën e pagesës
                        </h2>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {payMethods.map((method) => (
                        <button
                          key={method.val}
                          type="button"
                          onClick={() => setPayMethod(method.val)}
                          className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[16px] border p-3 text-center text-xs font-semibold transition ${
                            payMethod === method.val
                              ? "border-violet-500 bg-violet-50 text-violet-700"
                              : "border-zinc-100 text-zinc-500 hover:border-violet-200"
                          }`}
                        >
                          <method.icon className="h-5 w-5" />
                          {method.label}
                        </button>
                      ))}
                    </div>

                    <p className="mt-3 text-xs text-zinc-400">
                      Detajet e llogarisë dërgohen pas konfirmimit të porosisë.
                    </p>
                  </section>
                )}

                {/* DETAILS */}
                <section className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                        Hapi 2
                      </p>

                      <h2 className="font-serif text-xl font-bold text-zinc-950">
                        Detajet e punimit
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <F label="Tema e përzgjedhur / Titulli i temës" required>
                        <input
                          type="text"
                          required
                          value={form.topic}
                          onChange={(event) => {
                            setForm({ ...form, topic: event.target.value });
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
                        onChange={(event) => {
                          setForm({
                            ...form,
                            study_level: event.target.value,
                          });
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
                        onChange={(event) => {
                          setForm({
                            ...form,
                            work_type: event.target.value,
                          });
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
                        onChange={(event) => {
                          setForm({
                            ...form,
                            subject_area: event.target.value,
                          });
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
                        onChange={(event) => {
                          setForm({
                            ...form,
                            deadline: event.target.value,
                          });
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

                    <div className="sm:col-span-2">
                      <F label="A ke material ekzistues?" required>
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          {["Po", "Jo"].map((value) => {
                            const checked =
                              value === "Po"
                                ? form.has_existing_material
                                : !form.has_existing_material;

                            return (
                              <label
                                key={value}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                  checked
                                    ? "border-violet-500 bg-violet-50 text-violet-700"
                                    : "border-zinc-200 bg-white text-zinc-500"
                                }`}
                              >
                                <input
                                  type="radio"
                                  checked={checked}
                                  onChange={() =>
                                    setForm({
                                      ...form,
                                      has_existing_material: value === "Po",
                                    })
                                  }
                                  className="accent-violet-600"
                                />
                                {value}
                              </label>
                            );
                          })}
                        </div>
                      </F>
                    </div>
                  </div>
                </section>

                {/* DESCRIPTION + FILES */}
                <section className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
                  <h2 className="font-serif text-xl font-bold text-zinc-950">
                    Përshkrimi dhe materialet
                  </h2>

                  <div className="mt-5">
                    <F label="Përshkrimi i kërkesës" required>
                      <textarea
                        required
                        rows={5}
                        value={form.description}
                        onChange={(event) => {
                          setForm({
                            ...form,
                            description: event.target.value,
                          });
                          clearFieldError("description");
                        }}
                        className={`${ic} resize-none ${
                          errors.description
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : ""
                        }`}
                        placeholder="Përshkruaj çfarë ke realizuar deri tani dhe çfarë ndihme të nevojitet..."
                      />
                      <FieldError message={errors.description} />
                    </F>
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      Ngarko skedarë
                      <span className="ml-1 text-xs font-normal text-zinc-400">
                        (opsionale)
                      </span>
                    </label>

                    <label
                      htmlFor="file-upload"
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-[16px] border-2 border-dashed border-violet-200 bg-violet-50/30 p-7 text-center transition hover:border-violet-400 hover:bg-violet-50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <Upload className="h-5 w-5" />
                      </div>

                      <span className="text-sm font-semibold text-zinc-700">
                        Kliko për të zgjedhur skedarët
                      </span>

                      <span className="text-xs text-zinc-400">
                        Word, PDF, Excel ose fotografi
                      </span>

                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={(event) => {
                          if (event.target.files) {
                            setFiles(Array.from(event.target.files));
                          }
                        }}
                        className="hidden"
                        accept=".doc,.docx,.pdf,.xls,.xlsx,.png,.jpg,.jpeg"
                      />
                    </label>

                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3"
                          >
                            <span className="min-w-0 truncate text-xs text-zinc-700">
                              {file.name}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                setFiles(
                                  files.filter(
                                    (_, fileIndex) => fileIndex !== index
                                  )
                                )
                              }
                              className="shrink-0 text-red-400 transition hover:text-red-600"
                              aria-label={`Hiq ${file.name}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* AGREEMENT */}
                <section
                  className={`rounded-[22px] border bg-white shadow-[0_12px_36px_rgba(24,24,27,0.05)] transition ${
                    termsShake && !termsChecked
                      ? "border-red-300"
                      : termsChecked
                      ? "border-emerald-200"
                      : "border-zinc-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowAgreement((current) => !current)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          termsChecked
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-violet-50 text-violet-700"
                        }`}
                      >
                        <ShieldCheck className="h-5 w-5" />
                      </div>

                      <div>
                        <h2 className="font-serif text-lg font-bold text-zinc-950">
                          Marrëveshja e Bashkëpunimit
                        </h2>

                        <p className="mt-1 text-xs text-zinc-500">
                          {termsChecked
                            ? "Marrëveshja është pranuar."
                            : "Lexo dhe prano marrëveshjen për të vazhduar."}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-400 transition ${
                        showAgreement ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAgreement && (
                    <div className="border-t border-zinc-100 p-4 sm:p-5">
                      <TermsPopup
                        inline
                        clientName={userProfile?.full_name}
                        onAccept={() => setTermsChecked(true)}
                      />
                    </div>
                  )}

                  {termsShake && !termsChecked && (
                    <p className="px-5 pb-5 text-xs font-medium text-red-500 sm:px-6">
                      Duhet ta lexosh dhe ta pranosh marrëveshjen para se të
                      vazhdosh.
                    </p>
                  )}
                </section>
              </div>

              {/* RIGHT SUMMARY */}
              <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
                <div className="overflow-hidden rounded-[24px] border border-violet-100 bg-white shadow-[0_20px_60px_rgba(76,29,149,0.10)]">
                  <div className="bg-gradient-to-br from-[#0b0718] to-[#241044] p-6 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Përmbledhja
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-bold">
                      Porosia jote
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-zinc-400">
                      Kontrollo informacionin përpara dërgimit.
                    </p>
                  </div>

                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="rounded-[16px] bg-zinc-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                        Shërbimi
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-5 text-zinc-900">
                        {selectedService || "Nuk është zgjedhur ende"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-[16px] border border-zinc-100 p-4">
                        <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                          Çmimi
                        </p>

                        <p className="mt-2 font-serif text-lg font-bold text-zinc-950">
                          {selected?.priceLabel || "-"}
                        </p>
                      </div>

                      <div className="rounded-[16px] border border-zinc-100 p-4">
                        <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                          Pagesa
                        </p>

                        <p className="mt-2 text-xs font-bold leading-5 text-zinc-800">
                          {isFree
                            ? "Nuk kërkohet"
                            : isWhatsApp
                            ? "Me marrëveshje"
                            : payMethods.find(
                                (method) => method.val === payMethod
                              )?.label || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[16px] border border-zinc-100 p-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-violet-600" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                          Afati
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-zinc-900">
                        {form.deadline || "Nuk është vendosur"}
                      </p>
                    </div>

                    {selectedService &&
                      !isFree &&
                      !isWhatsApp &&
                      totalPrice > 0 && (
                        <div className="rounded-[16px] border border-violet-100 bg-violet-50/60 p-4">
                          <p className="text-xs font-bold text-violet-700">
                            Pagesa ndahet në 2 këste
                          </p>

                          <p className="mt-1 text-xs leading-5 text-zinc-600">
                            Kësti i parë pas projekt-propozimit dhe kësti i
                            fundit pas përfundimit.
                          </p>
                        </div>
                      )}

                    <div
                      className={`flex items-start gap-3 rounded-[16px] border p-4 ${
                        termsChecked
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-zinc-200 bg-zinc-50"
                      }`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          termsChecked
                            ? "text-emerald-600"
                            : "text-zinc-400"
                        }`}
                      />

                      <p
                        className={`text-xs leading-5 ${
                          termsChecked
                            ? "text-emerald-800"
                            : "text-zinc-500"
                        }`}
                      >
                        {termsChecked
                          ? "Marrëveshja është pranuar."
                          : "Marrëveshja duhet pranuar para dërgimit."}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
                        !termsChecked ? "opacity-70" : ""
                      }`}
                    >
                      {loading ? "Duke dërguar..." : "Dërgo kërkesën"}
                      <Send className="h-4 w-4" />
                    </button>

                    <p className="text-center text-[10px] leading-4 text-zinc-400">
                      Do të kontaktohesh brenda 1 ore. Konsultimi është falas.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}