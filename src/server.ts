import app from "./app";

const port = 5000;

function main() {
  const server = app.listen(port, () => {
    console.log("app is listening on port", 5000);
  });
}

main();
