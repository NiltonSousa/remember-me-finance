import { SendEmailOptionsModel } from "../../domain/models";

export interface SendEmailModel {
  send(email: SendEmailOptionsModel): Promise<string>;
}
