window.onload = async () => {
    // Function to get a URL parameter by name
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  
    // Get UTM parameters from the URL
    const utmSource = getParameterByName('utm_source');
    const utmMedium = getParameterByName('utm_medium');
    const utmCampaign = getParameterByName('utm_campaign');
    const utmContent = getParameterByName('utm_content');
  
    // Set the UTM parameters using Wized.data.setCookie if they exist
    if (utmSource) {
      await Wized.data.setCookie('utm_source', utmSource);
    } else {
      console.log('utm_source not found in URL');
    }
  
    if (utmMedium) {
      await Wized.data.setCookie('utm_medium', utmMedium);
    } else {
      console.log('utm_medium not found in URL');
    }
  
    if (utmCampaign) {
      await Wized.data.setCookie('utm_campaign', utmCampaign);
    } else {
      console.log('utm_campaign not found in URL');
    }
  
    if (utmContent) {
      await Wized.data.setCookie('utm_content', utmContent);
    } else {
      console.log('utm_content not found in URL');
    }
  
    // Retrieve and log the values
    const sourceValue = await Wized.data.get('c.utm_source');
    const mediumValue = await Wized.data.get('c.utm_medium');
    const campaignValue = await Wized.data.get('c.utm_campaign');
    const contentValue = await Wized.data.get('c.utm_content');
  
    console.log('Value of c.utm_source:', sourceValue);
    console.log('Value of c.utm_medium:', mediumValue);
    console.log('Value of c.utm_campaign:', campaignValue);
    console.log('Value of c.utm_content:', contentValue);
  };
  