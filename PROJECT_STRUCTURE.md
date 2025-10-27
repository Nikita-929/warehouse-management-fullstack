# Warehouse Management System v2.1 - Project Structure

## 📁 Complete Project Structure

```
warehouse_management_v2.1/
├── 📁 backend/                          # Java Spring Boot Backend
│   ├── 📁 src/main/java/com/warehouse/
│   │   ├── 📄 WarehouseManagementApplication.java    # Main Spring Boot Application
│   │   ├── 📁 config/
│   │   │   └── 📄 SecurityConfig.java               # Security Configuration
│   │   ├── 📁 controller/
│   │   │   ├── 📄 HomeController.java               # Home/Health endpoints
│   │   │   ├── 📄 ProductController.java            # Product API endpoints
│   │   │   └── 📄 TransactionController.java        # Transactions API + Excel upload endpoints
│   │   ├── 📁 dto/
│   │   │   ├── 📄 ApiResponse.java                  # Standard API response wrapper
│   │   │   ├── 📄 ProductDTO.java                   # Product data transfer object
│   │   │   └── 📄 TransactionDTO.java               # Transaction data transfer object
│   │   ├── 📁 entity/
│   │   │   ├── 📄 MaterialType.java                 # Material type enum
│   │   │   ├── 📄 Product.java                      # Product entity
│   │   │   ├── 📄 ProductName.java                  # Product name entity
│   │   │   ├── 📄 Supplier.java                     # Supplier entity
│   │   │   └── 📄 Transaction.java                  # Transaction entity
│   │   ├── 📁 repository/
│   │   │   ├── 📄 ProductRepository.java            # Product data access
│   │   │   ├── 📄 ProductNameRepository.java        # Product name data access
│   │   │   ├── 📄 SupplierRepository.java           # Supplier data access
│   │   │   └── 📄 TransactionRepository.java        # Transaction data access
│   │   └── 📁 service/
│   │       ├── 📄 ProductService.java               # Product business logic
│   │       └── 📄 TransactionService.java           # Transaction business logic
│   ├── 📁 src/main/resources/
│   │   ├── 📄 application.yml                       # Application configuration
│   │   ├── 📄 data.sql                             # Sample data
│   │   └── 📄 schema.sql                           # Database schema
│   └── 📄 pom.xml                                  # Maven dependencies
├── 📁 frontend/                         # React Frontend
│   ├── 📁 public/
│   │   ├── 📄 index.html                           # Main HTML template
│   │   └── 📄 manifest.json                        # PWA manifest
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   │   ├── 📄 AutocompleteInput.js         # Reusable autocomplete component
│   │   │   │   └── 📄 LoadingSpinner.js            # Loading spinner component
│   │   │   ├── 📁 layout/
│   │   │   │   ├── 📄 Footer.js                    # Footer component
│   │   │   │   ├── 📄 Header.js                    # Header component
│   │   │   │   └── 📄 Navigation.js                # Navigation component
│   │   │   └── 📁 pages/
│   │   │       ├── 📄 About.js                     # About page
│   │   │       ├── 📄 AddProduct.js                # Add product form
│   │   │       ├── 📄 Dashboard.js                 # Main dashboard
│   │   │       ├── 📄 ProductList.js               # Product listing with search/filter
│   │   │       ├── 📄 Reports.js                   # Transaction reports with Indian date format
│   │   │       └── 📄 Upload.js                    # Excel upload with Indian date support
│   │   ├── 📁 services/
│   │   │   └── 📄 api.js                           # API service layer
│   │   ├── 📄 App.js                               # Main React application
│   │   ├── 📄 index.css                            # Global styles
│   │   └── 📄 index.js                             # React entry point
│   └── 📄 package.json                             # Node.js dependencies
├── 📄 README.md                          # Comprehensive documentation
├── 📄 PROJECT_STRUCTURE.md               # This file
├── 📄 setup.sh                           # Unix/Linux setup script
└── 📄 setup.bat                          # Windows setup script
```

## 🏗️ Architecture Overview

### Backend Architecture (Spring Boot)

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Controllers (REST API Endpoints)                           │
│  ├── HomeController (Health, Welcome)                       │
│  └── ProductController (CRUD, Search, Autocomplete)         │
├─────────────────────────────────────────────────────────────┤
│                    Business Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Services (Business Logic)                                  │
│  └── ProductService (Validation, Calculations, Logic)       │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                              │
├─────────────────────────────────────────────────────────────┤
│  Repositories (Data Access)                                 │
│  ├── ProductRepository                                      │
│  ├── ProductNameRepository                                  │
│  └── SupplierRepository                                     │
├─────────────────────────────────────────────────────────────┤
│                    Database Layer                           │
├─────────────────────────────────────────────────────────────┤
│  MySQL Database                                             │
│  ├── products (Main inventory table)                        │
│  ├── product_names (Autocomplete suggestions)               │
│  └── suppliers (Supplier information)                       │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Architecture (React)

