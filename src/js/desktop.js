jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.index.show', function() {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);

    var spaceElement = kintone.app.getHeaderSpaceElement();
    var fragment = document.createDocumentFragment();
    var headingElement = document.createElement('h3');
    var messageElement = document.createElement('p');

    messageElement.classList.add('plugin-space-message');
    messageElement.textContent = config.message;
    headingElement.classList.add('plugin-space-heading');
    headingElement.textContent = '🥑🍕🥗🥟Kell Stack Employee Lunch Order Form🥭🍣🥙🥬';

    fragment.appendChild(headingEl);
    fragment.appendChild(messageEl);
    spaceElement.appendChild(fragment);
  });

})(jQuery, kintone.$PLUGIN_ID);
