$(function () {
  getShiftList();
});

function searchShift(val) {
  setTimeout(function () {
    getShiftList(val);
  }, 500);
}

function getShiftList(val = '', pageNum = '0', totalRecords = '5') {
  var search_param = val;
  var th = '';
  $.ajax({
    type: 'GET',
    url: '/api/shifts/',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json' },
    success: function (data) {
      if (data.totalElements > totalRecords) {
        ShiftPagination(data.totalElements, totalRecords, pageNum);
        $('#shift-pagination').removeClass('d-none');
      } else {
        $('#shift-pagination').addClass('d-none');
      }
      for (let i = 0; i < data.length; i++) {
        var j = i + 1;
        th +=
          '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' +
          j +
          '</td><td>' +
          data[i].shiftName +
          '</td><td>' +
          data[i].startTime +
          '-' +
          data[i].endTime +
          '</td><td>' +
          data[i].breakDuration +
          '</td><td>' +
          data[i].workhoursHalfDay +
          '</td><td>' +
          data[i].workhoursFullDay +
          '</td><td>' +
          data[i].shortName +
          '</td><td>' +
          data[i].graceTimeLateIn +
          '</td><td><a href="/create_shift.html?shift_id=' +
          data[i].id +
          '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetShiftDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalDeleteShift" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
      }
      $('#shift-list-table').html(th);
    },
    error: function () {
      console.log();
    },
  });
}

function GetShiftDetail(shift_id) {
  $.ajax({
    type: 'GET',
    url: '/api/shifts/' + shift_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {      
      $('#shiftName').val(data.shiftName);
      $('#shiftID').val(data.id);
      $('#shortName').val(data.shortName);
      $('#startTime').val(data.startTime);
      $('#endTime').val(data.endTime);
      $('#breakDuration').val(data.breakDuration);
      $('#workhoursHalfDay').val(data.workhoursHalfDay);
      $('#workhoursFullDay').val(data.workhoursFullDay);
      $('#graceTimeLateIn').val(data.graceTimeLateIn);
      $('#graceTimeEarlyOut').val(data.graceTimeEarlyOut);
      $('#overTimeSetting').val(data.overTimeSetting);
      $('#shiftModificationCounter').val(data.modificationCounter);
      $('#modal-shift-name').text(data.shiftName);
      $('#delete-modal-shift-id').val(data.id);
    },
  });
}

function DeleteShift() {
  var shift_id = $('#delete-modal-shift-id').val();
  $.ajax({
    type: 'DELETE',
    url: '/api/shifts/' + shift_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      ShowNotif('Shift deleted succesfully!', 'success');
      setTimeout(function () {
        getShiftList();
        $('#modalDeleteShift').modal('hide');
      }, 1000);
    },
    error: function (data) {
      console.log(data);
    },
  });
}
