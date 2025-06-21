const express = require('express');
// Tạo một đối tượng router để định nghĩa các route con.
const router = express.Router();
// Import file controller để lấy các hàm xử lý khi route được gọi.
const coursesControllers = require('../app/controllers/CoursesControllers');

// Lưu ý phải xếp / dưới cuối vì nếu để đầu thì nó chạy / mà không chạy mấy cái dưới

// Khi /courses/:id/edit sẽ chạy cái này
router.get('/:id/edit', coursesControllers.edit);

// Khi /courses/:id sẽ chạy cái này
router.delete('/:id', coursesControllers.destroy);

// Khi /courses/:id sẽ chạy cái này
router.put('/:id', coursesControllers.update);

// Khi /courses/create sẽ chạy cái này
router.get('/create', coursesControllers.create);

// Khi /courses/store sẽ chạy cái này
router.post('/store', coursesControllers.store);

// Khi /courses/:slug sẽ chạy cái này
// Định nghĩa route động:
// Bất kỳ URL nào có dạng /courses/something (VD: /news/abc, /news/123)
// Tham số slug sẽ được lấy qua req.params.slug bên trong controller.
// Gọi đến hàm show trong controller.
router.get('/:slug', coursesControllers.show);

// Xuất (export) biến router ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = router;
