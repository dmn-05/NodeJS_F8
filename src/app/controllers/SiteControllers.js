const Course = require('../models/Course');

//Tổng hợp các hàm có chức năng dùng site
class SiteControllers {
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }

    //[GET] /selectDB
    selectDB(req, res) {
        Course.find({})
            .then((courses) => res.json(courses))
            .catch((err) => res.status(400).json({ error: 'ERROR!' }));
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new SiteControllers();
