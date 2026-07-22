import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  List,
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

type ViewMode = "list" | "calendar";

const statuses = [
  { value: "received", label: "Porosia u mor" },
  { value: "in_progress", label: "Në proces" },
  { value: "review", label: "Në kontroll final" },
  { value: "completed", label: "Përfunduar" },
  { value: "delivered", label: "Dorëzuar" },
  { value: "cancelled", label: "Anuluar" },
];

const statusColors: Record<string, string> = {
  received: "border-blue-200 bg-blue-50 text-blue-700",
  in_progress: "border-violet-200 bg-violet-50 text-violet-700",
  review: "border-amber-200 bg-amber-50 text-amber-700",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  delivered: "border-sky-200 bg-sky-50 text-sky-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

const weekDays = ["Hën", "Mar", "Mër", "Enj", "Pre", "Sht", "Die"];

function statusLabel(value?: string) {
  return statuses.find((status) => status.value === value)?.label || "Porosia u mor";
}

function toLocalDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value?: string) {
  const date = toLocalDate(value);
  if (!date) return "—";

  return date.toLocaleDateString("sq-AL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDaysUntilDeadline(deadline?: string) {
  const deadlineDate = toLocalDate(deadline);
  if (!deadlineDate) return null;

  const today = new Date();
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
      level: "none",
      label: "Pa afat",
      className: "border-zinc-200 bg-zinc-50 text-zinc-600",
    };
  }

  if (days < 0) {
    return {
      level: "overdue",
      label: "Afati ka kaluar",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (days === 0) {
    return {
      level: "today",
      label: "Urgjente sot",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (days <= 2) {
    return {
      level: "urgent",
      label: `Urgjente: ${days} ditë`,
      className: "border-orange-200 bg-orange-50 text-orange-700",
    };
  }

  if (days <= 7) {
    return {
      level: "week",
      label: `Këtë javë: ${days} ditë`,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    level: "later",
    label: `Më vonë: ${days} ditë`,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatCalendarMonth(date: Date) {
  return date.toLocaleDateString("sq-AL", {
    month: "long",
    year: "numeric",
  });
}

function calendarEventClass(deadline?: string) {
  const urgency = getUrgency(deadline);

  if (urgency.level === "overdue" || urgency.level === "today") {
    return "border-red-200 bg-red-50 text-red-700 hover:bg-red-100";
  }

  if (urgency.level === "urgent") {
    return "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100";
  }

  if (urgency.level === "week") {
    return "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selected, setSelected] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

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
  }, []);

  const updateSelected = <K extends keyof Order>(field: K, value: Order[K]) => {
    if (!selected) return;

    setSelected({
      ...selected,
      [field]: value,
    });
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
    setMessage(
      "Punimi final u ngarkua. Studenti mund ta shkarkojë nga Dashboard."
    );
    setSaving(false);
  };

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const currentStatus = order.order_status || "received";
      const matchesFilter = filter === "all" || currentStatus === filter;

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      return [
        order.full_name,
        order.email,
        order.phone,
        order.topic,
        order.work_type,
        order.subject_area,
        order.university,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
  }, [orders, filter, query]);

  const activeDeadlineOrders = useMemo(
    () =>
      [...orders]
        .filter((order) => {
          const status = order.order_status || "received";
          return !["completed", "delivered", "cancelled"].includes(status);
        })
        .filter((order) => Boolean(order.deadline))
        .sort((first, second) => {
          const firstDate = toLocalDate(first.deadline)?.getTime() ?? Infinity;
          const secondDate = toLocalDate(second.deadline)?.getTime() ?? Infinity;
          return firstDate - secondDate;
        }),
    [orders]
  );

  const urgentCount = activeDeadlineOrders.filter((order) => {
    const days = getDaysUntilDeadline(order.deadline);
    return days !== null && days <= 2;
  }).length;

  const inProgressCount = orders.filter((order) =>
    ["in_progress", "review"].includes(order.order_status || "received")
  ).length;

  const completedCount = orders.filter(
    (order) => (order.order_status || "received") === "completed"
  ).length;

  const deliveredCount = orders.filter(
    (order) => (order.order_status || "received") === "delivered"
  ).length;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };

    statuses.forEach((status) => {
      counts[status.value] = orders.filter(
        (order) => (order.order_status || "received") === status.value
      ).length;
    });

    return counts;
  }, [orders]);

  const monthStart = startOfMonth(calendarDate);
  const monthEnd = endOfMonth(calendarDate);
  const firstDayIndex = (monthStart.getDay() + 6) % 7;
  const daysInMonth = monthEnd.getDate();

  const calendarDays = Array.from(
    { length: Math.ceil((firstDayIndex + daysInMonth) / 7) * 7 },
    (_, index) => {
      const dayNumber = index - firstDayIndex + 1;

      if (dayNumber < 1 || dayNumber > daysInMonth) return null;

      return new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        dayNumber
      );
    }
  );

  const ordersForDay = (date: Date) =>
    filteredOrders.filter((order) => {
      const deadline = toLocalDate(order.deadline);
      return deadline ? sameDay(deadline, date) : false;
    });

  const openOrder = (order: Order) => {
    setSelected({
      ...order,
      order_status: order.order_status || "received",
    });
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
            Menaxhimi i porosive
          </p>

          <h1 className="mt-1 font-serif text-3xl font-bold text-zinc-950">
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
          {loading ? "Duke rifreskuar..." : "Rifresko"}
        </button>
      </section>

      {message && (
        <div className="rounded-[16px] border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800">
          {message}
        </div>
      )}

      {/* STATS */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Urgjente",
            value: urgentCount,
            icon: AlertTriangle,
            cardClass: "border-red-100 bg-red-50/60",
            iconClass: "bg-white text-red-600",
            labelClass: "text-red-600",
          },
          {
            label: "Në proces",
            value: inProgressCount,
            icon: Clock3,
            cardClass: "border-violet-100 bg-violet-50/60",
            iconClass: "bg-white text-violet-600",
            labelClass: "text-violet-600",
          },
          {
            label: "Përfunduar",
            value: completedCount,
            icon: FileCheck2,
            cardClass: "border-emerald-100 bg-emerald-50/60",
            iconClass: "bg-white text-emerald-600",
            labelClass: "text-emerald-600",
          },
          {
            label: "Dorëzuar",
            value: deliveredCount,
            icon: Eye,
            cardClass: "border-blue-100 bg-blue-50/60",
            iconClass: "bg-white text-blue-600",
            labelClass: "text-blue-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className={`flex items-center justify-between rounded-[22px] border p-5 shadow-[0_12px_32px_rgba(24,24,27,0.03)] ${stat.cardClass}`}
            >
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.18em] ${stat.labelClass}`}
                >
                  {stat.label}
                </p>

                <p className="mt-3 font-serif text-3xl font-bold text-zinc-950">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${stat.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </article>
          );
        })}
      </section>

      {/* CONTROLS */}
      <section className="rounded-[22px] border border-zinc-100 bg-white p-4 shadow-[0_14px_40px_rgba(24,24,27,0.04)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/60"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <List className="h-4 w-4" />
              Lista
            </button>

            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                viewMode === "calendar"
                  ? "bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/60"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              Kalendari
            </button>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kërko emër, email, temë..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["all", ...statuses.map((status) => status.value)].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                filter === status
                  ? "border-violet-700 bg-violet-700 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              {status === "all" ? "Të gjitha" : statusLabel(status)}

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  filter === status ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {statusCounts[status] || 0}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      {viewMode === "calendar" ? (
        <section className="overflow-hidden rounded-[24px] border border-zinc-100 bg-white shadow-[0_16px_48px_rgba(24,24,27,0.05)]">
          <div className="flex flex-col gap-4 border-b border-zinc-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                Afatet e porosive
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold capitalize text-zinc-950">
                {formatCalendarMonth(calendarDate)}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Kliko mbi një porosi për të parë ose ndryshuar detajet.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCalendarDate(addMonths(calendarDate, -1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50"
                aria-label="Muaji i mëparshëm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setCalendarDate(new Date())}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Sot
              </button>

              <button
                type="button"
                onClick={() => setCalendarDate(addMonths(calendarDate, 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50"
                aria-label="Muaji i ardhshëm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* DESKTOP CALENDAR */}
         <div className="w-full overflow-x-auto scrollbar-hide">
  <div className="min-w-[760px]">
    <div className="grid grid-cols-7 border-b border-zinc-100 bg-zinc-50">
      {["Hën", "Mar", "Mër", "Enj", "Pre", "Sht", "Die"].map((day) => (
        <div
          key={day}
          className="px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500"
        >
          {day}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-7">
      {calendarDays.map((date, index) => {
        if (!date) {
          return (
            <div
              key={`empty-${index}`}
              className="min-h-[118px] border-b border-r border-zinc-100 bg-zinc-50/50"
            />
          );
        }

        const dayOrders = ordersForDay(date);
        const isToday = sameDay(date, new Date());

        return (
          <div
            key={date.toISOString()}
            className="min-h-[118px] border-b border-r border-zinc-100 p-2"
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  isToday
                    ? "bg-violet-700 text-white"
                    : "text-zinc-700"
                }`}
              >
                {date.getDate()}
              </span>

              {dayOrders.length > 0 && (
                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                  {dayOrders.length}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              {dayOrders.slice(0, 2).map((order) => {
                const urgency = getUrgency(order.deadline);

                const urgencyClasses =
                  urgency.label.includes("kaluar") ||
                  urgency.label.includes("sot")
                    ? "border-red-200 bg-red-50 text-red-700"
                    : urgency.label.includes("Urgjente")
                      ? "border-orange-200 bg-orange-50 text-orange-700"
                      : urgency.label.includes("javë")
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700";

                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() =>
                      setSelected({
                        ...order,
                        order_status:
                          order.order_status || "received",
                      })
                    }
                    className={`w-full rounded-lg border px-2 py-1.5 text-left text-[10px] font-semibold leading-4 transition hover:scale-[1.01] ${urgencyClasses}`}
                  >
                    <span className="block truncate">
                      {order.full_name}
                    </span>

                    <span className="block truncate font-normal opacity-80">
                      {order.topic || order.work_type || "Pa temë"}
                    </span>
                  </button>
                );
              })}

              {dayOrders.length > 2 && (
                <p className="px-1 text-[10px] font-medium text-zinc-400">
                  +{dayOrders.length - 2} të tjera
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
        </section>
      ) : (
        <section className="overflow-hidden rounded-[24px] border border-zinc-100 bg-white shadow-[0_16px_48px_rgba(24,24,27,0.05)]">
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1.05fr_1.45fr_0.82fr_0.86fr_58px] gap-4 border-b border-zinc-100 bg-zinc-50/80 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              <span>Studenti</span>
              <span>Porosia</span>
              <span>Afati</span>
              <span>Statusi</span>
              <span />
            </div>

            {filteredOrders.map((order) => {
              const currentStatus = order.order_status || "received";
              const urgency = getUrgency(order.deadline);

              return (
                <article
                  key={order.id}
                  className="grid grid-cols-[1.05fr_1.45fr_0.82fr_0.86fr_58px] items-center gap-4 border-b border-zinc-100 px-5 py-5 last:border-b-0 hover:bg-violet-50/25"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-zinc-950">
                      {order.full_name}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-400">
                      {order.email}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                      {order.phone}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 break-words text-sm font-semibold leading-5 text-zinc-900">
                      {order.topic || "Pa temë"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {order.work_type && (
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600">
                          {order.work_type}
                        </span>
                      )}

                      {order.subject_area && (
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600">
                          {order.subject_area}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-800">
                      {formatDate(order.deadline)}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${urgency.className}`}
                    >
                      {urgency.label}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold ${
                        statusColors[currentStatus] || statusColors.received
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
                    onClick={() => openOrder(order)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-700 transition hover:bg-violet-100"
                    aria-label={`Shiko porosinë e ${order.full_name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>

          {/* MOBILE / TABLET CARDS */}
          <div className="space-y-3 p-4 lg:hidden">
            {filteredOrders.map((order) => {
              const currentStatus = order.order_status || "received";
              const urgency = getUrgency(order.deadline);

              return (
                <article
                  key={order.id}
                  className="rounded-[18px] border border-zinc-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-zinc-950">
                        {order.full_name}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-400">
                        {order.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openOrder(order)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-4 line-clamp-2 break-words text-sm font-semibold leading-5 text-zinc-800">
                    {order.topic || "Pa temë"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        statusColors[currentStatus] || statusColors.received
                      }`}
                    >
                      {statusLabel(currentStatus)}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${urgency.className}`}
                    >
                      {urgency.label}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-zinc-500">
                    Afati: <strong>{formatDate(order.deadline)}</strong>
                  </p>
                </article>
              );
            })}
          </div>

          {!loading && filteredOrders.length === 0 && (
            <div className="px-5 py-14 text-center">
              <p className="text-sm text-zinc-400">
                Nuk u gjet asnjë porosi për filtrat e zgjedhur.
              </p>
            </div>
          )}

          {loading && (
            <div className="px-5 py-14 text-center text-sm text-zinc-400">
              Duke ngarkuar porositë...
            </div>
          )}
        </section>
      )}

      {/* ORDER MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-zinc-950/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[94vh] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-w-4xl sm:rounded-[28px]"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                  Porosia
                </p>

                <h2 className="mt-1 font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                  Detajet e porosisë
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

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="space-y-5">
                <div className="rounded-[20px] border border-zinc-100 bg-zinc-50/70 p-5">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Studenti dhe porosia
                  </h3>

                  <div className="mt-4 space-y-3 text-sm">
                    {[
                      ["Emër", selected.full_name],
                      ["Email", selected.email],
                      ["Telefon", selected.phone],
                      ["Universiteti", selected.university || "—"],
                      ["Dega", selected.field_of_study || "—"],
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
                      <div
                        key={label}
                        className="grid grid-cols-[110px_1fr] gap-3 border-b border-zinc-200/70 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-zinc-500">{label}</span>
                        <span className="break-words text-right font-medium text-zinc-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Përshkrimi
                  </h3>

                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-zinc-600">
                    {selected.description || "Pa përshkrim."}
                  </p>
                </div>

                {selected.uploaded_files?.length > 0 && (
                  <div className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-zinc-950">
                      Skedarë nga studenti
                    </h3>

                    <div className="mt-3 space-y-2">
                      {selected.uploaded_files.map((fileUrl, index) => (
                        <a
                          key={`${fileUrl}-${index}`}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-50"
                        >
                          <Download className="h-4 w-4" />
                          Skedar {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <aside className="space-y-5">
                <div className="rounded-[20px] border border-violet-100 bg-violet-50/50 p-5">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Menaxhimi i statusit
                  </h3>

                  <label className="mt-4 block text-xs font-bold text-zinc-700">
                    Statusi i porosisë
                  </label>

                  <select
                    value={selected.order_status || "received"}
                    onChange={(event) =>
                      updateSelected("order_status", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <label className="mt-4 block text-xs font-bold text-zinc-700">
                    Shënim për studentin
                  </label>

                  <textarea
                    value={selected.admin_note || ""}
                    onChange={(event) =>
                      updateSelected("admin_note", event.target.value)
                    }
                    rows={5}
                    placeholder="p.sh. Punimi është marrë dhe ka nisur përgatitja."
                    className="mt-2 w-full resize-none rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />

                  <button
                    type="button"
                    onClick={saveSelected}
                    disabled={saving}
                    className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200/60 transition hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Duke ruajtur..." : "Ruaj ndryshimet"}
                  </button>
                </div>

                <div className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">
                    Materiali final
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Ngarko dokumentin që studenti do të shkarkojë nga Dashboard-i.
                  </p>

                  <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-violet-200 bg-violet-50/50 px-5 py-7 text-center transition hover:border-violet-400 hover:bg-violet-50">
                    <Upload className="h-6 w-6 text-violet-600" />

                    <span className="mt-2 text-sm font-bold text-zinc-800">
                      Zgjidh file final
                    </span>

                    <span className="mt-1 text-[10px] text-zinc-400">
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
                      className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700"
                    >
                      <Download className="h-4 w-4" />
                      {selected.final_file_name || "Shiko materialin final"}
                    </a>
                  )}
                </div>
              </aside>
            </div>

            <footer className="flex flex-col gap-2 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
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