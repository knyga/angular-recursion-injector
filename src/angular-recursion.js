angular.module('angularRecursion', [])
    .factory('AngularRecursion', ['$compile', '$parse', function ($compile, $parse) {

      /***
       * Removes all tags with tagName from element
       * @param element
       * @param tagName
       */
      var clearElement = function(element, tagName) {
        element.find(tagName).remove();
      };

      /**
       * Compiles outerHTML with usage of scope and replaces
       * old value with compiled
       * @param $element
       * @param scope
       * @param outerHTML
       */
      var compile = function($element, scope, outerHTML) {
        $compile(outerHTML)(scope, function(cloned) {
          $element.replaceWith(cloned);
        });
      };

      /**
       * Calculates expression withing the givent content
       * @param expression
       * @param content
       * @returns {*}
       */
      var estimate = function(content, expression) {
        return $parse(expression)(content);
      };

      /**
       * Replaces html in the element to the html with compiled
       * `name` directives
       * @param scope
       * @param element
       * @param name
       */
      var replace = function(scope, element, name) {
        var recursionName = name + '--recursion';

        if(scope.$$recursion) {
          clearElement(element, recursionName);
        } else {

          angular.forEach(angular.element(element.find(recursionName)), function() {
            var $this = angular.element(this);
            var outerHTML = $this[0].outerHTML.replace(new RegExp(recursionName, 'ig'), name);

            var recursionIf = $this.attr('recursion-if');

            if(recursionIf) {
              if(estimate(scope, recursionIf)) {
                compile($this, scope, outerHTML);
              } else {
                scope.$$recursion = true;
                clearElement(element, recursionName);
              }
            } else {
              scope.$$recursion = true;
              compile($this, scope, outerHTML);
              clearElement(element, recursionName);
            }
          });
        }
      };

      return {
        compile: function (name, obj) {
          return function () {
            return {
              pre: function(scope, element) {
                replace(scope, element, name);

                if(obj && obj.pre) {
                  obj.pre.apply(this, arguments);
                }
              },
              post: function(scope, element) {
                replace(scope, element, name);

                if(obj && obj.post) {
                  obj.post.apply(this, arguments);
                }
              }
            };
          };
        },
        link: function (name, link) {
          return function (scope, element) {
            replace(scope, element, name);

            if(link) {
              link.apply(this, arguments);
            }
          };
        }
      };
    }]);
