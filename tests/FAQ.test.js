import request from "supertest";
import { app } from "../index.js";
import mongoose from "mongoose";
import { FAQ } from "../models/faqModel";

describe("FAQ API", () => {
  let faqId;
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGO_URI);
    const faq = await FAQ.create({
      question: "First Question",
      answer: "First Answer",
    });
    faqId = faq._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("A new FAQ should be created", async () => {
    const response = await request(app).post("/api/faqs").send({
      question: "Second question?",
      answer: "Second answer",
    });

    expect(response.status).toBe(201);
    expect(response.body.question.en).toBe("Test question?");
  });

  it("Translated FAQS should be fetched", async () => {
    const response = await request(app).get("/api/faqs?lang=hi");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("Translated given FAQ should be fetched", async () => {
    const response = await request(app).get(`/api/faqs/:${faqId}`);
    expect(response.status).toBe(200);
  });

  it("Translated given FAQ should be deleted", async () => {
    const response = await request(app).delete(`/api/faqs/:${faqId}`);
    expect(response.status).toBe(200);
  });

  it("Translated given FAQ should be updated", async () => {
    const updatedData = { question: "Test Question", answer: "Test Answer" };
    const response = await request(app)
      .put(`/api/faqs/:${faqId}`)
      .send(updatedData);
    expect(response.status).toBe(200);
  });
});
