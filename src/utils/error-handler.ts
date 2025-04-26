import { Context } from "hono";

export class ErrorHandler {
  static handleError(c: Context, error: any, statusCode: number = 500) {
    return c.json(
      {
        success: false,
        result: {
          error: error instanceof Error ? error.message : error,
        },
      },
      statusCode as any
    );
  }

  static notFound(c: Context, message: string = "Ресурс не найден") {
    return this.handleError(c, message, 404);
  }

  static badRequest(c: Context, message: string = "Неверный запрос") {
    return this.handleError(c, message, 400);
  }

  static internalServerError(c: Context, error: any) {
    return this.handleError(c, error, 500);
  }
}
