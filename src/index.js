const express = require ('express');
const path = require ('path');
const morgan = require('morgan');
const multer = require('multer');
const uudi = require('uuid/v4');
//inicializacion 
const app = express();
require('./datebase');

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middelwares funciones que se ejecutan antes de las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
    cb(null, uudi() + path.extname(file.originalname));
}})
app.use(multer({
    storage: storage
}).single('image'));


//Routes
app.use(require('./routes/index'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})