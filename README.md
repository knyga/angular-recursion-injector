# angular-recursion
Provider that allows you to use recursive directives.

##Problem and solution
In some cases you need to call same directive from it's own template.

Lets assume we have directive with name ```node``` and following template:

```
<div class="node">
  <span>{{name}}</span>

  <node ng-if="subNode" ng-model="subNode"></node>
</div>
```

The problem with this template is that compilation of the node directive will get to the infinite loop.
*angular-recursion* allows to solve this problem and to create directive with recursion.
Template for the same directive with usage of angular-recursion will look like this:

```
<div class="node">
  <span>{{name}}</span>

  <node--recursion recursion-if="subNode" ng-model="subNode"></node--recursion>
</div>
```

We added "--recursion" suffix. To check if we need recursion we use ```recursion-if``` attribute with expression.

##Installation

##How to use

##Restrictions

##Licence
