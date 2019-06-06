//自定义的服务 , 不和页面交互 没有$socpe
app.service("brandService",function($http){
    //查询所有
    this.findAll=function(){
        return $http.get("../brand/findAll.do")
    }
    //分页查询
    this.findPage=function(pageNum,pageSize){
        return $http.get("../brand/findPage.do?page="+pageNum+"&size="+pageSize)
    }
    //增加
    this.add=function(entity){
        return $http.post("../brand/add.do",entity)
    }
    //增加
    this.update=function(entity){
        return $http.post("../brand/update.do",entity)
    }
    //查询一个
    this.findOne=function(id){
        return $http.get("../brand/findOne.do?id="+id)
    }
    //批量删除
    this.del=function(selectIds){
        return $http.get("../brand/delete.do?ids="+selectIds)
    }
    //根据条件分页查询
    this.search=function(page,size,searchEntity){
        return $http.post("../brand/search.do?page="+page+"&size="+size,searchEntity)
    }


    //下拉列表数据
    this.selectBrandOptionList=function(){
        return $http.get('../brand/selectBrandOptionList.do');
    }

})