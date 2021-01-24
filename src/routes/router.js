const testRouter = require("./test");

module.exports = (app) => {
    app.use("/test",testRouter);
}