export class ErrorHandler {
    static handleError(c, error, statusCode = 500) {
        return c.json({
            success: false,
            result: {
                error: error instanceof Error ? error.message : error,
            },
        }, statusCode);
    }
    static notFound(c, message = "Ресурс не найден") {
        return this.handleError(c, message, 404);
    }
    static badRequest(c, message = "Неверный запрос") {
        return this.handleError(c, message, 400);
    }
    static internalServerError(c, error) {
        return this.handleError(c, error, 500);
    }
}
