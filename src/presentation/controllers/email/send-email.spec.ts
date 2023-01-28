import { SendEmailOptionsModel } from "../../../domain/models";
import { SendEmail } from "../../../domain/usecases";
import { SendEmailController } from "./send-email";

describe("Send email Controller tests", () => {
  const makeSendEmail = () => {
    class SendMailStub implements SendEmail {
      send(): Promise<string> {
        return new Promise((resolve) => {
          resolve("Email sent with success");
        });
      }
    }

    return new SendMailStub();
  };

  const makeSut = () => {
    const sendEmailStub = makeSendEmail();

    const sut = new SendEmailController(sendEmailStub);

    return {
      sendEmailStub,
      sut,
    };
  };

  it("Should send email with success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    expect(response).toEqual("Email sent with success");
  });

  it("Should return error if send email controller throws", async () => {
    const { sut, sendEmailStub } = makeSut();

    jest
      .spyOn(sendEmailStub, "send")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.handle();

    await expect(promise).rejects.toThrow();
  });
});
