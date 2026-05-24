import chromadb
from chromadb.config import Settings as ChromaSettings
from pathlib import Path
from rich.console import Console
from rich.progress import track

console = Console()

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
CHROMA_PATH = "content/embeddings"


def get_chroma_client() -> chromadb.Client:
    Path(CHROMA_PATH).mkdir(parents=True, exist_ok=True)
    return chromadb.PersistentClient(
        path=CHROMA_PATH,
        settings=ChromaSettings(anonymized_telemetry=False),
    )


def get_or_create_collection(client: chromadb.Client, name: str = "exam_coach"):
    return client.get_or_create_collection(
        name=name,
        metadata={"hnsw:space": "cosine"},
    )


def embed_chunks(chunks: list[dict]) -> None:
    if not chunks:
        console.print("[yellow]No chunks to embed[/yellow]")
        return

    from sentence_transformers import SentenceTransformer  # deferred: heavy torch dep
    console.print(f"[blue]Loading[/blue] embedding model: {EMBEDDING_MODEL}")
    model = SentenceTransformer(EMBEDDING_MODEL)
    client = get_chroma_client()
    collection = get_or_create_collection(client)

    ids, texts, metadatas = [], [], []
    for i, chunk in enumerate(chunks):
        chunk_id = (
            f"{chunk['subject_code']}_"
            f"ch{chunk['chapter_number']}_"
            f"{chunk['chunk_type']}_"
            f"{i}"
        )
        ids.append(chunk_id)
        texts.append(chunk["content"])
        metadatas.append({
            "subject_code":   chunk["subject_code"],
            "class":          chunk["class"],
            "chapter_number": str(chunk["chapter_number"]),
            "chapter_title":  chunk["chapter_title"],
            "chunk_type":     chunk["chunk_type"],
            "language":       chunk.get("language", "en"),
            "section_header": chunk.get("section_header", ""),
        })

    existing_set = set(collection.get(ids=ids)["ids"])
    new_ids = [id_ for id_ in ids if id_ not in existing_set]
    if not new_ids:
        console.print("[yellow]All chunks already embedded — skipping[/yellow]")
        return

    new_indices = [ids.index(id_) for id_ in new_ids]
    new_texts = [texts[i] for i in new_indices]
    new_metadatas = [metadatas[i] for i in new_indices]

    console.print(f"[blue]Embedding[/blue] {len(new_ids)} new chunks...")

    batch_size = 32
    all_embeddings = []
    for i in track(range(0, len(new_texts), batch_size), description="Embedding"):
        batch = new_texts[i : i + batch_size]
        embeddings = model.encode(batch, show_progress_bar=False)
        all_embeddings.extend(embeddings.tolist())

    collection.add(
        ids=new_ids,
        documents=new_texts,
        embeddings=all_embeddings,
        metadatas=new_metadatas,
    )
    console.print(f"[green]Embedded[/green] {len(new_ids)} chunks into ChromaDB")


def search_similar(
    query: str,
    n_results: int = 5,
    filters: dict | None = None,
) -> list[dict]:
    from sentence_transformers import SentenceTransformer  # deferred: heavy torch dep
    model = SentenceTransformer(EMBEDDING_MODEL)
    query_embedding = model.encode([query])[0].tolist()

    client = get_chroma_client()
    collection = get_or_create_collection(client)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where=filters,
        include=["documents", "metadatas", "distances"],
    )

    return [
        {
            "content":  doc,
            "metadata": results["metadatas"][0][i],
            "score":    round(1 - results["distances"][0][i], 4),
        }
        for i, doc in enumerate(results["documents"][0])
    ]


def get_collection_stats() -> dict:
    client = get_chroma_client()
    collection = get_or_create_collection(client)
    return {"total_chunks": collection.count(), "collection": "exam_coach"}
