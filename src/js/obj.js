var obj = {elementId: "modal",
size: {width: "117", height: "66"},
type: "SPACER"};
undefined


obj.elementId
"modal"
var a = "elementId"

obj[a]
"modal"
var list = [obj, obj, obj]


list.forEach (dict=> { dict.elementId}
VM1332:1 Uncaught SyntaxError: missing ) after argument list
list.forEach (dict=> { dict.elementId})
list.forEach (dict=> { console.log(dict.elementId)})


modal
undefined


var listOfIds = list.map (dict=> { dict.elementId})
undefined


var listOfIds = list.map (dict=> { return dict.elementId})
undefined


var obj2 = {elementId: "cats",
size: {width: "117", height: "66"},
type: "SPACER"};
undefined


list.shift(objc2)
VM2012:1 Uncaught ReferenceError: objc2 is not defined
    at <anonymous>:1:12
(anonymous) @ VM2012:1
list.shift(obj2)
{elementId: "modal", size: {…}, type: "SPACER"}
list
(2) [{…}, {…}]0: {elementId: "modal", size: {…}, type: "SPACER"}1: {elementId: "modal", size: {…}, type: "SPACER"}length: 2__proto__: Array(0)
list.unshift(obj2)
3
var listOfIds = list.flatMap (dict=> { return dict.elementId === "cats" ? dict.elementId : false})
undefined


listOfIds
(3) ["cats", false, false]
var listOfIds = list.flatMap (dict=> { return dict.elementId !== "cats" ? dict.elementId : false})
undefined



listOfIds
(3) [false, "modal", "modal"]