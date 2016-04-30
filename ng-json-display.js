angular.module('ngJsonDisplay', ['ngSanitize'])
.factory('$jsonUtil', function(){
  var JSONUtil = {
    //
    //Credit: expanded upon code found at http://jsfiddle.net/unlsj/
    // and created angular directive
    //
    replacer: function(match, pIndent, pKey, pVal, pEnd) {
       var key = '<span class="json-key">';
       var val = '<span class="json-value">';
       var str = '<span class="json-string">';
       var r = pIndent || '';
       if (pKey)
          r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
       if (pVal)
          r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
       return r + (pEnd || '');
    },
    prettyPrint: function(obj) {
      if(obj === undefined){
        return '';
      } else{
        //
        // carry out quickie replacement
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
                   .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                   .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                   .replace(jsonLine, JSONUtil.replacer);
      }
    }
  };

  return JSONUtil;
})
.directive('jsonDisplay', ['$jsonUtil', function($jsonUtil){
  //
  // Generic component to display json as formatted HTML.
  // To use, place jsonHtlm in a <pre></pre> block and
  // make sure
  return {
    restrict: 'E',
    replace: true,
    scope:{
      object:'=',
      keyClass: '@',
      valueClass: '@',
      stringClass: '@',
    },
    template: "<pre class='ng-json-display' ng-bind-html='jsonHtml'></pre>",
    link: function(scope, elm, attrs){
      scope.$watchCollection('object', function(newObj){
        scope.jsonHtml = $jsonUtil.prettyPrint(newObj);
      })
    },

  }
}])
