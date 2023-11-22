
const getImageUrl = async (promptText) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const data = {
            model: 'dall-e-3',
            prompt: promptText,
            n: 1,
            size: "1024x1024"
        };

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Hatası', errorData);
            return null;
        }

        const responseData = await response.json();
        console.log(responseData);
        console.log("KEY::::", apiKey);
        return responseData.data[0].url;

    } catch (error) {
        console.error('Sunucu Hatası', error);
        return null;
    }
};

export { getImageUrl };
