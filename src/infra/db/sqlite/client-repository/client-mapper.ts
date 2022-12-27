import { DbInsertClientModel } from "../../../../data/protocols";
import { ClientModel } from "../../../../domain/models";

export const map = (
  clientData: DbInsertClientModel,
  generatedId: string
): Promise<ClientModel> => {
  const { name, cpf, phoneNumber, email, birthdate, billsCount } = clientData;

  return new Promise((resolve) =>
    resolve({
      id: generatedId,
      name,
      cpf,
      phoneNumber,
      email,
      birthdate,
      billsCount,
    })
  );
};
