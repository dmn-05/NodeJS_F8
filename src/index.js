const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public', 'css', 'img')));

// Redirect mọi request có đuôi '/' và là file tĩnh
app.use((req, res, next) => {
    if (req.path.match(/\.[a-z]+\/$/i)) {
        const fixedUrl = req.path.replace(/\/+$/, '');
        return res.redirect(fixedUrl);
    }
    next();
});

app.use(methodOverride('_method'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//custom middwares
app.use(SortMiddleware);

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = sort.column === field ? sort.type : 'default';

                const icons = {
                    default: 'fa-solid fa-up-down',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                        <i class="ms-2 ${icon}"></i>
                    </a>`;
            },
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
