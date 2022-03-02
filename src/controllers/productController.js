import db from "../db.js";

export async function getProducts(req, res) {
    try {
        const { rows: products } = await db.query(`
            SELECT * FROM produtos
        `);

        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postProduct(req, res) {
    const product = req.body;
    const user = res.locals.user;

    try {
        await db.query(`
            INSERT INTO produtos (nome, preco, "idUsuario")
                VALUES ($1, $2, $3)
        `, [product.name, product.preco, userId]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const price = req.body.preco;

    try {
        await db.query(`
            UPDATE produtos
                SET preco=$1
            WHERE id=$2
        `, [price, id]);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        await db.query(`
            DELETE FROM produtos WHERE id=$1
        `, [id]);
    } catch (error) {
        res.status(500).send(error);
    }
}