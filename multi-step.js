 
const radioButtons = document.querySelectorAll('input[type="radio"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const submitbutton = document.getElementById('SubmitBtn')
const form = document.getElementById('wf-form-plan-builder');
const submitBtn = document.getElementById('SubmitBtn');

//Set up styling for radio buttons. If one radio button is selected, it should be set to is-active
// Add a change event listener to each radio button
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        //console.log('radio clicked');
        
        // Find the parent div with class 'form_multistep_selector'
        const parentDiv = radioButton.closest('.form_multistep_selector');
        //console.log(parentDiv);

        if (parentDiv) {
            // Get the data-name attribute of the selected radio button
            const selectedDataName = radioButton.getAttribute('data-name');
            
            // Add the 'is-active' class to the selected radio button's parent
            parentDiv.classList.add('is-active');

            // Remove the 'is-active' class from all other radio buttons' parents
            radioButtons.forEach(otherRadioButton => {
                if (otherRadioButton !== radioButton) {
                    const otherDataName = otherRadioButton.getAttribute('data-name');
                    if (otherDataName === selectedDataName) {
                        const otherParentDiv = otherRadioButton.closest('.form_multistep_selector');
                        if (otherParentDiv) {
                            otherParentDiv.classList.remove('is-active');
                        }
                    }
                }
            });
        }
    });
});



// Add a change event listener to each radio button
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
       // console.log('radio clicked');
        
        // Find the parent div with class 'form_multistep_pill'
        const parentDiv = radioButton.closest('.form_multistep_pill');
        //console.log(parentDiv);
        
        if (parentDiv) {
            // Add the 'is-active' class to the selected radio button's parent
            parentDiv.classList.add('is-active');

            // Remove the 'is-active' class from all other radio buttons' parents
            radioButtons.forEach(otherRadioButton => {
                if (otherRadioButton !== radioButton) {
                    const otherParentDiv = otherRadioButton.closest('.form_multistep_pill');
                    if (otherParentDiv) {
                        otherParentDiv.classList.remove('is-active');
                    }
                }
            });
        }
    });
});





//CHECKBOXES
// Add a click event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
       // console.log('checkbox clicked');

        // Find the parent div with class 'form_multistep_pill'
        const parentDiv = checkbox.closest('.form_multistep_pill');
       // console.log(parentDiv);

        if (parentDiv) {
            // Toggle the 'is-active' class on the selected checkbox's parent
            parentDiv.classList.toggle('is-active');
        }
    });
});

// // Add a click event listener to each checkbox
// checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('click', () => {
//         // Find the parent div with class 'form_multistep_selector'
//         const parentDiv = checkbox.closest('.form_multistep_selector');
        
//         if (parentDiv) {
//             // Toggle the 'is-active' class on the selected checkbox's parent
//             parentDiv.classList.toggle('is-active');

//             // Extract the 'wized' attribute value
//             const wizedValue = parentDiv.getAttribute('wized');

//             // Find all other checkboxes with the same class
//             const indianCheckBoxes = document.querySelectorAll('.is-cuisine-indian');
//             const contiCheckBoxes = document.querySelectorAll('.is-cuisine-conti');

//             const isSaladChecked = document.querySelector('.is-cuisine-salad.is-active');
//             const isContiChecked = document.querySelector('.is-cuisine-conti.is-active');
//             // Use a switch statement based on the 'wized' value
//             switch (wizedValue) {
//                 case 'input_cuisine_conti':
                
//                 //console.log('salad-check',isSaladChecked)

//                 if(!isSaladChecked){
//                     indianCheckBoxes.forEach(indianCheckBox => {
//                         indianCheckBox.classList.toggle('is-included');
//                         const includedBars = indianCheckBox.querySelectorAll('.multistep_selector-includedbar');
//                        // console.log(includedBars)
//                         includedBars.forEach(bar => {
//                             bar.classList.toggle('hide');
//                         });
//                     });
//                 } 

//                     break;





//                 case 'input_cuisine_salad':
                    
//                     if(!isContiChecked) {
//                         indianCheckBoxes.forEach(indianCheckBox => {
//                             indianCheckBox.classList.toggle('is-included');
//                             const includedBars = indianCheckBox.querySelectorAll('.multistep_selector-includedbar');
//                             //console.log(includedBars)
//                             includedBars.forEach(bar => {
//                                 bar.classList.toggle('hide');
//                             });
//                         });
//                         contiCheckBoxes.forEach(contiCheckBox => {
//                             contiCheckBox.classList.toggle('is-included');
//                             const includedBars = contiCheckBox.querySelectorAll('.multistep_selector-includedbar');
//                             //console.log(includedBars)
//                             includedBars.forEach(bar => {
//                                 bar.classList.toggle('hide');
//                             });
//                         });

//                     } else if(isSaladChecked) {
                        
//                         contiCheckBoxes.forEach(contiCheckBox => {
//                             contiCheckBox.classList.add('is-included');
//                             const includedBars = contiCheckBox.querySelectorAll('.multistep_selector-includedbar');
//                             //console.log(includedBars)
//                             includedBars.forEach(bar => {
//                                 bar.classList.toggle('hide');
//                             });
                            
                            
//                         });
//                     } else {
//                         contiCheckBoxes.forEach(contiCheckBox => {
//                             contiCheckBox.classList.remove('is-included');
//                             const includedBars = contiCheckBox.querySelectorAll('.multistep_selector-includedbar');
//                            // console.log(includedBars)
//                             includedBars.forEach(bar => {
//                                 bar.classList.toggle('hide');
//                             });
                            
                            
//                         });
//                     }
                    
