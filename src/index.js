const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'public', 'css', 'img')));

app.use(methodOverride('_method'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');

//Set view folder
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
// Khởi tạo tuyến đường route và truyền app vào
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
