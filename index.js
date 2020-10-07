const app = require("./app");
var schedule = require("node-schedule");

app.listen(process.env.PORT || "5000", (err) => {
  if (err) console.log(err);
  console.log("running!");
});
