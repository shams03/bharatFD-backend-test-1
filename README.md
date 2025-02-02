


# Multilingual FAQ Management System

A dynamic FAQ management solution designed with scalability and user experience in mind. It comes equipped with:

## 🚀 Key Features:
- **Multilingual Support**: Seamlessly manage FAQs in multiple languages, catering to a global audience.
- **WYSIWYG Editing**: Effortlessly create and edit FAQ content using an intuitive "What You See Is What You Get" editor, enhancing user-friendly content management.
- **Efficient Caching**: Implement caching strategies for faster response times and reduced load on the server, ensuring high performance even with large datasets.
- **RESTful API with Language Selection Support**
- **Admin Panel** for content management
- **Docker Support** for easy deployment
- **Google Cloud-Translate Integration** for efficient translation

## 🛠 Tech Stack:
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Caching**: Redis
- **Translation**: Google Cloud Translation
- **Containerization**: Docker

## 📋 Prerequisites:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)
- Google Cloud Account with Translate API access
- Docker

## ⚙️ Environment Variables:
Create a `.env` file in the root directory:

### Server Configuration
```bash
PORT=3000
NODE_ENV=development
```

### MongoDB Configuration
```bash
MONGO_URI=mongodb://localhost:27017/faq_system
```

### Redis Configuration
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379
```

## 🔧 Installation

1. Clone the repository:
   ```bash
   https://github.com/shams03/bharatFD-backend-test-1.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Redis server:
   ```bash
   redis-server
   ```

4. Run the application:

   ### Production
   ```bash
   npm start
   ```

## 🐳 Docker Setup:

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Run the containers:
   ```bash
   docker-compose up
   ```

## 📚 API Documentation:

### Base URL:
```
http://localhost:3000/api/faqs
```

### Endpoints:

#### FAQ Management:
- **GET**    `http://localhost:3000/api/faqs/`              - List all FAQs
- **GET**    `http://localhost:3000/api/faqs?lang=hi`       - Get FAQ in a particular language
- **POST**   `http://localhost:3000/api/faqs/`              - Create new FAQ
- **DELETE** `http://localhost:3000/api/faqs/:id`           - Delete FAQ
- **PUT**    `http://localhost:3000/api/faqs/:id`           - Update FAQ

#### Language Support:
- Add `?lang=` query parameter to specify the response language
- Supported languages: `en` (English), `hi` (Hindi), `bn` (Bengali), etc.
- Example: `/api/faqs?lang=es`

### Request Examples:

#### Create FAQ:
- **POST /api/faqs/**
  - **Content-Type**: application/json

```json
{
  "question": "How do I read FAQ?",
  "answer": "Follow the instructions sent to your mobile number."
}
```

## 🧪 Testing:
- Run the test suite:
  - **Run all tests**:
    ```bash
    npm test
    ```
  - **Run with coverage**:
    ```bash
    npm run test:coverage
    ```

## 🤝 Contributing:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -am 'feat: Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request.

## 🆘 Support:
For support, email [shams03.work@gmail.com](mailto:shams03.work@gmail.com) or open an issue in the repository.
```
