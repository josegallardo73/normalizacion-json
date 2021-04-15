import  mongoose from 'mongoose';

export const productos = new mongoose.Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 100},
});

export const mensajes = new mongoose.Schema({
        author: {
            id: { type:String, require: true, max: 100 },
            nombre: { type: String, require: true, max: 100 }, 
            apellido: {type: String, require: true, max: 100 },
            edad: { type: Number, require: true, max: 120 },
            alias: { type: String, require: false, max: 50 },
            avatar: { type: String, require: false, max: 250 }
        },
        text: {type: String, require: true, max: 250},
});