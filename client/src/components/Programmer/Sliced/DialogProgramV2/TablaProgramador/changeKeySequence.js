import _ from "lodash";

export function moveElement(array, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length ||
    !array[toIndex].ordenes_iniciadas <= 0
  ) {
    alert("Ups! Ya está iniciada al menos una orden de trabajo.");
    throw new Error("Índices fuera de los límites del arreglo");
  }
  const newArray = _.cloneDeep(array);
  const [element] = _.pullAt(newArray, fromIndex);
  newArray.splice(toIndex, 0, element);
  return newArray;
}
