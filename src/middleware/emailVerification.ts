import sgMail from '@sendgrid/mail';
require('dotenv').config();


sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
const msg = {
    to: 'ankitrajput@gmail.com', // Change to your recipient
    from: 'arr497922@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent by sendgrid is successfull.')
    })
    .catch((error) => {
        console.error("Email verification failed.",error)
    })

    
export default msg;