import { SendEmailOptionsModel } from "../../domain/models";
import {
  SendEmailModel,
  SendEmailNotifier,
} from "../protocols/index";

export class NtSendEmail implements SendEmailModel {
  private readonly sendEmailNotifier: SendEmailNotifier;

  constructor(sendEmailNotifier: SendEmailNotifier) {
    this.sendEmailNotifier = sendEmailNotifier;
  }

  async send(email: SendEmailOptionsModel): Promise<string> {
    await this.sendEmailNotifier.send(email);

    return "Email sent!"
  }
}
