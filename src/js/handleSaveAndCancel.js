import Swal from 'sweetalert2';


var duplicateValCheck = (data) => {
  var dupes = new Set()
  var dupeCheck = false
  data.forEach(row => {
    var rowElementId = row.dropDown.value
    if (dupes.has(rowElementId) === true) {
      dupeCheck = true
    }
    dupes.add(rowElementId)
  })
  return dupeCheck
};

let missingValCheck = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
      return true
    }
  }
  return false
};


var handleSaveButton = (table) => {
  var data = table.getValue();

  var dataJSON = JSON.stringify(data)
  var config = {
    table: dataJSON
  }
  if (duplicateValCheck(data) === true) {
    Swal.fire({
      title: '<strong>Duplicate Value</strong>',
      html: 'You can only have one tooltip per blank space field. Please delete field',
      type: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (missingValCheck(data)) {
    Swal.fire({
      title: '<strong>Invalid Input</strong>',
      html: 'You must choose a spacer field from the dropdown <b>and</b> enter text into the text area',
      type: 'error',
      confirmButtonText: 'Cool'
    })
  } else {
    kintone.plugin.app.setConfig(config, function () {
      let timerInterval
      Swal.fire({
        title: 'Saved',
        html: 'Don\'t forget to click <b>Update App</b> in your app settings. <br> We\'ll take you there in <strong></strong> seconds!',
        type: 'success',
        showConfirmButton: false,
        timer: 6000,
        onBeforeOpen: () => {

          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('strong')
              .textContent = (Swal.getTimerLeft() / 1000)
              .toFixed(0)
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then(function () {
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
      });
    })
  }
};

var handleCancelButton = () => {
  Swal.fire({
    title: '<strong>Cancel</strong>',
    html: 'Your changes were not saved',
    type: 'warning',
    confirmButtonText: 'Back to App Settings'
  }).then(function () {
    window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
  })
};

export {
  handleSaveButton,
  handleCancelButton
}