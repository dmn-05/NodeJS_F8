//Tổng hợp các hàm có chức năng dùng site
class SiteControllers{
    // [GET] /        
    index(req, res){
        res.render('home');
    }

    //[GET] /search
    search(req, res){
        res.render('search');
    }
}

//Xuất (export) NewControllers ra bên ngoài để file khác có thể require() nó và sử dụng.
module.exports = new SiteControllers;