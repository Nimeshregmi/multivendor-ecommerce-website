# Product API Documentation

This document provides detailed information about the Product API endpoints. All endpoints are prefixed with `/products/`.

---

## **1. List Products**
**Endpoint**: `GET /products/`

**Description**:  
Retrieve a list of products with filtering, searching, and ordering capabilities.

**Parameters**:
| Parameter     | Type    | Description                                                                 |
|---------------|---------|-----------------------------------------------------------------------------|
| `min_price`   | number  | Filter products with price greater than or equal to this value             |
| `max_price`   | number  | Filter products with price less than or equal to this value                |
| `min_rating`  | number  | Filter products with average rating greater than or equal to this value    |
| `max_rating`  | number  | Filter products with average rating less than or equal to this value       |
| `search`      | string  | Search across name, description, tags, category, and seller fields         |
| `category`    | string  | Filter products by category name (partial match)                           |
| `seller`      | string  | Filter products by seller username (partial match)                         |
| `slug`        | string  | Filter products by exact slug match                                        |
| `ordering`    | string  | Order results by `price`, `average_rating`, or `created_at` (use `-` for descending) |
| `page`        | number  | Page number for pagination (default page size: 20)                         |

**Example Request**: 