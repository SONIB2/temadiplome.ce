const OrderTracking = () => {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "/login";
  }

  const steps = [
    {
      title: "Kërkesa u pranua",
      description: "Kërkesa juaj është regjistruar në sistem.",
      completed: true,
    },
    {
      title: "Në shqyrtim",
      description: "Po kontrollohen detajet, fusha dhe afati i kërkesës.",
      completed: true,
    },
    {
      title: "Në proces",
      description: "Materiali është duke u përgatitur ose rishikuar.",
      completed: false,
    },
    {
      title: "Në pritje të pagesës",
      description: "Nëse kërkohet, do të dërgohet informacion për pagesën.",
      completed: false,
    },
    {
      title: "Përfunduar",
      description: "Materiali është finalizuar dhe është gati për dorëzim.",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Track punimin</h1>
          <p className="text-gray-600">
            Ndiq progresin e porosisë ose punimit tënd në çdo hap.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>

                <div>
                  <h2 className="font-bold text-lg">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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

export default OrderTracking;