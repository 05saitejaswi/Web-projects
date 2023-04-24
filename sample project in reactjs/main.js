var app = angular.module("mainApp",['ui.grid','ngRoute',"ngStorage"]);
app.controller("CRUDController",function($scope,$localStorage, $sessionStorage, $window){

  let getsessionStorageData = sessionStorage.getItem("EmpList");
  if (getsessionStorageData == null) {
    $scope.EmpList = [];
  }
  else {
   $scope.EmpList = JSON.parse(getsessionStorageData); 
    }
  $scope.AddData=function(){
    if ($scope.Name != null && $scope.Type != null) {
    var emp={
        Id:$scope.EmpList.length+ 1,
        Name:$scope.Name,
        Type:$scope.Type, 
      };
      var x = 0;
   if($scope.EmpList.length==0){
    $scope.EmpList.push(emp);
    sessionStorage.setItem("EmpList", JSON.stringify($scope.EmpList));

     }
  else{
    angular.forEach($scope.EmpList, function (value) {
      if(value.Name!=emp.Name || value.Type!=emp.Type){
        x=x+1;
      }
      }); 
      if(x==$scope.EmpList.length){
           $scope.EmpList.push(emp);
     }
     else{
       alert("Deatials already exits");
     }
     sessionStorage.setItem("EmpList", JSON.stringify($scope.EmpList));
    }
  }
  ClearModel()
    {
        $scope.Name = null;
        $scope.Type = null;
     }
};

$scope.columnDefs=[
  { name: 'Id', 
    },
   {
     name: 'Name',
    cellTemplate: '<a href="#/name" ui-sref="name" ng-click="grid.appScope.SendData(row.entity.Name)">{{row.entity.Name}}</a>'
  },
   {
     name: 'Type',
   },
   {
     name: 'Email',
   },
   {
     name:'Phone',
   },
   {
     name: 'Remove ',
     cellTemplate:'<button class="btnprimary" ng-click="grid.appScope.Delete(row)">Delete</button>' 
   }
];

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "main.html",
    controller: "CRUDController"
  })
  .when("/name", {
    templateUrl: "name.html",
    controller: "CRUDController"
})

});
   $scope.Delete = function (row) {
    var index = $scope.EmpList.indexOf(row.entity);
    $scope.EmpList.splice(index, 1);
    $scope.EmpList=$scope.EmpList.map(function (emp,index) {
    emp.Id=index+1;
    return emp;
 });
 sessionStorage.setItem("EmpList", JSON.stringify($scope.EmpList));
    if (submit()) {
       $scope.Submit();
    }
};

  $scope.SendData = function (name) {
    
  }

$scope.Save_Data = function () {
  angular.forEach($scope.EmpList, function (value) {
      if(value.Id==$scope.EmpList.length){
        value.Email = $scope.Email;
        value.Phone = $scope.Phone;
   }
  });
 sessionStorage.setItem("EmpList", JSON.stringify($scope.EmpList));
 console.log($scope.EmpList);
};

function ClearModel(){
    $scope.Id=0;
    $scope.Name='';
    $scope.Type='';
  };
  
  $scope.Submit=function(){
    var empt = [];
    angular.forEach($scope.EmpList, function (value) {
        empt.push('Id:'+ value.Id+','+'Name:' + value.Name + ', '+'Type:' + value.Type + ','+'Email:' + value.Email + ', '+'Phone Number:' + value.Phone);
    });

    $scope.display = empt;
   };
});

//document.getElementById('Name1').innerHTML = sessionStorage.getItem('Name');