import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  try {
    const { name, email, id, host, address, phone, date, time } = req.body; // Destructure the data from the request body.

    // Construct the email text with the additional details.
    const emailText = `
      Hello ${name}, This is your invitation receipt from Crystal Tv.<br />
      <p>Name: ${name}</p>
      <p>ID: ${id}</p>
      <p>Email: ${email}</p>
      <p>Host: ${host}</p>
      <p>Address: ${address}</p>
      <p>Phone: ${phone}</p>
      <p>Date: ${date}</p>
      <p>Time: ${time}</p>
      <p>All the best</p>
    `;

    // Use the Resend library or your preferred email sending method here.
    const data = await resend.emails.send({
      from: 'Crystal <onboarding@resend.dev>',
      to: email,
      subject: 'INVITATION RECEIPT',
      text: emailText,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email', error);
    res.status(400).json({ error: 'Error sending email' });
  }
};
