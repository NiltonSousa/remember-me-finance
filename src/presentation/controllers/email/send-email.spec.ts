import { SendEmailOptionsModel } from "../../../domain/models";
import { SendEmail } from "../../../domain/usecases";
import { SendEmailController } from "./send-email";

describe("Send email Controller tests", () => {
  const makeSendEmail = () => {
    class SendMailStub implements SendEmail {
      send(email: SendEmailOptionsModel): Promise<string> {
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

    const emailOptions = {
      from: "valid_email@mail.com",
      to: "valid_mail2@mail.com",
      subject: "Test send email subject",
      text: "Test text",
    };

    const response = await sut.handle(emailOptions);

    expect(response).toEqual("Email enviado com sucesso");
  });

  it("Should return error if send email controller throws", async () => {
    const { sut, sendEmailStub } = makeSut();

    jest
      .spyOn(sendEmailStub, "send")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const emailOptions = {
      from: "valid_email@mail.com",
      to: "valid_mail2@mail.com",
      subject: "Test send email subject",
      text: "Test text",
    };

    const promise = sut.handle(emailOptions);

    await expect(promise).rejects.toThrow();
  });
});
