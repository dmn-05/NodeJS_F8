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
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
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

    //[DELETE] courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() =>
                res.redirect(req.header('Referer') || '/me/stored/courses'),
            )
            .catch(next);
    }
    //[DELETE] courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() =>
                res.redirect(req.header('Referer') || '/me/stored/courses'),
            )
            .catch(next);
    }

    //[PATH] courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    //[POST] courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() =>
                        res.redirect(
                            req.header('Referer') || '/me/stored/courses',
                        ),
                    )
                    .catch(next);
                break;
            case 'test':
                res.json(req.body);
                break;
            default:
                res.json(req.body);
                break;
        }
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new CoursesControllers();
