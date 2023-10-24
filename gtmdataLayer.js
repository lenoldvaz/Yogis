

(() => {
  // Check if the page path is /thank-you
  const isThankYouPage = window.location.pathname === '/thank-you';

  // automatically track all anchor click events:
  // also track all elements that have this class
  const trackClassName = "ga-event";
  // page context class detection (change if needed):
  const topNavLinkClass = "nav-link";
  const footerLinkClass = "footer-link";
  const buttonClass = "w-button";

  let items; // Declare items variable outside of functions

  const trackClickEvent = function () {
    const eventCategory = this.getAttribute("data-event-category") || (this.classList.contains(topNavLinkClass) ? "topnav" : this.classList.contains(footerLinkClass) ? "footer" : "");

    const transaction_id = this.getAttribute("gtm-transaction_id")
    const eventLabel = this.getAttribute("data-event-label");
    const eventValue = this.getAttribute("data-event-value");
    const itemsAttribute = this.getAttribute('dataLayer-items');

    // Remove the single quotes around the JSON data
    const cleanedItemsAttribute = itemsAttribute.replace(/'/g, '');

    try {
      items = JSON.parse(cleanedItemsAttribute); // Parse the JSON data
    } catch (e) {
      console.error('Error parsing JSON:', e);
      items = null; // Handle the case where parsing fails
    }

    const eventData = {
      'event_category': eventCategory,
      'event_label': eventLabel,
      'value': eventValue
    };

    // Conditionally add transaction_id to eventData
    if (transaction_id) {
      eventData.transaction_id = transaction_id;
    }

    dataLayer.push({
      'event': eventLabel,
      'items': items,
      'eventData': eventData
    });
  };

  // Find all anchor tags
  let elementsToTrack = document.getElementsByTagName("a");
  if (trackClassName) {
    elementsToTrack = [...new Set([...elementsToTrack, ...document.getElementsByClassName(trackClassName)])];
  }

  // Add an event listener to each of the elements you found
  elementsToTrack.forEach((el) => {
    el.addEventListener('click', trackClickEvent);
  });

  // Additional push to dataLayer only on the "thank-you" page
  if (isThankYouPage) {
    dataLayer.push({
      'event': 'ThankYouPageEvent',
      'items': items
    });
  }
})();
