const express = require('express');
const Router = express.Router();

const path = require('./../../configs/path');

Router.get('/', (req, res) => {
    res.render(path.FOLDER_VIEWS + '/dashboard/index', {
        pageTitle: 'Dashboard Management'
    });
})


module.exports = Router;