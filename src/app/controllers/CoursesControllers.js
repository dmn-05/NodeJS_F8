const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

//Tổng hợp các hàm có chức năng dùng site
class CoursesControllers {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((courses) => {
                res.render('courses/show', {
                    courses: mongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new CoursesControllers();
