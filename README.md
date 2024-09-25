Ecommerce Landing Page :
An ecommerce landing page built using the MERN stack with dynamic product search, category filtering, and product detail modals. This project allows users to browse products, search by product name, filter by category, and view product information in a modal popup.

Features :
Product Browsing: Users can browse a grid of available products.
Dynamic Search: Search for products by typing the product name. As you type, the displayed products are updated dynamically.
Category Filtering: Filter products by category to quickly find specific types of items.
Product Detail Modals: When a product is clicked, a modal pops up displaying detailed product information, including multiple images.
Screenshots

Tech Stack :
Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Image Handling: Cloudinary for image storage and handling.
State Management: React Hooks

Setup:
To get the project up and running locally, follow these steps:

Prerequisites
Node.js (v18.18.0 or higher)
MongoDB (for the backend)
Cloudinary account for image storage
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ecommerce-landing-page.git
cd ecommerce-landing-page
Install dependencies for both frontend and backend:

For the backend:

bash
Copy code
cd Ecommerce-Page-Backend
npm install
![Screenshot 2024-09-26 023626](https://github.com/user-attachments/assets/a863148c-4dae-4e55-aa69-411c773f6085)

For the frontend:

bash
Copy code
cd Ecommerce-Page-Frontend
npm install
Set up environment variables:

Create a .env file in both the backend and frontend directories with the following variables:

Backend .env file:

bash
Copy code
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Frontend .env file:

bash
Copy code
VITE_API_URL=http://localhost:8000
Run the Backend:

Navigate to the backend folder and run:

bash
Copy code
npm start
The backend should now be running on http://localhost:8000.

Run the Frontend:

Navigate to the frontend folder and run:

bash
Copy code
npm run dev
The frontend should now be running on http://localhost:3000.

Usage
Browse Products: On the landing page, you can browse through a grid of products.
Search by Name: Start typing in the search bar, and the product list will update dynamically based on the input.
Filter by Category: Use the category filter on the left side of the page to narrow down the product list.
View Product Details: Click on any product card to view more details in a modal, including multiple product images.
API Endpoints
GET /product/allproducts: Fetches all products.
POST /product/create: Adds a new product (admin-protected).
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Feel free to submit issues or pull requests for improvements and fixes.
