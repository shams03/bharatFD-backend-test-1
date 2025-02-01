import { config } from "dotenv";
import { FAQ } from "../models/faqModel.js";
import { TranslationServiceClient } from "@google-cloud/translate";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import {
  currentlySupportedLanguages,
  defaultLang,
} from "../config/currentlySupportedLanguages";
import { redis } from "../config/cache.js";

config();
const client = new TranslationServiceClient({
  credentials: {
    private_key: process.env.GOOGLE_PVT_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});

const translate = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  key: process.env.GOOGLE_API_KEY,
});

async function detectLanguage(text) {
  const [detection] = await client.detectLanguage({
    content: text,
  });
  // Extract the detected language code
  const languageCode = detection.language;
  console.log(`New language detected : ${languageCode}`);
  return languageCode;
}

export const getFAQ = async (req, res) => {
  try {
    const { lang } = req.query || defaultLang;

    const cacheHit = await redis.get(lang);
    if (cacheHit) {
      console.log("Cache hit", cacheHit);
      return res.status(200).json({ cacheHit });
    }
    console.log("Cache miss ");
    //fetching from database
    const faqs = await FAQ.find();
    const translatedFAQ = faqs.map((faq) => faq.getTranslatedText(lang));

    await redis.set(lang, translatedFAQ, "EX", process.env.CACHE_TTL);
    res.status(200).json({ translatedFAQ });
  } catch (error) {
    console.log("Error occured , METHOD : GET , ROUTE : /api/faq ", error);
    res.status(500).json({ msg: " Error occured while fetching FAQ " });
  }
};

export const createFAQ = async (req, res) => {
  try {
    let { question, answer } = req.body;
    const questionLang = await detectLanguage(question);
    const answerLang = await detectLanguage(answer);

    if (questionLang != defaultLang) {
      question = await translate.translate(question, defaultLang);
    }
    if (answerLang != defaultLang) {
      answer = await translate.translate(answer, defaultLang);
    }
    //now we are sure that the language is english

    const questionTranslationsMap = new Map();
    const answerTranslationsMap = new Map();

    questionTranslationsMap.set(defaultLang, question);
    answerTranslationsMap.set(defaultLang, answer);

    const promisesQues = [];
    const promisesAns = [];
    for (let lang of currentlySupportedLanguages) {
      promisesQues.push(translate.translate(question, lang));
      promisesAns.push(translate.translate(answer, lang));
    }

    //for simultaneous processing
    const resultQues = await Promise.all(promisesQues);
    const resultAns = await Promise.all(promisesAns);

    for (let index in currentlySupportedLanguages) {
      questionTranslationsMap.set(
        currentlySupportedLanguages[index],
        resultQues[index]
      );
      answerTranslationsMap.set(
        currentlySupportedLanguages[index],
        resultAns[index]
      );
    }

    const newFAQ = new FAQ({
      question: questionTranslationsMap,
      answer: answerTranslationsMap,
    });

    await newFAQ.save();
    console.log(" new FAQ saved ", newFAQ);
    res.status(201).json(newFAQ);
  } catch (error) {
    console.log("Error occured , METHOD : POST , ROUTE : /api/faq ", error);
    res.status(501).json({ msg: " Error occured while creating a new FAQ " });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheHit = await redis.get(id);
    if (cacheHit) {
      console.log("Cache hit", cacheHit);
      return res.status(200).json({ cacheHit });
    }
    console.log("Cache Miss");
    const faqById = await FAQ.findOne({ _id: id });

    await redis.set(id, faqById, "EX", process.env.CACHE_TTL); // as lang and id are both entirely diff , we can use them both as keys
    res.status(200).json({ faqById });
  } catch (error) {
    console.log("Error occured");
    res.status(500).json({ error });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const cacheHit = await redis.get(id);
    if (cacheHit) {
      const result = await redis.del(id);
      if (result === 1) {
        console.log("Cache cleared from stale value");
      } else {
        console.log("Unable to clear cache , proceeding to override value");
      }
    }
    //assuming that the updated question and answer is in english
    const questionTranslationsMap = new Map();
    const answerTranslationsMap = new Map();

    questionTranslationsMap.set(defaultLang, question);
    answerTranslationsMap.set(defaultLang, answer);

    const promisesQues = [];
    const promisesAns = [];
    for (let lang of currentlySupportedLanguages) {
      promisesQues.push(translate.translate(question, lang));
      promisesAns.push(translate.translate(answer, lang));
    }

    //for simultaneous processing
    const resultQues = await Promise.all(promisesQues);
    const resultAns = await Promise.all(promisesAns);

    for (let index in currentlySupportedLanguages) {
      questionTranslationsMap.set(
        currentlySupportedLanguages[index],
        resultQues[index]
      );
      answerTranslationsMap.set(
        currentlySupportedLanguages[index],
        resultAns[index]
      );
    }

    const updatedVal = await FAQ.updateOne(
      { _id: id },
      {
        $set: {
          question: questionTranslationsMap,
          answer: answerTranslationsMap,
        },
      },
      { new: true }
    );
    res.status(200).json({ updatedVal });
  } catch (error) {
    console.log("Error occured");
    res.status(500).json({ error });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    await redis.del(id); //both 1 and 0 would result in deletion of given faq

    const deletedValue = await FAQ.findOneAndDelete({ _id: id });
    res.status(204).json({ msg: "Deleted the FAQ", deletedValue });
  } catch (error) {
    console.log("Error occured");
    res.status(500).json({ error });
  }
};
