import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Loader2,
  LogOut,
  Plus,
} from "lucide-react";
import { supabase } from "../lib/supabase";

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

function getStatusLabel(status?: string) {
  return statuses.find((item) => item.value === status)?.label || "Porosia u mor";
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

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedUser = localStorage.getItem("currentUser");

    if (!isLoggedIn || !savedUser) {
      window.location.href = "/auth";
      return;
    }

    const currentUser = JSON.parse(savedUser);
    setUser(currentUser);

    const email = currentUser?.email;

    if (!email) {
      setError("Nuk u gjet email-i i përdoruesit. Ju lutemi hyni përsëri.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Dashboard orders error:", error);
      setError("Porositë nuk u ngarkuan. Provoni përsëri.");
    } else {
      setOrders((data || []) as Order[]);
    }

    setLoading(false);
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
    (order) => order.order_status === "in_progress" || order.order_status === "review"
  );

  const completedOrders = orders.filter(
    (order) => order.order_status === "completed" || order.order_status === "delivered"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-24 pb-20 flex items-center justify-center">
        <div className="flex items-center gap-2 text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Duke ngarkuar dashboard-in...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-zinc-950">
                Mirë se erdhe{user?.full_name ? `, ${user.full_name}` : ""}!
              </h1>

              <p className="text-zinc-600 mt-2">
                Këtu mund të ndjekësh porositë, statusin e punimit dhe materialet
                e tua.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-zinc-50"
            >
              <LogOut className="w-4 h-4" />
              Dil nga llogaria
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <a
            href="/zgjidh-punimin"
            className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 hover:shadow-lg transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold mb-2">Bëj porosi të re</h2>
            <p className="text-zinc-600 text-sm">
              Zgjidh llojin e punimit, afatin dhe ngarko dokumentet.
            </p>
          </a>

          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold mb-2">Porositë e mia</h2>
            <p className="text-zinc-600 text-sm">
              Ke gjithsej <strong>{orders.length}</strong> porosi të regjistruara.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold mb-2">Materialet finale</h2>
            <p className="text-zinc-600 text-sm">
              Kur punimi përfundon, file-i final shfaqet këtu për shkarkim.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 mb-8">
          <h2 className="font-serif text-2xl font-bold mb-5">Status i përgjithshëm</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="border border-zinc-200 rounded-xl p-4">
              <p className="text-sm text-zinc-500">Porosi aktive</p>
              <p className="text-3xl font-bold text-zinc-950">{activeOrders.length}</p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-4">
              <p className="text-sm text-zinc-500">Në proces</p>
              <p className="text-3xl font-bold text-zinc-950">
                {inProgressOrders.length}
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-4">
              <p className="text-sm text-zinc-500">Të përfunduara</p>
              <p className="text-3xl font-bold text-zinc-950">
                {completedOrders.length}
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-4">
              <p className="text-sm text-zinc-500">Pagesa</p>
              <p className="text-3xl font-bold text-zinc-950">-</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-zinc-950">
                Porositë e mia
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Ndiq statusin dhe shkarko materialin final kur të jetë gati.
              </p>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
              className="border border-zinc-200 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Rifresko
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-zinc-200 rounded-2xl">
              <Clock className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500">Nuk ke ende porosi.</p>
              <a
                href="/zgjidh-punimin"
                className="inline-flex items-center justify-center mt-4 bg-amber-400 text-zinc-950 px-5 py-3 rounded-xl text-sm font-bold hover:bg-amber-500"
              >
                Bëj porosinë e parë
              </a>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const step = getStatusStep(order.order_status);

                return (
                  <div
                    key={order.id}
                    className="border border-zinc-200 rounded-2xl p-5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                      <div>
                        <p className="text-xs text-zinc-400 mb-1">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleString()
                            : ""}
                        </p>

                        <h3 className="font-serif text-xl font-bold text-zinc-950">
                          {order.topic || "Porosi pa titull"}
                        </h3>

                        <p className="text-sm text-zinc-500 mt-1">
                          {order.work_type} · {order.subject_area} · Afati:{" "}
                          {order.deadline || "-"}
                        </p>

                        {order.budget_note && (
                          <p className="text-sm text-zinc-600 mt-1">
                            {order.budget_note}
                          </p>
                        )}
                      </div>

                      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                        {getStatusLabel(order.order_status)}
                      </div>
                    </div>

                    {order.order_status !== "cancelled" ? (
                      <div className="grid grid-cols-4 gap-2 mb-5">
                        {[
                          "Porosia u mor",
                          "Në proces",
                          "Në kontroll",
                          "Përfunduar",
                        ].map((label, index) => {
                          const active = step >= index + 1;

                          return (
                            <div key={label} className="text-center">
                              <div
                                className={`h-2 rounded-full mb-2 ${
                                  active ? "bg-amber-400" : "bg-zinc-200"
                                }`}
                              />
                              <p
                                className={`text-[11px] ${
                                  active ? "text-zinc-900 font-semibold" : "text-zinc-400"
                                }`}
                              >
                                {label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
                        Kjo porosi është anuluar.
                      </div>
                    )}

                    {order.admin_note && (
                      <div className="bg-zinc-50 rounded-xl p-4 mb-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-1">
                          Shënim nga admini
                        </p>
                        <p className="text-sm text-zinc-700 leading-relaxed">
                          {order.admin_note}
                        </p>
                      </div>
                    )}

                    {order.description && (
                      <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-1">
                          Përshkrimi yt
                        </p>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {order.description}
                        </p>
                      </div>
                    )}

                    {order.final_file_url ? (
                      <a
                        href={order.final_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-sm font-bold"
                      >
                        <Download className="w-4 h-4" />
                        Shkarko materialin final
                        {order.final_file_name ? `: ${order.final_file_name}` : ""}
                      </a>
                    ) : (
                      <p className="text-xs text-zinc-400">
                        File final do të shfaqet këtu sapo të ngarkohet nga admini.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}