// import React from 'react';
// import { Field } from "formik";
// export const CategoryItem = ({item,values,setFieldValue}) => {
//   // Pass the useFormik() hook initial form values and a submit function that will
//   // be called when the form is submitted
  
//   return (
//     <label key={item.id} className="flex items-center gap-2">
//     <Field
//       type="checkbox"
//       name="applicable_items"
//       value={String(item.id)}
//       checked={values.applicable_items.includes(item.id)}
//       onChange={(e) => {
//         if (e.target.checked) {
//           setFieldValue("applicable_items", [...values.applicable_items, item.id]);
//         } else {
//           setFieldValue(
//             "applicable_items",
//             values.applicable_items.filter((id) => id !== item.id)
//           );
//         }
//       }}
//     />
//     {item.name}

//   </label>
//   );
// };
