import React, { useState } from "react";

function MenuCard({ item, onModify, onDelete }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="menu-card">

      <div className="menu-card-content">

        <div className="menu-card-top">

          <div className="menu-tags">

            {item.bestseller && (
              <span className="bestseller">
                Bestseller
              </span>
            )}

            {item.veg && (
              <span className="veg-badge">
                VEG
              </span>
            )}

          </div>

          <span className="prep-time">
            {item.time}
          </span>

        </div>

        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <div className="menu-card-bottom">

          <strong>₹{item.price}</strong>

          <div className="menu-card-actions">
            <button
              type="button"
              className="modify-button"
              onClick={() => onModify(item)}
            >
              Modify
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </div>

        </div>

      </div>

      <div className="menu-card-image">

        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-fallback">
            <span>Food</span>
          </div>
        )}

      </div>

    </article>
  );
}

export default MenuCard;