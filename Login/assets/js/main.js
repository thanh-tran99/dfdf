let $errEmail = $("#error-email");
let $errPass = $("#error-pass");
let $emailInput = $("#email-input");
let $passInput = $("#password-input");
let patternEmail = /^\S[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/;
let patternPass = /^\S[\w\s]+$/;

$(document).ready(function () {
  // validation email
  $("#email-input").keyup(function () {
    let emailVal = document.getElementById("email-input").value;

    if (emailVal.match(patternEmail)) {
      $errEmail.text("");
      $emailInput.removeClass("err-input");
    } else if (emailVal == "" || emailVal == null) {
      $errEmail.text("Require email is not filled");
      console.log($errEmail.text().length);
      $errEmail.css("color", "red");
      $emailInput.addClass("err-input");
    } else {
      $errEmail.css("color", "red");
      $errEmail.text("Email invalid");
      $emailInput.addClass("err-input");
    }
  });

  // validation pass
  $("#password-input").keyup(function () {
    let passVal = document.getElementById("password-input").value;

    if (passVal.match(patternPass) && passVal.length > 4) {
      $errPass.text("");
      $passInput.removeClass("err-input");
    } else if (passVal == "" || passVal == null) {
      $passInput.addClass("err-input");
      $errPass.text("Require password is not filled");
    } else {
      $errPass.text("Password invlid");
      $passInput.addClass("err-input");
      $errPass.css("color", "red");
    }
  });

  //  show pass
  $("#show-pass").click(function () {
    if ($passInput.attr("type") == "password") {
      $passInput.attr("type", "text");
      $("#show-pass").hide();
      $("#hide-pass").show();
    }
  });
  $("#hide-pass").click(function () {
    if ($passInput.attr("type") == "text") {
      $passInput.attr("type", "password");
      $("#hide-pass").hide();
      $("#show-pass").show();
    }
  });


  $("#btn-login").click(function (event) {
    event.preventDefault();
    if ($errEmail.text().length === 0 && $errPass.text().length === 0) {
      window.location.href = "/ticket-page/index.html";
    } else {
      alert("Login fail");
    }
  });
});
function activeBtnLogin() {
  if ($emailInput.val() == "" || $passInput.val() == "") {
    $("#btn-login").attr("disabled", true);
  } else {
    $("#btn-login").attr("disabled", false);
  }
}
