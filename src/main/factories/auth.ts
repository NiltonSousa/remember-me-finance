import { VerifyPasswordAuthController } from "../../presentation/controllers/auth/auth-verify-password";

export const makeVerifyPasswordAuthController =
  (): VerifyPasswordAuthController => {
    return new VerifyPasswordAuthController();
  };
