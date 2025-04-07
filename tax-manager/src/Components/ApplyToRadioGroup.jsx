import { Field } from "formik";

export default function ApplyToRadioGroup({ items, setFieldValue }) {
  return (
    <div className="flex-col radio-labels">
      <label className="flex items-center gap-2">
        <Field
          type="radio"
          name="applied_to"
          value="all"
          onChange={(e) => {
            setFieldValue('applied_to', e.target.value);
            const allItemIds = items.map(item => item.id);
            setFieldValue('applicable_items', allItemIds);
          }}
        />
        Apply to all items
      </label>
      <label className="flex items-center gap-2">
        <Field
          type="radio"
          name="applied_to"
          value="some"
          onChange={(e) => {
            setFieldValue('applied_to', e.target.value);
            setFieldValue('applicable_items', []);
          }}
        />
        Apply to specific items
      </label>
    </div>
  );
}
