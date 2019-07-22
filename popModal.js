jQuery.noConflict();
(function ($) {
    "use strict";
    kintone.events.on("app.record.create.show", function (e) {
        //Creating the hintModal class and button using jQuery
        var hintbutton = $(
            '<span class="hintModal icon_hint">' +
            '<div class="hintModal_container">Lunch is being bought from Kintone Deli.' +
            'You can venmo @kintone for payment. Prices: Sandwich ($5), Hamburger ($7),' +
            'Hot Dog ($3), Fruit ($3), Chicken Nuggets ($5) </div>' +
            '</span>'
        );
        $('.hintModal').hintModal({});
        //Adding the button to the empty element field in the app
        kintone.app.record.getSpaceElement('Add').appendChild(hintbutton[0]);
    });
})(jQuery);