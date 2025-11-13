# Warehouse Management System v2.1

A modern warehouse management system built with **Java Spring Boot** backend and **React** frontend.

## 🚀 Features

### Core Functionality

- **Product Management**: Complete CRUD operations for inventory items
- **Transaction Management**: Full transaction tracking with IN/OUT operations
- **Excel Upload**: Bulk transaction import from Excel files with Indian date format support
- **Inventory Tracking**: Real-time quantity calculations and batch tracking
- **Material Classification**: Three-tier system (Raw Materials, Packing Materials, Finished Materials)
- **Advanced Search**: Real-time search across multiple fields
- **Filtering**: Material type-based filtering and date range filtering
- **Sorting**: Multi-column sorting with visual indicators
- **Autocomplete**: Intelligent suggestions for 8 different fields
- **Reports & Export**: Transaction reports with CSV export functionality

### Technical Features

- **Modern UI**: Responsive Bootstrap 5 design with React components
- **Real-time Updates**: Live quantity calculations and form validation
- **Toast Notifications**: User-friendly feedback system
- **Session Management**: Secure session handling with Spring Security
- **Database Integration**: MySQL with JPA/Hibernate
- **RESTful API**: Clean API design with proper error handling
- **Excel Processing**: Apache POI integration for Excel file parsing
- **Indian Date System**: Full support for DD/MM/YYYY date format throughout the application
- **File Upload**: Multipart file handling for Excel imports

## 🏗️ Architecture

### Backend (Java Spring Boot)

- **Framework**: Spring Boot 3.2 with Java 17
- **Database**: MySQL with JPA/Hibernate
- **Security**: Spring Security with session management
- **API**: RESTful endpoints with JSON responses
- **Validation**: Bean validation with custom error handling
- **Excel Processing**: Apache POI for Excel file parsing and date handling
- **File Upload**: Multipart file support for Excel imports

### Frontend (React)

- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router for navigation
- **HTTP Client**: Axios for API communication
- **UI Framework**: Bootstrap 5 with React Bootstrap components
- **Notifications**: React Toastify for user feedback

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

## 🛠️ Installation & Setup

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE warehouse_db;
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Update database configuration in `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/warehouse_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: your_username
    password: your_password
```

Install dependencies and run:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Product Endpoints

#### Get All Products

```
GET /api/products
```

#### Get Product by ID

```
GET /api/products/{id}
```

#### Add New Product

```
POST /api/products
Content-Type: application/json

{
  "productCode": "P001",
  "productName": "Sample Product",
  "packets": 10.0,
  "qtyPerPacket": 5.0,
  "quantity": 50.0,
  "unit": "kg",
  "batchNo": "B001",
  "grnNo": "GRN001",
  "salesInvoiceNo": "INV001",
  "materialType": "RM",
  "source": "Supplier A",
  "dateAdded": "2024-01-01T10:00:00"
}
```

#### Delete Product

```
DELETE /api/products/{id}
```

#### Search Products

```
GET /api/products/search?q=search_term
```

#### Filter by Material Type

```
GET /api/products/filter?materialType=RM
```

### Transaction Endpoints

#### Get All Transactions

```
GET /api/transactions
```

#### Upload Excel File

```
POST /api/transactions/upload
Content-Type: multipart/form-data

Form Data:
- file: Excel file (.xlsx or .xls)
```

**Excel Format (11 columns):**
1. Barcode
2. Product Code
3. Product Name
4. Quantity
5. Unit
6. Batch No
7. GRN No
8. Material Type (RM/PM/FM)
9. Type (IN/OUT)
10. Party (Supplier/Client/Floor)
11. Date (DD/MM/YYYY format - Indian date system)

### Autocomplete Endpoints

```
GET /api/products/autocomplete/product-code?term=prefix
GET /api/products/autocomplete/product-name?term=prefix
GET /api/products/autocomplete/unit?term=prefix
GET /api/products/autocomplete/batch-no?term=prefix
GET /api/products/autocomplete/grn-no?term=prefix
GET /api/products/autocomplete/sales-invoice-no?term=prefix
GET /api/products/autocomplete/source?term=prefix
```

## 🗄️ Database Schema

### Products Table (current)