//                     break;
//                 // Add more cases as needed
//             }
//         }
//     });
// });


 




//DISABLE button if checkboxes aren't checked 
  function setupCheckboxLogic(containerId, minCheckCount, buttonSelector) {
    var container = document.getElementById(containerId);
    var checkboxes = container.querySelectorAll('input[type="checkbox"]');
    var button = document.querySelector(buttonSelector); // Get the button
    //console.log('container', checkboxes)
   


        // Function to update button state based on checkbox count
        function updateButtonState() {
            var checkedCount = container.querySelectorAll('input[type="checkbox"]:checked').length;
           // console.log('checkedCount',containerId+checkedCount)

                    if (checkedCount < minCheckCount) {
                        button.style.pointerEvents = "none"; // Disable pointer events
                        button.style.opacity = 0.5; // Set opacity to 0.5
                        button.disabled = true; // Disable the button
                    } else {
                        button.style.pointerEvents = "auto"; // Enable pointer events
                        button.style.opacity = 1; // Set opacity to 1 (normal)
                        button.disabled = false; // Enable the button
                    }
                }
        // Add initial check to set the button state
        updateButtonState(); 
        
        // Add change event listeners to checkboxes
        checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          // Update button state on checkbox change
          updateButtonState();
        });
      });
    }


      




    // Function to check if all required inputs are filled
const inputIdsToCheck = ['First-name', 'Last-name-2', 'Street-address-2', 'City-2', 'Pincode', 'Province-2', 'phone-2'];

// Function to dynamically add 'Password-3' if certain conditions are met
function updateInputIdsToCheck() {
    const registerPassContainer = document.querySelector('[wized="register_pass_container"]');
    if (registerPassContainer && registerPassContainer.style.display === 'block') {
        // Check if 'Password-3' is not already in the array to avoid duplicates
        if (!inputIdsToCheck.includes('Password-3')) {
            inputIdsToCheck.push('Password-3');
        }
    }
}

function checkInputs() {
    updateInputIdsToCheck(); // Call the function to update input IDs if needed

    for (const inputId of inputIdsToCheck) {
        const input = document.getElementById(inputId);

        // Check if the input is in a visible div
        if (isInputVisible(inputId) && !input.value.trim()) {
            return false;
        }
    }
    return true;
}

// Function to check if an input is in a visible div
function isInputVisible(inputId) {
    // Existing implementation to check the visibility of the input's div
    const div = document.getElementById(inputId);
    // Check if the div is visible (you can adjust this condition based on your implementation)
    return div && div.style.display !== 'none';
}

// Add an input event listener to the form
form.addEventListener('input', function () {
    if (checkInputs()) {
        // Enable submit button
        submitBtn.classList.remove('disabled');
        submitBtn.style.pointerEvents = 'auto';
        submitBtn.style.opacity = '1';
    } else {
        // Disable submit button
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.opacity = '0.4';
    }
});



// Hide Indian if veg is selected
function addHideClassToIndianDiv() {
  console.log('testing')
  // Get the radio group elements
  const radioGroup = document.querySelectorAll('input[type="radio"][wized="radio_nv"]');
  console.log(radioGroup);
  
  // Get the div with class 'is-cuisine-indian'
  const indianDiv = document.querySelector(".is-cuisine-indian");

  // Define the plan cards
  const planBasic = document.querySelector(".is-basic");
  const planStd = document.querySelector(".tiffin_explainer_container.is-conti");

  // Add change event listener to the radio group
  radioGroup.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      console.log('n/nv changed');
      // Check if the 'vegetarian' option is selected
      if (radioButton.value === "Non-vegetarian") {
        // Add the 'hide' class to the 'is-cuisine-indian' div
        indianDiv.classList.add("hide");
        planBasic.classList.add('hide');
        planStd.style.display = 'flex'; // Show planStd
      } else {
        // Remove the 'hide' class and hide planStd if any other option is selected
        indianDiv.classList.remove("hide");
        planBasic.classList.remove('hide');
        planStd.style.display = 'none'; // Hide planStd
      }
    });
  });
}

// Call the function to set up the behavior
addHideClassToIndianDiv();


    //Create a event listener for the submit button and on click change the text
       
    const submitButton = document.getElementById('SubmitBtn');
    console.log(submitButton)
    const buttonText = "Creating your Tiffin";
    let animationInterval;
    
    function startAnimation() {
      let dots = 0;
      animationInterval = setInterval(() => {
        dots = (dots % 4) + 1; // Cycle through 1, 2, 3, 4 (for 3 dots)
        const dotsString = ".".repeat(dots);
        submitButton.textContent = `${buttonText}${dotsString}`;
      }, 500); // Change the dot every 500ms (half a second)
    }
    
    function stopAnimation() {
      clearInterval(animationInterval);
    }
    
    submitButton.addEventListener("click", () => {
        console.log('submit clicked')
        submitButton.classList.add('is-processing');
        submitButton.setAttribute("disabled", true); // Disable the button to prevent multiple clicks
      startAnimation();
      // Simulate an asynchronous task, for example, an API call
      setTimeout(() => {
        // After the task is complete, stop the animation and re-enable the button
        stopAnimation();
        submitButton.removeAttribute("disabled");
      }, 3000); // Simulate a 3-second task duration (adjust as needed)
    });
    

  document.addEventListener('DOMContentLoaded', function() {
  //  setupCheckboxLogic('cuisine-div', 1, '.is-createcart'); // Set the minimum check count as needed for day-1
    setupCheckboxLogic('days-div', 4, '.is-createcart'); // Set the minimum check count as needed for day-2
  });








