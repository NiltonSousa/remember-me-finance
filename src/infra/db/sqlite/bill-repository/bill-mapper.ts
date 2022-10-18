import { DbInsertBillModel } from "../../../../data/protocols/insert-bill-model-protocol";

export const map = (billData: DbInsertBillModel, resultBill: any) => {
  return Object.assign({}, billData, { id: resultBill.dataValues.id });
};
