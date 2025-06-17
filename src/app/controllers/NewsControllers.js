//Tổng hợp các hàm có chức năng dùng news
class NewsControllers {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('News Detail!!!');
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new NewsControllers();
