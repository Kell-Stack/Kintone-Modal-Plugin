var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');


var customCellTextArea = () => {
    return {
        init: function ({
            rowData,
            updateRowData
        }) {
            var span = document.createElement('span');
            var textAreaField = new kintoneUIComponent.TextArea({
                value: rowData.text.value
            });

            span.appendChild(textAreaField.render());

            textAreaField.on('change', function (newValue) {
                updateRowData({
                    items: {
                        isDisabled: false
                    },
                    text: {
                        value: newValue
                    }
                }, false);
            });
            this.textAreaField = textAreaField;
            return span;
        },
        update: function ({
            rowData
        }) {
            var textAreaVal = rowData.text;
            if (textAreaVal && this.textAreaField._reactObject) {
                textAreaField.setValue(this.textAreaVal.value);
            }
        }
    }
};


var setTable = (initialData) => {

    var defaultRowData = JSON.parse(JSON.stringify(initialData[0]))

    var overriddenRowData = JSON.parse(JSON.stringify(initialData[0]))

    var table = new kintoneUIComponent.Table({
        data: initialData,

        defaultRowData: defaultRowData,
        onRowAdd: function (e) {
            return JSON.parse(JSON.stringify(overriddenRowData));
        },
        columns: [{
                header: 'Space',
                cell: function () {
                    return kintoneUIComponent.createTableCell('dropdown', 'dropDown')
                }
            },
            {
                header: 'Tooltip Text',
                cell: function () {
                    return customCellTextArea()
                }
            }
        ]
    })
    return table
};

export {
    setTable
}