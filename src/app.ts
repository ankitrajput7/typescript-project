import Express, { Application } from "express";
const app: Application = Express();
import userrouter from "./auth/route/userRoute";
import sessionMiddleware from "./middleware/sessionMiddleware"
import passport from "./middleware/passportMiddleware";
require('dotenv').config()
import path from 'path';


// Configuring static path for public folder
app.use(Express.static(path.join(__dirname, '../public')));


// Configuring path of EJS pages
app.set('views', path.join(__dirname, '../views/authentication'))
// Setting EJS as a view engine
app.set('view engine', 'ejs');


//Parsing JSON data
app.use(Express.json());
//Parsing URL encoded data
app.use(Express.urlencoded({ extended: true }));


//Configuring session middleware with express server
app.use(sessionMiddleware);


//Initializing passport middleware with express server
app.use(passport.initialize());
//Configuring session with passport
app.use(passport.session());


//Configuring userrouter with express server
app.use('/', userrouter);
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
const msg = {
    to: 'ankitrajput72470788@gmail.com', // Change to your recipient
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
        console.error("Email verification failed.", error)
    })


//Configuering port with server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}.`);
});