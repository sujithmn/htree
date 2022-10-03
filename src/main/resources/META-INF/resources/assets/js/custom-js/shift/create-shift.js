$(function () {
  if (window.location.search.substring(1).split('shift_id=')[1] != '' && window.location.search.indexOf('shift_id') == 1) {
    GetShiftDetail(window.location.search.substring(1).split('shift_id=')[1]);
  }

  $('#kt_create_access').validate({
    rules: {
      empstatus: {
        required: true,
      },
      emptype: {
        required: true,
      },
      mobileappaccess: {
        required: true,
      },
      badgeid: {
        required: true,
      },
    },
    messages: {
      mobileappaccess: 'This field is required',
      emptype: 'Employee type is required',
      empstatus: 'Employee status is required',
      badgeid: 'Badge Id is requred',
    },
  });
});

$('#kt_create_shift').validate({
  rules: {
    breakDuration: {
      required: true,
    },
    endTime: {
      required: true,
    },
    graceTimeEarlyOut: {
      required: true,
    },
    graceTimeLateIn: {
      required: true,
    },
    shiftName: {
      required: true,
    },
    shortName: {
      required: true,
      email: true,
    },
    startTime: {
      required: true,
    },
    workhoursFullDay: {
      required: true,
    },
    workhoursHalfDay: {
      required: true,
    },
  },
  messages: {
    breakDuration: 'Break Duration is required',
    endTime: 'End Time is required',
    graceTimeEarlyOut: 'This field is required',
    graceTimeLateIn: 'This field is required',
    shiftName: 'Shift name is required',
    shortName: 'Short name is required',
    startTime: 'Start Time is required',
    workhoursFullDay: 'This field is required',
    workhoursHalfDay: 'This field is required',
  },
});

$('#kt_create_shift').submit(function (e) {
  e.preventDefault(e);
  //var data = $(this).serializeArray();
  if (
    $('#breakDuration').val() != '' &&
    $('#endTime').val() != '' &&
    $('#graceTimeEarlyOut').val() != '' &&
    $('#graceTimeLateIn').val() != '' &&
    $('#shiftName').val() != '' &&
    $('#shortName').val() != '' &&
    $('#startTime').val() != '' &&
    $('#workhoursFullDay').val() != '' &&
    $('#workhoursHalfDay').val() != ''
  ) {
    var data = {
      breakDuration: $('#breakDuration').val(),
      endTime: $('#endTime').val(),
      graceTimeEarlyOut: $('#graceTimeEarlyOut').val(),
      graceTimeLateIn: $('#graceTimeLateIn').val(),
      modificationCounter: 0, //$('#shiftModificationCounter').val(),
      shiftName: $('#shiftName').val(),
      shortName: $('#shortName').val(),
      startTime: $('#startTime').val(),
      workhoursFullDay: $('#workhoursFullDay').val(),
      workhoursHalfDay: $('#workhoursHalfDay').val(),
    };

    var httpMethod = 'POST';
    if ($('#shiftID').val()) {
      data.id = $('#shiftID').val();
      httpMethod = 'PUT';
    }

    $('#create-shift-spinner').show();
    $('#create-shift-submit').attr('disabled', 'disabled');
    $.ajax({
      type: httpMethod,
      url: '/api/shifts/',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
      data: JSON.stringify(data),
      success: function (data) {
        console.log(data);
        if ($('#shiftID').val()) {
          ShowNotif('Shift updated succesfully!', 'success');
        } else {
          ShowNotif('Shift created succesfully!', 'success');
        }
        setTimeout(function () {
          $('#create-shift-spinner').hide();
          $('#create-shift-submit').removeAttr('disabled', 'disabled');
          //ActivateTab('kt_general_setting', 'kt_branch_setting');
        }, 1000);
        getShiftList();
      },
      error: function (data) {
        //readyState, reponseText.details
        $('#create-shift-spinner').hide();
        $('#create-shift-submit').removeAttr('disabled', 'disabled');
      },
    });
  }
});
