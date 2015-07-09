//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.log = '';
    $scope.filesUploaded=[];
    $scope.getFiles=function(data){
        $http.post('/getFiles', data).success(function(result){
            result.forEach(function(fileUploaded){
                $scope.filesUploaded.push(fileUploaded);

            })
        });
    }
    $scope.upload = function (files) {
        if (files && files.length) {
            /*for (var i = 0; i < files.length; i++) {
                var file = files[i];*/
           // console.log(files);
                Upload.upload({
                    url: '/uploads',
                    file: files
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'Uploaded Files: ' + data + '\n' + $scope.log;
                       $scope.getFiles(data);
                    });
                });
            //}
        }
    };
}]);
