import https from 'https';

export const handler = async (event) => {
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

    try {
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

        // Create the Lambda response object
        const lambdaResponse = {
            statusCode: 200,
            body: customerStatus,
        };

        return lambdaResponse;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error making HTTPS request:', error);

        // Create an error response
        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return errorResponse;
    }
};
