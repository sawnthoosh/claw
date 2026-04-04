# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
# NEW: Using the cloud API instead of the heavy local model
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
import google.generativeai as genai
import os

app = FastAPI()

# Enable CORS so your React frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API securely
api_key = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=api_key) 
model = genai.GenerativeModel("gemini-2.0-flash")

# Set db to None initially so the server can start instantly
db = None

def get_db():
    """Lazily load the database only when the first question is asked"""
    global db
    if db is None:
        print("Loading vector database... Connecting to Hugging Face Cloud...")
        try:
            # NEW LOGIC: Use HuggingFace servers to run the heavy AI model
            hf_token = os.environ.get("HUGGINGFACE_API_KEY")
            embedding = HuggingFaceInferenceAPIEmbeddings(
                api_key=hf_token,
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
            
            db = FAISS.load_local(
                "./constitution_vectors", 
                embedding,
                allow_dangerous_deserialization=True
            )
            print("Vector database loaded successfully!")
        except Exception as e:
            print(f"Error loading vector database: {e}")
    return db

# Define the data structure expected from the frontend
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    # Load the DB here. It will take a minute on the VERY FIRST message, 
    # but will be instant for all messages after that.
    vector_db = get_db()
    
    if not vector_db:
        return {"content": "Error: Vector database could not be loaded. Please check server logs."}

    # Extract the latest user message
    user_query = request.messages[-1].content
    
    try:
        # Perform Similarity Search
        docs = vector_db.similarity_search(user_query, k=3)
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
