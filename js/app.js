(function() {

angular.module('SIApp', [])

.controller('SICtrl', ['$scope','$interval', function ($scope,$interval) { // scope is object that corresponds to the html element
    // This is a test controller
    var num_rows = 5;
    var num_columns = 9;
    var TOTAL_ROWS = 20;
    var TOTAL_COLUMNS = 20;

    function getRightmostPosition(){ // returns column of rightmost invader
        var rightmostInvaderPosition = 0;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].left > rightmostInvaderPosition){
                rightmostInvaderPosition = $scope.spaceInvaders[i].left
            }
        }
        return rightmostInvaderPosition;
    }
    function getLeftmostPosition(){ // returns column of rightmost invader
        var leftmostInvaderPosition = TOTAL_COLUMNS-1;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].left < leftmostInvaderPosition){
                leftmostInvaderPosition = $scope.spaceInvaders[i].left
            }
        }
        return leftmostInvaderPosition;
    }
    $scope.spaceInvaders = [];
    for(var row=1;row<num_rows;row++){
        for(var column=1;column<num_columns;column++){
            $scope.spaceInvaders.push({top:row,left:column});
        }
    }
    var direction = 1;
    $interval(function(){
        if (direction == 1 && getRightmostPosition() >= TOTAL_COLUMNS-1){
            for(var i=0; i<$scope.spaceInvaders.length; i++){
                $scope.spaceInvaders[i].top++;
            }
            direction = -1;
        }
        else if (direction == -1 && getLeftmostPosition() <= 0){
            for(var i=0; i<$scope.spaceInvaders.length; i++){
                $scope.spaceInvaders[i].top++;
            }
            direction = 1;
        }
        else {
            for(var i=0; i<$scope.spaceInvaders.length; i++){
                $scope.spaceInvaders[i].left += direction;
            }
        }
    },1000);
}]);

})();