const mongoose = require('mongoose');
//Cria o schema do documento que será armazenado no mongodb
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});
//Exporta o módulo para que possa ser utilizado em outros lugares
module.exports = mongoose.model('Post', PostSchema);