```
┌─────────────────────────────────────────────────────────────┐
│                      Pages Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Route Components                                          │
│  ├── Dashboard (Welcome page)                              │
│  ├── AddProduct (Product creation form)                    │
│  ├── ProductList (Product management)                      │
│  └── About (System information)                            │
├─────────────────────────────────────────────────────────────┤
│                   Components Layer                         │
├─────────────────────────────────────────────────────────────┤
│  Layout Components                                         │
│  ├── Header (Site header)                                  │
│  ├── Navigation (Main navigation)                          │
│  └── Footer (Site footer)                                  │
│                                                             │
│  Common Components                                          │
│  ├── AutocompleteInput (Smart input with suggestions)      │
│  └── LoadingSpinner (Loading indicator)                    │
├─────────────────────────────────────────────────────────────┤
│                    Services Layer                          │
├─────────────────────────────────────────────────────────────┤
│  API Service (HTTP Communication)                          │
│  └── api.js (Axios-based API client)                      │
├─────────────────────────────────────────────────────────────┤
│                   External Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Spring Boot Backend API                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Key Components Explained

### Backend Components

#### 1. **WarehouseManagementApplication.java**

- Main Spring Boot application class
- Entry point for the backend service
- Auto-configuration and component scanning

#### 2. **SecurityConfig.java**

- Spring Security configuration
- CORS setup for frontend communication
- Session management configuration

#### 3. **ProductController.java**

- REST API endpoints for product operations
- Handles CRUD operations, search, filtering, and autocomplete
- Input validation and error handling
- Returns standardized JSON responses

#### 4. **ProductService.java**

- Business logic implementation
- Data validation and processing
- Quantity calculations
- Autocomplete suggestion logic

#### 5. **Entities (Product, ProductName, Supplier)**

- JPA entities representing database tables
- Validation annotations
- Relationship mappings

#### 6. **Repositories**

- Data access layer using Spring Data JPA
- Custom queries for search and autocomplete
- Database interaction abstraction

### Frontend Components

#### 1. **App.js**

- Main React application component
- Router configuration
- Toast notification setup
- Layout structure

#### 2. **AutocompleteInput.js**

- Reusable component for intelligent input suggestions
- Real-time API calls for suggestions
- Click-to-fill functionality
- Loading states and error handling

#### 3. **AddProduct.js**

- Comprehensive product creation form
- Real-time quantity calculation
- Form validation
- Autocomplete integration
- Success/error feedback

#### 4. **ProductList.js**

- Advanced product management interface
- Search functionality
- Material type filtering
- Column sorting
- Delete operations with confirmation

#### 5. **api.js**

- Centralized API communication
- Axios configuration
- Error handling
- Request/response interceptors

## 🗄️ Database Schema

### Core Tables

#### **products**

```sql
- id (Primary Key)
- product_code (Unique, Required)
- product_name (Required)
- packets (Decimal)
- qty_per_packet (Decimal)
- quantity (Required, Calculated)
- unit (Required)
- batch_no (Optional)
- grn_no (Optional)
- sales_invoice_no (Optional)
- material_type (Enum: RM, PM, FM)
- source (Required)
- date_added (DateTime)
- created_at (DateTime)
```

#### **product_names**

```sql
- id (Primary Key)
- name (Unique, Required)
```

#### **transactions**

```sql
- id (Primary Key)
- barcode (Optional)
- product_code (Required)
- product_name (Required)
- quantity (Required, Decimal)
- unit (Required)
- batch_no (Optional)
- grn_no (Optional)
- material_type (Enum: RM, PM, FM)
- type (Enum: IN, OUT)
- party (Required)
- created_at (DateTime)
```

#### **suppliers**

```sql
- id (Primary Key)
- name (Required)
- type (Optional)
```

## 🚀 API Endpoints

### Product Management

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `DELETE /api/products/{id}` - Delete product

### Search & Filter

- `GET /api/products/search?q={term}` - Search products
- `GET /api/products/filter?materialType={type}` - Filter by material type

### Autocomplete

- `GET /api/products/autocomplete/product-code?term={prefix}`
- `GET /api/products/autocomplete/product-name?term={prefix}`
- `GET /api/products/autocomplete/unit?term={prefix}`
- `GET /api/products/autocomplete/batch-no?term={prefix}`
- `GET /api/products/autocomplete/grn-no?term={prefix}`
- `GET /api/products/autocomplete/sales-invoice-no?term={prefix}`
- `GET /api/products/autocomplete/source?term={prefix}`

### Transaction Management

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions/upload` - Upload Excel file for bulk transaction import

### System

- `GET /api/` - Welcome message
- `GET /api/health` - Health check

## 🎨 UI Features

### Responsive Design

- Mobile-first Bootstrap 5 framework
- Responsive tables and forms
- Adaptive navigation

### User Experience

- Real-time form validation
- Loading indicators
- Toast notifications
- Confirmation dialogs
- Auto-calculations

### Advanced Features

- Intelligent autocomplete
- Multi-column sorting
- Real-time search
- Material type filtering
- Batch operations

## 🔒 Security Features

### Backend Security

- CORS configuration
- Input validation
- SQL injection protection (JPA)
- Session management
- Error handling

### Data Protection

- Environment variable configuration
- Secure database connections
- Input sanitization
- XSS protection

## 📊 Performance Optimizations

### Backend

- Connection pooling
- Lazy loading
- Custom queries
- Index optimization
- Caching strategies

### Frontend

- Component optimization
- Efficient state management
- Debounced search
- Lazy loading
- Bundle optimization

This structure provides a solid foundation for a scalable warehouse management system with modern development practices and technologies.
