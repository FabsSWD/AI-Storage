
# 🧠 AI Storage

**AI Storage** is an intelligent backend built with **Express.js** that allows storing, querying, and managing events through natural language interaction with an AI assistant (*OpenAI GPT*).  
The system understands human instructions to create, search, or list events, including date, time, and duration.

---

## 📋 Index

- [Frontend (future)](#)
- [Backend (this repository)](#)

---

## 🚀 **Technologies Used**

- **Node.js 22.11.0**  
- **Express 5.1** (Web framework for Node.js)  
- **SQLite 3** (Lightweight database)  
- **OpenAI SDK 4.93** (Integration with GPT models)  
- **Zod 3.24** (Data validation)  
- **Helmet** (HTTP headers security)  
- **CORS** (Cross-Origin Resource Sharing management)  
- **Express-Rate-Limit** (DDoS attack protection)  
- **dotenv** (Environment variable management)

---

## 🧩 **Project Structure**

```
ai-storage/
│
├── src/
│   ├── config/
│   │   ├── db.js              
│   │   └── env.js             
│   │
│   ├── controllers/
│   │   ├── assistant.controller.js 
│   │   └── event.controller.js     
│   │
│   ├── models/
│   │   └── event.model.js     
│   │
│   ├── routes/
│   │   ├── assistant.route.js 
│   │   └── event.route.js     
│   │
│   ├── utils/
│   │   ├── validate.middleware.js 
│   │   └── event.validator.js     
│   │
│   └── index.js               
│
├── .env                       
├── package.json               
└── README.md                  
```

---

## 📌 **Main Endpoints**

### 1. **Intelligent Assistant**
- **URL:** `/assistant`  
- **Method:** `POST`  
- **Body Parameters:**
  - `message` (string): Natural language instruction.

- **Sample Request:**
```json
{
  "message": "Schedule a meeting tomorrow at 10 for 2 hours."
}
```

- **Sample Response:**
```json
{
  "action": "createEvent",
  "result": {
    "id": 1,
    "name": "Meeting",
    "date": "2025-04-12",
    "time": "10:00",
    "duration": 2
  }
}
```

---

### 2. **Event CRUD Management**

All event operations are under `/events`.

---

#### 📂 **List All Events**

- **URL:** `/events`
- **Method:** `GET`

- **Sample Response:**
```json
[
  {
    "id": 1,
    "name": "Meeting",
    "date": "2025-04-12",
    "time": "10:00",
    "duration": 2
  },
  {
    "id": 2,
    "name": "Dentist Appointment",
    "date": "2025-04-13",
    "time": "09:30",
    "duration": 1
  }
]
```

---

#### 📂 **Get Event by ID**

- **URL:** `/events/:id`
- **Method:** `GET`

- **Sample Request:**  
`GET /events/1`

- **Sample Response:**
```json
{
  "id": 1,
  "name": "Meeting",
  "date": "2025-04-12",
  "time": "10:00",
  "duration": 2
}
```

---

#### 📂 **Create a New Event**

- **URL:** `/events`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (string)
  - `date` (string)
  - `time` (string)
  - `duration` (integer)

- **Sample Request:**
```json
{
  "name": "Conference",
  "date": "2025-05-10",
  "time": "14:00",
  "duration": 3
}
```

- **Sample Response:**
```json
{
  "id": 3,
  "name": "Conference",
  "date": "2025-05-10",
  "time": "14:00",
  "duration": 3
}
```

---

#### 📂 **Update an Existing Event**

- **URL:** `/events/:id`
- **Method:** `PUT`
- **Body Parameters:** (same as POST)

- **Sample Request:**  
`PUT /events/3`
```json
{
  "name": "Updated Conference",
  "date": "2025-05-11",
  "time": "15:00",
  "duration": 2
}
```

- **Sample Response:**
```json
{
  "id": 3,
  "name": "Updated Conference",
  "date": "2025-05-11",
  "time": "15:00",
  "duration": 2
}
```

---

#### 📂 **Delete an Event**

- **URL:** `/events/:id`
- **Method:** `DELETE`

- **Sample Request:**  
`DELETE /events/3`

- **Sample Response:**
```json
{
  "message": "Event deleted successfully."
}
```

---

## 🛠️ **Setup and Execution**

### **Prerequisites**
- Node.js 22+
- Install dependencies:
```bash
npm install
```

### **Create `.env` File**
Example:
```
PORT=3000
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### **Run the Server**
```bash
npm run dev
```
Server available at:  
`http://localhost:3000`

---

## 💪 **Testing with Postman**

### **Example POST to Assistant**
- **Endpoint:** `http://localhost:3000/assistant`
- **Body:**
```json
{
  "message": "Add a medical appointment in 4 hours for 1 hour."
}
```

---

## 🛡️ **Security**

- **CORS**: Allows cross-origin requests.
- **Helmet**: Enhances HTTP headers security.
- **Rate Limiting**: Limits 100 requests every 15 minutes per IP to prevent DDoS attacks.

---

## 🌐 **Deployment**

Use **PM2** or servers like **NGINX + PM2** for production.

Example:
```bash
pm2 start src/index.js --name ai-storage
```

---

## 🔮 **Next Steps**

- Export events to CSV or calendar format.

---

## 📄 **License**

This project is licensed under the MIT License.
