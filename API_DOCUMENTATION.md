# Warehouse Management System v2.1 - API Documentation

## Overview

This document provides comprehensive API documentation for the Warehouse Management System v2.1, including all endpoints, parameters, error codes, and detailed examples.

**Base URL:** `http://localhost:8080/api`  
**Content-Type:** `application/json` (except file uploads)  
**Date Format:** Indian format (DD/MM/YYYY) with fallback to YYYY-MM-DD

## Response Format

All API responses follow a standardized format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null
}
```

## Authentication

Currently, the system uses session-based authentication with Spring Security. All endpoints are accessible without explicit authentication tokens.

---

## Product Management APIs

### 1. Get All Products

**Endpoint:** `GET /products`

**Description:** Retrieves all products from the database.

**Parameters:** None

**Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": 1,
      "productCode": "P001",
      "productName": "Steel Rod",
      "packets": 10.0,
      "qtyPerPacket": 5.0,
      "quantity": 50.0,
      "unit": "kg",
      "batchNo": "B001",
      "grnNo": "GRN001",
      "salesInvoiceNo": "INV001",
      "materialType": "RM",
      "source": "ABC Steel Corp",
      "dateAdded": "2024-01-01T10:00:00",
      "createdAt": "2024-01-01T10:00:00"
    }
  ]
}
```

**Error Responses:**

- `500 Internal Server Error`: Database connection issues
- `400 Bad Request`: Invalid request format

---

### 2. Get Product by ID

**Endpoint:** `GET /products/{id}`

**Description:** Retrieves a specific product by its ID.

**Parameters:**

- `id` (path, required): Product ID (integer)

**Example Request:**

```
GET /api/products/1
```

**Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": 1,
    "productCode": "P001",
    "productName": "Steel Rod",
    "packets": 10.0,
    "qtyPerPacket": 5.0,
    "quantity": 50.0,
    "unit": "kg",
    "batchNo": "B001",
    "grnNo": "GRN001",
    "salesInvoiceNo": "INV001",
    "materialType": "RM",
    "source": "ABC Steel Corp",
    "dateAdded": "2024-01-01T10:00:00",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

**Error Responses:**

- `404 Not Found`: Product not found
- `400 Bad Request`: Invalid ID format
- `500 Internal Server Error`: Database error

---

### 3. Create New Product

**Endpoint:** `POST /products`

**Description:** Creates a new product in the database.

**Request Body:**

```json
{
  "productCode": "P001",
  "productName": "Steel Rod",
  "packets": 10.0,
  "qtyPerPacket": 5.0,
  "quantity": 50.0,
  "unit": "kg",
  "batchNo": "B001",
  "grnNo": "GRN001",
  "salesInvoiceNo": "INV001",
  "materialType": "RM",
  "source": "ABC Steel Corp",
  "dateAdded": "2024-01-01T10:00:00"
}
```

**Field Validation:**

- `productCode` (required): String, max 255 characters
- `productName` (required): String, max 255 characters
- `packets` (optional): Decimal, default 0
- `qtyPerPacket` (optional): Decimal, default 0
- `quantity` (required): Decimal, calculated as packets × qtyPerPacket
- `unit` (required): String, max 100 characters
- `batchNo` (optional): String, max 255 characters
- `grnNo` (optional): String, max 255 characters
- `salesInvoiceNo` (optional): String, max 255 characters
- `materialType` (required): Enum (RM, PM, FM)
- `source` (required): String, max 255 characters
- `dateAdded` (optional): DateTime, defaults to current time

**Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "productCode": "P001",
    "productName": "Steel Rod",
    "packets": 10.0,
    "qtyPerPacket": 5.0,
    "quantity": 50.0,
    "unit": "kg",
    "batchNo": "B001",
    "grnNo": "GRN001",
    "salesInvoiceNo": "INV001",
    "materialType": "RM",
    "source": "ABC Steel Corp",
    "dateAdded": "2024-01-01T10:00:00",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "data": {
      "errors": [
        {
          "field": "productCode",
          "message": "Product code is required"
        }
      ]
    }
  }
  ```
- `500 Internal Server Error`: Database error

---

### 4. Delete Product

**Endpoint:** `DELETE /products/{id}`

**Description:** Deletes a product by its ID.

**Parameters:**

- `id` (path, required): Product ID (integer)

**Example Request:**

```
DELETE /api/products/1
```

**Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Error Responses:**

- `404 Not Found`: Product not found
- `400 Bad Request`: Invalid ID format
- `500 Internal Server Error`: Database error

---

### 5. Search Products

**Endpoint:** `GET /products/search`

**Description:** Searches products by various fields.

**Parameters:**

- `q` (query, required): Search term (string)

**Example Request:**

```
GET /api/products/search?q=steel
```

**Response:**

```json
{
  "success": true,
  "message": "Search completed",
  "data": [
    {
      "id": 1,
      "productCode": "P001",
      "productName": "Steel Rod",
      "packets": 10.0,
      "qtyPerPacket": 5.0,
      "quantity": 50.0,
      "unit": "kg",
      "batchNo": "B001",
      "grnNo": "GRN001",
      "salesInvoiceNo": "INV001",
      "materialType": "RM",
      "source": "ABC Steel Corp",
      "dateAdded": "2024-01-01T10:00:00",
      "createdAt": "2024-01-01T10:00:00"
    }
  ]
}
```

**Error Responses:**

- `400 Bad Request`: Missing search parameter
- `500 Internal Server Error`: Database error

---

### 6. Filter Products by Material Type

**Endpoint:** `GET /products/filter`

**Description:** Filters products by material type.

**Parameters:**

- `materialType` (query, required): Material type (RM, PM, FM)

**Example Request:**

```
GET /api/products/filter?materialType=RM
```

**Response:**

```json
{
  "success": true,
  "message": "Filter applied",
  "data": [
    {
      "id": 1,
      "productCode": "P001",
      "productName": "Steel Rod",
      "packets": 10.0,
      "qtyPerPacket": 5.0,
      "quantity": 50.0,
      "unit": "kg",
      "batchNo": "B001",
      "grnNo": "GRN001",
      "salesInvoiceNo": "INV001",
      "materialType": "RM",
      "source": "ABC Steel Corp",
      "dateAdded": "2024-01-01T10:00:00",
      "createdAt": "2024-01-01T10:00:00"
    }
  ]
}
```

**Error Responses:**

- `400 Bad Request`: Invalid material type
- `500 Internal Server Error`: Database error

---

## Autocomplete APIs

### 7. Product Code Autocomplete

**Endpoint:** `GET /products/autocomplete/product-code`

**Description:** Provides autocomplete suggestions for product codes.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/product-code?term=P0
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["P001", "P002", "P003"]
}
```

---

### 8. Product Name Autocomplete

**Endpoint:** `GET /products/autocomplete/product-name`

**Description:** Provides autocomplete suggestions for product names.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/product-name?term=Steel
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["Steel Rod", "Steel Sheet", "Steel Wire"]
}
```

---

### 9. Unit Autocomplete

**Endpoint:** `GET /products/autocomplete/unit`

**Description:** Provides autocomplete suggestions for units.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/unit?term=kg
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["kg", "kg/m", "kg/sqm"]
}
```

---

### 10. Batch Number Autocomplete

**Endpoint:** `GET /products/autocomplete/batch-no`

**Description:** Provides autocomplete suggestions for batch numbers.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/batch-no?term=B0
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["B001", "B002", "B003"]
}
```

---

### 11. GRN Number Autocomplete

**Endpoint:** `GET /products/autocomplete/grn-no`

**Description:** Provides autocomplete suggestions for GRN numbers.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/grn-no?term=GRN
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["GRN001", "GRN002", "GRN003"]
}
```

---

### 12. Sales Invoice Number Autocomplete

**Endpoint:** `GET /api/products/autocomplete/sales-invoice-no`

**Description:** Provides autocomplete suggestions for sales invoice numbers.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/sales-invoice-no?term=INV
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["INV001", "INV002", "INV003"]
}
```

---

### 13. Source Autocomplete

**Endpoint:** `GET /api/products/autocomplete/source`

**Description:** Provides autocomplete suggestions for sources.

**Parameters:**

- `term` (query, required): Search prefix (string)

**Example Request:**

```
GET /api/products/autocomplete/source?term=ABC
```

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved",
  "data": ["ABC Steel Corp", "ABC Manufacturing", "ABC Industries"]
}
```

---

## Lookup APIs

### 14. Lookup by Product Name

**Endpoint:** `GET /products/lookup/by-name`

**Description:** Looks up product details by product name.

**Parameters:**

- `name` (query, required): Product name (string)

**Example Request:**

```
GET /api/products/lookup/by-name?name=Steel Rod
```

**Response:**

