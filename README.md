Multilingual FAQ Management System

A dynamic FAQ management solution designed with scalability and user experience in mind. It comes equipped with:

🚀 Key Features:
Multilingual Support: Seamlessly manage FAQs in multiple languages, catering to a global audience.
WYSIWYG Editing: Effortlessly create and edit FAQ content using an intuitive "What You See Is What You Get" editor, enhancing user-friendly content management.
Efficient Caching: Implement caching strategies for faster response times and reduced load on the server, ensuring high performance even with large datasets.
RESTful API with language selection support
Admin panel for content management
Docker support for easy deployment
Google-cloud-translate integration for efficient translation

🛠 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Caching: Redis
Translation: Google Cloud Translation
Containerization: Docker
📋 Prerequisites

Node.js (v16 or higher)
MongoDB (v4.4 or higher)
Redis (v6 or higher)
Google Cloud Account with Translate API access
Docker
⚙️ Environment Variables

Create a .env file in the root directory:

Server Configuration
PORT=3000 NODE_ENV=development

MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/faq_system

Redis Configuration
REDIS_HOST=localhost REDIS_PORT=6379 REDIS_URL=redis://localhost:6379

🔧 Installation
Clone the repository:
git clone https://github.com/HIMANSHU00KUMAR/Multilang_FAQ_system.git
cd Multilang_FAQ_system

    Install dependencies:

npm install

    Start Redis server:

redis-server

    Run the application:

# Production
npm start

🐳 Docker Setup

    Build the image:

docker-compose build

    Run the containers:

docker-compose up

📚 API Documentation
Base URL

http://localhost:3000/api/faqs

Endpoints
FAQ Management

GET    http://localhost:3000/api/faqs/              - List all FAQs
GET    http://localhost:3000/api/faqs?lang=hi       - Get particular language FAQ
POST   http://localhost:3000/api/faqs/              - Create new FAQ
DELETE http://localhost:3000/api/faqs/:id           - Delete FAQ
PUT http://localhost:3000/api/faqs/:id              - Update FAQ

Language Support

    Add ?lang= query parameter to specify response language
    Supported languages: en (English), hi (Hindi),bn (Bengali), etc.
    Example: /api/faqs?lang=es

Request Examples
Create FAQ

POST /api/faqs/
Content-Type: application/json

{
  "question": "How do I reset my password?",
  "answer": "Follow the instructions sent to your email",
}

🧪 Testing

Run the test suite:

# Run all tests
npm test or jest

# Run with coverage
npm run test:coverage

🤝 Contributing

    Fork the repository
    Create a feature branch: git checkout -b feature/your-feature
    Commit changes: git commit -am 'feat: Add new feature'
    Push to branch: git push origin feature/your-feature
    Submit a Pull Request

🆘 Support

For support, email shams03.work@gmail.com or open an issue in the repository.
