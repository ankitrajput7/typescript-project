import passport, { session } from "passport";
import { Strategy as localStrategy } from "passport-local";
const users = require("../common/userModel");
import bcrypt from "../libraries/bcryptPassword"


/**
 * Using local strategy of passport for user authentication
 */
passport.use(new localStrategy(
    async function (username, password, next) {

        //Checking user exist in database or not
        await users.findOne({ where: { email: username } }).then(
            (user1: any, err: any) => {

                if (err) { return next(err); }
                if (!user1) { return next(null, false) }

                //Matching original password with hashed password 
                const pass = bcrypt.decryptPassword(password, user1.dataValues.password);
                if (!pass) { return next(null, false) }

                return next(null, user1);
            }
        ).catch((error: any) => next(error));
    }
));


/**
 * Serializing user ID with passport
 */
passport.serializeUser((user: any, next) => {
    next(null, user.id);
});


/**
 * Deserializing user with the help of Serialized user
 */
passport.deserializeUser(async (id: any, next) => {
    const data = await users.findOne({ where: { id: id } })
        .then((user: any) => {

            let userData = user;
            let data = userData.dataValues

            // Deleting password from userdata object
            delete data.password;
            delete data.updatedAt;

            next(null, userData)
        })
        .catch((error: any) => next(error));
})


export default passport;