import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
    const user = req.body;

    try {
        const hasEmail = await db.query(`
            SELECT * FROM usuarios
                WHERE email=$1
        `, [user.email]);

        if (hasEmail.rowCount === 0) {
            return res.status(409).send("Email já existe.");
        }

        const senhaHash = bcrypt.hashSync(user.senha, 10);

        await db.query(`
            INSERT INTO usuarios (nome, email, senha)
                VALUES ($1, $2, $3)
        `, [user.nome, user.email, senhaHash]);

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { email, senha } = req.body;

    try {
        const user = await db.query(`
            SELECT * FROM usuarios
                WHERE email=$1
        `, [email]);

        if (user.rowCount === 0) {
            return res.status(404).send("Email ou senha incorretos.");
        }

        const name = user.rows[0].name;

        if (user && bcrypt.compareSync(senha, user.senha)) {
            const token = uuid();

            await db.query(`
                INSERT INTO sessoes ("idUsuario", token)
                    VALUES ($1, $2)
            `, [user.rows[0].id, token]);

            res.send({ name, email, token });
            return;
        }

        res.sendStatus(401);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function deleteSession(req, res) {
    const { tokenNumber } = req.params;

    try {
        const session = await db.query(`
            SELECT * FROM sessoes
                WHERE token=$1
        `, [tokenNumber]);

        if (!session) {
            return res.sendStatus(404);
        }

        await db.query(`
            DELETE FROM sessoes
                WHERE token=$1
        `, [tokenNumber]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}