import bcrypt from "bcrypt";
const saltRounds = 10;
const users = require("../common/userModel")

function incryptPassword(password: string) {
    const hash = bcrypt.hash(password, saltRounds);
    return hash;
}

async function decryptPassword(password: string, hashPassword: string) {
    const checkpassword =await bcrypt.compare(password, hashPassword);
    if (checkpassword) {
        return true;
    } else {
        return false;
    }
}

export default {incryptPassword, decryptPassword};

