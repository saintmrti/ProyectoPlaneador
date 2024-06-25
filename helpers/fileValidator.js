function requirementValidator(str) {
  const regex = /^requerimiento/i;
  return regex.test(str);
}

function inventoryValidator(str) {
  const regex = /^inv/i;
  return regex.test(str);
}

function orderValidator(str) {
  const regex = /^pedido/i;
  return regex.test(str);
}

function weekValidator(str) {
  const regex = /^acumulado/i;
  return regex.test(str);
}

module.exports = {
  requirementValidator,
  inventoryValidator,
  orderValidator,
  weekValidator,
};
