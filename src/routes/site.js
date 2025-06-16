const express = require('express');
// Tạo một đối tượng router để định nghĩa các route con.
const router = express.Router();
// Import file controller để lấy các hàm xử lý khi route được gọi.
const siteControllers = require('../app/controllers/SiteControllers')

// Lưu ý phải xếp / dưới cuối vì nếu để đầu thì nó chạy / mà không chạy mấy cái dưới

// Gọi đến hàm search trong controller.
router.use('/search', siteControllers.search);  

// truy cập http://localhost:3000/ thì gọi index.
router.use('/', siteControllers.index); 


// Xuất (export) biến router ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = router;