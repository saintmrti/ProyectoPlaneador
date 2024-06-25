export function requirementValidator(str) {
  const regex = /^requerimiento/i;
  return regex.test(str);
}

export function inventoryValidator(str) {
  const regex = /^inv/i;
  return regex.test(str);
}

export function orderValidator(str) {
  const regex = /^pedido/i;
  return regex.test(str);
}

export function weekValidator(str) {
  const regex = /^acumulado/i;
  return regex.test(str);
}
