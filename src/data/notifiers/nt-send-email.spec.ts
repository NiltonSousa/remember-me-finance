import { SendEmailOptionsModel } from "../../domain/models";
import { SendEmailNotifier } from "../protocols/index";
import { NtSendEmail } from "./nt-send-email";

export interface SutTypes {
  sut: NtSendEmail;
  sendEmailNotifierStub: SendEmailNotifier;
}

const makeSendEmailNotifier = (): SendEmailNotifier => {
  class SendEmailNotifierStub implements SendEmailNotifier {
    async send(): Promise<string> {
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

    const promise = sut.send();

    await expect(promise).rejects.toThrow();
  });

  it("Should call SendEmailNotifier with correct values", async () => {
    const { sut, sendEmailNotifierStub } = makeSut();

    const insertSpy = jest.spyOn(sendEmailNotifierStub, "send");

    await sut.send();

    expect(insertSpy).toHaveBeenCalledWith();
  });

  it("Should return success if email sent", async () => {
    const { sut } = makeSut();

    const response = await sut.send();

    expect(response).toEqual("Email sent");
  });
});
