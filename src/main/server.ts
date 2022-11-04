import { SqliteHelper } from "../infra/db/sqlite/helpers/sqlite-helper";
import app from "./config/app";
import env from "./config/env";

SqliteHelper.connect()
  .then(() => {
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
