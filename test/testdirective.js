angular.module('angularRecursion')
    .directive('testdirective', ['AngularRecursion', function (AngularRecursion) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: '='
            },
            template: '<div class="testdirective">\n  <span>{{ngModel.value}}</span>\n  <ul>\n    <li>\n      <testdirective--recursion recursion-if="ngModel.option" ng-model="ngModel.option">\n      </testdirective--recursion>\n    </li>\n  </ul>\n</div>\n  ',
            link: AngularRecursion.link('testdirective', function() {
            })
            //compile: AngularRecursion.compile('testdirective', {
            //  pre: function(scope, element) {
            //    console.log('pre');
            //  },
            //  post: function(scope, element) {
            //    console.log('post');
            //  }
            //})
        };
    }]
);
