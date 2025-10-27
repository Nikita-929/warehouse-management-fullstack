# Warehouse Management - Workflow and Page Relationships

## Overview

This document explains the end-to-end workflow, relationships between pages, and the functionality of each page and API involved in the system.

Backend: Java Spring Boot (REST API under `/api`)
Frontend: React (Bootstrap 5) served on `http://localhost:3000`
Database: MySQL (schema seeded by `schema.sql` and `data.sql`)

## High-Level Flow

1. User lands on `Dashboard` and navigates to desired action:
   - Add Product
   - View Products
   - Reports (Transactions)
   - Upload (Transactions via Excel)
2. Frontend communicates with backend via `api.js` using Axios.
3. Backend controllers return standardized `ApiResponse` wrappers.
4. UI shows toast notifications for success/errors.

## Page Relationships

- Dashboard → links to Add Product, Product List, Reports, Upload
- Add Product → after saving, stays on page and resets with success toast
- Product List → pulls data from `/products` and allows delete; link back to Add Product
- Reports → fetches `/transactions` and supports client-side filtering and CSV export
- Upload → posts to `/transactions/upload` and shows result with Indian date format support

## Frontend Pages and Functionality

### Dashboard (`src/components/pages/Dashboard.js`)

- Simple navigation hub.
- Cards linking to Add Product, Product List, Reports, and Upload.

### Add Product (`src/components/pages/AddProduct.js`)

- Fields: productCode, productName, packets, qtyPerPacket, quantity, unit, batchNo, grnNo, salesInvoiceNo, materialType, source, dateAdded.
- IST default: `dateAdded` prefilled to current time in `Asia/Kolkata` timezone.
- Quantity auto-calc: `quantity = packets * qtyPerPacket` on change.
- Autocomplete: uses `AutocompleteInput` for multiple fields; suggestions from backend prefix queries.
- Code-name mapping: one-to-one mapping behavior
  - Typing/selecting Product Code auto-fills Product Name if known (`/products/lookup/by-code`).
  - Typing/selecting Product Name auto-fills Product Code if known (`/products/lookup/by-name`).
- Submit: POST `/products` with DTO; on success, resets form and shows toast.

### Product List (`src/components/pages/ProductList.js`)

- Displays all products (`GET /products`).
- Search across code/name/batch/source.
- Filter by material type (RM/PM/FM).
- Sort by columns (code, name, date added).
- Delete product (`DELETE /products/{id}`) with confirmation and success toast.

### Reports (`src/components/pages/Reports.js`)

- Fetches all transactions (`GET /transactions`).
- Client-side filters: date range and type (IN/OUT).
- Export CSV of the filtered table.
- Handles loading states and duplicate error toasts suppression in StrictMode.

What happens on load and when filters change:

- On page mount, a request is sent to `/transactions`. While loading, a spinner appears in the card header. When the response arrives, the table renders all transactions sorted by creation time (as provided by the backend).
- When you set From/To date or change the Type filter (All/IN/OUT) and click Apply Filters, the filtering happens client-side against the fetched list. The table updates immediately to reflect matches.
- Columns displayed per row: Barcode, Product Code, Product Name, Quantity, Unit, Batch No, GRN No, Material Type (RM/PM/FM), Type (IN/OUT), Party (Supplier/Client/Floor), Date (formatted in Indian DD/MM/YYYY format).
- Export to Excel (CSV): exports exactly what is currently visible after filters are applied.

### Upload (`src/components/pages/Upload.js`)

- Select and upload an Excel file to import transactions with Indian date format support.
- Validates file extension (.xlsx/.xls) and size (≤5MB).
- Posts multipart form data to `/transactions/upload`.
- Shows processed count on success; error toast on failure.
- **Excel Format**: 11 columns including Date column (DD/MM/YYYY format - Indian date system).

