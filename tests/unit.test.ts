import { jest } from "@jest/globals";
import { Controller, LogRequestResponse } from "../src";

class MockController implements Controller {
  @LogRequestResponse()
  async handle(request: any): Promise<any> {
    return { status: 200, message: "Request handled by MockController" };
  }
}

describe("LogRequestResponse Decorator (Stage 3)", () => {
  it("should log the request and response", async () => {
    console.log = jest.fn(); // Mock console.log

    const controller = new MockController();
    const request = { body: "Unit Test Request" };

    const response = await controller.handle(request);

    expect(console.log).toHaveBeenCalledWith("Request received:", request);
    expect(console.log).toHaveBeenCalledWith("Response sent:", response);
    expect(response).toEqual({
      status: 200,
      message: "Request handled by MockController",
    });
  });
});
