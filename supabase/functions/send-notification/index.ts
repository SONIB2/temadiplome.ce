declare const Deno: any;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "temadiplome.ce <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type NotificationPayload = {
  type: "registration" | "order";
  data: Record<string, any>;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY || !ADMIN_EMAIL) {
      throw new Error("Missing RESEND_API_KEY or ADMIN_EMAIL");
    }

    const body = (await req.json()) as NotificationPayload;
    const { type, data } = body;

    const subject =
      type === "registration"
        ? "Regjistrim i ri në temadiplome.ce"
        : "Porosi e re në temadiplome.ce";

    const html =
      type === "registration"
        ? `
          <h2>Regjistrim i ri</h2>
          <p><strong>Emri:</strong> ${data.full_name || ""}</p>
          <p><strong>Email:</strong> ${data.email || ""}</p>
          <p><strong>WhatsApp:</strong> ${data.phone || ""}</p>
          <p><strong>Universiteti:</strong> ${data.university || ""}</p>
          <p><strong>Dega:</strong> ${data.study_field || ""}</p>
          <p><strong>Firma elektronike:</strong> ${data.signature_name || ""}</p>
          <p><strong>Data:</strong> ${data.created_at || new Date().toISOString()}</p>
        `
        : `
          <h2>Porosi e re</h2>
          <p><strong>Klienti:</strong> ${data.full_name || ""}</p>
          <p><strong>Email:</strong> ${data.email || ""}</p>
          <p><strong>WhatsApp:</strong> ${data.phone || ""}</p>
          <p><strong>Tema:</strong> ${data.topic || ""}</p>
          <p><strong>Shërbimi:</strong> ${data.service || ""}</p>
          <p><strong>Afati:</strong> ${data.deadline || ""}</p>
          <p><strong>Pagesa:</strong> ${data.payment || ""}</p>
          <p><strong>Përshkrimi:</strong> ${data.description || ""}</p>
        `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject,
        html,
      }),
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", result);
      return new Response(JSON.stringify({ error: result }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});