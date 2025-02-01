import mongoose, { Schema } from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
  answer: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
});

faqSchema.methods.getTranslatedText = function (language) {
  const defaultLang = "en";
  return {
    question: this.question.get(language) || this.question.get(defaultLang),
    answer: this.answer.get(language) || this.answer.get(defaultLang),
  };
};

export const FAQ = new mongoose.model("FAQ", faqSchema);
