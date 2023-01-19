import { EmailOptinsModel } from "../models/email";

export interface SendEmail {
    send(email: EmailOptinsModel): Promise<string>;
}