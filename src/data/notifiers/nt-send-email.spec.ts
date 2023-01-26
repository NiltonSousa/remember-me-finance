import { SendEmailOptionsModel } from "../../domain/models";
import {
  SendEmailNotifier,
} from "../protocols/index";
import { NtSendEmail } from "./nt-send-email";

export interface SutTypes {
  sut: NtSendEmail;
  sendEmailNotifierStub: SendEmailNotifier;
}

const makeSendEmailNotifier = (): SendEmailNotifier => {
  class SendEmailNotifierStub implements SendEmailNotifier {
    async send(email: SendEmailOptionsModel): Promise<string> {
      return new Promise((resolve) => resolve("Email sent"));
    }
  }

  return new SendEmailNotifierStub();
};

const makeSut = (): SutTypes => {
  const sendEmailNotifierStub = makeSendEmailNotifier();
  const sut = new NtSendEmail(sendEmailNotifierStub);

  return {
    sut,
    sendEmailNotifierStub,
  };
};

describe("NtSendEmail usecase", () => {
  it("Should throw if SendEmailNotifier throws", async () => {
    const { sut, sendEmailNotifierStub } = makeSut();

    jest
      .spyOn(sendEmailNotifierStub, "send")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const emailOptions = {
        from: "valid_email@mail.com",
        to: "valid_email@mail.com",
        subject: "Test send email",
        text: "Hello world"
    };

    const promise = sut.send(emailOptions);

    await expect(promise).rejects.toThrow();
  });

  it("Should call SendEmailNotifier with correct values", async () => {
    const { sut, sendEmailNotifierStub } = makeSut();

    const insertSpy = jest.spyOn(sendEmailNotifierStub, "send");

    const emailOptions = {
        from: "valid_email@mail.com",
        to: "valid_email@mail.com",
        subject: "Test send email",
        text: "Hello world"
    };

    await sut.send(emailOptions);

    expect(insertSpy).toHaveBeenCalledWith({
        from: "valid_email@mail.com",
        to: "valid_email@mail.com",
        subject: "Test send email",
        text: "Hello world"
    });
  });

  it("Should return success if email sent", async () => {
    const { sut } = makeSut();

    const emailOptions = {
        from: "valid_email@mail.com",
        to: "valid_email@mail.com",
        subject: "Test send email",
        text: "Hello world"
    };

    const response = await sut.send(emailOptions);

    expect(response).toEqual("Email sent!");
  });
});
