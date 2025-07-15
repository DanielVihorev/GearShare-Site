from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

# Configuration for Wise API
WISE_API_URL = "https://api.sandbox.wise.com/v1"  # Use sandbox for testing
WISE_API_KEY = "your_wise_api_key_here"

# Models
class Recipient(BaseModel):
    name: str
    currency: str
    iban: str

class Payment(BaseModel):
    recipient_id: str
    amount: float
    currency: str

# Create recipient
@app.post("/recipients/")
def create_recipient(recipient: Recipient):
    endpoint = f"{WISE_API_URL}/accounts"
    headers = {"Authorization": f"Bearer {WISE_API_KEY}"}
    payload = {
        "accountHolderName": recipient.name,
        "currency": recipient.currency,
        "type": "iban",
        "details": {"iban": recipient.iban},
    }

    response = requests.post(endpoint, json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

# Initiate payment
@app.post("/payments/")
def initiate_payment(payment: Payment):
    endpoint = f"{WISE_API_URL}/transfers"
    headers = {"Authorization": f"Bearer {WISE_API_KEY}"}
    payload = {
        "targetAccount": payment.recipient_id,
        "amount": payment.amount,
        "currency": payment.currency,
        "type": "BALANCE",
    }

    response = requests.post(endpoint, json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

# Check payment status
@app.get("/payments/{payment_id}/status")
def get_payment_status(payment_id: str):
    endpoint = f"{WISE_API_URL}/transfers/{payment_id}"
    headers = {"Authorization": f"Bearer {WISE_API_KEY}"}

    response = requests.get(endpoint, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()