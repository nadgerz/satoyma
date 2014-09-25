angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.jobs = [{
        title: 'Sales Person',
        description: "Amoeba"
    }, {
        title: 'Floor Sweeper',
        description: "Promoted from Sales Person!"
    }];
});

