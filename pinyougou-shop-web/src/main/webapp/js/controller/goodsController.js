//控制层
app.controller('goodsController', function ($scope, $controller, $location, goodsService, uploadService, itemCatService, typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
//查询实体,根据$location获取地址栏中传过来的参数对象,再获取其中名为id的属性
    $scope.findOne = function () {
        var id = $location.search()['id'];//获取参数值
        if (id == null) {
            return;
        }
        goodsService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    $scope.init = function () {
        $scope.entity = {tbGoods: {}, tbGoodsDesc: {itemImages: []}}  // 组合实体
    }

    $scope.init()

    //保存
    $scope.save = function () {
        //获取商品介绍内容
        $scope.entity.tbGoodsDesc.introduction = editor.html()

        var serviceObject;//服务层对象
        if ($scope.entity.tbGoods.id != null) {//如果有ID
            serviceObject = goodsService.update($scope.entity); //修改
        } else {
            serviceObject = goodsService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    //$scope.reloadList();//重新加载
                    alert("增加成功!")
                    $scope.init()//清除组合实体的结构
                    editor.html("") //清空富文本
                    //保存成功后跳转到列表页
                    location.href = "tbGoods.html"//location是原生js有的,与$location不同(angularjs独有)
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
    /**
     * 上传图片
     */
    $scope.uploadFile = function () {
        uploadService.uploadFile().success(function (response) {
            if (response.success) {//如果上传成功，取出url
                $scope.image_entity.url = response.message;//设置文件地址
            } else {
                alert(response.message);
            }
        }).error(function () {
            alert("上传发生错误");
        });
    };

    $scope.entity = {tbGoods: {}, tbGoodsDesc: {itemImages: []}};//定义页面实体结构
    //添加图片列表
    $scope.add_image_entity = function () {
        $scope.entity.tbGoodsDesc.itemImages.push($scope.image_entity);
    }
    //列表中移除图片
    $scope.remove_image_entity = function (index) {
        $scope.entity.tbGoodsDesc.itemImages.splice(index, 1);
    }
    //下拉列表相关
    //读取一级分类
    $scope.selectItemCat1List = function () {
        itemCatService.findByParentId(0).success(
            function (response) {
                $scope.itemCat1List = response;
            }
        );
    }
    //读取二级分类
    //$watch方法用于监控某个变量的值，当被监控的值发生变化，就自动执行相应的函数。
    //此函数监控的即是一级分类的id值,一旦一级分类的值被确定下来,则二级分类的数据被自动查出
    $scope.$watch('entity.tbGoods.category1Id', function (newValue, oldValue) {
        //根据选择的值，查询二级分类
        if(newValue == null)
        {
            return;
        }
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat2List = response;
            }
        );
    });
    //读取三级分类
    $scope.$watch('entity.tbGoods.category2Id', function(newValue, oldValue) {
        //根据选择的值，查询二级分类
        itemCatService.findByParentId(newValue).success(
            function(response){
                $scope.itemCat3List=response;
            }
        );
    });
    //三级分类选择后  自动读取模板ID
    $scope.$watch('entity.tbGoods.category3Id', function(newValue, oldValue) {
        itemCatService.findOne(newValue).success(
            function(response){
                $scope.entity.tbGoods.typeTemplateId=response.typeId; //更新模板ID
            }
        );
    });

});	
