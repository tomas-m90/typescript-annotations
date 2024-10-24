import express from "express";
import request from "supertest";
import { BaseController } from "../src";

const app = express();
app.use(express.json());

const controller = new BaseController();

app.post("/test", async (req, res) => {
  const result = await controller.handle(req.body);
  res.status(result.status).send(result.message);
});

describe("POST /test - Integration Test (Stage 3)", () => {
  it("should handle the request and return a response", async () => {
    const response = await request(app)
      .post("/test")
      .send({ body: "Integration Test Request" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Request handled by BaseController");
  });
});
