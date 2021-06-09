let banco = require('../models/bancoDeProdutos');
const types = require('../models/types');
const fs = require('fs')
const path = require('path')
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);

let productsController = {

    viewForm: async(req, res) => {
        let result = await db.query('select * from products', {type: Sequelize.QueryTypes.SELECT})
        console.log(result)
    },
}