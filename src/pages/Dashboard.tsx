const Dashboard = () => {
  const savedUser = localStorage.getItem("currentUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "/login";
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Mirë se erdhe{user?.full_name ? `, ${user.full_name}` : ""}!
              </h1>
              <p className="text-gray-600 mt-2">
                Këtu mund të ndjekësh porositë, statusin e punimit dhe materialet e tua.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="border border-gray-300 rounded-lg px-5 py-2"
            >
              Dil nga llogaria
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="/zgjidh-punimin"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Bëj porosi të re</h2>
            <p className="text-gray-600">
              Zgjidh llojin e punimit, afatin dhe ngarko dokumentet.
            </p>
          </a>

          <a
            href="/my-orders"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Porositë e mia</h2>
            <p className="text-gray-600">
              Shiko porositë që ke dërguar dhe detajet për secilën.
            </p>
          </a>

          <a
            href="/order-tracking"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Track punimin</h2>
            <p className="text-gray-600">
              Ndiq statusin e diplomës ose projektit tënd hap pas hapi.
            </p>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Status i përgjithshëm</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Porosi aktive</p>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Në proces</p>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Të përfunduara</p>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Pagesa</p>
              <p className="text-2xl font-bold">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;