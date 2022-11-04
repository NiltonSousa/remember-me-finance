import { DbInsertBillModel } from "../../../../data/protocols/insert-bill-model-protocol";
import { BillModel } from "../../../../domain/models";

export const map = (
  billData: DbInsertBillModel,
  generatedId: string
): Promise<BillModel> => {
  const { name, value, expireDate, daysBeforeExpireDateToRemember } = billData;

  return new Promise((resolve) =>
    resolve({
      id: generatedId,
      name,
      value,
      expireDate,
      daysBeforeExpireDateToRemember,
    })
  );
};
