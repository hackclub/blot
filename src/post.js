export async function post(address, body) {
    try {
        const response = await fetch(address, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Check if the response was ok (status in the range 200-299)
        if (!response.ok) {
            // If not ok, throw an error with the status
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        return [jsonResponse, null]; // First element is the response, second element (error) is null
    } catch (error) {
        // console.error('Error during fetch:', error);
        return [null, error]; // First element (response) is null, second element is the error
    }
}