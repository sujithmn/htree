$(function() {
	
	if (window.location.search.substring(1).split('dept_id=')[1] != '' && window.location.search.indexOf('dept_id') == 1) {
        ActivateTab('kt_branch_setting', 'kt_department_setting');
		ActivateTab('kt_general_setting', 'kt_department_setting');
        showDiv('add-more-department');
        showDiv('add-branch');
        hideDiv('add-department-static ');
        hideDiv('department-list');
        GetDeparmentDetail(window.location.search.substring(1).split('dept_id=')[1]);
        $("#dept_id").val(window.location.search.substring(1).split('dept_id=')[1]);
    }
	
	if (window.location.search.substring(1).split('dept_id=')[1] != '' && window.location.search.indexOf('dept_id') == 1) {
        GetDeptDetail(window.location.search.substring(1).split('dept_id=')[1]);
    }

    $("#kt_create_department").validate({
        rules: {
            deptName: {
                required: true
            },
            deptHead: {
                required: true
			}
        },
        messages: {
            deptName: "Department name is required",
            deptHead: "Department head is required"
        }
    });
	
    var department_row = 1;
	$('#add-department').on('click', function() {
        var brow = department_row + 1;
        var rnum = "#rownumd" + department_row;
        var html = '<div id="rownumd' + department_row + '" class="mt-4"><span class="fs-3 fw-bolder">Department #' + brow + '</span><div class="row mt-4 d-flex align-items-end"><div class="col-4"> <label class=" fs-5 fw-bold mb-2 required">Department Head</label> <input type="number" class="form-control"></div><div class="col-4"> <label class=" fs-5 fw-bold mb-2 required">Department Head Employee</label> <input type="number" class="form-control"></div><div class="col-4"><button class="btn btn-secondary btn-sm" type="button" id="remove-department" onclick="RemoveDepartment(' + department_row + ')"><i class="fas fa-times"></i> Remove Department</button></div></div></div>';
        $("#add-more-department").append(html);
        department_row++;

        if (department_row == 1) {
            $('#remove-department').hide();
        } else {
            $('#remove-department').show();
        }
    });

    $('#remove-department').on('click', function() {
        $("#rownumd" + (department_row - 1)).remove();
        department_row--;

        if (department_row == 1) {
            $('#remove-department').hide();
        } else {
            $('#remove-department').show();
        }
    });

    if (department_row == 1) {
        $('#remove-department').hide();
    } else {
        $('#remove-department').show();
    }
	
	$("#kt_create_department").submit(function(e) {
        e.preventDefault(e);

        var data = {
            "deptHead": $("#deptHead").val(),          
            "deptName": $("#deptHead").val(),
            "ModificationCounter": $("#deptModificationCounter").val(),
            "organization_id": $("#orgID").val()
        };
        var httpMethod = "POST";
        if( $("#dept_id").val()){
            data.id = $("#dept_id").val();
            httpMethod = "PUT"
        }
        if ($("#deptName").val() != '' && $("#deptHead").val() != '') {
            $("#create-department-spinner").show();
            $("#create-department-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/api/departments",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify(data),
                success: function(data) {                    
                    if ($("#dept_id").val()) {
                        ShowNotif("Department updated succesfully!", "success");
                    } else {
                        ShowNotif("Department created succesfully!", "success");
                    }
                    setTimeout(function() {
                        $("#modalDepartmentSettings").modal('hide');
                        $("#create-department-spinner").hide();
                        $("#create-department-submit").removeAttr('disabled', 'disabled');
						ActivateTab( 'kt_department_setting', 'kt_designation_setting');
                        GetDesignationList();  
                    }, 1000);
                },
                error: function(data) {
                    alert("Error create Dept:"+JSON.stringify(data));
                    $("#create-department-spinner").hide();
                    $("#create-department-submit").removeAttr('disabled', 'disabled');
					
                }
            });
        }
    });
});

function RemoveDepartment(id) {
    $("#rownumd" + id).hide();
}

function GetDeptList(val = '')
{
	var search_param = val;
    var th = "";
    $.ajax({
        type: "GET",
        url: "/api/departments",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                var j = i + 1;
                th += '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' + j + '</td><td>' + data[i].deptHead + '</td><td>' + data[i].deptName + '</td><td><a href="/create_organization.html?dept_id=' + data[i].id + '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetDeparmentDetail(' + data[i].id + ')" data-bs-toggle="modal" data-bs-target="#modalDeleteOrganizationDepartment" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
            }
            $("#department-list-table").html(th);
        },
        error: function() {
            console.log();
        }
    });
}

function GetDeparmentDetail(dept_id)
{
	$.ajax({
        type: "GET",
         url: "/api/department/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            $("#deptHead").val(data.deptHead),
            $("#deptName").val(data.deptName),
            $("#modal-dept-name").text(data.deptName);
            $("#delete-modal-dept-id").val(data.id);
        }
    });
}

function DeleteDepartment() {
    var org_id = $("#delete-modal-dept-id").val();
    $.ajax({
        type: "DELETE",
        url: "/api/department/"+ org_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            ShowNotif("Department deleted succesfully!", "success");
            setTimeout(function() {
                GetDeptList();
                $("#delete-modal-dept-id").modal('hide');
            }, 1000);
        },
        error: function(data) {
            console.log(data);
        }
    });
}
