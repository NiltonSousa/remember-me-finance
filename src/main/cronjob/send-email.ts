import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";
import { makeSendEmailController } from "../factories/email";

async function main() {
  SqliteHelper.connect();

  return makeSendEmailController().handle();
}

main().catch((error: any) => {
  console.log(error);
  process.exit(1);
});
