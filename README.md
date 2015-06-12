# angular-recursion
Provider that allows you to use recursive directives.

##Problem and solution
In some cases you need to call same directive from it's own template.

Lets assume we have directive with name ```node``` and following template:

```html
<div class="node">
  <span>{{name}}</span>

  <node ng-if="subNode" ng-model="subNode"></node>
</div>
```

The problem with this template is that compilation of the node directive will get to the infinite loop.
*angular-recursion* allows to solve this problem and to create directive with recursion.
Template for the same directive with usage of angular-recursion will look like this:

```html
<div class="node">
  <span>{{name}}</span>

  <node--recursion recursion-if="subNode" ng-model="subNode"></node--recursion>
</div>
```

We added ```--recursion``` suffix. To check if we need recursion we use ```recursion-if``` attribute with expression.

##Installation
###Bower
```bower install --save angular-recursion```

###Manually
Just take right file from dist folder.

##How to use
1. Add the dependency to your module: ```angularRecursion```. 
```javascript
angular.module('yourModuleNmae', ['angularRecursion'...
```

2. Inject ```AngularRecursion``` into your directive.
```javascript
angular.module('yourModuleName')
  .directive('node', ['AngularRecursion', function (AngularRecursion) {
  return {
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '='
      },
      template: '<div class="node"><span>{{name}}</span><node--recursion recursion-if="subNode" ng-model="subNode"></node--recursion></div>',
      link: AngularRecursion.link('node', function(scope) {
      })
      //compile: AngularRecursion.compile('node', {
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
```
You can use ```AngularRecursion.link``` for ```link``` and ```AngularRecursion.compile``` for ```compile```.

##Restrictions
Can be used only with directive with restriction to the element name (```restrict: 'E'```).
