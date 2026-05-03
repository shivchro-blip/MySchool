# Graph Report - .  (2026-04-30)

## Corpus Check
- 137 files · ~274,153 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 526 nodes · 702 edges · 23 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Flutter App Core|Flutter App Core]]
- [[_COMMUNITY_FastAPI Backend Routes|FastAPI Backend Routes]]
- [[_COMMUNITY_Flutter Screens & UI|Flutter Screens & UI]]
- [[_COMMUNITY_Content Ingestion Pipeline|Content Ingestion Pipeline]]
- [[_COMMUNITY_Auth & Database Layer|Auth & Database Layer]]
- [[_COMMUNITY_Error Handling & AI Gate|Error Handling & AI Gate]]
- [[_COMMUNITY_Evaluation Module|Evaluation Module]]
- [[_COMMUNITY_App Entry & Common Models|App Entry & Common Models]]
- [[_COMMUNITY_DevOps & E2E Testing|DevOps & E2E Testing]]
- [[_COMMUNITY_AI Router & LLM Calls|AI Router & LLM Calls]]
- [[_COMMUNITY_Backend Integration Tests|Backend Integration Tests]]
- [[_COMMUNITY_Flutter API Client|Flutter API Client]]
- [[_COMMUNITY_Flutter Auth Service|Flutter Auth Service]]
- [[_COMMUNITY_Brand Identity|Brand Identity]]
- [[_COMMUNITY_Ollama LLM Client|Ollama LLM Client]]
- [[_COMMUNITY_Syllabus Data Models|Syllabus Data Models]]
- [[_COMMUNITY_Web API Client|Web API Client]]
- [[_COMMUNITY_App Configuration|App Configuration]]
- [[_COMMUNITY_Login Pages|Login Pages]]
- [[_COMMUNITY_App Config|App Config]]
- [[_COMMUNITY_Admin Panel Docs|Admin Panel Docs]]
- [[_COMMUNITY_TN State Board Context|TN State Board Context]]
- [[_COMMUNITY_Syllabus-Aware AI Platform|Syllabus-Aware AI Platform]]

## God Nodes (most connected - your core abstractions)
1. `get_db()` - 37 edges
2. `package:flutter/material.dart` - 13 edges
3. `NotFoundError` - 12 edges
4. `AIUnavailableError` - 12 edges
5. `evaluate_answer()` - 12 edges
6. `CLAUDE.md — Project Brain` - 11 edges
7. `call_llm()` - 10 edges
8. `retry_evaluation()` - 10 edges
9. `_parse_evaluation_response()` - 10 edges
10. `Study Coach Brand Logo` - 10 edges

## Surprising Connections (you probably didn't know these)
- `DB Table: ai_cache` --semantically_similar_to--> `Rate Limiter (backend/core/rate_limit.py)`  [INFERRED] [semantically similar]
  phase1-database-schema.md → phase3-backend-api.md
- `update_profile()` --calls--> `get_db()`  [INFERRED]
  backend\api\v1\users.py → backend\db\client.py
- `increment_ai_call_count()` --calls--> `get_db()`  [INFERRED]
  backend\core\rate_limit.py → backend\db\client.py
- `mark_chunk_validated()` --calls--> `get_db()`  [INFERRED]
  backend\modules\content_pipeline\db_loader.py → backend\db\client.py
- `Rubric-Based Answer Scoring` --semantically_similar_to--> `Human Content Validation (is_validated flag)`  [INFERRED] [semantically similar]
  phase5-evaluation-module.md → phase1-database-schema.md

## Hyperedges (group relationships)
- **RAG Pipeline: ChromaDB + Sentence Transformers + LLM Router** — concept_embedding_search, tech_chromadb, model_sentence_transformers, module_ai_router, tech_ollama [EXTRACTED 0.95]
- **Content Ingestion Pipeline: PDF → JSON → ChromaDB → Supabase** — script_pdf_extract, script_chunk_embed, script_seed_db, module_content_pipeline, db_table_content_chunks [EXTRACTED 0.95]
- **Student Evaluation Loop: Submit → Score → Feedback → Retry** — api_evaluation_endpoints, module_evaluation, db_table_responses, db_table_questions, module_ai_router [EXTRACTED 0.90]
- **Study Coach Brand Identity Visual Elements** — schoolbrandlogo_studycoach, schoolbrandlogo_visualelement_graduationfigure, schoolbrandlogo_visualelement_openbook, schoolbrandlogo_visualelement_penfonttip, schoolbrandlogo_colorscheme, schoolbrandlogo_visualelement_tamilscript [EXTRACTED 1.00]
- **Student Learning Journey: Learn, Practice, Improve, Score High** — schoolbrandlogo_pillars_learn, schoolbrandlogo_pillars_practice, schoolbrandlogo_pillars_improve, schoolbrandlogo_pillars_scorehigh [EXTRACTED 1.00]
- **Tamil Nadu Education Platform Brand Context** — schoolbrandlogo_institution, schoolbrandlogo_tamilnadu_context, schoolbrandlogo_visualelement_tamilscript, schoolbrandlogo_studycoach [INFERRED 0.82]

