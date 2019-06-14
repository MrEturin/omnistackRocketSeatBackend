const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);
//const upload = multer({dest: '../uploads/'});

routes.post('/posts', upload.single('image'), PostController.store);

routes.get('/posts', PostController.index)

routes.post('/posts/:id/like', LikeController.store)

routes.get('/', (req, res) => { 
    return res.send("Hello World");
});

module.exports = routes;


/*
    Middleware
    Funções de Middleware são funções que tem acesso ao objeto de solicitação ( req ) .
    Interceptador de chamada de requisições

    app.get('/', (req, res) => {
        return res.send(`Olá ${req.query.name}`);
    });
*/