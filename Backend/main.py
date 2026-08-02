from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

from database import conversations_collection

# Load environment variables
load_dotenv()

# Create OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    conversation_id: str


@app.get("/")
def home():
    return {"message": "AI Chatbot Backend is running"}


@app.post("/chat")
def chat(request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",   # You can change the model later if needed
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI assistant."
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    reply = response.choices[0].message.content

    conversations_collection.insert_one({
        "conversation_id": request.conversation_id,
        "message": request.message,
        "response": reply,
    })

    return {
        "response": reply,
        "conversation_id": request.conversation_id,
    }
