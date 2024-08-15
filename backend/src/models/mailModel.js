import nodemailer from 'nodemailer';
export const sendEmail = async (transporter, to, from, subject, text) => {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'tosyrazafitsotra@gmail.com',
    //         pass: 'hpcc Lmwf epmr vxxk'
    //     }
    // });

    const mailOptions = {
        to: to,
        from: from,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        return err;
    });


}