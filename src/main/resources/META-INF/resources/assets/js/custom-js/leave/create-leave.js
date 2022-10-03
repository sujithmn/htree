$(function () {
  if (window.location.search.substring(1).split('leave_id=')[1] != '' && window.location.search.indexOf('leave_id') == 1) {
    GetLeaveDetail(window.location.search.substring(1).split('leave_id=')[1]);
  }

  $('#kt_create_leave').validate({
    rules: {
      leaveType: {
        required: true,
      },
      shortName: {
        required: true,
      },
      carryForward: {
        required: true,
      },
      leaveLimit: {
        required: true,
      },
    },
    messages: {
      leaveType: 'Leave Type is required',
      shortName: 'Leave Short Name is required',
      carryForward: 'Carry Forward is required',
      leaveLimit: 'Assigned Leave Limit is required',
    },
  });

  $('#kt_create_leave').submit(function (e) {
    e.preventDefault(e);
    if ($('#leaveType').val() != '' && $('#shortName').val() != '' && $('#carryForward').val() != '' && $('#leaveLimit').val() != '') {
      var data = {
        applicableTo: getApplicableTo(),
        carryForward: $('#carryForward').val(),
        leaveLimit: $('#leaveLimit').val(),
        leaveType: $('#leaveType').val(),
        modificationCounter: 0, //$('#modificationCounter').val(),
        paidLeave: getPaidLeave(),
        shortName: $('#shortName').val(),
      };

      var httpMethod = 'POST';
      if ($('#leaveID').val()) {
        data.id = $('#leaveID').val();
        httpMethod = 'PUT';
      }

      $('#create-leave-spinner').show();
      $('#create-leave-submit').attr('disabled', 'disabled');
      $.ajax({
        type: httpMethod,
        url: '/api/leave-settings/',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
        data: JSON.stringify(data),
        success: function (data) {
          console.log(data);
          $('#create-leave-spinner').hide();
          $('#create-leave-submit').removeAttr('disabled', 'disabled');
          if ($('#leaveID').val()) {
            ShowNotif('Leave Type updated succesfully!', 'success');
          } else {
            ShowNotif('Leave Type created succesfully!', 'success');
          }
          getLeaveList();
          setTimeout(function () {
            $('#modalLeaveSetting').modal('hide');
          }, 1000);
        },
        error: function (data) {
          alert("Error in leave settings:"+JSON.stringify(data));
          $('#create-leave-spinner').hide();
          $('#create-leave-submit').removeAttr('disabled', 'disabled');
          console.log(data);
        },
      });
    }
  });
});

function getApplicableTo() {
  var applicable = '';
  if ($('#male').is(':checked')) {
    applicable += $('#male').val();
  }
  if ($('#female').is(':checked')) {
    if (applicable != '') applicable += ', ';
    applicable += $('#female').val();
  }
  if ($('#others').is(':checked')) {
    if (applicable != '') applicable += ', ';
    applicable += $('#others').val();
  }
  return applicable;
}

function getPaidLeave() {
  var paidTo;
  if ($('#inlineRadio1').is(':checked')) {
    paidTo = true;
  } else {
    paidTo = false;
  }
  return paidTo;
}
