/* global describe, it, expect, beforeEach, inject, module */

describe('angular-recursion', function() {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('angularRecursion'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should compile html', function() {
        $rootScope.tempModel = {
            value: 'toto',
            option: {
                value: 'tata',
                option: {
                    value: 'titi'
                }
            }
        };

        // Compile a piece of HTML containing the directive
        var element = $compile("<testdirective ng-model='tempModel'></testdirective>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        var compiledHtml = element.html();
        expect(compiledHtml).toContain("toto");
        expect(compiledHtml).toContain("tata");
        expect(compiledHtml).toContain("titi");
    });
});