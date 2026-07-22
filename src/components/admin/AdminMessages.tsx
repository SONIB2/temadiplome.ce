import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  RefreshCw,
  Save,
  Search,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Order {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  university: string;
  field_of_study: string;
  topic?: string;
  study_level: string;
  work_type: string;
  subject_area: string;
  deadline: string;
  has_existing_material: boolean;
  uploaded_files: string[];
  description: string;
  budget_note: string;
  status: string;
  order_status?: string;
  admin_note?: string;
  final_file_url?: string;
  final_file_name?: string;
  created_at: string;
}

const statuses = [
  { value: "received", label: "Porosia u mor" },
  { value: "in_progress", label: "Në proces" },
  { value: "review", label: "Në kontroll final" },
  { value: "completed", label: "Përfunduar" },
  { value: "delivered", label: "Dorëzuar" },
  { value: "cancelled", label: "Anuluar" },
];

const statusClasses: Record<string, string> = {
  received: "border-blue-200 bg-blue-50 text-blue-700",
  in_progress: "border-violet-200 bg-violet-50 text-violet-700",
  review: "border-amber-200 bg-amber-50 text-amber-700",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  delivered: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

function statusLabel(value?: string) {
  return statuses.find((status) => status.value === value)?.label || "Porosia u mor";
}

function formatDate(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("sq-AL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysUntilDeadline(deadline?: string) {
  if (!deadline) return null;

  const today = new Date();
  const deadlineDate = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  return Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function getUrgency(deadline?: string) {
  const days = getDaysUntilDeadline(deadline);

  if (days === null) {
    return {
      label: "Pa afat",
      className: "border-zinc-200 bg-zinc-50 text-zinc-600",
    };
  }

  if (days < 0) {
    return {
      label: "Afati ka kaluar",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (days === 0) {
    return {
      label: "Urgjente sot",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (days <= 2) {
    return {
      label: `Urgjente: ${days} ditë`,
      className: "border-orange-200 bg-orange-50 text-orange-700",
    };
  }

  if (days <= 7) {
    return {
      label: `Këtë javë: ${days} ditë`,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: `Edhe ${days} ditë`,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    setMessage("");

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("order_status", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Orders load error:", error);
      setMessage("Nuk u ngarkuan porositë.");
      setLoading(false);
      return;
    }

    setOrders((data || []) as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filter]);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;

    return orders.filter((order) =>
      [
        order.full_name,
        order.email,
        order.phone,
        order.topic,
        order.work_type,
        order.subject_area,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [orders, search]);

  const summary = useMemo(() => {
    const urgent = orders.filter((order) => {
      const days = getDaysUntilDeadline(order.deadline);
      return (
        days !== null &&
        days <= 2 &&
        order.order_status !== "completed" &&
        order.order_status !== "delivered" &&
        order.order_status !== "cancelled"
      );
    }).length;

    const inProgress = orders.filter(
      (order) =>
        order.order_status === "in_progress" || order.order_status === "review"
    ).length;

    const ready = orders.filter(
      (order) => order.order_status === "completed"
    ).length;

    const delivered = orders.filter(
      (order) => order.order_status === "delivered"
    ).length;

    return { urgent, inProgress, ready, delivered };
  }, [orders]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: orders.length };

    statuses.forEach((status) => {
      result[status.value] = orders.filter(
        (order) => (order.order_status || "received") === status.value
      ).length;
    });

    return result;
  }, [orders]);

  const updateSelected = (field: keyof Order, value: string) => {
    if (!selected) return;
    setSelected({ ...selected, [field]: value });
  };

  const saveSelected = async () => {
    if (!selected) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("orders")
      .update({
        order_status: selected.order_status || "received",
        admin_note: selected.admin_note || "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    if (error) {
      console.error("Order update error:", error);
      setMessage("Statusi nuk u ruajt.");
      setSaving(false);
      return;
    }

    setOrders((previous) =>
      previous.map((order) =>
        order.id === selected.id
          ? {
              ...order,
              order_status: selected.order_status,
              admin_note: selected.admin_note,
            }
          : order
      )
    );

    setMessage("Statusi u përditësua me sukses.");
    setSaving(false);
  };

  const uploadFinalFile = async (file: File) => {
    if (!selected) return;

    setSaving(true);
    setMessage("");

    const extension = file.name.split(".").pop();
    const fileName = `${selected.id}_${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("completed-files")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Final file upload error:", uploadError);
      setMessage("File final nuk u ngarkua.");
      setSaving(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("completed-files")
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        order_status: "completed",
        final_file_url: urlData.publicUrl,
        final_file_name: file.name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    if (updateError) {
      console.error("Final file update error:", updateError);
      setMessage("File u ngarkua, por nuk u lidh me porosinë.");
      setSaving(false);
      return;
    }

    const updatedOrder: Order = {
      ...selected,
      order_status: "completed",
      final_file_url: urlData.publicUrl,
      final_file_name: file.name,
    };

    setSelected(updatedOrder);
    setOrders((previous) =>
      previous.map((order) => (order.id === selected.id ? updatedOrder : order))
    );

    setMessage("Punimi final u ngarkua. Studenti mund ta shkarkojë nga Dashboard.");
    setSaving(false);
  };

  return (
    <div className="min-w-0">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
            Porositë
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Menaxho kërkesat, afatet, statuset dhe materialet finale.
          </p>
        </div>

        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Duke ngarkuar..." : "Rifresko"}
        </button>
      </div>

      {message && (
        <div className="mt-5 rounded-[16px] border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800">
          {message}
        </div>
      )}

      {/* STATS */}
      <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Urgjente",
            value: summary.urgent,
            icon: AlertTriangle,
            className: "border-red-100 bg-red-50/70 text-red-700",
          },
          {
            label: "Në proces",
            value: summary.inProgress,
            icon: Clock3,
            className: "border-violet-100 bg-violet-50/70 text-violet-700",
          },
          {
            label: "Përfunduar",
            value: summary.ready,
            icon: FileText,
            className: "border-emerald-100 bg-emerald-50/70 text-emerald-700",
          },
          {
            label: "Dorëzuar",
            value: summary.delivered,
            icon: CheckCircle2,
            className: "border-blue-100 bg-blue-50/70 text-blue-700",
          },
        ].map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className={`rounded-[20px] border p-4 shadow-[0_10px_30px_rgba(24,24,27,0.04)] sm:p-5 ${card.className}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
                    {card.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-bold text-zinc-950">
                    {card.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* FILTERS */}
      <section className="mt-5 rounded-[22px] border border-zinc-100 bg-white p-4 shadow-[0_14px_44px_rgba(24,24,27,0.05)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["all", ...statuses.map((status) => status.value)].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                  filter === value
                    ? "border-violet-700 bg-violet-700 text-white shadow-lg shadow-violet-200/60"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                {value === "all" ? "Të gjitha" : statusLabel(value)}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    filter === value ? "bg-white/15" : "bg-zinc-100"
                  }`}
                >
                  {counts[value] || 0}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[320px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Kërko emër, email, temë..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="mt-5 overflow-hidden rounded-[22px] border border-zinc-100 bg-white shadow-[0_14px_44px_rgba(24,24,27,0.05)]">
        <div className="hidden grid-cols-[1.15fr_1.5fr_0.9fr_0.8fr_48px] gap-4 border-b border-zinc-100 bg-zinc-50/80 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 lg:grid">
          <span>Studenti</span>
          <span>Porosia</span>
          <span>Afati</span>
          <span>Statusi</span>
          <span />
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-zinc-400">
            Duke ngarkuar porositë...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
              <FileText className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-zinc-700">
              Nuk u gjet asnjë porosi
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Provo një filtër ose kërkim tjetër.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {filteredOrders.map((order) => {
              const currentStatus = order.order_status || "received";
              const urgency = getUrgency(order.deadline);

              return (
                <article
                  key={order.id}
                  className="group grid gap-4 px-4 py-4 transition hover:bg-violet-50/30 sm:px-5 lg:grid-cols-[1.15fr_1.5fr_0.9fr_0.8fr_48px] lg:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-zinc-950">
                      {order.full_name}
                    </p>
                    <p className="mt-1 truncate text-[11px] text-zinc-400">
                      {order.email}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                      {order.phone}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-800">
                      {order.topic || "Pa temë"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600">
                        {order.work_type || "—"}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600">
                        {order.subject_area || "—"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                      <CalendarDays className="h-4 w-4 text-zinc-400" />
                      {formatDate(order.deadline)}
                    </div>
                    <span
                      className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${urgency.className}`}
                    >
                      {urgency.label}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        statusClasses[currentStatus] || statusClasses.received
                      }`}
                    >
                      {statusLabel(currentStatus)}
                    </span>
                    <p className="mt-2 text-[10px] text-zinc-400">
                      Krijuar: {formatDate(order.created_at)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelected({
                        ...order,
                        order_status: order.order_status || "received",
                      })
                    }
                    aria-label={`Shiko porosinë e ${order.full_name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-700 transition hover:bg-violet-700 hover:text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-zinc-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-w-4xl sm:rounded-[26px]"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                  Detajet e porosisë
                </p>
                <h2 className="mt-1 font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                  {selected.full_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-5">
                <section className="rounded-[20px] border border-zinc-100 bg-zinc-50/60 p-5">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Informacioni i studentit
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Email", selected.email],
                      ["Telefon", selected.phone],
                      ["Universiteti", selected.university || "—"],
                      ["Dega", selected.field_of_study || "—"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                          {label}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium text-zinc-800">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Detajet e punimit
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Tema", selected.topic || "—"],
                      ["Niveli", selected.study_level || "—"],
                      ["Lloji", selected.work_type || "—"],
                      ["Fusha", selected.subject_area || "—"],
                      ["Afati", formatDate(selected.deadline)],
                      ["Buxheti", selected.budget_note || "—"],
                      [
                        "Ka material",
                        selected.has_existing_material ? "Po" : "Jo",
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className={label === "Tema" ? "sm:col-span-2" : ""}>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                          {label}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium leading-6 text-zinc-800">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-zinc-100 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                      Përshkrimi
                    </p>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-600">
                      {selected.description || "—"}
                    </p>
                  </div>
                </section>

                {selected.uploaded_files?.length > 0 && (
                  <section className="rounded-[20px] border border-violet-100 bg-violet-50/50 p-5">
                    <h3 className="font-serif text-lg font-bold text-zinc-950">
                      Skedarët nga studenti
                    </h3>

                    <div className="mt-3 space-y-2">
                      {selected.uploaded_files.map((fileUrl, index) => (
                        <a
                          key={fileUrl}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300"
                        >
                          <span>Skedari {index + 1}</span>
                          <Download className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className="space-y-5">
                <section className="rounded-[20px] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 shadow-[0_10px_30px_rgba(76,29,149,0.05)]">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Menaxhimi i porosisë
                  </h3>

                  <label className="mt-4 block text-xs font-bold text-zinc-800">
                    Statusi
                  </label>
                  <select
                    value={selected.order_status || "received"}
                    onChange={(event) =>
                      updateSelected("order_status", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <label className="mt-4 block text-xs font-bold text-zinc-800">
                    Shënim për studentin
                  </label>
                  <textarea
                    value={selected.admin_note || ""}
                    onChange={(event) =>
                      updateSelected("admin_note", event.target.value)
                    }
                    rows={5}
                    placeholder="p.sh. Punimi është marrë dhe ka nisur përgatitja."
                    className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </section>

                <section className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Materiali final
                  </h3>

                  <label className="mt-4 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-violet-200 bg-violet-50/40 px-5 py-6 text-center transition hover:border-violet-400 hover:bg-violet-50">
                    <Upload className="h-6 w-6 text-violet-600" />
                    <span className="mt-3 text-sm font-bold text-zinc-800">
                      Zgjidh file final
                    </span>
                    <span className="mt-1 text-xs text-zinc-400">
                      DOC, PDF, PPT, Excel ose ZIP
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.zip"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) uploadFinalFile(file);
                      }}
                    />
                  </label>

                  {selected.final_file_url && (
                    <a
                      href={selected.final_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
                    >
                      <span className="truncate">
                        {selected.final_file_name || "Materiali final"}
                      </span>
                      <Download className="h-4 w-4 shrink-0" />
                    </a>
                  )}
                </section>
              </aside>
            </div>

            <footer className="sticky bottom-0 flex flex-col gap-2 border-t border-zinc-100 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:px-7">
              <button
                type="button"
                onClick={saveSelected}
                disabled={saving}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200/60 transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Duke ruajtur..." : "Ruaj ndryshimet"}
              </button>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
              >
                Mbyll
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}