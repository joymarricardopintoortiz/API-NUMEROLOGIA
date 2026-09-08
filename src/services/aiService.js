const axios = require("axios");

async function generarLectura(prompt, intentos = 3) {
    for (let intento = 1; intento <= intentos; intento++) {
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
                    ],
                    provider: {
                        allow_fallbacks: true // si el proveedor principal falla, prueba con otro
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    timeout: 15000 // evita que la petición quede colgada indefinidamente
                }
            );

            return response.data.choices[0].message.content;

        } catch (error) {
            const status = error.response?.status;
            const esUltimoIntento = intento === intentos;

            console.error(
                `Intento ${intento}/${intentos} fallido:`,
                error.response?.data || error.message
            );

            // Si es 429 (saturado) y aún quedan intentos, espera y reintenta
            if (status === 429 && !esUltimoIntento) {
                const espera = intento * 1000; // 1s, 2s, 3s...
                await new Promise(resolve => setTimeout(resolve, espera));
                continue;
            }

            // Si es otro tipo de error, o ya se agotaron los intentos, lo relanza
            throw error;
        }
    }
}

module.exports = {
    generarLectura
};