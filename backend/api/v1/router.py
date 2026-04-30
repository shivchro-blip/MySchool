from fastapi import APIRouter
from .syllabus   import router as syllabus_router
from .learning   import router as learning_router
from .evaluation import router as evaluation_router
from .users      import router as users_router
from .admin      import router as admin_router

router = APIRouter(prefix="/api/v1")

router.include_router(syllabus_router,   prefix="/syllabus",   tags=["Syllabus"])
router.include_router(learning_router,   prefix="/learning",   tags=["Learning"])
router.include_router(evaluation_router, prefix="/evaluation", tags=["Evaluation"])
router.include_router(users_router,      prefix="/users",      tags=["Users"])
router.include_router(admin_router,      prefix="/admin",      tags=["Admin"])
