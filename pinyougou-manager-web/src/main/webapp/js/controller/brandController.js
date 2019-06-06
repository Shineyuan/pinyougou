//定义 品牌控制器  brandController  自定义服务也是依赖注入 按照名称注入
app.controller("brandController",function($scope,$controller,brandService){

    //继承 写法 伪继承
    $controller("baseController",{$scope:$scope})
    //查询所有的方法
    $scope.findAll=function(){
        brandService.findAll().success(function(response){
            $scope.list=response
        })
    }


    $scope.findPage=function(pageNum,pageSize){
        brandService.findPage(pageNum,pageSize).success(function(response){
            /**
             * 总页数total :
             每页记录rows :[]
             */
            $scope.list= response.rows  //当前页记录
            $scope.paginationConf.totalItems=response.total  //赋值总页数
        })
    }

    $scope.save=function(){
        var objectReust= null
        //根据条件()判断是增加还是修改
        if($scope.entity.id==null){
            //增加
            objectReust = brandService.add($scope.entity)

        }else{
            //修改
            objectReust= brandService.update($scope.entity)

        }

        objectReust.success(function(response){
            if(response.success){
                // alert(response.message)
                $scope.reloadList() //刷新列表
            }else{
                alert(response.message)
            }

        })


    }

    $scope.findOne=function(id){
        brandService.findOne(id).success(function (response) {
            $scope.entity=response // TbBrand 转成json 就是response
        })
    }

    $scope.del=function(){
        brandService.del($scope.selectIds).success(function(response){
            if(response.success){
                // alert(response.message)
                $scope.reloadList() //刷新列表
                $scope.selectIds=[];
            }else{
                alert(response.message)
            }
        })
    }



    $scope.searchEntity = {} //空对象没有值

    $scope.search=function(page,size){
        brandService.search(page,size,$scope.searchEntity).success(function(response){
            /**
             * 总页数total :
             每页记录rows :[]
             */
            $scope.list= response.rows  //当前页记录
            $scope.paginationConf.totalItems=response.total  //赋值总页数
        })
    }


})