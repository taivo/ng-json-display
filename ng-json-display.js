angular.module('ngJsonDisplay', ['ngSanitize'])
.factory('$jsonUtil', function(){
  var JSONUtil = {
    //
    //Credit: expanded upon code found at http://jsfiddle.net/unlsj/
    // and created angular directive
    //
    _defaultSettings: {
      jsonKey: 'json-key',
      jsonVal: 'json-value',
      jsonStr: 'json-string'
    },
    _activeSettings: {},
    _getSetting: function(settingsKey){
      return JSONUtil._activeSettings[settingsKey] || JSONUtil._defaultSettings[settingsKey];
    },
    replacer: function(match, pIndent, pKey, pVal, pEnd) {
       var key = ['<span class="', JSONUtil._getSetting('jsonKey'), '">'].join('');
       var val = ['<span class="', JSONUtil._getSetting('jsonVal'), '">'].join('');
       var str = ['<span class="', JSONUtil._getSetting('jsonStr'), '">'].join('');
       var r = pIndent || '';
       if (pKey)
          r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
       if (pVal)
          r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
       return r + (pEnd || '');
    },
    prettyPrint: function(obj, cssClasses) {
      if(obj === undefined){
        return '';
      } else{
        //
        // set css classes for the replacer
        angular.extend(JSONUtil._activeSettings, cssClasses);

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
    template: "<pre ng-bind-html='jsonHtml'></pre>",
    link: function(scope, elm, attrs){
      var cssClasses = {
        jsonKey: scope.keyClass,
        jsonVal: scope.valueClass,
        jsonStr: scope.stringClass
      }
      scope.$watchCollection('object', function(newObj){
        scope.jsonHtml = $jsonUtil.prettyPrint(newObj, cssClasses);
      })
    },

  }
}])
