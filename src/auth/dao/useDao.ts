const users = require("../../common/userModel");
import bcrypt from "../../libraries/bcryptPassword";


/**
 * Query for creating new user in database
 */
async function createUser(data: any) {
    const hashedPassword: any = await bcrypt.incryptPassword(data.password).then(
        async (hashedPassword: string) => {
            await users.create({ name: data.name, email: data.email, password: hashedPassword, mobileNo: data.mobileNo })
            return true;
        }
    ).catch((error: any) => {
        throw error
    })
}

/**
 * Checking email exist in database or not
 */
async function emailExist(email: string) {
    await users.findOne({ where: { email: email } }).then(
        async (user: any) => {
            if (user) {
                throw new Error("Email already exists")
            }
        }).catch(
            (error: any) => {
                throw error;
            }
        )
}

export default { createUser, emailExist };
