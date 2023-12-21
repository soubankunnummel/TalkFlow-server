// import dotenv from 'dotenv'
// dotenv.config()
// //passportConfig.js
// import passport from 'passport';

// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/userModel.js';

//   passport.use(new GoogleStrategy ({
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     passReqToCallback:true
    
//   }, function (req,accessToken, refreshToken, profile, done){
//       console.log("Log from passport config",profile)
//       // User.findOrCreate()
//       return done(null, profile)
//   }
//   ))

//   passport.serializeUser((user, done) => {
//         done(null, user);
//     });
    
//     passport.deserializeUser((obj, done) => {
//         done(null, obj);
//     });

//   export default passport

// // if (!process.env.GOOGLE_CLIENT_ID) {
// //   throw new Error('GOOGLE_CLIENT_ID is missing from environment variables');
// // }

// // if (!process.env.GOOGLE_CLIENT_SECRET) {
// //   throw new Error('GOOGLE_CLIENT_SECRET is missing from environment variables');
// // }

// // if (!process.env.GOOGLE_CALLBACK_URL) {
// //   throw new Error('GOOGLE_CALLBACK_URL is missing from environment variables');
// // }
// // console.log(process.env.GOOGLE_CLIENT_ID)
// // console.log(process.env.MONGO_URI);
// // console.log(process.env.GOOGLE_CLIENT_ID);

// // passport.use( 
// //     new GoogleStrategy(
// //         {
// //             clientID: process.env.GOOGLE_CLIENT_ID,
// //             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //             callbackURL: process.env.GOOGLE_CALLBACK_URL,
// //         },
// //         (accessToken, refreshToken, profile, done) => {
// //             return done(null, profile);
// //         }
// //     )
// // );

// // passport.serializeUser((user, done) => {
// //     done(null, user);
// // });

// // passport.deserializeUser((obj, done) => {
// //     done(null, obj);
// // });

// // export default passport;
