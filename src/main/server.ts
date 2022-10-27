import app from "./config/app";

app.listen(process.env.PORT ?? 8080, () =>
  console.log(`Server running at htttp://localhost:${process.env.PORT ?? 8080}`)
);
