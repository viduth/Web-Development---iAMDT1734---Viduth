const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

exports.generateID = function (type) {
    var businessId = type;
    var allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var allowedCharactersLength = allowedCharacters.length;
    for (var i = 0; i < 6; i++) {
        businessId += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharactersLength));
    }
    return businessId;
}


exports.sendBusinessRegistration = function (ID, email, message) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'testamdt123@gmail.com',  
            pass: 'viduth123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // transporter.use('compile', hbs({
    //     viewEngine: {
    //         extName: '.hbs',
    //         partialsDir: './src/email-templates',
    //         layoutsDir: './src/email-templates',
    //         defaultLayout: 'otp-request.hbs',
    //     },
    //     viewPath: './src/email-templates',
    //     extName: '.hbs'
    // }))

    let mailOptions = {
        from: '"Contact Us" <youremail@gmail.com>', // sender address
        to: 'viduthtennakoon@gmail.com', // list of receivers
        subject: 'Contact Details', // Subject line
        text: `name : ${ID} /n ${email} /n ${message}`, // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('msg sent: %s', info.msgId);
        console.log('Preview URL: %s', nodemailer.getTestmsgUrl(info));

        res.render('contact', {
            msg: 'Email has been sent'
        });
    });
}





