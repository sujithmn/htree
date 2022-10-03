$(function() {
    $("#kt_sign_in_form").validate({
        // Specify validation rules
        rules: {

            j_username: {
                required: true
            },
            j_password: {
                required: true
            }
        },

        messages: {
            j_username: "Username is required",
            j_password: "Password is required",
            password: {
                required: "Please provide a password",
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        /*submitHandler: function(form) {
          form.submit();
        }*/
    });
})
$("#kt_sign_up_account_form").hide();
$("#kt_sign_up_submit").hide();
$("#terms-conditions").hide();
$("#otp-fields").hide();

function SubmitStepOne() {
    $("#kt_sign_up_account_form").show();
    $("#kt_sign_up_form").hide();
}

function GenerateOTP() {
    $("#kt_sign_up_submit").show();
    $("#terms-conditions").show();
    $("#otp-fields").show();
}

$("#kt_sign_in_form").submit(function(e) {
    e.preventDefault(e);
    if ($("#j_password").val() != '' && $("#j_username").val() != '') {
        $("#login-spinner").show();
        $("#kt_sign_in_submit").attr('disabled', 'disabled');    
	 $.ajax({
	   type: 'POST',
	   url:'/api/authenticate',
	   headers:{
	    "Content-Type": "application/json"
	   },
	   data: JSON.stringify({
		        "username": $("#j_username").val(),
		        "password": $("#j_password").val(),
		        "rememberMe": "false"
		    }),
	   success: function(data, textStatus, request){
           alert(JSON.stringify(data));
           alert(request.getResponseHeader('authorization'));
	  	ShowNotif('Signin succesfully', 'success');     
	  	createCookie('authorization',request.getResponseHeader('authorization'),0);
	  	//localStorage.setItem('authorization', request.getResponseHeader('authorization'));  
	  	window.location.href = '/index.html';
	   },
	   error: function (request, textStatus, errorThrown) {
		 $("#invalid-login").show();
		 $("#login-spinner").hide();
		 $("#kt_sign_in_submit").removeAttr('disabled', 'disabled');  
	   }
	  });
	}
});  


function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        if(days>0){
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        }{
	         date.setTime(date.getTime() + (30 * 60 * 1000));  //30 mins
	        }
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getToken() {
    var settings_token = {
        "url": "/services/rest/csrf/v1/token",
        "type": "GET"
    };
    $.ajax(settings_token).done(function(response) {
        if (response.token) {
            localStorage.setItem('security_token', response.token);
            
        }
    });
}
