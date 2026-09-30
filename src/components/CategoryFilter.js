import React from "react";

function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  onOpenBook,
}) {
  return (
    <div className="category-filter">

      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-active"
              : ""
          }
          onClick={() => {
            setSelectedCategory(category);
            if (onOpenBook) {
              onOpenBook(category);
            }
          }}
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;