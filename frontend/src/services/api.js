import axios from "axios";

// Use environment variable at build time for production (create-react-app convention)
// REACT_APP_API_URL should include the full base (e.g. https://api.example.com/api)
// Fallback to same origin + /api for local dev or when env var is missing.
const API_BASE_URL =
  process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export const productService = {
  // Get all products
  getAllProducts: () => api.get("/products"),

  // Get product by ID
  getProductById: (id) => api.get(`/products/${id}`),

  // Add new product
  addProduct: (productData) => api.post("/products", productData),

  // Delete product
  deleteProduct: (id) => api.delete(`/products/${id}`),

  // Search products
  searchProducts: (searchTerm) =>
    api.get(`/products/search?q=${encodeURIComponent(searchTerm)}`),

  // Filter by material type
  filterByMaterialType: (materialType) =>
    api.get(`/products/filter?materialType=${materialType}`),

  // Autocomplete endpoints
  getProductCodeSuggestions: (term) =>
    api.get(
      `/products/autocomplete/product-code?term=${encodeURIComponent(term)}`
    ),
  getProductNameSuggestions: (term) =>
    api.get(
      `/products/autocomplete/product-name?term=${encodeURIComponent(term)}`
    ),
  getUnitSuggestions: (term) =>
    api.get(`/products/autocomplete/unit?term=${encodeURIComponent(term)}`),
  getBatchNoSuggestions: (term) =>
    api.get(`/products/autocomplete/batch-no?term=${encodeURIComponent(term)}`),
  getGrnNoSuggestions: (term) =>
    api.get(`/products/autocomplete/grn-no?term=${encodeURIComponent(term)}`),
  getSalesInvoiceNoSuggestions: (term) =>
    api.get(
      `/products/autocomplete/sales-invoice-no?term=${encodeURIComponent(term)}`
    ),
  getSourceSuggestions: (term) =>
    api.get(`/products/autocomplete/source?term=${encodeURIComponent(term)}`),
  // Lookup helpers
  lookupByProductName: (name) =>
    api.get(`/products/lookup/by-name?name=${encodeURIComponent(name)}`),
  lookupByProductCode: (code) =>
    api.get(`/products/lookup/by-code?code=${encodeURIComponent(code)}`),
};

export const homeService = {
  getHealth: () => api.get("/health"),
};

export default api;
