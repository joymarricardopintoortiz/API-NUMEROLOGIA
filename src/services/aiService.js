const axios = require("axios");
async function generarLectura(prompt) {

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: process.env.OPENROUTER_MODEL,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },

            {

                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }

            }

        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    generarLectura
};