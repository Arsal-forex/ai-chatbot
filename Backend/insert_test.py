from database import conversations_collection

document = {
    "conversation_id": "test-convo-1",
    "message": "Hello, this is my first document!",
    "response": "Hi there! This was inserted using PyMongo.",
}

result = conversations_collection.insert_one(document)

print("Inserted document ID:", result.inserted_id)
