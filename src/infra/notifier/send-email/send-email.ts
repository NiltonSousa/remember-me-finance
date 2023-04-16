import { SendEmailNotifier } from "../../../data/protocols";
import { SqliteHelper } from "../../db/postgresql/helpers/sqlite-helper";
import { SendEmailOptionsModel } from "../../../domain/models";
import nodemailer from "nodemailer";

export class SendEmailInfraNotifier implements SendEmailNotifier {
  async send(): Promise<string> {
    const targetDate = new Date().getDate() + 1;

    const reponse = await SqliteHelper.listBillsToSendEmail(targetDate);

    for (const item of reponse) {
      const emailOptions: SendEmailOptionsModel = {
        to: item.client.email,
        from: `${process.env.EMAIL_ADDRESS}`,
        subject: "Notificação de contas a pagar",
        text: `A conta ${item.name} do valor ${item.value} está prestes a vencer. Lembre-se de pagar até o dia ${item.expireDate}.\n\n
        Atenciosamente.\n
        Equipe Remember Me`,
      };

      this.sendEmail(emailOptions);
    }

    return "Email sent!";
  }

  private sendEmail(emailOptions: SendEmailOptionsModel) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail(emailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      }
      console.log("Email enviado: " + info.response);
    });
  }
}
