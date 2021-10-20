const { Client } = require('pg')

let client = null;

function ensureConnection() {
    if (!client) {
        client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'example'
        })
        client.connect()
    }
}

async function createUserOrder(input) {
    ensureConnection();
    const res = await client.query('INSERT INTO "user_order" ("id") VALUES (gen_random_uuid()) RETURNING *;')

    return {
        userOrder: res.rows[0],
    }
}


async function addToOrder(orderId, productId) {
    ensureConnection();
    const res = await client.query(`INSERT INTO "order_item" ("order_id", "product_id") VALUES ($1, $2) RETURNING *;`, [orderId, productId])

    return {
        orderItem: {
            orderId: res.rows[0].order_id,
            productId: res.rows[0].product_id,
        },
    }
}


module.exports = {
    createUserOrder,
    addToOrder,
}