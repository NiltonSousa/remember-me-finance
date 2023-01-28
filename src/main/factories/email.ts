import { NtSendEmail } from "../../data/notifiers/nt-send-email";
import { SendEmailInfraNotifier } from "../../infra/notifier/send-email/send-email";
import { SendEmailController } from "../../presentation/controllers/email/send-email";

export const makeSendEmailController = (): SendEmailController => {
  const sendEmailNotifier = new SendEmailInfraNotifier();

  const ntSendEmail = new NtSendEmail(sendEmailNotifier);

  return new SendEmailController(ntSendEmail);
};
