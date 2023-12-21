import session from 'express-session';
// import cookieParser from 'cookie-parser';

const sessionConfig = {
    secret: process.env.SESSION_SECRET, // Set a secret for your sessions
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // Set your desired session expiration time
    },
    resave: true,
    saveUninitialized: true,
};
 
export default session(sessionConfig);

