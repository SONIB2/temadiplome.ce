import { useEffect, useState } from "react";
import { Save, RefreshCw, CheckCircle2, Clock, Wallet } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface OrderPayment {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  topic?: string;
  work_type?: string;
  subject_area?: string;
  deadline?: string;
  budget_note?: string;
  payment_status?: string;
  payment_method?: string;
  total_amount?: number;
  paid_amount?: number;
  first_installment_paid?: boolean;
  second_installment_paid?: boolean;
  payment_note?: string;
  payment_updated_at?: string;
  created_at?: string;
}

const paymentStatuses = [
  { value: "pending", label: "Në pritje" },
  { value: "partial", label: "Paguar pjesërisht" },
  { value: "paid", label: "Paguar plotësisht" },
  { value: "not_required", label: "Pa pagesë" },
];

const paymentMethods = [
  "Bank Transfer",
  "Western Union",
  "Ria",
  "MoneyGram",
  "Cash / Dorazi",
  "Pa pagesë",
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  partial: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  not_required: "bg-zinc-100 text-zinc-600",
};

function formatALL(value?: number) {
  const amount = Number(value || 0);

  return `${amount.toLocaleString("sq-AL")} L`;
}

function getPaymentLabel(value?: string) {
  return paymentStatuses.find((status) => status.value === value)?.label || "Në pritje";
}

function calculateStatus(
  firstPaid?: boolean,
  secondPaid?: boolean,
  totalAmount?: number,
  paidAmount?: number
) {
  if (!totalAmount || totalAmount === 0) return "not_required";

  if (firstPaid && secondPaid) return "paid";

  if (Number(paidAmount || 0) >= Number(totalAmount || 0)) return "paid";

  if (firstPaid || secondPaid || Number(paidAmount || 0) > 0) return "partial";

  return "pending";
}

export default function AdminPayments() {
  const [orders, setOrders] = useState<OrderPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Payments load error:", error);
      setLoading(false);
      setMessage("Nuk u ngarkuan pagesat.");
      return;
    }

    setOrders((data || []) as OrderPayment[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateLocalOrder = (
    id: string,
    field: keyof OrderPayment,
    value: string | number | boolean
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              [field]: value,
            }
          : order
      )
    );
  };

  const savePayment = async (order: OrderPayment) => {
    setSavingId(order.id);
    setMessage("");

    const finalPaymentStatus = calculateStatus(
      order.first_installment_paid,
      order.second_installment_paid,
      order.total_amount,
      order.paid_amount
    );

    const { error } = await supabase
      .from("orders")
      .update({
        total_amount: Number(order.total_amount || 0),
        paid_amount: Number(order.paid_amount || 0),
        first_installment_paid: Boolean(order.first_installment_paid),
        second_installment_paid: Boolean(order.second_installment_paid),
        payment_method: order.payment_method || null,
        payment_status: finalPaymentStatus,
        payment_note: order.payment_note || null,
        payment_updated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (error) {
      console.error("Payment update error:", error);
      setSavingId(null);
      setMessage("Pagesa nuk u ruajt. Kontrollo Supabase/RLS.");
      return;
    }

    setOrders((prev) =>
      prev.map((item) =>
        item.id === order.id
          ? {
              ...item,
              payment_status: finalPaymentStatus,
              payment_updated_at: new Date().toISOString(),
            }
          : item
      )
    );

    setSavingId(null);
    setMessage("Pagesa u përditësua me sukses.");
  };

  const totalRevenue = orders
    .filter((order) => order.payment_status === "paid")
    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

  const confirmedCount = orders.filter(
    (order) => order.payment_status === "paid"
  ).length;

  const pendingCount = orders.filter(
    (order) =>
      !order.payment_status ||
      order.payment_status === "pending" ||
      order.payment_status === "partial"
  ).length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 mb-1">Të ardhura</p>
          <p className="font-serif text-xl font-bold text-amber-600">
            {formatALL(totalRevenue)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 mb-1">Të paguara</p>
          <p className="font-serif text-xl font-bold text-green-600">
            {confirmedCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-100 text-center">
          <p className="text-xs text-zinc-500 mb-1">Në pritje / pjesërisht</p>
          <p className="font-serif text-xl font-bold text-amber-600">
            {pendingCount}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="font-serif text-xl font-bold text-zinc-900">
            Pagesat ({orders.length})
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Përditëso pagesat manualisht për çdo porosi.
          </p>
        </div>

        <button
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          <RefreshCw className="w-4 h-4" />
          Rifresko
        </button>
      </div>

      {message && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-zinc-400 py-8 text-sm">
          Duke ngarkuar pagesat...
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-zinc-400 py-8 text-sm">
          Nuk ka porosi për pagesa.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const currentStatus = order.payment_status || "pending";

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm"
              >
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-semibold text-zinc-900 text-base">
                        {order.full_name}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          statusColors[currentStatus] || statusColors.pending
                        }`}
                      >
                        {getPaymentLabel(currentStatus)}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">
                      {order.email}
                      {order.phone ? ` · ${order.phone}` : ""}
                    </p>

                    <p className="text-sm text-zinc-700 mt-2 line-clamp-2">
                      {order.topic || order.budget_note || "Pa temë"}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {order.work_type && (
                        <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">
                          {order.work_type}
                        </span>
                      )}

                      {order.subject_area && (
                        <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">
                          {order.subject_area}
                        </span>
                      )}

                      {order.deadline && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                          Afati:{" "}
                          {new Date(order.deadline).toLocaleDateString("sq-AL")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full xl:w-[520px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Shuma totale
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={order.total_amount || 0}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "total_amount",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400"
                        placeholder="p.sh. 18500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Shuma e paguar
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={order.paid_amount || 0}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "paid_amount",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400"
                        placeholder="p.sh. 9000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Mënyra e pagesës
                      </label>
                      <select
                        value={order.payment_method || ""}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "payment_method",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Zgjidh metodën</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Status manual
                      </label>
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "payment_status",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white focus:outline-none focus:border-amber-400"
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-2.5 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={Boolean(order.first_installment_paid)}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "first_installment_paid",
                            e.target.checked
                          )
                        }
                      />
                      Kësti 1 paguar
                    </label>

                    <label className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-2.5 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={Boolean(order.second_installment_paid)}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "second_installment_paid",
                            e.target.checked
                          )
                        }
                      />
                      Kësti 2 paguar
                    </label>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Shënim pagese
                      </label>
                      <textarea
                        value={order.payment_note || ""}
                        onChange={(e) =>
                          updateLocalOrder(
                            order.id,
                            "payment_note",
                            e.target.value
                          )
                        }
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400"
                        placeholder="p.sh. Kësti 1 u pagua me Western Union më datë..."
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {currentStatus === "paid" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : currentStatus === "not_required" ? (
                          <Wallet className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600" />
                        )}

                        <span>
                          {order.payment_updated_at
                            ? `Përditësuar: ${new Date(
                                order.payment_updated_at
                              ).toLocaleDateString("sq-AL")}`
                            : "Ende pa përditësim pagese"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => savePayment(order)}
                        disabled={savingId === order.id}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 text-sm font-bold disabled:opacity-60"
                      >
                        <Save className="w-4 h-4" />
                        {savingId === order.id ? "Duke ruajtur..." : "Ruaj pagesën"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}