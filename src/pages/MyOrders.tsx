const MyOrders = () => {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "/login";
  }

  const orders = [
    {
      id: "TD-001",
      title: "Temë diplome Bachelor",
      field: "Marketing",
      status: "Në shqyrtim",
      payment: "Në pritje",
      created_at: "2026-07-17",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Porositë e mia</h1>
          <p className="text-gray-600">
            Këtu shfaqen porositë që keni dërguar në platformë.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Kodi</th>
                <th className="p-4">Shërbimi</th>
                <th className="p-4">Fusha</th>
                <th className="p-4">Statusi</th>
                <th className="p-4">Pagesa</th>
                <th className="p-4">Data</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.title}</td>
                  <td className="p-4">{order.field}</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">{order.payment}</td>
                  <td className="p-4">{order.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <a
          href="/dashboard"
          className="inline-block mt-6 text-blue-600 underline"
        >
          Kthehu te dashboard
        </a>
      </div>
    </div>
  );
};

export default MyOrders;