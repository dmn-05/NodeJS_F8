//Lấy file news.js ra để lưu vào biến để thực hiện chuyển sang file news
const newsRouter = require('./news');

//Lấy file news.js ra để lưu vào biến để thực hiện chuyển sang file site
const siteRouter = require('./site');

function route(app) {
    //Tổng Hợp các trường hợp nhánh

    //sử dụng nhánh url /new để chạy vào file news
    app.use('/news', newsRouter);

    //sử dụng nhánh url / để chạy vào file ....
    app.use('/', siteRouter);

    //Không dùng như này nữa
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    //Không dùng cách cũ như này nữa
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });

    // app.get('/search', (req, res) => {
    //     res.render('search');
    // });
}

//Xuất (export) biến route ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = route;
