from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class AppError(Exception):
    def __init__(
        self,
        message: str,
        code: str = "APP_ERROR",
        status_code: int = 400,
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class NotFoundError(AppError):
    def __init__(self, resource: str, id: str):
        super().__init__(
            message=f"{resource} not found: {id}",
            code="NOT_FOUND",
            status_code=404,
        )


class RateLimitError(AppError):
    def __init__(self):
        super().__init__(
            message="Daily AI call limit reached. Upgrade to paid plan for more.",
            code="RATE_LIMIT",
            status_code=429,
        )


class AIUnavailableError(AppError):
    def __init__(self):
        super().__init__(
            message="AI service is temporarily unavailable. Please try again.",
            code="AI_UNAVAILABLE",
            status_code=503,
        )


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": exc.message, "code": exc.code},
        )

    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc):
        return JSONResponse(
            status_code=404,
            content={
                "error": f"Route not found: {request.url.path}",
                "code": "ROUTE_NOT_FOUND",
            },
        )

    @app.exception_handler(500)
    async def server_error_handler(request: Request, exc):
        return JSONResponse(
            status_code=500,
            content={"error": "Internal server error", "code": "SERVER_ERROR"},
        )
