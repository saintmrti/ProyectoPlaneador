import _ from "lodash";
import moment from "moment-timezone";

export function changeKeySequence(planProd, editSec, target, index) {
  const prodTarget = planProd[target - 1];
  const processMezTarget = _.find(prodTarget?.procesos, {
    nombre: "Mezclado",
  });
  const timeMezTarget = moment(processMezTarget?.inicio, "HH:mm");
  let diff = 0;
  const newPlanProd = _.map(planProd, (item, i) => {
    if (i === index) {
      const processes = item.procesos;
      const processMez = _.find(processes, { nombre: "Mezclado" });
      const timeMez = moment(processMez?.inicio, "HH:mm");
      diff = moment(timeMezTarget).diff(moment(timeMez), "minutes");
      _.forEach(processes, (process) => {
        if (process.inicio != null && process.fin != null) {
          process.inicio = moment(process.inicio, "HH:mm")
            .add(diff, "minutes")
            .format("HH:mm");
          process.fin = moment(process.fin, "HH:mm")
            .add(diff, "minutes")
            .format("HH:mm");
        }
      });
    }
    return item;
  });
  const arrPlanProd = moveElement(newPlanProd, index, target - 1);
  const transformPlanProd = _.map(arrPlanProd, (item, i) => {
    if (i > target - 1) {
      const previousItem = i > 0 ? arrPlanProd[i - 1] : null;
      if (previousItem) {
        const processes = item?.procesos;
        _.forEach(processes, (process) => {
          if (process.inicio != null && process.fin != null) {
            const processPrev = _.find(previousItem.procesos, {
              nombre: process.nombre,
            });
            const diffProcess = moment(process.fin, "HH:mm").diff(
              moment(process.inicio, "HH:mm"),
              "minutes"
            );
            if (processPrev) {
              const timePrev = moment(processPrev.fin, "HH:mm");
              process.inicio = moment(timePrev).format("HH:mm");
              process.fin = moment(timePrev)
                .add(diffProcess, "minutes")
                .format("HH:mm");
            }
          }
        });
      }
    }
    return item;
  });
  return transformPlanProd;
}

function moveElement(array, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length
  ) {
    throw new Error("Índices fuera de los límites del arreglo");
  }
  const newArray = _.cloneDeep(array);
  const [element] = _.pullAt(newArray, fromIndex);
  newArray.splice(toIndex, 0, element);
  return newArray;
}
