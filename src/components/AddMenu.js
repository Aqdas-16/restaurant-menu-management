import React, { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Starters",
  time: "15 min",
  image: "",
  veg: true,
  bestseller: false,
};

function AddMenu({ onAdd, editingItem, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
      setPreview(editingItem.image || "");
      document.getElementById("add-menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setForm(emptyForm);
    setPreview("");
  }, [editingItem]);

  const resetForm = () => {
    setForm(emptyForm);
    setPreview("");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setForm({
        ...form,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.price) {
      alert("Please enter the dish name and price.");
      return;
    }

    const menuItem = {
      ...form,
      price: Number(form.price),
      image:
        form.image ||
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    };

    if (editingItem) {
      onUpdate(menuItem);
      return;
    }

    onAdd(menuItem);
    resetForm();
  };

  return (
    <section className="add-menu-section" id="add-menu">

      <div className="add-menu-heading">

        <span className="eyebrow">
          MENU MANAGEMENT
        </span>

        <h2>{editingItem ? "Modify Menu Item" : "Add New Menu Item"}</h2>

        <p>
          {editingItem
            ? `Update ${editingItem.name} and save the changes to the menu book.`
            : "Add a new dish to your restaurant menu."}
        </p>

      </div>

      <form
        className="add-menu-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-field">

            <label>Food Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Tandoori Chicken"
            />

          </div>

          <div className="form-field">

            <label>Price</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₹ 250"
            />

          </div>

        </div>

        <div className="form-field">

          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description of the dish..."
            rows="3"
          />

        </div>

        <div className="form-grid three">

          <div className="form-field">

            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Starters</option>
              <option>Main Course</option>
              <option>Breads</option>
              <option>Desserts</option>
              <option>Beverages</option>
            </select>

          </div>

          <div className="form-field">

            <label>Preparation Time</label>

            <select
              name="time"
              value={form.time}
              onChange={handleChange}
            >
              <option>5 min</option>
              <option>10 min</option>
              <option>15 min</option>
              <option>20 min</option>
              <option>25 min</option>
              <option>30 min</option>
              <option>35 min</option>
            </select>

          </div>

          <div className="form-field photo-field">

            <label>Food Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>

        </div>

        {preview && (
          <div className="photo-preview">

            <img
              src={preview}
              alt="Food preview"
            />

            <div>
              <strong>Photo Preview</strong>
              <span>Your selected image will be displayed with the dish.</span>
            </div>

          </div>
        )}

        <div className="checkbox-row">

          <label>
            <input
              type="checkbox"
              name="veg"
              checked={form.veg}
              onChange={handleChange}
            />

            Vegetarian
          </label>

          <label>
            <input
              type="checkbox"
              name="bestseller"
              checked={form.bestseller}
              onChange={handleChange}
            />

            Bestseller
          </label>

        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {editingItem ? "Save Changes" : "+ Add Food Item"}
          </button>

          {editingItem && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

    </section>
  );
}

export default AddMenu;