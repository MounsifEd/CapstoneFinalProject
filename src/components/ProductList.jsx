/**
 * ProductList Component
 * Renders a list of products in a grid or list layout
 * Props: products (array of product objects)
 */

import ProductCard from "./ProductCard";

export default function ProductList({ products = [] }) {
  // Handle empty product list
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {/* Product grid */}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
