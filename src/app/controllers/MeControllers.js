const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

//Tổng hợp các hàm có chức năng dùng site
class MeControllers {
    //[GET] /search
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new MeControllers();
