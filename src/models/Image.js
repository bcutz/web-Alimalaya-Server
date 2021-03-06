const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    presentacion: {type: String},
    precio: {type: String},
    imageURL: {type: String},
    public_id: {type: String},
   /* filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}
    */
});

module.exports = model('Image', imageSchema);