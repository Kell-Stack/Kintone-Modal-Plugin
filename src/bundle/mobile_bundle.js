!function(n){var e={};function t(c){if(e[c])return e[c].exports;var g=e[c]={i:c,l:!1,exports:{}};return n[c].call(g.exports,g,g.exports,t),g.l=!0,g.exports}t.m=n,t.c=e,t.d=function(n,e,c){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:c})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var g in n)t.d(c,g,function(e){return n[e]}.bind(null,g));return c},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=409)}({409:
/*!**************************!*\
  !*** ./src/js/mobile.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports){eval("jQuery.noConflict();\n\n(function($, PLUGIN_ID) {\n  'use strict';\n\n  kintone.events.on('mobile.app.record.index.show', function() {\n    var config = kintone.plugin.app.getConfig(PLUGIN_ID);\n\n    var spaceElement = kintone.mobile.app.getHeaderSpaceElement();\n    var fragment = document.createDocumentFragment();\n    var headingEl = document.createElement('h3');\n    var messageEl = document.createElement('p');\n\n    messageEl.classList.add('plugin-space-message');\n    messageEl.textContent = config.message;\n    headingEl.classList.add('plugin-space-heading');\n    headingEl.textContent = 'Hello kintone plugin!';\n\n    fragment.appendChild(headingEl);\n    fragment.appendChild(messageEl);\n    spaceElement.appendChild(fragment);\n  });\n\n})(jQuery, kintone.$PLUGIN_ID);\n\n\n\n\n// import $ from 'jquery';\n// import tippy from 'tippy.js';\n// import * as kintoneJSSDK from '@kintone/kintone-js-sdk';\n// var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');\n// require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');\n// import image from '../image/information-button.png';\n\n\n// (function (PLUGIN_ID) {\n// 'use strict';\n\n\n// var getLayout = () => {\n//   var connection = new kintoneJSSDK.Connection()\n//   var kintoneApp = new kintoneJSSDK.App(connection)\n//   kintone.events.on('mobile.app.record.index.show', function () {\n//     var config = kintone.plugin.app.getConfig(PLUGIN_ID);\n\n\n\n//     var layoutSpaces = new Set()\n\n//     var layout = rsp.layout\n\n//     function rowLayout(row) {\n//       var fieldsArray = row.fields\n//       fieldsArray.forEach(field => {\n//         if (field.type === 'SPACER') {\n//           layoutSpaces.add(field.elementId)\n//         }\n//       })\n//       return layoutSpaces\n//     }\n//     layout.forEach(index => {\n//       if (index.type === \"GROUP\") {\n//         index.layout.forEach(row => {\n//           rowLayout(row)\n//         })\n//       } else if (index.type === \"ROW\") {\n//         rowLayout(index)\n//       }\n//     })\n//     var parseConfig = JSON.parse(config.table)\n\n\n//     parseConfig.forEach(index => {\n//       var spacers = index.dropDown.value\n\n//       if (layoutSpaces.has(spacers) !== true) {\n//         throwPluginNotConfiguredAlert()\n//       }\n//     })\n//   }).catch((err) => {\n//     console.log(err);\n//   });\n// }\n\n\n// const throwPluginNotConfiguredAlert = () => {\n\n//   kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {\n//     \"id\": kintone.app.getId()\n//   }, function (resp) {\n//     var alert = new kintoneUIComponent.Alert({\n//       text: 'A \\'Blank Space\\' does not exist as a field in form settings anymore. Please contact the app\\'s administrator ' + resp.modifier.name + ' to update the app!'\n//     });\n//     var header = kintone.app.getHeaderSpaceElement()\n//     header.appendChild(alert.render())\n//     alert.setType(\"error\")\n//   }, function (error) {\n//     console.log(error);\n//   });\n// }\n\n// const getIcon = () => {\n\n//   var config = kintone.plugin.app.getConfig(PLUGIN_ID)\n\n//   var parsedConfig = JSON.parse(config.table);\n//   parsedConfig.forEach(index => {\n//     var elementId = index.dropDown.value\n//     var text = index.text.value\n\n//     var icon = document.createElement('img')\n//     icon.setAttribute('src', image)\n\n//     var spacer = kintone.app.record.getSpaceElement(elementId)\n\n//     $(icon).attr('class', 'info-icon')\n//     spacer.appendChild(icon)\n\n//     var tippyAttr = {\n//       theme: 'light-border',\n//       inertia: 'true',\n//       placement: 'top',\n//       animation: 'scale',\n//       animateFill: false,\n//       content: text,\n//     }\n//     tippy(spacer, tippyAttr)\n//   })\n// }\n\n\n// kintone.events.on('app.record.detail.show', function (event) {\n//   getIcon()\n// });\n\n// kintone.events.on('app.record.index.show', function (event) {\n//   getLayout()\n// });\n\n// var spaceElement = kintone.mobile.app.getHeaderSpaceElement();\n// var fragment = document.createDocumentFragment();\n// var headingEl = document.createElement('h3');\n// var messageEl = document.createElement('p');\n\n// messageEl.classList.add('plugin-space-message');\n// messageEl.textContent = config.message;\n// headingEl.classList.add('plugin-space-heading');\n// headingEl.textContent = 'Hello kintone plugin!';\n\n// fragment.appendChild(headingEl);\n// fragment.appendChild(messageEl);\n// spaceElement.appendChild(fragment);\n\n\n// })(jQuery, kintone.$PLUGIN_ID);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9iaWxlLmpzPzI3ZGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsQ0FBQzs7Ozs7QUFLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047OztBQUdBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7O0FBR0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQSxJQUFJIiwiZmlsZSI6IjQwOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImpRdWVyeS5ub0NvbmZsaWN0KCk7XG5cbihmdW5jdGlvbigkLCBQTFVHSU5fSUQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGtpbnRvbmUuZXZlbnRzLm9uKCdtb2JpbGUuYXBwLnJlY29yZC5pbmRleC5zaG93JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbmZpZyA9IGtpbnRvbmUucGx1Z2luLmFwcC5nZXRDb25maWcoUExVR0lOX0lEKTtcblxuICAgIHZhciBzcGFjZUVsZW1lbnQgPSBraW50b25lLm1vYmlsZS5hcHAuZ2V0SGVhZGVyU3BhY2VFbGVtZW50KCk7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHZhciBoZWFkaW5nRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIHZhciBtZXNzYWdlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBtZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCgncGx1Z2luLXNwYWNlLW1lc3NhZ2UnKTtcbiAgICBtZXNzYWdlRWwudGV4dENvbnRlbnQgPSBjb25maWcubWVzc2FnZTtcbiAgICBoZWFkaW5nRWwuY2xhc3NMaXN0LmFkZCgncGx1Z2luLXNwYWNlLWhlYWRpbmcnKTtcbiAgICBoZWFkaW5nRWwudGV4dENvbnRlbnQgPSAnSGVsbG8ga2ludG9uZSBwbHVnaW4hJztcblxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGhlYWRpbmdFbCk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUVsKTtcbiAgICBzcGFjZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICB9KTtcblxufSkoalF1ZXJ5LCBraW50b25lLiRQTFVHSU5fSUQpO1xuXG5cblxuXG4vLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuLy8gaW1wb3J0IHRpcHB5IGZyb20gJ3RpcHB5LmpzJztcbi8vIGltcG9ydCAqIGFzIGtpbnRvbmVKU1NESyBmcm9tICdAa2ludG9uZS9raW50b25lLWpzLXNkayc7XG4vLyB2YXIga2ludG9uZVVJQ29tcG9uZW50ID0gcmVxdWlyZSgnbW9kdWxlcy9Aa2ludG9uZS9raW50b25lLXVpLWNvbXBvbmVudC9kaXN0L2tpbnRvbmUtdWktY29tcG9uZW50Lm1pbi5qcycpO1xuLy8gcmVxdWlyZSgnbW9kdWxlcy9Aa2ludG9uZS9raW50b25lLXVpLWNvbXBvbmVudC9kaXN0L2tpbnRvbmUtdWktY29tcG9uZW50Lm1pbi5jc3MnKTtcbi8vIGltcG9ydCBpbWFnZSBmcm9tICcuLi9pbWFnZS9pbmZvcm1hdGlvbi1idXR0b24ucG5nJztcblxuXG4vLyAoZnVuY3Rpb24gKFBMVUdJTl9JRCkge1xuLy8gJ3VzZSBzdHJpY3QnO1xuXG5cbi8vIHZhciBnZXRMYXlvdXQgPSAoKSA9PiB7XG4vLyAgIHZhciBjb25uZWN0aW9uID0gbmV3IGtpbnRvbmVKU1NESy5Db25uZWN0aW9uKClcbi8vICAgdmFyIGtpbnRvbmVBcHAgPSBuZXcga2ludG9uZUpTU0RLLkFwcChjb25uZWN0aW9uKVxuLy8gICBraW50b25lLmV2ZW50cy5vbignbW9iaWxlLmFwcC5yZWNvcmQuaW5kZXguc2hvdycsIGZ1bmN0aW9uICgpIHtcbi8vICAgICB2YXIgY29uZmlnID0ga2ludG9uZS5wbHVnaW4uYXBwLmdldENvbmZpZyhQTFVHSU5fSUQpO1xuXG5cblxuLy8gICAgIHZhciBsYXlvdXRTcGFjZXMgPSBuZXcgU2V0KClcblxuLy8gICAgIHZhciBsYXlvdXQgPSByc3AubGF5b3V0XG5cbi8vICAgICBmdW5jdGlvbiByb3dMYXlvdXQocm93KSB7XG4vLyAgICAgICB2YXIgZmllbGRzQXJyYXkgPSByb3cuZmllbGRzXG4vLyAgICAgICBmaWVsZHNBcnJheS5mb3JFYWNoKGZpZWxkID0+IHtcbi8vICAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdTUEFDRVInKSB7XG4vLyAgICAgICAgICAgbGF5b3V0U3BhY2VzLmFkZChmaWVsZC5lbGVtZW50SWQpXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pXG4vLyAgICAgICByZXR1cm4gbGF5b3V0U3BhY2VzXG4vLyAgICAgfVxuLy8gICAgIGxheW91dC5mb3JFYWNoKGluZGV4ID0+IHtcbi8vICAgICAgIGlmIChpbmRleC50eXBlID09PSBcIkdST1VQXCIpIHtcbi8vICAgICAgICAgaW5kZXgubGF5b3V0LmZvckVhY2gocm93ID0+IHtcbi8vICAgICAgICAgICByb3dMYXlvdXQocm93KVxuLy8gICAgICAgICB9KVxuLy8gICAgICAgfSBlbHNlIGlmIChpbmRleC50eXBlID09PSBcIlJPV1wiKSB7XG4vLyAgICAgICAgIHJvd0xheW91dChpbmRleClcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICAgIHZhciBwYXJzZUNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnLnRhYmxlKVxuXG5cbi8vICAgICBwYXJzZUNvbmZpZy5mb3JFYWNoKGluZGV4ID0+IHtcbi8vICAgICAgIHZhciBzcGFjZXJzID0gaW5kZXguZHJvcERvd24udmFsdWVcblxuLy8gICAgICAgaWYgKGxheW91dFNwYWNlcy5oYXMoc3BhY2VycykgIT09IHRydWUpIHtcbi8vICAgICAgICAgdGhyb3dQbHVnaW5Ob3RDb25maWd1cmVkQWxlcnQoKVxuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH0pLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICB9KTtcbi8vIH1cblxuXG4vLyBjb25zdCB0aHJvd1BsdWdpbk5vdENvbmZpZ3VyZWRBbGVydCA9ICgpID0+IHtcblxuLy8gICBraW50b25lLmFwaShraW50b25lLmFwaS51cmwoJy9rL3YxL2FwcCcsIHRydWUpLCAnR0VUJywge1xuLy8gICAgIFwiaWRcIjoga2ludG9uZS5hcHAuZ2V0SWQoKVxuLy8gICB9LCBmdW5jdGlvbiAocmVzcCkge1xuLy8gICAgIHZhciBhbGVydCA9IG5ldyBraW50b25lVUlDb21wb25lbnQuQWxlcnQoe1xuLy8gICAgICAgdGV4dDogJ0EgXFwnQmxhbmsgU3BhY2VcXCcgZG9lcyBub3QgZXhpc3QgYXMgYSBmaWVsZCBpbiBmb3JtIHNldHRpbmdzIGFueW1vcmUuIFBsZWFzZSBjb250YWN0IHRoZSBhcHBcXCdzIGFkbWluaXN0cmF0b3IgJyArIHJlc3AubW9kaWZpZXIubmFtZSArICcgdG8gdXBkYXRlIHRoZSBhcHAhJ1xuLy8gICAgIH0pO1xuLy8gICAgIHZhciBoZWFkZXIgPSBraW50b25lLmFwcC5nZXRIZWFkZXJTcGFjZUVsZW1lbnQoKVxuLy8gICAgIGhlYWRlci5hcHBlbmRDaGlsZChhbGVydC5yZW5kZXIoKSlcbi8vICAgICBhbGVydC5zZXRUeXBlKFwiZXJyb3JcIilcbi8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICB9KTtcbi8vIH1cblxuLy8gY29uc3QgZ2V0SWNvbiA9ICgpID0+IHtcblxuLy8gICB2YXIgY29uZmlnID0ga2ludG9uZS5wbHVnaW4uYXBwLmdldENvbmZpZyhQTFVHSU5fSUQpXG5cbi8vICAgdmFyIHBhcnNlZENvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnLnRhYmxlKTtcbi8vICAgcGFyc2VkQ29uZmlnLmZvckVhY2goaW5kZXggPT4ge1xuLy8gICAgIHZhciBlbGVtZW50SWQgPSBpbmRleC5kcm9wRG93bi52YWx1ZVxuLy8gICAgIHZhciB0ZXh0ID0gaW5kZXgudGV4dC52YWx1ZVxuXG4vLyAgICAgdmFyIGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuLy8gICAgIGljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZSlcblxuLy8gICAgIHZhciBzcGFjZXIgPSBraW50b25lLmFwcC5yZWNvcmQuZ2V0U3BhY2VFbGVtZW50KGVsZW1lbnRJZClcblxuLy8gICAgICQoaWNvbikuYXR0cignY2xhc3MnLCAnaW5mby1pY29uJylcbi8vICAgICBzcGFjZXIuYXBwZW5kQ2hpbGQoaWNvbilcblxuLy8gICAgIHZhciB0aXBweUF0dHIgPSB7XG4vLyAgICAgICB0aGVtZTogJ2xpZ2h0LWJvcmRlcicsXG4vLyAgICAgICBpbmVydGlhOiAndHJ1ZScsXG4vLyAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuLy8gICAgICAgYW5pbWF0aW9uOiAnc2NhbGUnLFxuLy8gICAgICAgYW5pbWF0ZUZpbGw6IGZhbHNlLFxuLy8gICAgICAgY29udGVudDogdGV4dCxcbi8vICAgICB9XG4vLyAgICAgdGlwcHkoc3BhY2VyLCB0aXBweUF0dHIpXG4vLyAgIH0pXG4vLyB9XG5cblxuLy8ga2ludG9uZS5ldmVudHMub24oJ2FwcC5yZWNvcmQuZGV0YWlsLnNob3cnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbi8vICAgZ2V0SWNvbigpXG4vLyB9KTtcblxuLy8ga2ludG9uZS5ldmVudHMub24oJ2FwcC5yZWNvcmQuaW5kZXguc2hvdycsIGZ1bmN0aW9uIChldmVudCkge1xuLy8gICBnZXRMYXlvdXQoKVxuLy8gfSk7XG5cbi8vIHZhciBzcGFjZUVsZW1lbnQgPSBraW50b25lLm1vYmlsZS5hcHAuZ2V0SGVhZGVyU3BhY2VFbGVtZW50KCk7XG4vLyB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4vLyB2YXIgaGVhZGluZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbi8vIHZhciBtZXNzYWdlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbi8vIG1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKCdwbHVnaW4tc3BhY2UtbWVzc2FnZScpO1xuLy8gbWVzc2FnZUVsLnRleHRDb250ZW50ID0gY29uZmlnLm1lc3NhZ2U7XG4vLyBoZWFkaW5nRWwuY2xhc3NMaXN0LmFkZCgncGx1Z2luLXNwYWNlLWhlYWRpbmcnKTtcbi8vIGhlYWRpbmdFbC50ZXh0Q29udGVudCA9ICdIZWxsbyBraW50b25lIHBsdWdpbiEnO1xuXG4vLyBmcmFnbWVudC5hcHBlbmRDaGlsZChoZWFkaW5nRWwpO1xuLy8gZnJhZ21lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUVsKTtcbi8vIHNwYWNlRWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG5cblxuLy8gfSkoalF1ZXJ5LCBraW50b25lLiRQTFVHSU5fSUQpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///409\n")}});