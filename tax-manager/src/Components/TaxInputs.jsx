import { Field } from "formik";

export default function TaxInputs() {
  return (
    <div className="flex-row tax-inputs">
      <Field
        name="name"
        placeholder="Tax name"
        className="input"
      />
      <Field
        name="value"
        placeholder="0"
        className="input"
      />
      %
    </div>
  );
}
