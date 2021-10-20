const { Client } = require('pg')

let client = null;

async function ensureConnection() {
    if (!client) {
        client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'example'
        })
        await client.connect()
    }
}

async function allCategories() {
    await ensureConnection()
    const res = await client.query('SELECT * from CATEGORY')

    return {
        nodes: res.rows,
        connections: []
    }
}

async function allManufacturers() {
    await ensureConnection()
    const res = await client.query('SELECT * from MANUFACTURER')

    return {
        nodes: res.rows,
        connections: []
    }
}


async function allProducts(categoryId, manufacturerId) {
    await ensureConnection()
    const res = await client.query('SELECT * from PRODUCT')

    return {
        nodes: res.rows,
        connections: []
    }
}

async function productById(id) {
    await ensureConnection()
    const res = await client.query('SELECT * FROM PRODUCT WHERE ID=$1', [id])

    return {
        nodes: res.rows,
        connections: []
    }
}

async function categoryByCategoryId(categoryId) {
    await ensureConnection()
    const res = await client.query('SELECT * FROM CATEGORY WHERE ID=$1', [categoryId])

    return {
        nodes: res.rows,
        connections: []
    }
}

async function createUserOrder(input) {
    await ensureConnection()
    const res = await client.query('INSERT INTO "user_order" ("id") VALUES (gen_random_uuid()) RETURNING *;')

    return {
        userOrder: res.rows[0],
    }
}


async function addToOrder(orderId, productId) {
    await ensureConnection()
    const res = await client.query(`INSERT INTO "order_item" ("order_id", "product_id") VALUES ($1, $2) RETURNING *;`, [orderId, productId])

    return {
        orderItem: {
            orderId: res.rows[0].order_id,
            productId: res.rows[0].product_id,
        },
    }
}


module.exports = {
    allCategories,
    allManufacturers,
    allProducts,
    productById,
    createUserOrder,
    addToOrder,
    categoryByCategoryId
}