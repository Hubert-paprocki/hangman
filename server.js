const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const { SERVER_PORT, API_KEY } = process.env;

const GroqApi = new Groq({
  apiKey: API_KEY,
});

const generateWordHandler = async (req, res) => {
  try {
    const response = await GroqApi.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Generate real Polish Word, write it, no other text, at least 4 letters long",
        },
      ],
      model: "llama3-8b-8192",
    });

    const generatedWord = response?.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({ message: generatedWord });
  } catch (error) {
    console.error("Error generating word:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

app.post("/generate-word", generateWordHandler);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on PORT ${SERVER_PORT}`)
);
