app.controller("baseController",function ($scope) {

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList() // 变化时刷新
        }
    };
    //刷新
    $scope.reloadList=function(){
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage)
    }

    //勾选复选框
    $scope.selectIds=[];//勾选的id集合数组

    //更新勾选集合
    $scope.updateSelection=function($event,id){
        //console.log($event)
        //根据条件判断是勾选还是取消勾选
        if($event.target.checked){
            //勾选
            $scope.selectIds.push(id)
        }else{
            // 取消勾选
            //2个参数 第一个参数 删除下标,第二参数 删除 个数
            //获取下标
            var index  =  $scope.selectIds.indexOf(id)
            $scope.selectIds.splice(index,1)
        }

    }

    //优化代码
    $scope.jsonToString=function (jsonStr,key) {
        var json = JSON.parse(jsonStr)
        var valueStr = "";
        for(var i=0;i<json.length;i++){
            if(i==0){
                valueStr += json[i][key]
            }else{
                valueStr += ","+json[i][key]
            }

        }
        return valueStr
    }
})