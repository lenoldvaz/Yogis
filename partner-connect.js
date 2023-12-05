const partnerConnectBtn = document.getElementById('partnerConnectBtn');
const partnerConnectForm = document.getElementById('wf-form-Connect-form');

// Function to check if all required inputs are filled
const inputIdsToCheck = ['email', 'Company-Name', 'country'];

function checkInputs() {
    for (const inputId of inputIdsToCheck) {
        const input = document.getElementById(inputId);

        // Check if the input is in a visible div
        if (!isInputVisible(inputId)) {
            return false;
        }

        // Check if the input value is not empty
        if (!input.value.trim()) {
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
partnerConnectForm.addEventListener('input', function () {
    if (checkInputs()) {
        // Enable submit button
        partnerConnectBtn.classList.remove('disabled');
        partnerConnectBtn.style.pointerEvents = 'auto';
        partnerConnectBtn.style.opacity = '1';
    } else {
        // Disable submit button
        partnerConnectBtn.classList.add('disabled');
        partnerConnectBtn.style.pointerEvents = 'none';
        partnerConnectBtn.style.opacity = '0.4';
    }
});
