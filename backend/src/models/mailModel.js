import nodemailer from 'nodemailer';
export const sendEmail = async (transporter, to, from, subject, html) => {
    const mailOptions = {
        to: to,
        from: from,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (err, info) => {
        return err;
    });


}