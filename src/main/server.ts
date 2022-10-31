import { SqliteHelper } from "../infra/db/sqlite/helpers/sqlite-helper";
import app from "./config/app";
import env from "./config/env";

SqliteHelper.connect(env.sqliteUrl)
  .then(() => {
    app.listen(env.port, () =>
      console.log(`Server running at htttp://localhost:${env.port}`)
    );
  })
  .catch(console.error);
