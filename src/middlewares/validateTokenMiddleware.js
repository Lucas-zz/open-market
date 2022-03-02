import db from "../db.js"

export async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;

        const token = authorization?.replace("Bearer ", "");

        if (!token) {
            return res.sendStatus(401);
        }

        const session = await db.query(`
            SELECT * FROM sessoes
                WHERE token=$1
        `, [token]);
        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.query(`
            SELECT * FROM usuarios
                WHERE id=$1
        `, [session.rows[0].id]);
        if (!user) {
            return res.sendStatus(401);
        }

        res.locals.user = user.rows;
    } catch (error) {
        res.status(500).send(error);
    }

    next();
}