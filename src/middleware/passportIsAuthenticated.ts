import { Request, Response, NextFunction } from "express";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    console.log(req.isAuthenticated())
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    }
    next()
}

export default isAuthenticated;