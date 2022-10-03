$(function () {
  if (window.location.search.substring(1).split('approval_id=')[1] != '' && window.location.search.indexOf('approval_id') == 1) {
    GetApprovalDetail(window.location.search.substring(1).split('approval_id=')[1]);
  }

  $('#kt_create_approval').validate({
    rules: {
      leavetype: {
        required: true,
      },
      fromDate: {
        required: true,
      },
      hours: {
        required: true,
      },
      remarks: {
        required: true,
      },
      toDate: {
        required: true,
      },
    },
    messages: {
      fromDate: 'From Date is required',
      hours: 'Hours field is required',
      leavetype: 'Leave Type is required',
      remarks: 'Remarks is required',
      toDate: 'To Date is required',
    },
  });

  $('#kt_create_approval').submit(function (e) {
    e.preventDefault(e);
    if (
      $('#fromDate').val() != '' &&
      $('#hours').val() != '' &&
      $('#leavetype').val() != '' &&
      $('#remarks').val() != '' &&
      $('#toDate').val() != ''
    ) {
      var data = {
        fromDate: $('#fromDate').val(),
        hours: $('#hours').val(),
        leaveType: $('#leavetype').val(),
        modificationCounter: 0, //$('#modificationCounter').val(),
        notficationRequired: getNotification(),
        paidleave: getPaidleave(),
        remarks: $('#remarks').val(),
        toDate: $('#toDate').val(),
      };

      var httpMethod = 'POST';
      if ($('#approvalID').val()) {
        data.id = $('#approvalID').val();
        httpMethod = 'PUT';
      }

      $('#create-approval-spinner').show();
      $('#create-approval-submit').attr('disabled', 'disabled');
      $.ajax({
        type: httpMethod,
        url: '/api/leave-approvals/',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
        data: JSON.stringify(data),
        success: function (data) {
          console.log(data);
          $('#create-approval-spinner').hide();
          $('#create-approval-submit').removeAttr('disabled', 'disabled');
          if ($('#approvalID').val()) {
            ShowNotif('Leave Entry updated succesfully!', 'success');
          } else {
            ShowNotif('Leave Entry created succesfully!', 'success');
          }
          getApprovalsList();
          setTimeout(function () {
            $('#modalCreateApproval').modal('hide');

            //ActivateTab('kt_branch_setting', 'kt_branch_setting');
            // hideDiv('add-more-branch');
            //hideDiv('add-branch');
            //showDiv('add-branch-static');
            //showDiv('branch-list');
          }, 1000);
        },
        error: function (data) {
          alert("Error in leave-approvals:"+JSON.stringify(data));
          $('#create-approval-spinner').hide();
          $('#create-approval-submit').removeAttr('disabled', 'disabled');
          console.log(data);
        },
      });
    }
  });
});

function getPaidleave() {
  var paidTo;
  if ($('#paidleaveYes').is(':checked')) {
    paidTo = 'Yes';
  } else {
    paidTo = 'No';
  }
  return paidTo;
}

function getNotification() {
  var notify;
  if ($('#notificationYes').is(':checked')) {
    notify = true;
  } else {
    notify = false;
  }
  return notify;
}
