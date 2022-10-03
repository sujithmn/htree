$(function () {
  getHolidayList();
});

function searchHoliday(val) {
  setTimeout(function () {
    getHolidayList(val);
  }, 500);
}

function getHolidayList(val = '', pageNum = '0', totalRecords = '5') {
  var search_param = val;
  var th = '';
  $.ajax({
    type: 'GET',
    url: 'api/holidays',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json' },
    success: function (data) {
      if (data.totalElements > totalRecords) {
        HolidayPagination(data.totalElements, totalRecords, pageNum);
        $('#holiday-pagination').removeClass('d-none');
      } else {
        $('#holiday-pagination').addClass('d-none');
      }
      for (let i = 0; i < data.length; i++) {
        var j = i + 1;
        th +=
          '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' +
          j +
          '</td><td>' +
          data[i].holidayName +
          '</td><td>' +
          moment(data[i].holidayDate).format('DD-MM-YYYY') +
          '</td><td>' +
          'All' +
          '</td><td>' +
          data[i].holidayType +
          '</td><td><a href="javascript:void(0)" onclick="GetHolidayDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalCreateHoliday" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetHolidayDetail(' +
          data[i].id +
          ')" data-bs-toggle="modal" data-bs-target="#modalDeleteHoliday" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
      }
      $('#holiday-list-table').html(th);
    },
    error: function () {
      console.log();
    },
  });
}

function GetHolidayDetail(holiday_id) {
  $.ajax({
    type: 'GET',
    url: '/api/holidays/' + holiday_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      $('#holidayName').val(data.holidayName);
      $('#holidayID').val(data.id);
      $('#holidayDate').val(data.holidayDate);
      if (data.holidayType == 'optional') {
        $('#optional').prop('checked', true);
        $('#compulsory').prop('checked', false);
      } else {
        $('#compulsory').prop('checked', true);
        $('#optional').prop('checked', false);
      }
      //$('#holidayType').val(data.holidayType);
      $('#holidayModificationCounter').val(data.modificationCounter);
      $('#modal-holiday-name').text(data.holidayName);
      $('#delete-modal-holiday-id').val(data.id);
    },
  });
}

function DeleteHoliday() {
  var leave_id = $('#delete-modal-holiday-id').val();

  $.ajax({
    type: 'DELETE',
    url: '/api/holidays/' + leave_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: { contentType: 'application/json', 'X-CSRF-TOKEN': localStorage.security_token },
    success: function (data) {
      ShowNotif('Holiday deleted succesfully!', 'success');
      setTimeout(function () {
        getHolidayList();
        $('#modalDeleteHoliday').modal('hide');
      }, 1000);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function emptyHolidayFields() {
  $('#holidayName').val('');
  $('#holidayDate').val('');
  $('#holidayID').val('');
  $('#optional').prop('checked', false);
  $('#compulsory').prop('checked', false);
}
