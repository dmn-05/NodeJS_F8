const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

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
    selectDB(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('selectDB', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new SiteControllers();
