$(function () {
  getApprovalsList();
});

function searchApprovals(val) {
  setTimeout(function () {
    getApprovalsList(val);
  }, 500);
}

function getApprovalsList(val = '', pageNum = '0', totalRecords = '5') {
  var search_param = val;
  var th = '';
  $.ajax({
    type: 'GET',
    url: '/api/leave-approvals',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json' },
    success: function (data) {
      if (data.totalElements > totalRecords) {
        ApprovalsPagination(data.totalElements, totalRecords, pageNum);
        $('#approval-pagination').removeClass('d-none');
      } else {
        $('#approval-pagination').addClass('d-none');
      }
      for (let i = 0; i < data.length; i++) {
        var j = i + 1;
        th +=
          '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' +
          j +
          '</td><td>' +
          'Siva' +
          '</td><td>' +
          data[i].leaveType +
          '</td><td>' +
          data[i].fromDate +
          '</td><td>' +
          data[i].toDate +
          '</td><td>' +
          data[i].hours +
          '</td><td>' +
          'All' +
          '</td><td>' +
          moment(new Date()).format('DD-MM-YYYY') +
          '</td><td>' +
          '<div class="dropdown"><button class="btn btn-secondary btn-icon btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">' +
          '<i class="fas fa-ellipsis-v"></i>' +
          '</button>' +
          '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
          '<li><a class="dropdown-item" href="#">Approve</a></li>' +
          '<li><a class="dropdown-item" href="#">Reject</a></li>' +
          '<li><a class="dropdown-item" href="#">Cancel</a></li>' +
          '<li><a class="dropdown-item" href="javascript:void(0)" onclick="GetApprovalDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalCreateApproval">Edit</a></li>' +
          '<li><a class="dropdown-item" href="javascript:void(0)" onclick="GetApprovalDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalDeleteApproval">Delete</a></li>' +
          '</ul>' +
          '</div>' +
          '</td></tr>';
      }
      $('#leave-approvals-list-table').html(th);
    },
    error: function () {
      console.log();
    },
  });
}

function GetApprovalDetail(approval_id) {
  $.ajax({
    type: 'GET',
    url: '/api/leave-approvals/' + approval_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      $('#leavetype').val(data.leaveType);
      $('#approvalID').val(data.id);
      $('#fromDate').val(data.fromDate);
      $('#toDate').val(data.toDate);
      $('#hours').val(data.hours);
      $('#remarks').val(data.remarks);
      data.paidleave == 'Yes' ? $('#paidleaveYes').prop('checked', true) : $('#paidleaveNo').prop('checked', true);
      data.notficationRequired ? $('#notificationYes').prop('checked', true) : $('#notificationNo').prop('checked', true);
      $('#approvalModificationCounter').val(data.modificationCounter);
      //$('#modal-approval-name').text(data.leaveType);
      $('#modal-approval-name').text('Employee');
      $('#delete-modal-approval-id').val(data.id);
    },
  });
}

function DeleteApprovalSetting() {
  var approval_id = $('#delete-modal-approval-id').val();
  $.ajax({
    type: 'DELETE',
    url: '/api/leave-approvals/' + approval_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      ShowNotif('Leave Approval deleted succesfully!', 'success');
      setTimeout(function () {
        getApprovalsList();
        $('#modalDeleteApproval').modal('hide');
      }, 1000);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function emptyAppFields() {
  $('#employeeName').val('');
  $('#leavetype').val('');
  $('#approvalID').val('');
  $('#fromDate').val('');
  $('#toDate').val('');
  $('#hours').val('');
  $('#remarks').val('');
  $('#paidleaveNo').prop('checked', true);
  $('#notificationNo').prop('checked', true);
}
