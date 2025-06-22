const express = require('express');
// Tạo một đối tượng router để định nghĩa các route con.
const router = express.Router();
// Import file controller để lấy các hàm xử lý khi route được gọi.
const meControllers = require('../app/controllers/MeControllers');

// Khi /me/stored/courses sẽ chạy cái này
router.get('/stored/courses', meControllers.storedCourses);
router.get('/trash/courses', meControllers.trashCourses);

// Xuất (export) biến router ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = router;
