# ng-json-display
Nicely display json as html. Requires angularSanitize

# Usage

1. Add angular dependency to your app
```Javascript
angular.module('myApp', ['ngJsonDisplay'])
```

2. Use it in your templates
```html
<json-display></json-display>
```

3. Set up css classes
```css
/* default css */
.ng-json-display .json-key {
  color: brown;
}
.ng-json-display .json-value {
  color: navy;
}
.ng-json-display .json-string {
  color: olive;
}
```
