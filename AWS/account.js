



const password_field = document.querySelector('#password')
const cPassword_field = document.querySelector('#password-confirm')



//Set up the show password icon based on attributes
  document.querySelectorAll("[ms-code-password='transform']").forEach(function(button) {
    button.addEventListener("click", transform);
  });

  var isPassword = true;

  function transform() {
    var passwordInputs = document.querySelectorAll("[data-ms-member='password'], [data-ms-member='confirm-password'], [data-ms-member='current-password']");

    passwordInputs.forEach(function(myInput) {
      var inputType = myInput.getAttribute("type");

      if (isPassword) {
        myInput.setAttribute("type", "text");
      } else {
        myInput.setAttribute("type", "password");
      }
    });

    isPassword = !isPassword;
  }





// check if password fields match on user input
// for both the password & repeat-password fields
// call the debounce function to run the input function after 500 milliseconds
$('#password, #password-confirm').on('input', debounce(() => {
    console.log('match')
  // if the value on the password field
  // equals the value of the repeat-password field
  if($('#password').val() === $('#password-confirm').val()){
    // click the .success field to initiate webflow interaction
    // that shows a successful match
    
    $('.hack34-password-match').click();
  }
  else{ // if the values don't match
    // click the .fail field to initiate webflow interaction
    // that shows a failed match
    console.log('nomatch')
    cPassword_field.classList.add('is-nomatch')
    $('.hack34-password-no-match').click();
  }
}, 500));


// on submit button click
$('.is-accountregister').click(()=>{
  // if the passwords match
  if($('#password').val() === $('#password-confirm').val()){
    // submit form
    return true;
  }
  else{ // if the passwords don't match
    // prevent form submit
    return false;
  }
});

// debounce function
// the function calls a provided callback function that then runs after a set time period
// the reason we use it here is to ensure the validate code runs after every 500 millisec
// compared to running on every character the user enters as it would have without the debounce func
function debounce(callback, wait) {
  let timeout;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}
// This redirects you back to the same page after signup
// This is specific to our Hacks setup. You should remove it
localStorage.setItem('locat', location.href);
