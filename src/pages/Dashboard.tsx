import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  FolderCheck,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type DashboardUser = {
  full_name?: string;
  first_name?: string;
  email?: string;
};

type Order = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  topic?: string;
  study_level?: string;
  work_type?: string;
  subject_area?: string;
  deadline?: string;
  description?: string;
  budget_note?: string;
  order_status?: string;
  admin_note?: string;
  final_file_url?: string;
  final_file_name?: string;
  payment_status?: string;
  created_at?: string;
};

const statuses = [
  { value: "received", label: "Porosia u mor" },
  { value: "in_progress", label: "Në proces" },
  { value: "review", label: "Në kontroll final" },
  { value: "completed", label: "Përfunduar" },
  { value: "delivered", label: "Dorëzuar" },
  { value: "cancelled", label: "Anuluar" },
];

const progressLabels = [
  "Porosia u mor",
  "Në proces",
  "Në kontroll",
  "Përfunduar",
];

function getStatusLabel(status?: string) {
  return (
    statuses.find((item) => item.value === status)?.label || "Porosia u mor"
  );
}

function getStatusStep(status?: string) {
  switch (status) {
    case "received":
      return 1;
    case "in_progress":
      return 2;
    case "review":
      return 3;
    case "completed":
    case "delivered":
      return 4;
    case "cancelled":
      return 0;
    default:
      return 1;
  }
}

