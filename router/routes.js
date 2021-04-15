import mongoose from 'mongoose';
import { fakerProducts } from '../models/fakerProducts.js';
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const schema = normalizr.schema;


const messages = (collection, method) => {
        const item = collection.substr(0, collection.length -1 );

        switch(method) {
            case 'get':
                return { error: `No se ha encontrado ningún ${item}`};break;
            case 'getById':
                return { error: `No existe ningún ${item} con ese id`};break;
            case 'post':
                return { success: `Se ha creado el ${item} correctamente`,
                error: `No se ha podido crear el ${item} correctamente`};break;
            case 'update':
                return { success: `Se ha actualizado el ${item} correctamente`,
                error: `No se ha actualizado crear el ${item} correctamente`};break;
            case 'delete':
                return { success: `Se ha podido eliminar el ${item} correctamente`,
                error: `No se ha podido eliminar el ${item} correctamente`};break;   
        }  
}
export class Routes  {
    
    constructor(app, collection, schema) {
        this.app = app;
        this.collection = collection;
        this.connect = mongoose.model(collection, schema);
        this.normalizedData = "";
    }
    getTest() {   
            this.app.get('/productos/vista-test/', (req, res) => {
                return res.send(fakerProducts(req.query.cant));
            })
        }
    
    get(ruta) {
        this.app.get(ruta, (req, res) => {
            
            this.connect.find({})
                .then((authors) => {
                    const messages = {id:"999", authors};
                    
                    const authorSchema = new schema.Entity('author');
                    const authorsSchema = new schema.Entity('authors', {
                        author: [authorSchema]
                    });

                    const messagesSchema = new schema.Entity('messages', {
                        messages:authorsSchema,
                        author: authorSchema
                    });
                    
                    this.normalizedData = normalize(messages, messagesSchema);
                    res.send((this.normalizedData));
                    }
                )
                .catch(() => res.send(messages(this.collection, 'get')));
        });
    }

    getDenormalize(ruta) {
        this.app.get(ruta, (req, res) => {
            
            this.connect.find({})
                .then((authors) => {
                        authors = {size: JSON.stringify(authors).length, authors}
                        res.send(authors)
                })
                .catch(() => res.send(messages(this.collection, 'get')));
        });
    }

    getById(ruta) {
        this.app.get(ruta, (req, res) => {
            const id = req.params.id;
            this.connect.findOne({ '_id' : id })
                .then((response) => res.send(response))
                .catch(() => res.send(messages(this.collection, 'getById')))
        });
    }

    post(ruta) {
        this.app.post(ruta, (req, res) => {
            const response = new this.connect(req.body);
            response.save()
                .then(() => res.send(messages(this.collection, 'post').success))
                .catch(() => res.send(messages(this.collection, 'post').error))
        });
    }

    updateProduct(ruta) {
        this.app.put(ruta , (req, res) => {
            const id = req.params.id;
            this.connect.updateOne({'_id': id}, {$set: {'title': req.body.title, 'price': req.body.price, 'thumbnail': req.body.thumbnail}})
                .then(() => res.send(messages(this.collection, 'update').success))
                .catch(() => res.send(messages(this.collection, 'update').error)) 
        });
    }

    updateMessage(ruta) {
        this.app.put(ruta, (req, res) => {
            const id = req.params.id;
            this.connect.updateOne({'_id' : id}, {$set: {'email': req.body.email, 'message': req.body.message}})
                .then(() => res.send(messages(this.collection, 'update').success))
                .catch(() => res.send(messages(this.collection, 'update').error))
        });
    }

    delete(ruta) {
        this.app.delete(ruta, (req, res) => {
            const id = req.params.id;
            this.connect.deleteOne({ '_id': id })
                .then(() => res.send(messages(this.collection, 'delete').success))
                .catch(() => res.send(messages(this.collection, 'delete').error));
        });
    }
}