**Excel File Structure:**
1. Barcode (optional)
2. Product Code (required)
3. Product Name (required)
4. Quantity (required)
5. Unit (required)
6. Batch No (optional)
7. GRN No (optional)
8. Material Type - RM/PM/FM (required)
9. Type - IN/OUT (required)
10. Party - Supplier/Client/Floor (required)
11. Date - DD/MM/YYYY format (optional, defaults to current date)

**Upload Process:**
- The button is disabled while uploading and a small spinner is shown.
- The component validates the file: only `.xlsx`/`.xls` and size ≤ 5MB. If validation fails, a single error toast is shown and no request is made.
- Backend parses Excel file with Indian date format priority (DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD).
- On success response, a success toast appears showing how many transactions were processed; the file input resets.
- If an error occurs (e.g., validation error from backend or parse failure), an error toast is shown with the server-provided message when available.
- To see newly uploaded transactions in Reports, navigate to Reports (or refresh the Reports page) so it refetches `/transactions`.

## Shared Components

### AutocompleteInput (`src/components/common/AutocompleteInput.js`)

- Controlled input with suggestions dropdown.
- Fetches suggestions as user types; throttled via user typing (no explicit debounce).
- Click behavior uses `onMouseDown` to ensure selection before blur; sets input value and calls `onChange`.

## Backend API Summary

Base path: `/api`

### Products

- `GET /products` — list all products
- `GET /products/{id}` — product by id
- `POST /products` — create product (allows duplicate product_code; code↔name mapping is informational on UI)
- `DELETE /products/{id}` — delete product
- `GET /products/search?q=...` — search by code/name
- `GET /products/filter?materialType=RM|PM|FM` — filter by material type
- Autocomplete:
  - `GET /products/autocomplete/product-code?term=...`
  - `GET /products/autocomplete/product-name?term=...`
  - `GET /products/autocomplete/unit?term=...`
  - `GET /products/autocomplete/batch-no?term=...`
  - `GET /products/autocomplete/grn-no?term=...`
  - `GET /products/autocomplete/sales-invoice-no?term=...`
  - `GET /products/autocomplete/source?term=...`
- Lookups (for autofill):
  - `GET /products/lookup/by-name?name=...`
  - `GET /products/lookup/by-code?code=...`

### Transactions

- `GET /transactions` — list all transactions (for reports)
- `POST /transactions` — add a single transaction (service supports it)
- `POST /transactions/upload` — upload Excel and bulk-insert with Indian date format support

**Transaction Upload Endpoint Details:**
- Accepts multipart/form-data with Excel file (.xlsx/.xls)
- Parses 11 columns including Date column (DD/MM/YYYY format)
- Validates required fields: Product Code, Product Name, Quantity, Unit, Material Type, Type, Party
- Supports multiple date formats: DD/MM/YYYY (primary), DD-MM-YYYY, YYYY-MM-DD
- Returns upload result with processed count and success message
- Handles file validation (type, size ≤5MB) and data validation

## Data Model Notes

- products: allows duplicate `product_code` values (drop DB unique index if present).
- products has `date_added` and `created_at` defaults in schema; entity also sets them on construction.
- a legacy `date` column is mapped in the entity to satisfy older DBs; it’s set automatically.

## Typical User Journeys

1. Add a product with suggestions

   - User types product name → pick suggestion → code auto-fills.
   - Fill quantities, unit, material type, source → Save.

2. Manage inventory list

   - Navigate to Product List → search/filter/sort → delete unwanted item.

3. Review and export transactions

   - Navigate to Reports → set date range/type → export CSV.

4. Bulk import
   - Navigate to Upload → select `.xlsx`/`.xls` → upload → view processed count.

## Ops Notes

- Start backend: `mvn spring-boot:run` (in `backend`)
- Build backend: `mvn -DskipTests clean package`
- Run jar: `java -jar backend/target/warehouse-management-1.0.0.jar`
- Start frontend: `npm start` (in `frontend`)
