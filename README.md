# 💊 MediMart Backend

The official backend for the **MediMart** online medicine store. Built using **Node.js**, **Express**, **TypeScript**, **MongoDB (via Mongoose)**, and includes full support for **JWT authentication**, **role-based access**, **order & prescription handling**, and **SSLCommerz payment integration**.

---

## 🌐 Live Project

Frontend Live URL: [https://medi-mart-night.vercel.app](https://medi-mart-night.vercel.app)

📬 **Postman API Docs**: _Coming Soon_ (Insert your collection link here later)

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **Image Upload**: Cloudinary
- **Payment**: SSLCommerz
- **Validation**: Zod
- **Email**: Nodemailer
- **Dev Tools**: ts-node-dev, ESLint, Prettier

---

## 🔐 Test Credentials

**Admin**  
📧 `mina@mail.com`  
🔑 `1234`  

**User**  
📧 `nina@mail.com`  
🔑 `1234`

---

## ⚙️ Scripts

| Script          | Description                      |
|-----------------|----------------------------------|
| `npm run start` | Start production server          |
| `npm run start:dev` | Start dev server with reload |
| `npm run build` | Compile TypeScript to JS         |
| `npm run lint`  | Run ESLint                       |
| `npm run lint:fix` | Auto-fix ESLint issues        |
| `npm run prettier` | Format files with Prettier    |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── builder/            # Common response builders (e.g., success, error)
│   ├── config/             # DB, cloudinary, SSLCommerz config
│   ├── errors/             # Custom error handlers
│   ├── interface/          # Reusable TypeScript interfaces
│   ├── middlewares/        # Auth, error handling middlewares
│   ├── modules/            # Core features grouped by domain
│   │   ├── auth/           # Login, register, JWT
│   │   ├── medicine/       # Medicines CRUD and details
│   │   ├── order/          # Cart, orders, payments
│   │   └── user/           # User profile, info
│   ├── routes/             # All routes centralized
│   └── utils/              # Utility functions (email, cloud, etc.)
├── app.ts                 # Express app config
├── server.ts              # Entry point to start server

types/
└── sslcommerz-lts.d.ts    # Custom types for SSLCommerz

# Config & Meta files
.eslintrc.json
.prettierrc.json
.gitignore
package.json
tsconfig.json
vercel.json

```

---

## 📦 Features

### 🔐 Authentication & Roles

- Secure JWT login system
- Password hashing with bcrypt
- Roles: `admin`, `customer`

### 🛒 Medicine Management

- Add/update/delete medicines (admin)
- Requires prescription toggle
- Stock, expiry, manufacturer info

### 📥 Prescription Uploads

- Upload image files (Cloudinary)
- Required for specific medicines before checkout

### 🧾 Orders & Payments

- Cart + order system
- Payment through **SSLCommerz**
- Track status: pending, approved, shipped, delivered

### 📧 Email Notifications

- Nodemailer integration
- Order confirmation & status updates

### 📊 Admin Dashboard

- View all orders
- Verify prescriptions
- Manage inventory and customers

---

## 🔗 API Overview

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/api/v1/auth/register`| Register user                     |
| POST   | `/api/v1/auth/login`   | Login                             |
| GET    | `/api/v1/medicines`    | Get all medicines (public)        |
| POST   | `/api/v1/orders`       | Place an order                    |
| POST   | `/api/v1/upload`       | Upload prescription               |
| GET    | `/api/v1/orders/my`    | Get my orders (user only)         |
| GET    | `/api/v1/admin/orders` | Admin: view/manage all orders     |
| POST   | `/api/v1/payments/init`| Start SSLCommerz payment          |

(You can customize or expand endpoints based on modules.)

---

## 🧪 Environment Variables

Create a `.env` file in your root directory:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/medimart
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SSL_STORE_ID=your_sslcommerz_store_id
SSL_STORE_PASSWORD=your_sslcommerz_store_password
```

---

## 🛠 How to Run Locally

```bash
git clone https://github.com/your-username/medimart-backend.git
cd medimart-backend
npm install
npm run start:dev
```

---

## ✅ Lint & Format

To check for code quality and styling:

```bash
npm run lint
npm run lint:fix
npm run prettier
```

---

## 🧰 Tools Used

| Tool         | Purpose                   |
|--------------|---------------------------|
| TypeScript   | Type safety                |
| Zod          | Validation schemas         |
| ESLint       | Linting rules              |
| Prettier     | Code formatting            |
| ts-node-dev  | Live-reloading in dev      |
| Cloudinary   | Image upload for Rx        |
| SSLCommerz   | Payment gateway            |

---

## 🛑 License

Licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 🙌 Contributing

Pull requests welcome! For major changes, open an issue first to discuss what you’d like to change.

---

