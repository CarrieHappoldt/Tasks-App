
// JS FOR TASKLIST PAGE

$( ".editTaskModal" ).click(function() {
  let taskID = $(this).attr("value");
  let taskName = $(this).attr("name");
 
  $("#newTaskName").attr("value", taskName);
  $("#hiddenModalInput").attr("value", taskID);
 
});

//to get modal to work  
$('.modal').modal({
  ready: function() {
    Materialize.updateTextFields();
  }
});

//TO HIDE COMPLETED TASKS
$(".hideBtn").click( () => {
  $(".hideBtn").addClass("isHidden");
  $(".checkbox").each( function() {
    if( $(this).prop("checked") ){
      let taskID = $(this).attr("id")
      let idStr = "listID" + taskID
      
      $(`#${idStr}`).hide();
      $(".showBtn").show();
      $(".hideBtn").hide();
    }
  })
})

$(".showBtn").hide();


//TO SHOW ALL TASKS
$(".showBtn").click( () => {
  $(".hideBtn").removeClass("isHidden");
  $(".checkbox").each( function() {
    if( $(this).prop("checked") ){
      let taskID = $(this).attr("id")
      let idStr = "listID" + taskID
      
      $(`#${idStr}`).show();
      $(".showBtn").hide();
      $(".hideBtn").show();
    }
  })
})

//TO HIDE COMPLETED ITEMS IF HIDE IS ALREADY ON
$(".checkbox").click( function() {
  if( $(".hideBtn").hasClass("isHidden") ){
    if( $(this).prop("checked") ){
      let taskID = $(this).attr("id")
      let idStr = "listID" + taskID
      $(`#${idStr}`).hide();
    } 
  }
   
})

//Checking Password matching
$("#passwordComformation").blur(function() {
  let password = $("#password").val();
  let passwordComformation = $("#passwordComformation").val();
  if( password !== passwordComformation){
    $("#passwordComformation").addClass("invalid");
    alert("Your passwords do not match")
  }
  else if(password === passwordComformation){
    $("#passwordComformation").removeClass("invalid");
    $("#passwordComformation").addClass("valid");
  }
})

//HIDING LOGOUT BTN WHEN ON REGISTRATION PAGE OR LOGIN PAGE
$(document).ready(function() {
    if(window.location.href.indexOf("registration") > -1 || window.location.href.indexOf("login") > -1 || window.location.href.indexOf("welcome") > -1 ){
        $('.logOutBtn').hide();
    }
});


//PROFILE PAGE
$("#saveBtnProfile").hide();

$("#editBtnProfile").click(function(){
  $("#profileUserName").prop("disabled", false);
  $("#profileEmail").prop("disabled", false);

  $("#editBtnProfile").hide();
  $("#saveBtnProfile").show();
})

$("#saveBtnProfile").click(function(){
  $("#profileUserName").prop("disabled", true);
  $("#profileEmail").prop("disabled", true);

  $("#editBtnProfile").show();
  $("#saveBtnProfile").hide();
})

$( "#saveBtnProfile" ).click(function() {
  let newUsername = $("#profileUserName").val()
  let newEmail = $("#profileEmail").val()

  $("#hiddenEditProfileName").attr("value", newUsername);
  $("#hiddenEditProfileEmail").attr("value", newEmail);
});

