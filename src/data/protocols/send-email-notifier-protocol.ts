import { SendEmailOptionsModel } from "../../domain/models";

export interface SendEmailNotifier {
  send(): Promise<string>;
}
