import { useState } from "react";
import { Formik, Form } from "formik";
import TaxInputs from "./Components/TaxInputs";
import ApplyToRadioGroup from "./Components/ApplyToRadioGroup";
import ItemSelector from "./Components/ItemSelector";
import './AddTaxForm.css';
import data from './apiResponse.json';

const groupItemsByCategory = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const key = item.category?.name || "Uncategorized";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  return grouped;
};

export default function AddTaxForm() {
  const [items] = useState(data);
  const groupedItems = groupItemsByCategory(items);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.value) {
      errors.value = "Required";
    }
    if (values.value < 0 || values.value > 100) {
      errors.value = "Percentage must be between 0 and 100";
    }
    return errors;
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Tax</h2>
      <Formik
        initialValues={{
          name: "",
          value: "",
          applied_to: "all",
          applicable_items: items.map((item) => item.id),
          search: "",
        }}
        validate={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="p-6">
            <TaxInputs />
            <ApplyToRadioGroup items={items} setFieldValue={setFieldValue} />

            {values.applied_to === "some" && (
              <ItemSelector
                groupedItems={groupedItems}
                values={values}
                setFieldValue={setFieldValue}
              />
            )}

            <button type="submit" className="btn-primary-big">
              Apply tax to {values.applicable_items.length} item(s)
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// import { useState } from "react";
// import { Formik, Form, Field } from "formik";
// // import { Button } from "@/components/ui/button";
// import './AddTaxForm.css'
// // import { Card, CardContent } from "@/components/ui/card";
// import data from './apiResponse.json';


// const groupItemsByCategory = (items) => {
//   const grouped = {};
//   items.forEach((item) => {
//     const key = item.category?.name || "Uncategorized";
//     if (!grouped[key]) grouped[key] = [];
//     grouped[key].push(item);
//   });
//   return grouped;
// };

// export default function AddTaxForm() {
//   const [items] = useState(data);
//   const groupedItems = groupItemsByCategory(items);

//   const validate = (values) => {
//     const errors = {}
//     if (!values.name) {
//       errors.name = "Required"
//     }
//     if (!values.value) {
//       errors.value = "Required"
//     }
//     if (values.value < 0 || values.value > 100) {
//       errors.name = "Percentage can not be out of ranage (0-100)"
//     }
//     return errors
//   }
//   return (
//     <div className="form-container">
//       <h2 className="form-title">Add Tax</h2>
//       <Formik
//         initialValues={{
//           name: "",
//           value: "",
//           applied_to: "all",
//           applicable_items: items.map((item) => item.id),
//         }}
//         validate={validate}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="p-6">
//             <div className="flex-row tax-inputs">
//               <Field
//                 name="name"
//                 placeholder="Tax name"
//                 className="input"

//               />
//               <Field
//                 name="value"
//                 placeholder="0"
//                 className="input"
//               />
//               %
//             </div>

//             <div className="flex-col radio-labels">
//               <label className="flex items-center gap-2">
//                 <Field type="radio" name="applied_to" value="all" onChange={(e) => {
//                   setFieldValue('applied_to', e.target.value);
//                   if (e.target.value === 'all') {
//                     const allItemIds = items.map(item => item.id);
//                     setFieldValue('applicable_items', allItemIds);
//                   }
//                 }} /> Apply to all items
//               </label>
//               <label className="flex items-center gap-2">
//                 <Field type="radio" name="applied_to" value="some"
//                   onChange={(e) => {
//                     setFieldValue('applied_to', e.target.value);
//                     if (e.target.value === 'some') {

//                       setFieldValue('applicable_items', []);
//                     }
//                   }} /> Apply to specific items
//               </label>
//             </div>


//             <hr />
//             {values.applied_to === "some" && (

//               <div className="flex-col">


//                 <Field
//                   name="search"
//                   placeholder="Search items..."
//                   value={values.search || ''}
//                   onChange={(e) => setFieldValue('search', e.target.value)}
//                   className="input"
//                 />

//                 {Object.entries(groupedItems).map(([category, items]) => {
//                   const filteredItems = items.filter((item) =>
//                     item.name.toLowerCase().includes((values.search || '').toLowerCase())
//                   );

//                   // Only render if there are matching items
//                   if (filteredItems.length === 0) {
//                     return null;
//                   }
//                   return (

//                     <div key={category} className="category-container">
//                       <div className="flex-col category-list">
//                         <label className="category-label">
//                           <input
//                             type="checkbox"
//                             checked={items.every((item) => values.applicable_items.includes(item.id))}
//                             onChange={(e) => {
//                               const itemIds = items.map((i) => i.id);
//                               if (e.target.checked) {
//                                 setFieldValue("applicable_items", [...new Set([...values.applicable_items, ...itemIds])]);
//                               } else {
//                                 setFieldValue(
//                                   "applicable_items",
//                                   values.applicable_items.filter((id) => !itemIds.includes(id))
//                                 );
//                               }
//                             }}
//                           />
//                           {category}
//                         </label>
//                         <div className="flex-col category-items">
//                           {items.map((item) => (
//                             <label key={item.id} className="flex items-center gap-2">
//                               <Field
//                                 type="checkbox"
//                                 name="applicable_items"
//                                 value={String(item.id)}
//                                 checked={values.applicable_items.includes(item.id)}
//                                 onChange={(e) => {
//                                   if (e.target.checked) {
//                                     setFieldValue("applicable_items", [...values.applicable_items, item.id]);
//                                   } else {
//                                     setFieldValue(
//                                       "applicable_items",
//                                       values.applicable_items.filter((id) => id !== item.id)
//                                     );
//                                   }
//                                 }}
//                               />
//                               {item.name}

//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//                 <hr />
//               </div>
//             )}

//             <button type="submit" className="btn-primary-big">
//               Apply tax to {values.applicable_items.length} item(s)
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
