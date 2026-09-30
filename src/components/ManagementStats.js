import React from "react";

function ManagementStats({ menuItems }) {

    const categories = [
        ...new Set(menuItems.map((item) => item.category))
    ];

    const featured = menuItems.filter(
        (item) => item.bestseller
    );

    return (
        <div className="management-stats">

            <div className="management-stat">
                <strong>{menuItems.length}</strong>
                <span>MENU ITEMS</span>
            </div>

            <div className="management-stat">
                <strong>{categories.length}</strong>
                <span>CATEGORIES</span>
            </div>

            <div className="management-stat">
                <strong>{featured.length}</strong>
                <span>FEATURED</span>
            </div>

        </div>
    );
}

export default ManagementStats;