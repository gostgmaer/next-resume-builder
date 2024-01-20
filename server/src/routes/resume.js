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

resumeRoute.route("/resumes").post(createMiddleWare, create);
resumeRoute.route("/resumes").get(getData);
resumeRoute.route("/resumes/:id").get(getSingleRecord);
resumeRoute.route("/resumes/:id").patch(update);
resumeRoute.route("/resumes/:id").put(update);
resumeRoute.route("/resumes/:id").delete(remove);
resumeRoute.route("/resumes/bulk").delete(removeMany);
module.exports = resumeRoute;
