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

    //[GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[GET] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.video}/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDGzeson_3R5LD5tdzOOJrSCLptew`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/selectDB'))
            .catch((err) => {});
    }

    //[GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((courses) =>
                res.render('courses/edit', {
                    courses: mongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    //[PUT] courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[PUT] courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() =>
                res.redirect(req.header('Referer') || '/me/stored/courses'),
            )
            .catch(next);
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new CoursesControllers();
