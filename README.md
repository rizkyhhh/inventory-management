# Inventory Management System

A Laravel + React.js-based Inventory Management System with product transfers, locations, and stock management.

---

## 📌 Requirements

Before running the project, ensure you have the following installed:

- **PHP 8.1 or later**  
- **Composer**  
- **Laravel 10**  
- **Node.js & npm**  
- **MySQL or PostgreSQL**  
- **Git**

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR-USERNAME/inventory-management.git
cd inventory-management

### 2️⃣ Set Up Backend (Laravel)
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed  # Run database migrations & seeders
php artisan storage:link

### 3️⃣ Set Up Frontend (React.js with Inertia.js)

npm install
npm run dev

4️⃣ Start the Laravel Server
php artisan serve
Open http://127.0.0.1:8000 in your browser.