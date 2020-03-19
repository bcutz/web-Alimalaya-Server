const { Router } = require('express');
const { unlink } = require('fs-extra');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const fs = require('fs-extra');
const path = require ('path');
const router = Router();


const Image = require('../models/Image');

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
    console.log(images);
    
});

router.get('/upload', (req, res) =>{
    
    res.render('uploads');
});

router.post('/upload', async (req, res) =>{
    const { title, description, precio } = req.body;
    // Saving Image in Cloudinary
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhoto = new Image({
            title, 
            description,
            precio,
            imageURL: result.url,
            public_id: result.public_id
        });
        await newPhoto.save();
        await fs.unlink(req.file.path);
    } catch (e) {
        console.log(e)
    }

    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndRemove(id);
    const result = await cloudinary.v2.uploader.destroy(imageDeleted.public_id);
    console.log(result)
    res.redirect('/');
});

module.exports = router;