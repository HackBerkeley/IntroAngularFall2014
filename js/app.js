(function() {

angular.module('SIApp', [])

.controller('SICtrl', ['$scope','$interval', function ($scope,$interval) { // scope is object that corresponds to the html element
    function getRightmostPosition(){ // returns column of rightmost invader
        var rightmostInvaderPosition = 0;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].left > rightmostInvaderPosition){
                rightmostInvaderPosition = $scope.spaceInvaders[i].left;
            }
        }
        return rightmostInvaderPosition;
    }
    function getLeftmostPosition(){ // returns column of rightmost invader
        var leftmostInvaderPosition = TOTAL_COLUMNS-1;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].left < leftmostInvaderPosition){
                leftmostInvaderPosition = $scope.spaceInvaders[i].left;
            }
        }
        return leftmostInvaderPosition;
    }
    function getBottommostPosition(){ // returns row of the bottommost invader
        var bottommostInvaderPosition = 0;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].top > bottommostInvaderPosition){
                bottommostInvaderPosition = $scope.spaceInvaders[i].top;
            }
        }
        return bottommostInvaderPosition;
    }
}]);

})();