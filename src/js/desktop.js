import $ from 'jquery';
import tippy from 'tippy.js';
import * as kintoneJSSDK from '@kintone/kintone-js-sdk';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');
import image from '../image/question.png';
import image4 from '../image/information-button.png';

(function (PLUGIN_ID) {
  'use strict';

  var getLayout = () => {
    var connection = new kintoneJSSDK.Connection()
    var kintoneApp = new kintoneJSSDK.App(connection)

    kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
      var config = kintone.plugin.app.getConfig(PLUGIN_ID)
      console.log("rsp🙃", rsp)

      var layoutSpaces = new Set()
      console.log(layoutSpaces, "layoutspaces")

      var layout = rsp.layout
      console.log("😍 ", layout)
    
        function rowLayout(row) {
          var fieldsArray = row.fields
          fieldsArray.forEach(field => {
            if (field.type === 'SPACER') {
              layoutSpaces.add(field)
            }
          })
          return layoutSpaces
        }
        layout.forEach(index => {
          if (index.type === "GROUP") {
            index.layout.forEach(row => {
              rowLayout(row)
            })
          } else if (index.type === "ROW") {
            rowLayout(index)
          }
        })

    }).catch((err) => {
      console.log(err, "YOU YOU");
    });
  }
  
  var spaceAndLayoutCheck = getLayout


      // Var layoutSpaces = getLayout();
      // //iterate through the config obj
      //as you loop through each table row, check if the selected space value exists in layoutSpaces;

  

  // Var layoutSpaces = getLayout();
  // //iterate through the config obj
  //     //as you loop through each table row, check if the selected space value exists in layoutSpaces;


  const throwPluginNotConfiguredAlert = () => {
    // console.log(selectedValues, "🔴🔴🔴")
    // if (selectedSpacers === undefined || selectedSpacers.length == 0) {

    // can you find the selected spaces in the form layout 
    // if this is the same as the config file if not error
    kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {
      "id": kintone.app.getId()
    }, function (resp) {
      var alert = new kintoneUIComponent.Alert({
        text: 'A \'Blank Space\' does not exist as a field in form settings anymore. Please contact the app\'s creator ' + resp.creator.name + ' or administrator ' + resp.modifier.name + ' to update the app!'
      });
      var header = kintone.app.getHeaderSpaceElement()
      header.appendChild(alert.render())
      alert.setType("error")
    }, function (error) {
      console.log(error);
    });
  }

  throwPluginNotConfiguredAlert()

  const getIcon = () => {

    var config = kintone.plugin.app.getConfig(PLUGIN_ID)

    var parsedConfig = JSON.parse(config.table);
    parsedConfig.forEach(index => {
      var elementId = index.dropDown.value
      var text = index.text.value

      var icon = document.createElement('img')
      icon.setAttribute('src', image4)

      var spacer = kintone.app.record.getSpaceElement(elementId)

      $(icon).attr('class', 'info-icon')
      spacer.appendChild(icon)

      var tippyAttr = {
        placement: 'top',
        animation: 'fade',
        theme: 'light-border',
        inertia: 'true',
        animation: 'scale',
        animateFill: false,
        content: text,
      }
      tippy(spacer, tippyAttr)
    })
  }

  kintone.events.on('app.record.detail.show', function (event) {
    getIcon()
  });


})(kintone.$PLUGIN_ID);