```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    packets DECIMAL(10,2) DEFAULT 0,
    qty_per_packet DECIMAL(10,2) DEFAULT 0,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(100) NOT NULL,
    batch_no VARCHAR(255),
    grn_no VARCHAR(255),
    sales_invoice_no VARCHAR(255),
    material_type ENUM('RM', 'PM', 'FM') NOT NULL,
    source VARCHAR(255) NOT NULL,
    date_added DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table

```sql
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(255),
    product_code VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(100) NOT NULL,
    batch_no VARCHAR(255),
    grn_no VARCHAR(255),
    material_type ENUM('RM', 'PM', 'FM') NOT NULL,
    type ENUM('IN', 'OUT') NOT NULL,
    party VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Supporting Tables

```sql
CREATE TABLE product_names (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE suppliers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100)
);
```

## 🎨 UI Components

### Main Pages

- **Dashboard**: Welcome page with navigation to main functions
- **Add Product**: Comprehensive form with autocomplete and validation
- **Product List**: Advanced table with search, filter, and sort capabilities
- **Reports**: Transaction reports with date filtering and CSV export
- **Upload**: Excel file upload for bulk transaction import
- **About**: System information and technology stack details

### Key Components

- **AutocompleteInput**: Reusable component with intelligent suggestions
- **Header/Navigation/Footer**: Consistent layout components
- **Toast Notifications**: User feedback system

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=warehouse_db
DB_USER=your_username
DB_PASSWORD=your_password
SESSION_SECRET=your_secret_key
```

### Application Properties

Key configuration options in `application.yml`:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  session:
    timeout: 86400 # 24 hours

logging:
  level:
    com.warehouse: DEBUG
```

## 🚀 Deployment

### Backend Deployment

Build the JAR file:

```bash
mvn clean package
java -jar target/warehouse-management-1.0.0.jar
```

### Frontend Deployment

Build the production bundle:

```bash
npm run build
```

Serve the `build` directory with any static file server.

## 📊 Excel Upload Feature

### Supported Formats
- **File Types**: .xlsx and .xls files
- **Date Format**: Indian date system (DD/MM/YYYY) with fallback to YYYY-MM-DD
- **File Size**: Maximum 5MB per file
- **Validation**: Automatic validation of required fields and data types

### Excel File Structure
The Excel file must contain exactly 11 columns in the following order:
1. **Barcode** - Product barcode (optional)
2. **Product Code** - Unique product identifier (required)
3. **Product Name** - Product name (required)
4. **Quantity** - Numeric quantity value (required)
5. **Unit** - Unit of measurement (required)
6. **Batch No** - Batch number (optional)
7. **GRN No** - Goods Receipt Note number (optional)
8. **Material Type** - RM/PM/FM (required)
9. **Type** - IN/OUT transaction type (required)
10. **Party** - Supplier/Client/Floor (required)
11. **Date** - Transaction date in DD/MM/YYYY format (optional, defaults to current date)

### Upload Process
1. Navigate to the Upload page
2. Select an Excel file with the correct format
3. Click "Upload File" to process
4. View success message with number of processed transactions
5. Check Reports page to see uploaded data

## 🔒 Security Features

- **CORS Configuration**: Properly configured for frontend-backend communication
- **Session Management**: Secure session handling with database storage
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: JPA/Hibernate provides built-in protection
- **File Upload Security**: File type and size validation for Excel uploads

## 🧪 Testing

### Backend Testing

```bash
mvn test
```

### Frontend Testing

```bash
npm test
```

## 📈 Performance Features

- **Connection Pooling**: Database connection pooling for better performance
- **Lazy Loading**: JPA lazy loading for related entities
- **Caching**: Session-based caching for autocomplete suggestions
- **Optimized Queries**: Custom queries for better database performance

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify MySQL is running
   - Check database credentials in `application.yml`
   - Ensure database exists

2. **CORS Errors**

   - Verify backend is running on port 8080
   - Check CORS configuration in `SecurityConfig.java`

3. **Frontend Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request




- Email: contact@xtech.com
- Phone: +1 (555) 123-4567

---

**Warehouse Management System v2.1** - Modern, scalable, and user-friendly inventory management solution.
