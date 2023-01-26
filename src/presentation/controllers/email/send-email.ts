import { SendEmailOptionsModel } from "../../../domain/models";
import { SendEmail } from "../../../domain/usecases";

export class SendEmailController {
  constructor(readonly sendEmail: SendEmail) {}

  async handle(email: SendEmailOptionsModel) {
    try {
      await this.sendEmail.send(email);

      return "Email enviado com sucesso";
    } catch (error) {
      throw new Error(`Erro ao enviar email. \n Error: ${error}`);
    }
  }
}
