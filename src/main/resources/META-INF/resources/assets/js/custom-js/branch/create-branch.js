$(function() {
    if (window.location.search.substring(1).split('branch_id=')[1] != '' && window.location.search.indexOf('branch_id') == 1) {
        ActivateTab('kt_general_setting', 'kt_branch_setting');
        showDiv('add-more-branch');
        showDiv('add-branch');
        hideDiv('add-branch-static');
        hideDiv('branch-list');
        GetBranchDetail(window.location.search.substring(1).split('branch_id=')[1]);
        $("#branch_id").val(window.location.search.substring(1).split('branch_id=')[1]);
    }

    $("#kt_create_branch").validate({
        rules: {
            branchName: {
                required: true
            },
            branchHead: {
                required: true
            },
            manager: {
                required: true
            },
            address: {
                required: true
            }
        },
        messages: {
            branchName: "Branch name is required",
            branchHead: "Branch head is required",
            manager: "Manager is required",
            address: "Address is required"
        }
    });

    var branch_row = 1;
    $('#add-branch').on('click', function() {        
        var brow = branch_row + 1;
        var rnum = "#rownum" + branch_row;
        var html = '<div id="rownum' + branch_row + '" class="border-secondary border-top mt-10 pt-5"><span class="fs-3 fw-bolder">Branch #' + brow + '</span><div class="row mt-4"><div class="col-4"> <label class=" fs-5 fw-bold mb-2 required">Branch Name</label> <input type="number" class="form-control"></div><div class="col-4"> <label class=" fs-5 fw-bold mb-2 required">Branch Head</label> <input type="number" class="form-control"></div><div class="col-4"> <label class=" fs-5 fw-bold mb-2 required">Reporting Manager</label> <input type="number" class="form-control"></div></div><div class="row mt-5"><div class="col-6"> <label class=" fs-5 fw-bold mb-2 required">Branch Address</label><textarea type="text" class="form-control" rows="2"></textarea></div><div class="col-auto align-self-center col-auto mt-10"><button class="btn btn-secondary btn-sm" type="button" id="remove-branch" onclick="RemoveBranch(' + branch_row + ')"><i class="fas fa-times"></i> Remove Branch</button></div></div></div>';
        $("#add-more-branch").append(html);
        branch_row++;

        if (branch_row == 1) {
            $('#remove-branch').hide();
        } else {
            $('#remove-branch').show();
        }
    });
    $('#remove-branch').on('click', function() {
        if (branch_row == 1) {
            $('#remove-branch').hide();
        } else {
            $('#remove-branch').show();
        }
    });

    if (branch_row == 1) {
        $('#remove-branch').hide();
    } else {
        $('#remove-branch').show();
    }

    $("#kt_create_branch").submit(function(e) {
        e.preventDefault(e);

        var data = {
            "branchName": $("#branchName").val(),
            "branchHead": $("#branchHead").val(),
            "manager": $("#manager").val(),
            "address": $("#address").val(),
            "ModificationCounter": $("#branchModificationCounter").val(),
            "organization_id": $("#orgID").val()
        };

        var httpMethod = "POST";
        if( $("#branch_id").val()){
            data.id = $("#branch_id").val();
            httpMethod = "PUT"
        }
        if ($("#branchName").val() != '' && $("#branchHead").val() != '' && $("#manager").val() != '' && $("#address").val() != '') {
            $("#create-branch-spinner").show();
            $("#create-branch-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                  url: "/api/branches/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify(data),
                success: function(data) {
                    console.log(data);
                    $("#create-org-spinner").hide();
                    $("#create-org-submit").removeAttr('disabled', 'disabled');
                    if ($("#branch_id").val()) {
                        ShowNotif("Branch updated succesfully!", "success");
                    } else {
                        ShowNotif("Branch created succesfully!", "success");
                    }
                    setTimeout(function() {
                        $("#modalbranchSettings").modal('hide');                        
                        hideDiv('add-more-branch');
                        hideDiv('add-branch');
                        showDiv('add-branch-static');
                        showDiv('branch-list');
                        ActivateTab('kt_branch_setting', 'kt_department_setting');
                        GetDeptList();
                    }, 1000);
                },
                error: function(data) {
                    alert("Create Branch=> "+JSON.stringify(data));
                    $("#create-branch-spinner").hide();
                    $("#create-branch-submit").removeAttr('disabled', 'disabled');
                    console.log(data);
                }
            });
        }
    });
});

function RemoveBranch(id) {
    $("#rownum" + id).hide();
}

function GetBranchList(val = '') {
    var search_param = val;
    var th = "";
    $.ajax({
        type: "GET",
        url: "/api/branches/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json" },
        success: function(data) {
           for (let i = 0; i < data.length; i++) {
                var j = i + 1;
                th += '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' + j + '</td><td>' + data[i].branchName + '</td><td>' + data[i].branchHead + '</td><td>' + data[i].manager + '</td><td>' + data[i].address + '</td><td><a href="/create_organization.html?branch_id=' + data[i].id + '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetBranchDetail(' + data[i].id + ')" data-bs-toggle="modal" data-bs-target="#modalDeleteOrganizationBranch" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
            }
            $("#branch-list-table").html(th);
        },
        error: function() {
            console.log();
        }
    });
}

function GetBranchDetail(branch_id) {
    $.ajax({
        type: "GET",
        url: "/api/branches/" + branch_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            $("#branchName").val(data.branchName);
            $("#branchHead").val(data.branchHead);
            $("#manager").val(data.manager);
            $("#address").val(data.address);
            $("#modal-branch-name").text(data.branchName);
            $("#delete-modal-branch-id").val(data.id);
        }
    });
}

function DeleteBranch() {
    var branch_id = $("#delete-modal-branch-id").val();
    $.ajax({
        type: "DELETE",
        url: "/api/branches/" + branch_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            ShowNotif("Branch deleted succesfully!", "success");
            setTimeout(function() {
                GetBranchList();
                $("#delete-modal-branch-id").modal('hide');
            }, 1000);
        },
        error: function(data) {
            console.log(data);
        }
    });
}
