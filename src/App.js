import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import MenuList from "./components/MenuList";
import AddMenu from "./components/AddMenu";
import Footer from "./components/Footer";
import BookMenu from "./components/BookMenu";

const MENU_STORAGE_KEY = "spice-haven-menu-items";

function App() {
  const categories = [
    "All",
    "Starters",
    "Main Course",
    "Breads",
    "Desserts",
    "Beverages",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showBook, setShowBook] = useState(false);
  const [bookCategory, setBookCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);

  const [menuItems, setMenuItems] = useState(() => {
    try {
      const savedMenu = window.localStorage.getItem(MENU_STORAGE_KEY);

      if (savedMenu) {
        const parsedMenu = JSON.parse(savedMenu);

        if (Array.isArray(parsedMenu)) {
          return parsedMenu;
        }
      }
    } catch (error) {
      console.warn("Unable to load saved menu:", error);
    }

    return [
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Char-grilled cottage cheese with aromatic Indian spices.",
      price: 220,
      category: "Starters",
      time: "20 min",
      veg: true,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken pieces marinated with yogurt and spices.",
      price: 280,
      category: "Starters",
      time: "20 min",
      veg: false,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      name: "Samosa",
      description: "Crispy pastry filled with spiced potato and green peas.",
      price: 90,
      category: "Starters",
      time: "10 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      name: "Hara Bhara Kebab",
      description: "Spinach and vegetable kebabs served with mint chutney.",
      price: 180,
      category: "Starters",
      time: "15 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 5,
      name: "Chicken Seekh Kebab",
      description: "Juicy minced chicken skewers grilled with herbs and spices.",
      price: 300,
      category: "Starters",
      time: "20 min",
      veg: false,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    },

    {
      id: 6,
      name: "Butter Chicken",
      description: "Classic chicken cooked in a rich tomato butter gravy.",
      price: 380,
      category: "Main Course",
      time: "25 min",
      veg: false,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 7,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with aromatic spiced chicken.",
      price: 280,
      category: "Main Course",
      time: "30 min",
      veg: false,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 8,
      name: "Paneer Butter Masala",
      description: "Soft paneer cooked in creamy tomato and butter gravy.",
      price: 320,
      category: "Main Course",
      time: "25 min",
      veg: true,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 9,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils finished with butter and cream.",
      price: 240,
      category: "Main Course",
      time: "20 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 10,
      name: "Mutton Rogan Josh",
      description: "Tender mutton cooked in a traditional Kashmiri gravy.",
      price: 450,
      category: "Main Course",
      time: "35 min",
      veg: false,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 11,
      name: "Veg Pulao",
      description: "Basmati rice cooked with seasonal vegetables and herbs.",
      price: 190,
      category: "Main Course",
      time: "20 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
    },

    {
      id: 12,
      name: "Butter Naan",
      description: "Soft tandoori naan brushed with aromatic butter.",
      price: 60,
      category: "Breads",
      time: "10 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 13,
      name: "Garlic Naan",
      description: "Tandoori naan topped with garlic, coriander and butter.",
      price: 80,
      category: "Breads",
      time: "10 min",
      veg: true,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 14,
      name: "Tandoori Roti",
      description: "Traditional whole wheat bread baked in a clay tandoor.",
      price: 40,
      category: "Breads",
      time: "8 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 15,
      name: "Cheese Naan",
      description: "Stuffed naan filled with melted cheese and fresh herbs.",
      price: 120,
      category: "Breads",
      time: "12 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80",
    },

    {
      id: 16,
      name: "Gulab Jamun",
      description: "Soft milk dumplings soaked in warm saffron syrup.",
      price: 90,
      category: "Desserts",
      time: "5 min",
      veg: true,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1666190094762-4c5e9c0d6c7c?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 17,
      name: "Rasmalai",
      description: "Soft cottage cheese dumplings in chilled saffron milk.",
      price: 120,
      category: "Desserts",
      time: "5 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 18,
      name: "Kulfi",
      description: "Traditional Indian frozen dessert with pistachio.",
      price: 100,
      category: "Desserts",
      time: "5 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=700&q=80",
    },

    {
      id: 19,
      name: "Mango Lassi",
      description: "Creamy yogurt drink blended with ripe Alphonso mango.",
      price: 110,
      category: "Beverages",
      time: "5 min",
      veg: true,
      bestseller: true,
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 20,
      name: "Fresh Lime Soda",
      description: "Refreshing lime drink with mint and sparkling soda.",
      price: 80,
      category: "Beverages",
      time: "5 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 21,
      name: "Masala Chai",
      description: "Indian tea brewed with milk and warming spices.",
      price: 60,
      category: "Beverages",
      time: "5 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 22,
      name: "Cold Coffee",
      description: "Smooth chilled coffee blended with milk and ice cream.",
      price: 130,
      category: "Beverages",
      time: "7 min",
      veg: true,
      bestseller: false,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    },
    ];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (error) {
      console.warn("Unable to save menu:", error);
    }
  }, [menuItems]);

  /* =========================
     ADD NEW MENU ITEM
  ========================= */

  const addMenuItem = (newItem) => {
    setMenuItems((previousItems) => [
      ...previousItems,
      {
        ...newItem,
        id: Date.now(),
      },
    ]);
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems((previousItems) =>
      previousItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingItem(null);
  };

  const deleteMenuItem = (id) => {
    setMenuItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
    setEditingItem((currentItem) => (currentItem?.id === id ? null : currentItem));
  };

  /* =========================
     FILTER MENU
  ========================= */

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const searchText = search.toLowerCase();

    const searchMatch =
      item.name.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });

  const searchMatches = useMemo(() => {
    if (!search.trim()) return [];

    return menuItems
      .filter((item) => {
        const query = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      })
      .slice(0, 3);
  }, [menuItems, search]);

  const openMenuBook = (category = "All") => {
    setSelectedCategory(category);
    setBookCategory(category);
    setShowBook(true);
  };

  const closeMenuBook = () => {
    setShowBook(false);
  };

  return (
    <div className="app">

      <Header onOpenBook={openMenuBook} />

      <main>

        <Hero onOpenBook={openMenuBook} />

        <section className="menu-section" id="menu">

          <div className="section-top">

            <div>
              <span className="eyebrow">OUR MENU</span>

              <h2>Made with care.</h2>

              <p>
                Explore our collection of Indian favourites,
                prepared fresh for every table.
              </p>
            </div>

            <div className="menu-total">
              <strong>{menuItems.length}</strong>
              <span>MENU ITEMS</span>
            </div>

          </div>

          <div className="menu-toolbar">

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenBook={openMenuBook}
            />

            <div className="search-box-wrap">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              {search.trim() && (
                <button
                  type="button"
                  className="book-inline-link"
                  onClick={() => openMenuBook(selectedCategory || "All")}
                >
                  View in Menu
                </button>
              )}
            </div>

          </div>

          {search.trim() && searchMatches.length > 0 && (
            <div className="search-results">
              {searchMatches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => openMenuBook(item.category)}
                >
                  <span>{item.name}</span>
                  <strong>View in Menu</strong>
                </button>
              ))}
            </div>
          )}

          <div className="menu-title-row">

            <div>
              <span className="eyebrow">MENU BOOK</span>

              <h3>
                {selectedCategory === "All"
                  ? "All dishes"
                  : selectedCategory}
              </h3>
            </div>

            <span>
              {filteredItems.length} items
            </span>

          </div>

          <div className="menu-book-launcher">
            <button type="button" onClick={() => openMenuBook(selectedCategory)}>
              Open Menu Book
            </button>
          </div>

          <MenuList
            items={filteredItems}
            onModify={setEditingItem}
            onDelete={deleteMenuItem}
          />

        </section>

        <AddMenu
          onAdd={addMenuItem}
          editingItem={editingItem}
          onUpdate={updateMenuItem}
          onCancelEdit={() => setEditingItem(null)}
        />

        <section className="management-section">

          <div className="management-heading">

            <div>
              <span className="eyebrow">MANAGEMENT</span>

              <h2>Manage Menu</h2>

              <p>
                Admin controls for dishes, availability, and featured menu updates.
              </p>
            </div>

            <div className="management-number">
              <span>{menuItems.length}</span>
              <small>items</small>
            </div>

          </div>

          <div className="management-summary">
            <div className="management-summary-card">
              <span className="eyebrow">TOOLS</span>
              <strong>Add new dishes</strong>
              <p>Use the form above to create menu entries and keep the menu book up to date.</p>
            </div>

            <div className="management-summary-card">
              <span className="eyebrow">LIVE MENU</span>
              <strong>{menuItems.length} total dishes</strong>
              <p>Every update is reflected in the customer-facing menu book instantly.</p>
            </div>
          </div>

        </section>

      </main>

      <Footer />

      {showBook && (
        <BookMenu
          menuItems={menuItems}
          defaultCategory={bookCategory}
          onClose={closeMenuBook}
        />
      )}

    </div>
  );
}

export default App;