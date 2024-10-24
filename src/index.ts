// Stage 3 Decorator for Logging
export function LogRequestResponse() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log("Request received:", args[0]);
      const result = await originalMethod.apply(this, args);
      console.log("Response sent:", result);
      return result;
    };

    return descriptor;
  };
}

// Controller interface
export interface Controller {
  handle(request: any): Promise<any>;
}

// Base controller implementation using Stage 3 Decorators
export class BaseController implements Controller {
  @LogRequestResponse()
  async handle(request: any): Promise<any> {
    return { status: 200, message: "Request handled by BaseController" };
  }
}

// Usage Example
const controller = new BaseController();
controller.handle({ body: "Test" });
