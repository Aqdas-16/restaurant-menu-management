import React from "react";
import MenuCard from "./MenuCard";

function MenuList({ items, onModify, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-menu">
        <div className="empty-icon">⌕</div>

        <h3>No dishes found</h3>

        <p>
          Try searching for another dish or select a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="menu-grid">

      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onModify={onModify}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default MenuList;