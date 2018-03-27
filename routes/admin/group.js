const express = require('express');
const Router = express.Router();

const path = require('./../../configs/path');

Router.get('/', (req, res) => {
    res.render(path.FOLDER_VIEWS + '/group/index', {
        pageTitle: 'Group Management'
    });
});
Router.get('/form', (req, res) => {
    res.render(path.FOLDER_VIEWS + '/group/form', {
        pageTitle: 'abc'
    })
})


module.exports = Router;