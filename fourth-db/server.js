const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/auth', require('./routes/authRoutes'));

app.use('/admin/hero', require('./routes/heroRoutes'));

app.use('/admin/category', require('./routes/categoryRoutes'));

app.use('/admin/brands', require('./routes/brandsRoutes'));

app.use('/admin/products', require('./routes/productsRoutes'));

app.use('/admin/product-images', require('./routes/productImagesRoutes'));

app.use('/admin/attributes', require('./routes/attributeRoutes'));

app.use('/admin/attribute-values', require('./routes/attributeValuesRoutes'));

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})