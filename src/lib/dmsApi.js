
export async function submitAppointment(payload) {
  const existing = JSON.parse(localStorage.getItem("bgReddyAppointments") || "[]");
  const appointment = {
    id: crypto.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    status: "pending",
    source: "website",
    ...payload,
  };

  localStorage.setItem(
    "bgReddyAppointments",
    JSON.stringify([appointment, ...existing].slice(0, 30))
  );

  return appointment;
}

export async function loginToDms({ email, password, role }) {
  if (!email || !password) {
    throw new Error("Enter email/mobile and password to continue.");
  }

  return {
    user: { email, role },
    message: "Login request received. Secure dashboard access will open after authentication is enabled.",
  };
}
