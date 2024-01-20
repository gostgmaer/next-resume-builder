const express = require("express");
const resumeRoute = express.Router();
const {
  create,
  getData,
  getSingleRecord,
  remove,
  removeMany,
  update,
} = require("../controller/resume/controller");
const createMiddleWare = require("../middleware/createMiddleWare");
const userMiddleWare = require("../middleware/userAccess");

resumeRoute.route("/record").post(createMiddleWare, create);
resumeRoute.route("/record").get(getData);
resumeRoute.route("/record/:id").get(getSingleRecord);
resumeRoute.route("/record/:id").patch(update);
resumeRoute.route("/record/:id").put(update);
resumeRoute.route("/record/:id").delete(remove);
resumeRoute.route("/record/bulk").delete(removeMany);
module.exports = resumeRoute;
