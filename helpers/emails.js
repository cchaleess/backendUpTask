import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      });

      //info del email
        const info = await transport.sendMail({
            from: '"upTask - Administrador de proyectos 👻" <cuentas@uptask.com>',
            to: email,
            subject: "Confirmación de registro",
            html: `
            <h1>Hola ${nombre}</h1>
            <p>Gracias por registrarte en nuestra aplicación</p>
            <p>Para confirmar tu cuenta has click en el siguiente link:</p>
            <p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
            </p>
            `
        });
};

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //info del email
      const info = await transport.sendMail({
        from: '"upTask - Administrador de proyectos 👻" <cuentas@uptask.com>',
        to: email,
        subject: "Restablece tu contraseña",
        html: `
        <h1>Hola ${nombre}</h1>
        <p>Para restablecer tu contraseña has click en el siguiente link:</p>
        <p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablece Password</a>
        </p>
        `
    });
};