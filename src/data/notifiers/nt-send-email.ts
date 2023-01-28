import {
  SendEmailModel,
  SendEmailNotifier,
} from "../protocols/index";

export class NtSendEmail implements SendEmailModel {
  private readonly sendEmailNotifier: SendEmailNotifier;

  constructor(sendEmailNotifier: SendEmailNotifier) {
    this.sendEmailNotifier = sendEmailNotifier;
  }

  async send(): Promise<string> {
    return await this.sendEmailNotifier.send();
  }
}
