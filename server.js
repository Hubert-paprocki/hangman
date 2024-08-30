const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");
const crypto = require("crypto");
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
            "Generate real Polish Word, write it, no other text, at least 5 letters long",
        },
      ],
      model: "llama3-8b-8192",
    });

    const generatedWord = response?.choices?.[0]?.message?.content?.trim();

    if (typeof generatedWord !== "string") {
      console.error("Generated word is not a string:", generatedWord);
      return res.status(500).json({ error: "Invalid word format" });
    }

    console.log("Generated Word:", generatedWord);

    const wordWithVisibility = addBlanks(generatedWord);

    return res.status(200).json({ message: wordWithVisibility });
  } catch (error) {
    console.error("Error generating word:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBlanks = (word) => {
  const wordArray = word.split("").map((letter) => ({
    letter,
    isVisible: true,
    id: crypto.randomBytes(16).toString("hex"),
  }));

  const minBlanks = Math.ceil(word.length / 2);
  const maxBlanks = word.length - 2;
  const numBlanks = Math.max(
    minBlanks,
    Math.floor(Math.random() * maxBlanks) + 1
  );

  const randomIndices = new Set();

  while (randomIndices.size < numBlanks) {
    const randomIndex = Math.floor(Math.random() * word.length);
    randomIndices.add(randomIndex);
  }

  randomIndices.forEach((index) => {
    wordArray[index].isVisible = false;
  });

  return wordArray;
};

app.post("/generate-word", generateWordHandler);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on PORT ${SERVER_PORT}`)
);
