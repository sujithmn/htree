$(function() {

	if (window.location.search.substring(1).split('desg_id=')[1] != '' && window.location.search.indexOf('desg_id') == 1) {
        ActivateTab('kt_branch_setting', 'kt_department_setting');
		ActivateTab('kt_general_setting', 'kt_department_setting');
        showDiv('add-more-department');
        showDiv('add-branch');
        hideDiv('add-department-static ');
        hideDiv('department-list');
        GetDeparmentDetail(window.location.search.substring(1).split('desg_id=')[1]);
        $("#desg_id").val(window.location.search.substring(1).split('desg_id=')[1]);
    }
	
	if (window.location.search.substring(1).split('desg_id=')[1] != '' && window.location.search.indexOf('desg_id') == 1) {
        GetDeptDetail(window.location.search.substring(1).split('desg_id=')[1]);
    }



    //----------
    $("#kt_create_designation").submit(function(e) {
        e.preventDefault(e);
        var data = {
            "desigName": $("#desigName").val(),          
            "ModificationCounter": $("#desigModificationCounter").val(),
            "organization_id": $("#orgID").val()
        };

        var httpMethod = "POST";
        if( $("#desig_id").val()){
            data.id = $("#desig_id").val();
            httpMethod = "PUT"
        }

        if ($("#desigName").val() != '' ) {
            $("#create-designation-spinner").show();
            $("#create-designation-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/api/designations",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify(data),
                success: function(data) {
                    if ($("#desig_id").val()) {
                        ShowNotif("Designation updated succesfully!", "success");
                    } else {
                        ShowNotif("Designation created succesfully!", "success");
                    }
                    setTimeout(function() {
                        $("#modalDesignationSettings").modal('hide');
                        $("#create-designation-spinner").hide();
                        $("#create-designation-submit").removeAttr('disabled', 'disabled');
                        GetLocale(1);
						ActivateTab( 'kt_designation_setting', 'kt_locale_setting')  
                    }, 1000);
                },
                error: function(data) {
                    $("#create-designation-spinner").hide();
                    $("#create-designation-submit").removeAttr('disabled', 'disabled');
					
                }
            });
        }
    });
    //----------




    $("#kt_create_designation").validate({
        rules: {
            desigName: {
                required: true
            }
        },
        messages: {
            desigName: "Designation is required",            
        }
    });
	
    var designation_row = 1;
    // Adding dynamic designation
    var browd = designation_row + 1;
    var rnum = "#rownum" + designation_row;
    $('#add-designation').on('click', function() {
        var html = '<div id="rownum' + designation_row + '"><div class="row mt-4 d-flex align-items-end"><span class="fs-3 fw-bolder">Designation #' + (designation_row + 1) + '</span><div class="col-6"> <label class=" fs-5 fw-bold mb-2 required">Designation</label> <input type="number" class="form-control"></div><div class="col-4"><button class="btn btn-secondary btn-sm" type="button" id="remove-designation" onclick="RemoveDesignation(' + designation_row + ')"><i class="fas fa-times"></i> Remove designation</button></div></div></div>';
        $("#add-more-designation").append(html);
        designation_row++;

        if (designation_row == 1) {
            $('#remove-designation').hide();
        } else {
            $('#remove-designation').show();
        }
    });

    $('#remove-designation').on('click', function() {
        $("#rownum" + (designation_row - 1)).remove();
        designation_row--;

        if (designation_row == 1) {
            $('#remove-designation').hide();
        } else {
            $('#remove-designation').show();
        }
    });

    if (designation_row == 1) {
        $('#remove-designation').hide();
    } else {
        $('#remove-designation').show();
    }
});

function RemoveDesignation(id) {
    $("#rownum" + id).hide();
}

function GetDesignationList(val = '', pageNum = '0', totalRecords = '5') {	
    var search_param = val;
    var th = "";
    $.ajax({
        type: "GET",
        url: "/api/designations/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json" },	
        success: function(data) {
           
			if(data.totalElements > totalRecords) 
			{
				OrgPagination(data.totalElements, totalRecords, pageNum);
				$("#org-pagination").removeClass('d-none');
			} 
			else {
				$("#org-pagination").addClass('d-none');
			}
            for (let i = 0; i < data.length; i++) {
                var j = i + 1;
                th += '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' + j + '</td><td>' + data[i].desigName + '</td><td> <a href="/create_organization.html?org_id=' + data[i].id + '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetOrgDetail(' + data[i].id + ')" data-bs-toggle="modal" data-bs-target="#modalDeleteOrganization" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
            }
            $("#designation-list-table").html(th);
        },
        error: function() {
            console.log();
        }
    });
}