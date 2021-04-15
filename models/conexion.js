import  mongoose from 'mongoose';

export const connect = async () =>  {
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conexión establecida');
    }catch(err) {
        console.log(err)
    }
};