$(function () {
  if (window.location.search.substring(1).split('holiday_id=')[1] != '' && window.location.search.indexOf('holiday_id') == 1) {
    GetHolidayDetail(window.location.search.substring(1).split('holiday_id=')[1]);
  }

  $('#kt_create_holiday').validate({
    rules: {
      holidayName: {
        required: true,
      },
      holidayDate: {
        required: true,
      },
      holidayType: {
        required: true,
      },
      /* leaveLimit: {
        required: true,
      }, */
    },
    messages: {
      holidayName: 'Holiday Name is required',
      holidayDate: 'Holiday Date is required',
      holidayType: 'Holiday Type is required',
      //leaveLimit: 'Assigned Leave Limit is required',
    },
  });

  $('#kt_create_holiday').submit(function (e) {
    e.preventDefault(e);
    if ($('#holidayName').val() != '' && $('#holidayDate').val() != '' && $('#holidayType').val() != '') {
      var data = {
        holidayName: $('#holidayName').val(),
        holidayDate: $('#holidayDate').val(),
        holidayType: getHolidayType(),
        modificationCounter: 0, //$('#modificationCounter').val(),
      };

      var httpMethod = 'POST';
      if ($('#holidayID').val()) {
        data.id = $('#holidayID').val();
        httpMethod = 'PUT';
      }

      $('#create-holiday-spinner').show();
      $('#create-holiday-submit').attr('disabled', 'disabled');
      $.ajax({
        type: httpMethod,
        url: '/api/holidays/',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
        data: JSON.stringify(data),
        success: function (data) {
          console.log(data);
          $('#create-holiday-spinner').hide();
          $('#create-holiday-submit').removeAttr('disabled', 'disabled');
          if ($('#holidayID').val()) {
            ShowNotif('Holiday updated succesfully!', 'success');
          } else {
            ShowNotif('Holiday created succesfully!', 'success');
          }
          getHolidayList();
          setTimeout(function () {
            $('#modalCreateHoliday').modal('hide');
          }, 1000);
        },
        error: function (data) {
          alert("Error in holidays:"+JSON.stringify(data));
          $('#create-holiday-spinner').hide();
          $('#create-holiday-submit').removeAttr('disabled', 'disabled');
          console.log(data);
        },
      });
    }
  });
});

function getHolidayType() {
  var holidayType;
  if ($('#optional').is(':checked')) {
    holidayType = 'optional';
  } else {
    holidayType = 'compulsory';
  }
  return holidayType;
}
