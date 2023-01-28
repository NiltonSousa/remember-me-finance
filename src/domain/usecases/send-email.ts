import { SendEmailOptionsModel } from "../models/email";

export interface SendEmail {
    send(): Promise<string>;
}