```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "id": 1,
    "productCode": "P001",
    "productName": "Steel Rod",
    "packets": 10.0,
    "qtyPerPacket": 5.0,
    "quantity": 50.0,
    "unit": "kg",
    "batchNo": "B001",
    "grnNo": "GRN001",
    "salesInvoiceNo": "INV001",
    "materialType": "RM",
    "source": "ABC Steel Corp",
    "dateAdded": "2024-01-01T10:00:00",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

**Error Responses:**

- `404 Not Found`: Product not found
- `400 Bad Request`: Missing name parameter

---

### 15. Lookup by Product Code

**Endpoint:** `GET /products/lookup/by-code`

**Description:** Looks up product details by product code.

**Parameters:**

- `code` (query, required): Product code (string)

**Example Request:**

```
GET /api/products/lookup/by-code?code=P001
```

**Response:**

```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "id": 1,
    "productCode": "P001",
    "productName": "Steel Rod",
    "packets": 10.0,
    "qtyPerPacket": 5.0,
    "quantity": 50.0,
    "unit": "kg",
    "batchNo": "B001",
    "grnNo": "GRN001",
    "salesInvoiceNo": "INV001",
    "materialType": "RM",
    "source": "ABC Steel Corp",
    "dateAdded": "2024-01-01T10:00:00",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

**Error Responses:**

- `404 Not Found`: Product not found
- `400 Bad Request`: Missing code parameter

---

## Transaction Management APIs

### 16. Get All Transactions

**Endpoint:** `GET /transactions`

**Description:** Retrieves all transactions from the database.

**Parameters:** None

**Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": 1,
      "barcode": "123456789",
      "productCode": "P001",
      "productName": "Steel Rod",
      "quantity": 50.0,
      "unit": "kg",
      "batchNo": "B001",
      "grnNo": "GRN001",
      "materialType": "RM",
      "type": "IN",
      "party": "ABC Steel Corp",
      "createdAt": "2024-01-01T10:00:00"
    }
  ]
}
```

**Error Responses:**

- `500 Internal Server Error`: Database connection issues
- `400 Bad Request`: Invalid request format

---

### 17. Upload Excel File

**Endpoint:** `POST /transactions/upload`

**Description:** Uploads an Excel file to bulk import transactions with Indian date format support.

**Content-Type:** `multipart/form-data`

**Parameters:**

- `file` (form-data, required): Excel file (.xlsx or .xls)

**File Requirements:**

- **File Types:** .xlsx, .xls
- **Maximum Size:** 5MB
- **Date Format:** DD/MM/YYYY (Indian format) with fallback to DD-MM-YYYY and YYYY-MM-DD

**Excel File Structure (11 columns):**

1. **Barcode** (optional): Product barcode
2. **Product Code** (required): Unique product identifier
3. **Product Name** (required): Product name
4. **Quantity** (required): Numeric quantity value
5. **Unit** (required): Unit of measurement
6. **Batch No** (optional): Batch number
7. **GRN No** (optional): Goods Receipt Note number
8. **Material Type** (required): RM/PM/FM
9. **Type** (required): IN/OUT transaction type
10. **Party** (required): Supplier/Client/Floor
11. **Date** (optional): Transaction date in DD/MM/YYYY format

**Example Request:**

```
POST /api/transactions/upload
Content-Type: multipart/form-data

