/**
 * Converte um objeto JavaScript em um objeto FormData.
 * @param {object} obj - O objeto contendo os dados a serem convertidos.
 * @returns {FormData} - O objeto FormData contendo os dados.
 */
export function jsonToFormData(obj: object) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (typeof value === 'boolean' || typeof value === 'string') {
      formData.append(key, String(value));
    } else if ((value as any) instanceof FileList) {
      formData.append(key, value['0']);
    } else if ((value as any) instanceof File) {
      formData.append(key, value);
    }
  });

  return formData;
}

// export function FormDataToJson(formData: FormData) {
//   const obj = {};
//   for (const key of formData.keys()) {
//     obj[key] = formData.get(key);
//   }
//   return obj;
// }
