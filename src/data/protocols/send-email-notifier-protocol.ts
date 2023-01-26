import { RatingModel, SendEmailOptionsModel } from "../../domain/models";

export interface SendEmailNotifier {
  send(email: SendEmailOptionsModel): Promise<string>;
}
