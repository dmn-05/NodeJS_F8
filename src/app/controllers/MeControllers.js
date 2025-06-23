const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

//Tổng hợp các hàm có chức năng dùng site
class MeControllers {
    storedCourses(req, res, next) {
        Promise.all([Course.find(), Course.findWithDeleted({ deleted: true })])
            .then(([courses, deletedCourses]) =>
                res.render('me/stored-courses', {
                    deleteCount: deletedCourses.length,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new MeControllers();
