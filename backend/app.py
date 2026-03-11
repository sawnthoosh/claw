# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import google.generativeai as genai
import os

app = FastAPI()

# Enable CORS so your React frontend (e.g., localhost:5173) can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
# Make sure to put your actual API key here or use environment variables
genai.configure(api_key="AIzaSyDK-9G2I5bPXz6g6d5RWCzWv_ilL_9042U") 
model = genai.GenerativeModel("gemini-2.0-flash")

# Load embedding model and vector database (done once when server starts)
print("Loading vector database...")
try:
    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    # Ensure this path points to where your constitution_vectors folder is located
    db = FAISS.load_local(
        "./constitution_vectors", 
        embedding,
        allow_dangerous_deserialization=True
    )
    print("Vector database loaded successfully!")
except Exception as e:
    print(f"Error loading vector database: {e}")
    db = None

# Define the data structure expected from the frontend
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    if not db:
        return {"content": "Error: Vector database not loaded. Please check the server logs."}

    # Extract the latest user message
    user_query = request.messages[-1].content
    
    try:
        # Perform Similarity Search
        docs = db.similarity_search(user_query, k=3)
        context = "\n".join([doc.page_content for doc in docs])
        
        # Create the prompt
        prompt = f"""
        You are an assistant that explains the Indian Constitution in simple language.
        
        Context:
        {context}
        
        Question:
        {user_query}
        
        Explain clearly for common people and mention article numbers.
        """
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        return {"content": response.text}
    except Exception as e:
        print(f"Error generating response: {e}")
        return {"content": "Sorry, I encountered an error while processing your request."}

# To run this server, install fastapi and uvicorn:
# pip install fastapi uvicorn
# Then run: uvicorn app:app --reload
