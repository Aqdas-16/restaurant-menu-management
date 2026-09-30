import React from "react";
import MenuCard from "./MenuCard";

function MenuSection({ title, items, onModify, onDelete }) {

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="menu-section">

            <div className="section-heading">

                <div>
                    <span className="section-eyebrow">
                        EXPLORE
                    </span>

                    <h2>{title}</h2>
                </div>

                <span className="item-count">
                    {items.length} items
                </span>

            </div>

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

        </section>
    );
}

export default MenuSection;