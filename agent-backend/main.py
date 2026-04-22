import os
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
from pydantic import BaseModel

app = FastAPI(
    title="Event Planner AI Agent Backend",
    description="Backend API for future LangChain/LangGraph agent development.",
    version="0.1.0"
)

# Allow all origins for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentRequest(BaseModel):
    query: str

class AgentResponse(BaseModel):
    response: str
    status: str = "success"

@app.get("/")
def read_root():
    return {"message": "Agent Backend is running. Access /docs for API documentation."}

@app.post("/api/agent/run", response_model=AgentResponse)
async def run_agent(request: AgentRequest):
    """
    Placeholder endpoint for future LangGraph agent pipeline.
    """
    
    # Example placeholder logic:
    # 1. Initialize LangGraph workflow
    # 2. Pass request.query to the graph
    # 3. Stream or return the output
    
    mock_response = f"Received query: '{request.query}'. Agent integration pending."
    return AgentResponse(response=mock_response)

MOCK_VENDORS = [
  {
    "id": 1,
    "name": "The Conservatory Gardens",
    "description": "An exquisite garden venue surrounded by lush landscaping. Offers a serene, light-filled atmosphere perfect for elegant afternoon ceremonies and starlit evening receptions.",
    "rating": 4.9,
    "priceRange": "₹15,00,000+",
    "category": "Premium Venue",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCBT8VGXEqu0QT1Pt-Q0VRsCuIV3Bs4sM1xjKd0BHNnVx_A0wPdBNzaZkL-U93Azl7NE5g8YtNTj_nEN5jEzSl6dEeO1_i-RCnFFamiIrmFZBDtSxMIwZeLrnhvHKNg7qen9LzZV71eNUwI-M0ybTvYyaI6T0wMX3OqNj9jn9mXIB4ff_xC5jtgRH901CYXvn2UcqcfsU3OnFmakewhDldkXnGySQ_tj0ElbZ5y7DLL00VQLBA-iXh8EUDg1hwN60PKdFlQVYuE3To",
    "featured": True,
  },
  {
    "id": 2,
    "name": "Artisan Hearth",
    "description": "Farm-to-table culinary experiences focusing on seasonal, locally sourced Indian ingredients with elegant plating.",
    "rating": 4.8,
    "priceRange": "₹8,00,000 - ₹12,00,000",
    "category": "Catering",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8-0nV7uouzOKB71SXm_dX4sZcKkRUnflteBF4-040ODiFEK5sDBUZTnAy0qk8z0_v1JTLIczNcngCeCPO4x7CoZ5apPgV0bMk2DxvbmrMqwrZday7P71gIKoe_dfXLpg0uS-Fk15Rb5qtH19WoneoKxcJcq35TWRu0eq-ox_JNPU9Qgvw7Vk6PTTFTfdh-8-hXRR2jFCSPTn84OO3wCnvohPSwM3bBJyiYkFfkNMfMnN0dL80LQn_tF6UFIJk86PSQ7w3ps62TQ",
    "featured": False,
  }
]

@app.get("/api/vendors")
async def get_vendors(query: str = "event vendors"):
    api_key = os.environ.get("GOOGLE_PLACES_API_KEY")
    if not api_key:
        return {"vendors": MOCK_VENDORS}
    
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "key": api_key
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        
    if response.status_code != 200:
        return {"vendors": MOCK_VENDORS}
        
    data = response.json()
    places = data.get("results", [])
    
    vendors = []
    for idx, place in enumerate(places[:15]):
        photo_ref = None
        if "photos" in place and len(place["photos"]) > 0:
            photo_ref = place["photos"][0]["photo_reference"]
            
        if photo_ref:
            image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={api_key}"
        else:
            image_url = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&h=300"
            
        category = "Partner"
        if place.get("types"):
            category = place.get("types")[0].replace("_", " ").title()

        rating = place.get("rating", 4.5)
            
        vendors.append({
            "id": place.get("place_id", str(idx)),
            "name": place.get("name", "Unknown Vendor"),
            "description": place.get("formatted_address", "Local professional."),
            "rating": rating,
            "priceRange": "Request Quote",
            "category": category,
            "image": image_url,
            "featured": idx == 0
        })
        
    return {"vendors": vendors}

if __name__ == "__main__":
    import uvicorn
    # Make sure to run this file via `python main.py` or `uvicorn main:app --reload`
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
