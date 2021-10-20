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

async function allCategories() {
    ensureConnection()
    const res = await client.query('SELECT * from CATEGORY')

    return {
        nodes: res.rows,
        connections: []
    }
}

async function allManufacturers() {
    ensureConnection()
    const res = await client.query('SELECT * from MANUFACTURER')

    return {
        nodes: res.rows,
        connections: []
    }
}


async function allProducts(categoryId, manufacturerId) {
    ensureConnection()
    const res = await client.query('SELECT * from PRODUCT')

    return {
        nodes: res.rows,
        connections: []
    }
}

async function productById(id) {
    ensureConnection()
    const res = await client.query('SELECT * FROM PRODUCT WHERE ID=$1', [id])

    return {
        nodes: res.rows,
        connections: []
    }
}

async function categoryByCategoryId(categoryId) {
    ensureConnection()
    const res = await client.query('SELECT * FROM CATEGORY WHERE ID=$1', [categoryId])

    return {
        nodes: res.rows,
        connections: []
    }
}


module.exports = {
    allCategories,
    allManufacturers,
    allProducts,
    productById,
    categoryByCategoryId
}