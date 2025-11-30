/**
 * SortSelect Component
 * Dropdown menu for sorting products by various criteria
 * Options: name, price (low to high), price (high to low), rating, newest
 * Props: onSortChange (callback when sort option changes)
 */

export default function SortSelect({ onSortChange }) {
  // Handle sort selection change
  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    
    // Notify parent component of sort change
    if (onSortChange) {
      onSortChange(sortOption);
    }
  };

  return (
    <div className="sort-select">
      {/* Label */}
      <label htmlFor="sort-dropdown">Sort by:</label>

      {/* Dropdown menu */}
      <select
        id="sort-dropdown"
        onChange={handleSortChange}
        defaultValue="recommended"
        className="sort-dropdown"
      >
        <option value="recommended">Recommended</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
        <option value="rating">Rating (Highest)</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
