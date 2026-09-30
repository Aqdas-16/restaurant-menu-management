import React, { useMemo, useState } from "react";

const BOOK_CATEGORIES = [
  "Starters",
  "Main Course",
  "Breads",
  "Desserts",
  "Beverages",
];

function BookMenu({ menuItems = [], defaultCategory = "All", onClose }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [imageErrors, setImageErrors] = useState({});

  const categories = useMemo(
    () => [
      "All",
      ...BOOK_CATEGORIES.filter((category) =>
        menuItems.some((item) => item.category === category)
      ),
    ],
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;

    return menuItems.filter(
      (item) => item.category === activeCategory
    );
  }, [menuItems, activeCategory]);

  const groupedItems = useMemo(() => {
    return BOOK_CATEGORIES.map((category) => ({
      category,
      items: filteredItems.filter(
        (item) => item.category === category
      ),
    })).filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const handleImageError = (id) => {
    setImageErrors((previous) => ({
      ...previous,
      [id]: true,
    }));
  };

  return (
    <div
      onClick={onClose}
      style={styles.overlay}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={styles.modal}
      >
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.logo}>SH</div>

            <div>
              <h2 style={styles.brandName}>SPICE HAVEN</h2>
              <p style={styles.brandSubtitle}>AUTHENTIC INDIAN CUISINE</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close menu"
          >
            ✕
          </button>
        </header>

        {/* Pamphlet heading */}
        <section style={styles.intro}>
          <p style={styles.eyebrow}>OUR MENU</p>

          <h1 style={styles.title}>A taste of India.</h1>

          <p style={styles.description}>
            Fresh ingredients, traditional recipes, and flavours
            made to be shared.
          </p>

          <div style={styles.introLine} />
        </section>

        {/* Category navigation */}
        <nav style={styles.categoryNav} aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === category
                  ? styles.activeCategoryButton
                  : {}),
              }}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Menu list */}
        <main style={styles.menuContent}>
          {groupedItems.length === 0 ? (
            <p style={styles.emptyMessage}>
              No menu items available.
            </p>
          ) : (
            groupedItems.map((group) => (
              <section
                key={group.category}
                style={styles.categorySection}
              >
                <div style={styles.sectionHeading}>
                  <div>
                    <p style={styles.sectionEyebrow}>
                      SPICE HAVEN
                    </p>

                    <h2 style={styles.categoryTitle}>
                      {group.category}
                    </h2>
                  </div>

                  <span style={styles.itemCount}>
                    {String(group.items.length).padStart(2, "0")} ITEMS
                  </span>
                </div>

                <div style={styles.itemsList}>
                  {group.items.map((item) => (
                    <article
                      key={item.id}
                      style={styles.menuItem}
                    >
                      {/* Food image */}
                      <div style={styles.imageWrapper}>
                        {!imageErrors[item.id] && item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={() => handleImageError(item.id)}
                            style={styles.foodImage}
                          />
                        ) : (
                          <div style={styles.imageFallback}>
                            <span>SH</span>
                          </div>
                        )}
                      </div>

                      {/* Food details */}
                      <div style={styles.itemDetails}>
                        <div style={styles.itemTitleRow}>
                          <div style={styles.nameAndBadge}>
                            <span
                              style={{
                                ...styles.vegMark,
                                borderColor: item.veg
                                  ? "#43815B"
                                  : "#B65B4A",
                              }}
                            >
                              <span
                                style={{
                                  ...styles.vegDot,
                                  backgroundColor: item.veg
                                    ? "#43815B"
                                    : "#B65B4A",
                                }}
                              />
                            </span>

                            <h3 style={styles.itemName}>
                              {item.name}
                            </h3>

                            {item.bestseller && (
                              <span style={styles.bestseller}>
                                Popular
                              </span>
                            )}
                          </div>

                          <span style={styles.price}>
                            ₹{item.price}
                          </span>
                        </div>

                        {item.description && (
                          <p style={styles.itemDescription}>
                            {item.description}
                          </p>
                        )}

                        <div style={styles.itemMeta}>
                          <span>
                            {item.veg ? "Vegetarian" : "Non-vegetarian"}
                          </span>

                          <span style={styles.metaDivider}>·</span>

                          <span>{item.time || "15 min"}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div>
            <p style={styles.footerBrand}>SPICE HAVEN</p>
            <p style={styles.footerText}>
              Good food. Great company.
            </p>
          </div>

          <p style={styles.footerNote}>
            Thank you for dining with us.
          </p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "rgba(30, 27, 23, 0.72)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  modal: {
    width: "100%",
    maxWidth: "960px",
    backgroundColor: "#FFFDF8",
    color: "#29251F",
    border: "1px solid #DED6CA",
    borderRadius: "10px",
    boxShadow: "0 20px 70px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 28px",
    borderBottom: "1px solid #DED6CA",
    gap: "16px",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logo: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#29251F",
    color: "#FFFDF8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
    fontSize: "15px",
    flexShrink: 0,
  },

  brandName: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "17px",
    fontWeight: "normal",
    letterSpacing: "3px",
  },

  brandSubtitle: {
    margin: "5px 0 0",
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#7C756B",
  },

  closeButton: {
    border: "1px solid #DED6CA",
    backgroundColor: "transparent",
    color: "#29251F",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "15px",
    flexShrink: 0,
  },

  intro: {
    textAlign: "center",
    padding: "38px 24px 28px",
  },

  eyebrow: {
    margin: "0 0 12px",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#A9685A",
  },

  title: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "clamp(30px, 5vw, 46px)",
    fontWeight: "normal",
    lineHeight: 1.15,
  },

  description: {
    maxWidth: "480px",
    margin: "14px auto 0",
    fontSize: "13px",
    lineHeight: 1.8,
    color: "#7C756B",
  },

  introLine: {
    width: "54px",
    height: "1px",
    backgroundColor: "#A9685A",
    margin: "24px auto 0",
  },

  categoryNav: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "6px",
    padding: "0 24px 20px",
    borderBottom: "1px solid #DED6CA",
  },

  categoryButton: {
    border: "1px solid transparent",
    borderRadius: "4px",
    backgroundColor: "transparent",
    color: "#7C756B",
    padding: "10px 14px",
    fontSize: "12px",
    cursor: "pointer",
  },

  activeCategoryButton: {
    backgroundColor: "#29251F",
    color: "#FFFDF8",
  },

  menuContent: {
    padding: "12px 32px 28px",
  },

  categorySection: {
    marginTop: "24px",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "12px",
    paddingBottom: "14px",
    borderBottom: "1px solid #DED6CA",
  },

  sectionEyebrow: {
    margin: "0 0 6px",
    color: "#A9685A",
    fontSize: "9px",
    letterSpacing: "2px",
  },

  categoryTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "27px",
    fontWeight: "normal",
  },

  itemCount: {
    color: "#7C756B",
    fontSize: "9px",
    letterSpacing: "1.5px",
    whiteSpace: "nowrap",
    paddingBottom: "4px",
  },

  itemsList: {
    display: "flex",
    flexDirection: "column",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "18px 0",
    borderBottom: "1px solid #EAE4DA",
  },

  imageWrapper: {
    width: "104px",
    height: "88px",
    flexShrink: 0,
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#EEE8DE",
  },

  foodImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imageFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#A9685A",
    fontFamily: "Georgia, serif",
    fontSize: "20px",
    backgroundColor: "#EEE8DE",
  },

  itemDetails: {
    flex: 1,
    minWidth: 0,
  },

  itemTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },

  nameAndBadge: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    minWidth: 0,
  },

  vegMark: {
    width: "13px",
    height: "13px",
    border: "1px solid",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  vegDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },

  itemName: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "17px",
    fontWeight: "normal",
    lineHeight: 1.4,
  },

  bestseller: {
    backgroundColor: "#F1E4DC",
    color: "#965A4D",
    borderRadius: "3px",
    padding: "4px 6px",
    fontSize: "9px",
    whiteSpace: "nowrap",
  },

  price: {
    color: "#29251F",
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  itemDescription: {
    margin: "7px 0",
    color: "#7C756B",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  itemMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#8B8378",
    fontSize: "10px",
    marginTop: "8px",
  },

  metaDivider: {
    color: "#A9685A",
  },

  emptyMessage: {
    textAlign: "center",
    padding: "40px 0",
    color: "#7C756B",
    fontSize: "14px",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "22px 28px",
    backgroundColor: "#29251F",
    color: "#FFFDF8",
  },

  footerBrand: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    letterSpacing: "2px",
  },

  footerText: {
    margin: "6px 0 0",
    color: "#C7BFB3",
    fontSize: "11px",
  },

  footerNote: {
    margin: 0,
    color: "#C7BFB3",
    fontSize: "11px",
  },
};

export default BookMenu;