Form Data:
- file: [Excel file with 11 columns]
```

**Response:**

```json
{
  "success": true,
  "message": "Excel file uploaded and processed successfully",
  "data": {
    "processed": 25,
    "total": 25,
    "message": "Excel file uploaded and processed successfully"
  }
}
```

**Error Responses:**

- `400 Bad Request`: File validation errors
  ```json
  {
    "success": false,
    "message": "Please upload an Excel file (.xlsx or .xls)",
    "data": null
  }
  ```
- `400 Bad Request`: File size exceeded
  ```json
  {
    "success": false,
    "message": "File size must be less than 5MB",
    "data": null
  }
  ```
- `400 Bad Request`: No valid data found
  ```json
  {
    "success": false,
    "message": "No valid data found in the Excel file",
    "data": null
  }
  ```
- `400 Bad Request`: Data validation errors
  ```json
  {
    "success": false,
    "message": "Error processing file: Invalid data format",
    "data": null
  }
  ```
- `500 Internal Server Error`: Server processing error

**Date Format Support:**

- **Primary:** DD/MM/YYYY (e.g., 25/10/2024)
- **Alternative:** DD-MM-YYYY (e.g., 25-10-2024)
- **Fallback:** YYYY-MM-DD (e.g., 2024-10-25)
- **Excel Native:** Excel date cells are automatically converted
- **Default:** Current date if no date provided or parsing fails

---

## System APIs

### 18. Welcome Message

**Endpoint:** `GET /`

**Description:** Returns a welcome message for the API.

**Parameters:** None

**Response:**

```json
{
  "success": true,
  "message": "Welcome to Warehouse Management System API",
  "data": {
    "version": "2.1",
    "status": "active"
  }
}
```

---

### 19. Health Check

**Endpoint:** `GET /health`

**Description:** Returns the health status of the API.

**Parameters:** None

**Response:**

```json
{
  "success": true,
  "message": "System is healthy",
  "data": {
    "status": "UP",
    "timestamp": "2024-01-01T10:00:00",
    "database": "Connected",
    "version": "2.1"
  }
}
```

**Error Responses:**

- `503 Service Unavailable`: System health issues
  ```json
  {
    "success": false,
    "message": "System is unhealthy",
    "data": {
      "status": "DOWN",
      "timestamp": "2024-01-01T10:00:00",
      "database": "Disconnected",
      "version": "2.1"
    }
  }
  ```

---

## Error Codes Reference

### HTTP Status Codes

| Code | Description           | Common Causes                         |
| ---- | --------------------- | ------------------------------------- |
| 200  | OK                    | Successful request                    |
| 400  | Bad Request           | Invalid parameters, validation errors |
| 404  | Not Found             | Resource not found                    |
| 500  | Internal Server Error | Database errors, server issues        |
| 503  | Service Unavailable   | System health issues                  |

### Validation Error Codes

| Field        | Error Message                         | Description            |
| ------------ | ------------------------------------- | ---------------------- |
| productCode  | "Product code is required"            | Missing required field |
| productName  | "Product name is required"            | Missing required field |
| quantity     | "Quantity is required"                | Missing required field |
| unit         | "Unit is required"                    | Missing required field |
| materialType | "Material type must be RM, PM, or FM" | Invalid enum value     |
| type         | "Type must be IN or OUT"              | Invalid enum value     |
| party        | "Party is required"                   | Missing required field |

### File Upload Error Codes

| Error                                         | Description           | Solution                       |
| --------------------------------------------- | --------------------- | ------------------------------ |
| "File is empty"                               | No file provided      | Select a file before uploading |
| "Please upload an Excel file (.xlsx or .xls)" | Invalid file type     | Use .xlsx or .xls format       |
| "File size must be less than 5MB"             | File too large        | Reduce file size               |
| "No valid data found in the Excel file"       | Empty or invalid data | Check Excel file content       |
| "Error reading file"                          | File corruption       | Try a different file           |
| "Error processing file"                       | Data parsing error    | Check Excel format and data    |

---

## Rate Limiting

Currently, no rate limiting is implemented. All endpoints are accessible without restrictions.

---

## CORS Configuration

The API is configured to accept requests from:

- `http://localhost:3000` (Frontend development server)

---

## Date and Time Handling

- **Input Format:** Indian date format (DD/MM/YYYY) preferred
- **Database Storage:** UTC timestamps
- **API Response:** ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
- **Frontend Display:** Indian format (DD/MM/YYYY)

---

## Examples

### Complete Product Creation Flow

1. **Create Product:**

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "productCode": "P001",
    "productName": "Steel Rod",
    "packets": 10.0,
    "qtyPerPacket": 5.0,
    "quantity": 50.0,
    "unit": "kg",
    "batchNo": "B001",
    "grnNo": "GRN001",
    "salesInvoiceNo": "INV001",
    "materialType": "RM",
    "source": "ABC Steel Corp"
  }'
```

2. **Search Products:**

```bash
curl "http://localhost:8080/api/products/search?q=steel"
```

3. **Get Autocomplete Suggestions:**

```bash
curl "http://localhost:8080/api/products/autocomplete/product-name?term=Steel"
```

### Complete Transaction Upload Flow

1. **Upload Excel File:**

```bash
curl -X POST http://localhost:8080/api/transactions/upload \
  -F "file=@transactions.xlsx"
```

2. **View Uploaded Transactions:**

```bash
curl "http://localhost:8080/api/transactions"
```

---

## Support

For API support and questions:

- **Email:** contact@xtech.com
- **Phone:** +1 (555) 123-4567

---

**Last Updated:** October 25, 2024  
**API Version:** 2.1  
**Documentation Version:** 1.0
