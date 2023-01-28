import { SendEmail } from "../../../domain/usecases";

export class SendEmailController {
  constructor(readonly sendEmail: SendEmail) {}

  async handle() {
    try {
      return await this.sendEmail.send();
    } catch (error) {
      throw new Error(`Erro ao enviar email. \n Error: ${error}`);
    }
  }
}