## Communities

### Community 0 - "Flutter App Core"
Cohesion: 0.04
Nodes (48): AppTheme, build, ExamCoachApp, main, build, LoginScreen, _LoginScreenState, Scaffold (+40 more)

### Community 1 - "FastAPI Backend Routes"
Cohesion: 0.06
Nodes (45): API: /api/v1/evaluation/* (auth required), API: /api/v1/learning/* (auth required), API: /api/v1/syllabus/* (public), CLAUDE.md — Project Brain, Bilingual Support (English + Tamil), Human Content Validation (is_validated flag), Student Core Loop: Learn→Ask→Practice→Write→Evaluate→Improve, Semantic Embedding Search (ChromaDB RAG) (+37 more)

### Community 2 - "Flutter Screens & UI"
Cohesion: 0.05
Nodes (42): api_service.dart, build, Center, HomeScreen, _HomeScreenState, initState, Scaffold, SizedBox (+34 more)

### Community 3 - "Content Ingestion Pipeline"
Cohesion: 0.09
Nodes (27): load_chunks_to_db(), mark_chunk_validated(), embed_chunks(), get_chroma_client(), get_collection_stats(), get_or_create_collection(), search_similar(), extract_pdf_pages() (+19 more)

### Community 4 - "Auth & Database Layer"
Cohesion: 0.09
Nodes (29): get_admin_user(), get_current_user(), get_optional_user(), get_cached_response(), save_cached_response(), get_db(), get_public_db(), Returns anon-key client — respects RLS policies. (+21 more)

### Community 5 - "Error Handling & AI Gate"
Cohesion: 0.1
Nodes (28): AIUnavailableError, AppError, NotFoundError, RateLimitError, check_rate_limit(), increment_ai_call_count(), Re-evaluate an improved answer. Loads original response for comparison context., Parse JSON from AI evaluation response. Handles markdown fences, validates marks (+20 more)

### Community 6 - "Evaluation Module"
Cohesion: 0.11
Nodes (25): Color, EvaluationResponse, FeedbackDetail, format_answer_key(), format_rubric(), get_mark_guidance(), Clamp to valid range and round to nearest 0.5., validate_awarded_marks() (+17 more)

### Community 7 - "App Entry & Common Models"
Cohesion: 0.11
Nodes (21): health_check(), BaseModel, Parse JSON from AI response. Handles markdown code fences., Full explain flow:     1. Look up chapter metadata from Supabase     2. Search C, ErrorResponse, HealthResponse, PaginatedResponse, ExplainRequest (+13 more)

### Community 8 - "DevOps & E2E Testing"
Cohesion: 0.11
Nodes (20): API: /api/v1/admin/* (admin role required), GitHub Actions CI Pipeline, Nginx Reverse Proxy Configuration, Playwright E2E Tests, Admin Auth (backend/core/admin_auth.py), Systemd Service (ollama.service), Production Deployment Checklist, Deployment Guide README (+12 more)

### Community 9 - "AI Router & LLM Calls"
Cohesion: 0.16
Nodes (11): call_llm(), _log_usage(), Main entry point for all LLM calls.      Returns:         Tuple of (response_tex, ExplainResponse, explain_topic(), _parse_explain_response(), _translate_to_tamil(), test_parse_clean_json() (+3 more)

### Community 10 - "Backend Integration Tests"
Cohesion: 0.14
Nodes (4): make_cache_key(), Backend integration tests Run: pytest backend/tests/test_api_integration.py -v T, test_cache_key_differs_by_type(), test_cache_key_is_deterministic()

### Community 11 - "Flutter API Client"
Cohesion: 0.14
Nodes (13): ApiException, ApiService, _handle, jsonDecode, toString, _url, AuthService, Exception (+5 more)

### Community 12 - "Flutter Auth Service"
Cohesion: 0.17
Nodes (5): getToken(), isLoggedIn(), Layout(), App(), PrivateRoute()

### Community 13 - "Brand Identity"
Cohesion: 0.27
Nodes (12): Brand Color Scheme: Navy Blue, Teal, Gold, Study Coach Educational Platform, Brand Pillar: Improve, Brand Pillar: Learn, Brand Pillar: Practice, Brand Pillar: Score High, Study Coach Brand Logo, Tamil Nadu State Board Educational Context (+4 more)

### Community 14 - "Ollama LLM Client"
Cohesion: 0.22
Nodes (7): chat(), get_loaded_models(), is_ollama_available(), Send chat request to Ollama.     messages: [{"role": "system"|"user"|"assistant", chat(), Send chat request to OpenRouter.     Same interface as ollama_client.chat for ea, main()

### Community 15 - "Syllabus Data Models"
Cohesion: 0.4
Nodes (4): Chapter, Question, Subject, Topic

### Community 19 - "Web API Client"
Cohesion: 0.83
Nodes (2): getToken(), request()

### Community 20 - "App Configuration"
Cohesion: 0.67
Nodes (2): Settings, BaseSettings

### Community 22 - "Login Pages"
Cohesion: 0.67
Nodes (1): LoginPage()

### Community 32 - "App Config"
Cohesion: 1.0
Nodes (1): AppConfig

### Community 61 - "Admin Panel Docs"
Cohesion: 1.0
Nodes (1): Admin Panel README (placeholder)

### Community 62 - "TN State Board Context"
Cohesion: 1.0
Nodes (1): Tamil Nadu State Board +1/+2

### Community 63 - "Syllabus-Aware AI Platform"
Cohesion: 1.0
Nodes (1): Syllabus-Aware AI Platform

## Knowledge Gaps
- **121 isolated node(s):** `Send chat request to Ollama.     messages: [{"role": "system"|"user"|"assistant"`, `Send chat request to OpenRouter.     Same interface as ollama_client.chat for ea`, `Main entry point for all LLM calls.      Returns:         Tuple of (response_tex`, `Returns anon-key client — respects RLS policies.`, `Clamp to valid range and round to nearest 0.5.` (+116 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Web API Client`** (4 nodes): `getToken()`, `request()`, `client.js`, `client.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Configuration`** (3 nodes): `config.py`, `Settings`, `BaseSettings`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Pages`** (3 nodes): `LoginPage.jsx`, `LoginPage.jsx`, `LoginPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Config`** (2 nodes): `AppConfig`, `app_config.dart`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Panel Docs`** (1 nodes): `Admin Panel README (placeholder)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `TN State Board Context`** (1 nodes): `Tamil Nadu State Board +1/+2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Syllabus-Aware AI Platform`** (1 nodes): `Syllabus-Aware AI Platform`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `package:flutter/material.dart` connect `Flutter App Core` to `Flutter Screens & UI`, `Evaluation Module`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **Why does `retry_evaluation()` connect `Evaluation Module` to `AI Router & LLM Calls`, `Auth & Database Layer`, `Error Handling & AI Gate`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `get_db()` connect `Auth & Database Layer` to `FastAPI Backend Routes`, `Content Ingestion Pipeline`, `Error Handling & AI Gate`, `Evaluation Module`, `App Entry & Common Models`, `AI Router & LLM Calls`, `Flutter API Client`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Are the 36 inferred relationships involving `get_db()` (e.g. with `health_check()` and `_log_usage()`) actually correct?**
  _`get_db()` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `NotFoundError` (e.g. with `Submit a student answer for AI evaluation.      - Loads question rubric and answ` and `Re-submit an improved answer for re-evaluation.     Compares new answer against`) actually correct?**
  _`NotFoundError` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `AIUnavailableError` (e.g. with `Submit a student answer for AI evaluation.      - Loads question rubric and answ` and `Re-submit an improved answer for re-evaluation.     Compares new answer against`) actually correct?**
  _`AIUnavailableError` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Send chat request to Ollama.     messages: [{"role": "system"|"user"|"assistant"`, `Send chat request to OpenRouter.     Same interface as ollama_client.chat for ea`, `Main entry point for all LLM calls.      Returns:         Tuple of (response_tex` to the rest of the system?**
  _121 weakly-connected nodes found - possible documentation gaps or missing edges._