import https from 'https';

export const handler = async (event) => {
    console.log('Event Body:', event);

    try {
        // Access the properties from event.body
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

        // Define the URL
        const createCustomerURL = 'https://yogiskitchen.ca/v1/signup';

        // Set up headers for form data
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        };

        const options = {
            method: 'POST',
            headers: headers,
        };

        // Make a POST request with form data in the request body
        const customerResponse = await new Promise((resolve, reject) => {
            const req = https.request(createCustomerURL, options, (res) => {
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
            body: customerResponse,
        };

        return lambdaResponse;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error in Lambda function:', error);

        // Create an error response
        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return errorResponse;
    }
};
