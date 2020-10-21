import nodemailer from 'nodemailer';

export const main = async (email: string, token?: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: `smtp.gmail.com`,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Recuperação de senha ✔',
    html: `
    <h2>Você esqueceu sua senha? Não tem problema, acesse o link abaixo.</h2>
    <b>${process.env.CLIENT_URL}/?key=${token}</b>`,
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
