import { Field } from "formik";

export default function ItemSelector({ groupedItems, values, setFieldValue }) {
  return (
    <div className="flex-col">
      <Field
        name="search"
        placeholder="Search items..."
        value={values.search || ''}
        onChange={(e) => setFieldValue('search', e.target.value)}
        className="input"
      />

      {Object.entries(groupedItems).map(([category, items]) => {
        const filteredItems = items.filter((item) =>
          item.name.toLowerCase().includes((values.search || '').toLowerCase())
        );

        if (filteredItems.length === 0) return null;

        return (
          <div key={category} className="category-container">
            <div className="flex-col category-list">
              <label className="category-label">
                <input
                  type="checkbox"
                  checked={items.every((item) => values.applicable_items.includes(item.id))}
                  onChange={(e) => {
                    const itemIds = items.map((i) => i.id);
                    if (e.target.checked) {
                      setFieldValue("applicable_items", [...new Set([...values.applicable_items, ...itemIds])]);
                    } else {
                      setFieldValue(
                        "applicable_items",
                        values.applicable_items.filter((id) => !itemIds.includes(id))
                      );
                    }
                  }}
                />
                {category}
              </label>

              <div className="flex-col category-items">
                {filteredItems.map((item) => (
                  <label key={item.id} className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="applicable_items"
                      value={String(item.id)}
                      checked={values.applicable_items.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("applicable_items", [...values.applicable_items, item.id]);
                        } else {
                          setFieldValue(
                            "applicable_items",
                            values.applicable_items.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <hr />
    </div>
  );
}
