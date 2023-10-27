

// (() => {
//   // Check if the page path is /thank-you
//   const isThankYouPage = window.location.pathname === '/thank-you';

//   // automatically track all anchor click events:
//   // also track all elements that have this class
//   const trackClassName = "ga-event";
//   // page context class detection (change if needed):
//   const topNavLinkClass = "nav-link";
//   const footerLinkClass = "footer-link";
//   const buttonClass = "w-button";

//   let items; // Declare items variable outside of functions

//   const trackClickEvent = function () {
//     const eventCategory = this.getAttribute("data-event-category") || (this.classList.contains(topNavLinkClass) ? "topnav" : this.classList.contains(footerLinkClass) ? "footer" : "");

//     const transaction_id = this.getAttribute("gtm-transaction_id")
//     const eventLabel = this.getAttribute("data-event-label");
//     const eventValue = this.getAttribute("data-event-value");
//     const itemsAttribute = this.getAttribute('dataLayer-items');

//     // Remove the single quotes around the JSON data
//     const cleanedItemsAttribute = itemsAttribute.replace(/'/g, '');

//     try {
//       items = JSON.parse(cleanedItemsAttribute); // Parse the JSON data
//     } catch (e) {
//       console.error('Error parsing JSON:', e);
//       items = null; // Handle the case where parsing fails
//     }

//     const eventData = {
//       'event_category': eventCategory,
//       'event_label': eventLabel,
//       'value': eventValue
//     };

//     // Conditionally add transaction_id to eventData
//     if (transaction_id) {
//       eventData.transaction_id = transaction_id;
//     }

//     dataLayer.push({
//       'event': eventLabel,
//       'items': items,
//       'eventData': eventData
//     });
//   };

//   // Find all anchor tags
//   let elementsToTrack = document.getElementsByTagName("a");
//   if (trackClassName) {
//     elementsToTrack = [...new Set([...elementsToTrack, ...document.getElementsByClassName(trackClassName)])];
//   }

//   // Add an event listener to each of the elements you found
//   elementsToTrack.forEach((el) => {
//     el.addEventListener('click', trackClickEvent);
//   });

//   // Additional push to dataLayer only on the "thank-you" page
//   if (isThankYouPage) {
//     dataLayer.push({
//       'event': 'ThankYouPageEvent',
//       'items': items
//     });
//   }
// })();


// Function to capture form data and push it to the dataLayer
function captureFormData(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Select all input elements on the page
    const inputElements = document.querySelectorAll('input');
  
    // Create an object to store form data
    const formData = {};
  
    // Loop through the input elements and capture their values
    inputElements.forEach((input) => {
      const { name, type, value, checked } = input;
  
      if (type === 'checkbox' || type === 'radio') {
        // Handle checkboxes and radio buttons
        if (checked) {
          formData[name] = value;
        }
      } else {
        // Handle other input types
        formData[name] = value;
      }
    });
  
    // Push the form data to the dataLayer
    dataLayer.push({
      event: 'formSubmit', // Change this to an appropriate event name
      formData: formData
    });
  }
  
  // Find all buttons with data-form="next-btn" attribute and add click event listeners to each
  const nextButtons = document.querySelectorAll('[data-form="next-btn"], [wized="checkout_btn"]');
  nextButtons.forEach((button) => {
    button.addEventListener('click', captureFormData);
  });
  
