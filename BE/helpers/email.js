import nodemailer from 'nodemailer';

export const emailRegister = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f7833ba426fcb4",
      pass: "f6e5e7d27e3748"
    }
  });

  //informacion del mail
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@ustask.com>',
    to: email,
    subject: "UpTaks - Confirma tu cuentas",
    text: 'Comprueba tu cuenta en UpTask',
    html: `<p> Hola ${nombre}  Comprueba tu cuenta en UpTask </p>
      <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el
        siguiente enlace:
      </p>
      <a href="${process.env.FRONTEND_URL}/confirm/${token}">
        Confirmar cuenta
      </a>

      <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
    `
  });
};
