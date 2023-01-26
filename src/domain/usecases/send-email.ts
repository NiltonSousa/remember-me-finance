import { SendEmailOptionsModel } from "../models/email";

export interface SendEmail {
    send(email: SendEmailOptionsModel): Promise<string>;
}