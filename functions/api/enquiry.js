const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO_EMAIL || !env.ENQUIRY_FROM_EMAIL) {
    return Response.json({ error: 'Enquiry service is not configured.' }, { status: 503 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (text(input.website)) return Response.json({ ok: true });
  const name = text(input.name, 120);
  const company = text(input.company, 160);
  const email = text(input.email, 200);
  const country = text(input.country, 120);
  const interest = text(input.interest, 160);
  if (!name || !company || !emailPattern.test(email) || !country || !interest) {
    return Response.json({ error: 'Required fields are missing or invalid.' }, { status: 400 });
  }

  const lines = [
    `Name: ${name}`, `Company: ${company}`, `Business email: ${email}`,
    `Phone / WhatsApp: ${text(input.phone, 80) || 'Not provided'}`, `Country: ${country}`,
    `Requirement: ${interest}`, `Coffee: ${text(input.coffee, 200) || 'Not specified'}`,
    `Estimated volume: ${text(input.volume, 120) || 'Not specified'}`,
    `Destination: ${text(input.destination, 160) || 'Not specified'}`, '',
    `Message: ${text(input.message, 3000) || 'No additional message'}`,
  ];

  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL,
      to: [env.ENQUIRY_TO_EMAIL],
      reply_to: email,
      subject: `Hayked website enquiry — ${interest}`,
      text: lines.join('\n'),
    }),
  });

  if (!result.ok) return Response.json({ error: 'Email delivery failed.' }, { status: 502 });
  return Response.json({ ok: true });
}
