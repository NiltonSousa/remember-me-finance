import { DbInsertBillModel } from "../../../../data/protocols/bill-model-protocol";
import { BillModel } from "../../../../domain/models";

export const map = (
  billData: DbInsertBillModel,
  generatedId: string
): Promise<BillModel> => {
  const { clientId, name, value, expireDate, daysBeforeExpireDateToRemember } =
    billData;

  return new Promise((resolve) =>
    resolve({
      id: generatedId,
      clientId,
      name,
      value,
      expireDate,
      daysBeforeExpireDateToRemember,
    })
  );
};
