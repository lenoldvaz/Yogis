import https from 'https';

export const handler = async (event) => {
    try {
        // Extract the 'session_id' parameter from the query string
        const sessionId = event.queryStringParameters && event.queryStringParameters.session_id;

        // Stripe API URL
        const stripeApiUrl = `https://api.stripe.com/v1/checkout/sessions/${sessionId}`;

        // Stripe API secret key
        const stripeApiKey = 'sk_test_51NvmOzADPIgHJcA2uc4jML7AeHI3q0IA8uXUey1gViGYiNZU3Hee3oqjty5pxJFtVCUslDMg2rQvqAl98poEt2PU001Rkw0xtb';

        // Set up headers with the authorization token
        const headers = {
            'Authorization': `Bearer ${stripeApiKey}`
        };

        // Define the HTTP GET request options
        const options = {
            method: 'GET',
            headers: headers,
        };

        // Make the GET request to the Stripe API
        const response = await new Promise((resolve, reject) => {
            const req = https.request(stripeApiUrl, options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });

        // Parse the JSON response from Stripe API
        const responseData = JSON.parse(response);

        // Check if the customer is known
        let customerStatus = '';

        if (responseData.metadata && responseData.metadata.known_customer === 'true') {
            customerStatus = 'Customer is known';
        } else {
            customerStatus = 'Customer unknown';
        }

        // Access the properties from event.body (checkout details)
        const {
            fName,
            lName,
            mobile,
            email,
            completeAddress,
            postal_code,
            password,
            c_password,
        } = event.metadata;

        // Define the form data as a string
        const formData = `firstName=${encodeURIComponent(fName)}&lastName=${encodeURIComponent(lName)}&mobile=${encodeURIComponent(mobile)}&email=${encodeURIComponent(email)}&completeAddress=${encodeURIComponent(completeAddress)}&pinCode=${encodeURIComponent(postal_code)}&password=${encodeURIComponent(password)}&c_password=${encodeURIComponent(c_password)}`;

        // Define the URL for creating a customer on your server
        const createCustomerURL = 'https://yogiskitchen.ca/v1/signup';

        // Set up headers for form data
        const createCustomerHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        };

        const createCustomerOptions = {
            method: 'POST',
            headers: createCustomerHeaders,
        };

        // Make a POST request with form data in the request body to create a customer
        const customerResponse = await new Promise((resolve, reject) => {
            const req = https.request(createCustomerURL, createCustomerOptions, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(formData); // Write the form data to the request body
            req.end();
        });

        // Create the Lambda response object
        const lambdaResponse = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Order created successfully', customerStatus }),
        };

        return lambdaResponse;
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error in Lambda function:', error);

        // Create an error response
        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return errorResponse;
    }
};
