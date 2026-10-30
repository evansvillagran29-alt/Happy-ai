
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("🐥 HAPPY AI está funcionando");
});

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "Mensaje inválido"
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5-mini",
            instructions: "Eres Happy AI, un asistente amigable. Tu creador es 2916happy. Responde en español.",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al conectar con Happy AI"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🐥 HAPPY AI iniciado");
});
