$(function () {
  getLeaveList();
});

function searchLeave(val) {
  setTimeout(function () {
    getLeaveList(val);
  }, 500);
}

function getLeaveList(val = '', pageNum = '0', totalRecords = '5') {
  var search_param = val;
  var th = '';
  $.ajax({
    type: 'GET',
    url: 'api/leave-settings',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json' },
    success: function (data) {
      if (data.totalElements > totalRecords) {
        LeavePagination(data.totalElements, totalRecords, pageNum);
        $('#leave-pagination').removeClass('d-none');
      } else {
        $('#leave-pagination').addClass('d-none');
      }
      for (let i = 0; i < data.length; i++) {
        var paidLeaveValue = '';
        if (data[i].paidLeave == true) {
          paidLeaveValue = 'Yes';
        } else {
          paidLeaveValue = 'No';
        }

        var j = i + 1;
        th +=
          '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' +
          j +
          '</td><td>' +
          data[i].leaveType +
          '</td><td>' +
          data[i].shortName +
          '</td><td>' +
          data[i].leaveLimit +
          '</td><td>' +
          data[i].carryForward +
          '</td><td>' +
          paidLeaveValue +
          '</td><td>' +
          data[i].applicableTo +
          '</td><td><a href="javascript:void(0)" onclick="GetLeaveDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalLeaveSetting" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetLeaveDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalDeleteLeaveSetting" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
      }
      $('#leave-settings-list-table').html(th);
    },
    error: function () {
      console.log();
    },
  });
}

function GetLeaveDetail(leave_id) {
  $.ajax({
    type: 'GET',
    url: '/api/leave-settings/' + leave_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      $('#leaveType').val(data.leaveType);
      $('#leaveID').val(data.id);
      $('#shortName').val(data.shortName);
      $('#leaveLimit').val(data.leaveLimit);
      $('#carryForward').val(data.carryForward);
      data.applicableTo.includes('Male') ? $('#male').prop('checked', true) : $('#male').prop('checked', false);
      data.applicableTo.includes('Female') ? $('#female').prop('checked', true) : $('#female').prop('checked', false);
      data.applicableTo.includes('Others') ? $('#others').prop('checked', true) : $('#others').prop('checked', false);
      data.paidLeave ? $('#inlineRadio1').prop('checked', true) : $('#inlineRadio2').prop('checked', true);
      $('#leaveModificationCounter').val(data.modificationCounter);
      $('#modal-leave-name').text(data.leaveType);
      $('#delete-modal-leave-id').val(data.id);
    },
  });
}

function DeleteLeaveSetting() {
  var leave_id = $('#delete-modal-leave-id').val();
  $.ajax({
    type: 'DELETE',
    url: '/api/leave-settings/' + leave_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      ShowNotif('Leave setting deleted succesfully!', 'success');
      setTimeout(function () {
        getLeaveList();
        $('#modalDeleteLeaveSetting').modal('hide');
      }, 1000);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function emptyFields() {
  $('#carryForward').val(''),
    $('#leaveLimit').val(''),
    $('#leaveType').val(''),
    $('#leaveID').val(''),
    $('#shortName').val(''),
    $('#inlineRadio1').prop('checked', true);
  $('#male').prop('checked', true);
  $('#female').prop('checked', true);
  $('#others').prop('checked', true);
}