function getStatusClasses(status?: string) {
  switch (status) {
    case "in_progress":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "review":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "completed":
    case "delivered":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

function formatDate(value?: string) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("sq-AL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "/";
  };

  const loadDashboard = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const savedUser = localStorage.getItem("currentUser");

      if (!isLoggedIn || !savedUser) {
        window.location.href = "/auth";
        return;
      }

      const currentUser = JSON.parse(savedUser) as DashboardUser;
      setUser(currentUser);

      if (!currentUser.email) {
        setError(
          "Nuk u gjet email-i i përdoruesit. Ju lutemi hyni përsëri."
        );
        return;
      }

      const { data, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("email", currentUser.email)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Dashboard orders error:", ordersError);
        setError("Porositë nuk u ngarkuan. Ju lutemi provoni përsëri.");
        return;
      }

      setOrders((data || []) as Order[]);
    } catch (dashboardError) {
      console.error("Dashboard error:", dashboardError);
      setError("Ndodhi një gabim gjatë ngarkimit të dashboard-it.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const activeOrders = orders.filter(
    (order) =>
      order.order_status !== "completed" &&
      order.order_status !== "delivered" &&
      order.order_status !== "cancelled"
  );

  const inProgressOrders = orders.filter(
    (order) =>
      order.order_status === "in_progress" ||
      order.order_status === "review"
  );

  const completedOrders = orders.filter(
    (order) =>
      order.order_status === "completed" ||
      order.order_status === "delivered"
  );

  const finalMaterials = orders.filter(
    (order) => Boolean(order.final_file_url)
  );

  const displayName =
    user?.first_name ||
    user?.full_name?.split(" ")[0] ||
    user?.full_name ||
    "Student";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 pt-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>

          <p className="mt-4 text-sm font-medium text-zinc-600">
            Duke ngarkuar dashboard-in...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-zinc-50 pb-10 pt-24 lg:pt-28">
      <div className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[26px] bg-[#0b0718] px-5 py-7 text-white shadow-[0_24px_70px_rgba(7,9,21,0.16)] sm:px-8 sm:py-9 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                <Sparkles className="h-4 w-4" />
                Dashboard personal
              </div>

              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Mirë se erdhe, {displayName}!
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Ndiq porositë, shiko statusin e punimit dhe shkarko materialet
                përfundimtare nga një vend i vetëm.
              </p>

              {user?.email && (
                <p className="mt-3 text-xs text-zinc-500">{user.email}</p>
              )}
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                to="/zgjidh-punimin"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" />
                Bëj porosi të re
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Dil nga llogaria
              </button>
            </div>
          </section>

          {error && (
            <div className="mt-6 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* QUICK ACTIONS */}
          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              to="/zgjidh-punimin"
              className="group flex min-w-0 items-center gap-4 rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-5 shadow-[0_12px_36px_rgba(76,29,149,0.05)] transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_44px_rgba(76,29,149,0.09)] sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
                <Plus className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-lg font-bold text-zinc-950 sm:text-xl">
                  Porosi e re
                </h2>

                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  Zgjidh shërbimin dhe dërgo kërkesën.
                </p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-violet-600 transition group-hover:translate-x-1" />
            </Link>

            <article className="flex min-w-0 items-center gap-4 rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-lg font-bold text-zinc-950 sm:text-xl">
                  Porositë e mia
                </h2>

                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  Ke gjithsej{" "}
                  <strong className="text-zinc-950">{orders.length}</strong>{" "}
                  porosi.
                </p>
              </div>
            </article>

            <article className="flex min-w-0 items-center gap-4 rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <FolderCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-lg font-bold text-zinc-950 sm:text-xl">
                  Materialet finale
                </h2>

                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  <strong className="text-zinc-950">
                    {finalMaterials.length}
                  </strong>{" "}
                  file të gatshme për shkarkim.
                </p>
              </div>
            </article>
          </section>

          {/* OVERVIEW */}
          <section className="mt-6 rounded-[24px] border border-zinc-100 bg-white p-5 shadow-[0_14px_44px_rgba(24,24,27,0.05)] sm:p-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                Përmbledhje
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950">
                Statusi i porosive
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <article className="rounded-[18px] border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
                <p className="text-xs font-medium text-amber-700">
                  Porosi aktive
                </p>
                <p className="mt-2 font-serif text-3xl font-bold text-zinc-950">
                  {activeOrders.length}
                </p>
              </article>

              <article className="rounded-[18px] border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
                <p className="text-xs font-medium text-blue-700">Në proces</p>
                <p className="mt-2 font-serif text-3xl font-bold text-zinc-950">
                  {inProgressOrders.length}
                </p>
              </article>

              <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
                <p className="text-xs font-medium text-emerald-700">
                  Të përfunduara
                </p>
                <p className="mt-2 font-serif text-3xl font-bold text-zinc-950">
                  {completedOrders.length}
                </p>
              </article>

              <article className="rounded-[18px] border border-violet-100 bg-violet-50/60 p-4 sm:p-5">
                <p className="text-xs font-medium text-violet-700">
                  File të gatshme
                </p>
                <p className="mt-2 font-serif text-3xl font-bold text-zinc-950">
                  {finalMaterials.length}
                </p>
              </article>
            </div>
          </section>

          {/* ORDERS */}
          <section className="mt-6 rounded-[24px] border border-zinc-100 bg-white p-5 shadow-[0_14px_44px_rgba(24,24,27,0.05)] sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Porositë
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950">
                  Porositë e mia
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Ndiq progresin dhe shkarko materialin final kur të jetë gati.
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadDashboard(true)}
                disabled={refreshing}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Duke rifreskuar..." : "Rifresko"}
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="mt-6 rounded-[22px] border border-dashed border-violet-200 bg-gradient-to-br from-violet-50/60 to-white px-5 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Clock className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-zinc-950">
                  Nuk ke ende porosi
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  Porosia jote e parë dhe progresi i saj do të shfaqen këtu.
                </p>

                <Link
                  to="/zgjidh-punimin"
                  className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5"
                >
                  Bëj porosinë e parë
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {orders.map((order) => {
                  const step = getStatusStep(order.order_status);

                  return (
                    <article
                      key={order.id}
                      className="overflow-hidden rounded-[22px] border border-zinc-100 bg-white shadow-[0_10px_34px_rgba(24,24,27,0.05)]"
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                              {formatDate(order.created_at)}
                            </p>

                            <h3 className="mt-2 font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                              {order.topic || "Porosi pa titull"}
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-zinc-500 sm:text-sm">
                              {[order.work_type, order.subject_area]
                                .filter(Boolean)
                                .join(" · ") || "Detajet e porosisë"}
                              {order.deadline
                                ? ` · Afati: ${order.deadline}`
                                : ""}
                            </p>

                            {order.budget_note && (
                              <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
                                {order.budget_note}
                              </p>
                            )}
                          </div>

                          <span
                            className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                              order.order_status
                            )}`}
                          >
                            {getStatusLabel(order.order_status)}
                          </span>
                        </div>

                        {order.order_status !== "cancelled" ? (
                          <div className="mt-6">
                            <div className="grid grid-cols-4 gap-2">
                              {progressLabels.map((label, index) => {
                                const active = step >= index + 1;

                                return (
                                  <div key={label} className="min-w-0">
                                    <div
                                      className={`h-2 rounded-full transition ${
                                        active
                                          ? "bg-gradient-to-r from-violet-700 to-purple-500"
                                          : "bg-zinc-200"
                                      }`}
                                    />

                                    <p
                                      className={`mt-2 text-center text-[9px] leading-3 sm:text-[11px] ${
                                        active
                                          ? "font-semibold text-zinc-800"
                                          : "text-zinc-400"
                                      }`}
                                    >
                                      {label}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            Kjo porosi është anuluar.
                          </div>
                        )}

                        {(order.admin_note || order.description) && (
                          <div className="mt-6 grid gap-3 lg:grid-cols-2">
                            {order.admin_note && (
                              <div className="rounded-[16px] border border-violet-100 bg-violet-50/60 p-4">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="h-4 w-4 text-violet-600" />

                                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600">
                                    Shënim nga administratori
                                  </p>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-zinc-700">
                                  {order.admin_note}
                                </p>
                              </div>
                            )}

                            {order.description && (
                              <div className="rounded-[16px] border border-zinc-100 bg-zinc-50 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                                  Përshkrimi yt
                                </p>

                                <p className="mt-2 text-sm leading-6 text-zinc-600">
                                  {order.description}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-6 border-t border-zinc-100 pt-5">
                          {order.final_file_url ? (
                            <a
                              href={order.final_file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 sm:w-auto"
                            >
                              <Download className="h-4 w-4" />
                              Shkarko materialin final
                              {order.final_file_name
                                ? `: ${order.final_file_name}`
                                : ""}
                            </a>
                          ) : (
                            <div className="flex items-start gap-3 text-xs leading-5 text-zinc-400">
                              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                              File-i final do të shfaqet këtu sapo të ngarkohet
                              nga administratori.
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}