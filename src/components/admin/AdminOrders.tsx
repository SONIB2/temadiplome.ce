import { useEffect, useState } from "react";
import { Download, Eye, RefreshCw, Save, Upload, X } from "lucide-react";
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

const statusColors: Record<string, string> = {
  received: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  review: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

function statusLabel(value?: string) {
  return statuses.find((s) => s.value === value)?.label || "Porosia u mor";
}
function getDaysUntilDeadline(deadline?: string) {
  if (!deadline) return null;

  const today = new Date();
  const deadlineDate = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getUrgency(deadline?: string) {
  const days = getDaysUntilDeadline(deadline);

  if (days === null) {
    return {
      label: "Pa afat",
      className: "bg-zinc-100 text-zinc-600",
    };
  }

  if (days < 0) {
    return {
      label: "Afati ka kaluar",
      className: "bg-red-100 text-red-700",
    };
  }

  if (days === 0) {
    return {
      label: "Urgjente sot",
      className: "bg-red-100 text-red-700",
    };
  }

  if (days <= 2) {
    return {
      label: `Urgjente: ${days} ditë`,
      className: "bg-orange-100 text-orange-700",
    };
  }

  if (days <= 7) {
    return {
      label: `Këtë javë: ${days} ditë`,
      className: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: `Më vonë: ${days} ditë`,
    className: "bg-green-100 text-green-700",
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
const deadlineOrders = [...orders]
  .filter((order) => order.order_status !== "completed" && order.order_status !== "delivered")
  .sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
  const load = async () => {
    setMessage("");

    let q = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      q = q.eq("order_status", filter);
    }

    const { data, error } = await q;

    if (error) {
      console.error("Orders load error:", error);
      setMessage("Nuk u ngarkuan porositë.");
      return;
    }

    setOrders((data || []) as Order[]);
  };

  useEffect(() => {
    load();
  }, [filter]);

  const updateSelected = (field: keyof Order, value: any) => {
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

    setOrders((prev) =>
      prev.map((order) =>
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

    const ext = file.name.split(".").pop();
    const fileName = `${selected.id}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("completed-files")
      .upload(fileName, file, {
        upsert: true,
      });

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

    const updatedOrder = {
      ...selected,
      order_status: "completed",
      final_file_url: urlData.publicUrl,
      final_file_name: file.name,
    };

    setSelected(updatedOrder);

    setOrders((prev) =>
      prev.map((order) => (order.id === selected.id ? updatedOrder : order))
    );

    setMessage("Punimi final u ngarkua. Studenti mund ta shkarkojë nga Dashboard.");
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="font-serif text-xl font-bold text-zinc-900">
          Porositë ({orders.length})
        </h1>

        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 hover:bg-zinc-50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Rifresko
        </button>
      </div>

      {message && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm">
          {message}
        </div>
      )}
<div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 mb-5">
  <div className="flex items-center justify-between gap-3 mb-4">
    <div>
      <h2 className="font-serif text-xl font-bold text-zinc-900">
        Kalendari i afateve
      </h2>
      <p className="text-sm text-zinc-500 mt-1">
        Porositë renditen automatikisht sipas datës së dorëzimit.
      </p>
    </div>
  </div>

  {deadlineOrders.length === 0 ? (
    <p className="text-sm text-zinc-400">
      Nuk ka porosi aktive me afat dorëzimi.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {deadlineOrders.slice(0, 6).map((order) => {
        const urgency = getUrgency(order.deadline);

        return (
          <button
            key={order.id}
            type="button"
            onClick={() =>
              setSelected({
                ...order,
                order_status: order.order_status || "received",
              })
            }
            className="text-left rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-amber-50 hover:border-amber-200 transition-colors p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-semibold text-zinc-900 text-sm">
                  {order.full_name}
                </p>
                <p className="text-xs text-zinc-500">
                  {order.deadline
                    ? new Date(order.deadline).toLocaleDateString("sq-AL")
                    : "Pa afat"}
                </p>
              </div>

              <span
                className={`text-[11px] font-bold px-2 py-1 rounded-full ${urgency.className}`}
              >
                {urgency.label}
              </span>
            </div>

            <p className="text-xs text-zinc-600 line-clamp-2">
              {order.topic || order.description || "Pa përshkrim"}
            </p>

            <p className="text-[11px] text-zinc-400 mt-2">
              {order.work_type} · {statusLabel(order.order_status)}
            </p>
          </button>
        );
      })}
    </div>
  )}
</div>
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {["all", ...statuses.map((s) => s.value)].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === s
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-600 border border-zinc-200"
            }`}
          >
            {s === "all" ? "Të gjitha" : statusLabel(s)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((o) => {
          const currentStatus = o.order_status || "received";

          return (
            <div
              key={o.id}
              className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 text-sm">
                    {o.full_name}
                  </p>

                  <p className="text-xs text-zinc-400 mt-0.5">
                    {o.email} · {o.phone}
                  </p>

                  <p className="text-xs text-zinc-600 mt-2 line-clamp-2">
                    {o.topic || "Pa temë"}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                      {o.work_type}
                    </span>

                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                      {o.subject_area}
                    </span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        statusColors[currentStatus] || statusColors.received
                      }`}
                    >
                      {statusLabel(currentStatus)}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mt-1.5">
                    {o.created_at
                      ? new Date(o.created_at).toLocaleDateString("sq-AL")
                      : ""}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelected({
                      ...o,
                      order_status: o.order_status || "received",
                    })
                  }
                  className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <p className="text-center text-zinc-400 py-8 text-sm">
            Nuk ka porosi.
          </p>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <h2 className="font-serif text-lg font-bold text-zinc-900">
                Detajet e porosisë
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-2.5 text-sm">
              {[
                ["Emër", selected.full_name],
                ["Email", selected.email],
                ["Telefon", selected.phone],
                ["Universiteti", selected.university || "—"],
                ["Dega", selected.field_of_study || "—"],
                ["Tema", selected.topic || "—"],
                ["Niveli", selected.study_level],
                ["Lloji", selected.work_type],
                ["Fusha", selected.subject_area],
                [
                  "Afati",
                  selected.deadline
                    ? new Date(selected.deadline).toLocaleDateString("sq-AL")
                    : "—",
                ],
                ["Buxheti", selected.budget_note || "—"],
                ["Ka material", selected.has_existing_material ? "Po" : "Jo"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between gap-3 border-b border-zinc-50 pb-2"
                >
                  <span className="text-zinc-500 flex-shrink-0">{l}:</span>
                  <span className="text-zinc-900 font-medium text-right">
                    {v}
                  </span>
                </div>
              ))}

              <div>
                <p className="font-medium text-zinc-900 mt-1 mb-1">
                  Përshkrim:
                </p>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  {selected.description}
                </p>
              </div>

              {selected.uploaded_files?.length > 0 && (
                <div>
                  <p className="font-medium text-zinc-900 mt-2 mb-1">
                    Skedarë nga studenti:
                  </p>

                  {selected.uploaded_files.map((f, i) => (
                    <a
                      key={i}
                      href={f}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-amber-600 text-xs hover:underline mb-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Skedar {i + 1}
                    </a>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-zinc-100">
                <p className="text-xs font-medium text-zinc-900 mb-2">
                  Ndrysho statusin:
                </p>

                <select
                  value={selected.order_status || "received"}
                  onChange={(e) => updateSelected("order_status", e.target.value)}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-900 mb-2">
                  Shënim për studentin:
                </p>

                <textarea
                  value={selected.admin_note || ""}
                  onChange={(e) => updateSelected("admin_note", e.target.value)}
                  rows={3}
                  placeholder="p.sh. Punimi është marrë dhe ka nisur përgatitja."
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-900 mb-2">
                  Upload punimin final:
                </p>

                <label className="w-full border border-dashed border-zinc-300 rounded-xl px-4 py-4 text-sm bg-zinc-50 hover:border-amber-400 cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Zgjidh file final
                  <input
                    type="file"
                    className="hidden"
                    accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.zip"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadFinalFile(file);
                    }}
                  />
                </label>
              </div>

              {selected.final_file_url && (
                <a
                  href={selected.final_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-green-700 text-sm font-semibold hover:underline"
                >
                  <Download className="w-4 h-4" />
                  Shiko file final: {selected.final_file_name || "Materiali final"}
                </a>
              )}
            </div>

            <div className="px-5 pb-5 border-t border-zinc-100 pt-4 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={saveSelected}
                disabled={saving}
                className="btn-primary flex-1 justify-center"
              >
                <Save className="w-4 h-4" />
                {saving ? "Duke ruajtur..." : "Ruaj statusin"}
              </button>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="btn-outline flex-1 justify-center"
              >
                Mbyll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}