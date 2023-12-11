const sendImageData = async (convertedImageUri) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const apiUrl = "https://api.openai.com/v1/images/variations";
        const formData = new FormData();
        formData.append('image', {
            uri: convertedImageUri,
            name: 'converted.png',
            type: 'image/png',
        });
        formData.append('n', '1');
        formData.append('size', '1024x1024');
        formData.append('model', 'dall-e-2');
        const headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
        };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
        });
        if (response.ok) {
            const result = await response.json();
            console.log('API Response:', result.data[0].url);
            return result.data[0].url;
        } else {
            console.error(`Error: ${response.status}, ${await response.text()}`);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
};

export default sendImageData;