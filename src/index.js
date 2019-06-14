// Importa o express para o projeto
// Agora a variável express contém todos os recuros que o express te permite utilizar
const express = require('express');
//Importa biblioteca para manipulação de dados no mongo
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//A função express() cria o servidor que pode ser acessado via navegador
const app = express();
           
const server = require('http').Server(app);

//Com o comando abaixo nossa aplicação começa a estar também disponibilizando o websocket para requisições
const io = require('socket.io')(server);

//Cria a conexão com o mongo 
//useNewUrlParser informa que será utilizado o novo método para conexão(através da url disponibilizada pelo site do mongo)
mongoose.connect('mongodb+srv://mongo:mongo@cluster0-f8kwf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next(); // Não trava a execução da aplicação
});

//O cors possibilita que o react acesse nosso backend mesmo estando em domínios diferentes
//Não só o react. Ele possíbiliza que outras aplicações acessem nosso backend(API)
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

//Define em qual porta o serviço será disponibilizado para o nevageador
server.listen(3333);

//