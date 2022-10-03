$(function() {
    getOrgList();
});

function searchOrg(val) {
    setTimeout(function() {
        getOrgList(val);
    }, 500);
}

function DeleteOrg() {
    var org_id = $("#delete-modal-org-id").val();
    var token = readCookie("authorization");
    var header = {"Authorization": token }; 
    $.ajax({
        type: "DELETE",
        url: "/api/organizations/" + org_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: header,
        success: function(data) {
            ShowNotif("Organization deleted succesfully!", "success");
            setTimeout(function() {
                getOrgList();
                $("#delete-modal-org-id").modal('hide');
            }, 1000);
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function getOrgList(val = '', pageNum = '0', totalRecords = '5') {

    var search_param = val;
    var th = "";
    var token = readCookie("authorization");
    var header = {"Authorization": token }; 
    
    $.ajax({
        type: "GET",
        url: "/api/organizations/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: header,	
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
                th += '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' + j + '</td><td>' + data[i].orgName + '</td><td>' + data[i].email + '</td><td>' + data[i].phone + '</td><td> <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked><label class="form-check-label" for="flexSwitchCheckChecked">Yes</label></div></td><td><a href="/create_organization.html?org_id=' + data[i].id + '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetOrgDetail(' + data[i].id + ')" data-bs-toggle="modal" data-bs-target="#modalDeleteOrganization" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
            }
            $("#org-list-table").html(th);
        },
        error: function() {
            console.log();
        }
    });
}

function GetOrgDetail(org_id) {
    var token = readCookie("authorization");
    var header = {"Authorization": token }; 
    $.ajax({
        type: "GET",
        url: "/api/organizations/" + org_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: header,
        success: function(data) {
            $("#orgName").val(data.orgName);
            $("#orgID").val(data.id);
            $("#orgEmail").val(data.email);
            $("#orgPhone").val(data.phone);
            $("#orgLocation").val(data.location);
            $("#orgAddress").val(data.address);
			$("#orgModificationCounter").val(data.modificationCounter);
            $("#modal-org-name").text(data.orgName);
            $("#delete-modal-org-id").val(data.id);
        }
    });
}

function OrgPagination(totalElements, pageSize, currentPage) {
    var totalPages = Math.ceil(totalElements / pageSize);
    var searchTerm = ($("#org-list-search").val() ? $("#org-list-search").val() : null);
    var html = '<li class="page-item previous disabled"><a href="#" class="page-link"><i class="previous"></i></a></li>';
    for (i = 0; i < totalPages; i++) {
        var act = (i == currentPage ? 'active' : '');
        html = html + '<li class="page-item ' + act + '"><a href="javascript:void(0)" onclick="getOrgList(' + searchTerm + ',' + (i) + ',' + pageSize + ')" class="page-link">' + (i + 1) + '</a></li>'
    }
    var html = html + ' <li class="page-item next"><a href="#" class="page-link"><i class="next"></i></a></li>';
    $("#org-list-pagination").html(html);
}
