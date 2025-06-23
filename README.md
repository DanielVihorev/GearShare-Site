# GearShare Site 🌐🔧

Welcome to the backend API of **GearShare** — the platform for car parts sharing and lending between vehicle owners and mechanics.

This repository contains the **FastAPI web service** and **AWS RDS integration** that powers the GearShare iOS application.

You can also click the link: http://gearshare.site/
---

## 🚀 What This Repo Is

✅ API server using FastAPI  
✅ Connects to an AWS RDS MSSQL database  
✅ Handles user registration, login, and item management  
❌ This is **not** the iOS app codebase  
❌ No frontend/UI in this repository

---

## 📱 Try the iOS App

> 🔗 [Download GearShare on TestFlight](https://testflight.apple.com/join/YOUR-LINK)  
> 📦 [View iOS App Source Code](https://github.com/DanielVihorev/GearShare-IOS)

---

## 🔌 API Features (Backed by RDS)

This backend connects to an **Amazon RDS (Microsoft SQL Server)** instance and provides the following endpoints:

### ✅ `POST /register`
Register a new user.

**Payload**:
```json
{
  "username": "daniel",
  "email": "daniel@example.com",
  "password": "12345678"
}
