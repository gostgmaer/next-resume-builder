// @ts-nocheck
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const mongoose = require("mongoose");
const {
  getAppIdAndEntity,
  createProjectionFromArray,
  FilterOptions,
} = require("../../utils/service");
const Resume = require("../../models/resume");

const getData = async (req, res) => {
  try {

    const { sort, page, limit, filter, select_keys } = req.query;
    const filterData = FilterOptions(sort, page, limit, filter, select_keys);
    let query = { ...filterData.query };
    const objects = await Resume.find(query).select(select_keys).sort(filterData.options.sort)
      .skip(filterData.options.skip)
      .limit(parseInt(filterData.options.limit)).exec()
    const totalCount = await Resume.countDocuments(query);

    res.status(StatusCodes.OK).json({
      result: objects,
      total_record: totalCount,
      message: `Loaded Successfully!`,
      statusCode: StatusCodes.OK,
      status: ReasonPhrases.OK,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
     
    });
  }
};

const getSingleRecord = async (req, res) => {
  try {
    
    const objectId = req.params.id;
    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const {  select_keys } = req.query;
    const object = await Resume.findById(objectId).select(select_keys);
    if (!object) {
      res.status(StatusCodes.NOT_FOUND).json({
        result: object,
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        result: object,
        message: `Loaded Successfully!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      
    });
  }
};
const create = async (req, res) => {
  try {
    const result = await Resume.create(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Record Created Successfully!",
      status: ReasonPhrases.CREATED,
      statusCode: StatusCodes.CREATED,
      result: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { appId } = req.params;
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const object = await Resume.findOneAndUpdate(
      { _id: ID },
      { $set: { ...req.body, status: "INACTIVE" } },
      { returnOriginal: false }
    );
    if (object?.lastErrorObject?.n == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `deleted successful!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const removeMany = async (req, res) => {
  try {
    const { appId } = req.params;
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const object = await Resume.bulkWrite(
      { _id: ID },
      { $set: { ...req.body, status: "INACTIVE" } },
      { returnOriginal: false }
    );
    if (object?.lastErrorObject?.n == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `deleted successful!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const objectToUpdate = req.body;

    const result = await Resume.findOneAndUpdate(
      { _id: ID },
      { $set: objectToUpdate },
      { returnOriginal: false }
    );

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        result: result.value,
        message: `Update successfully!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      
    });
  }
};

module.exports = {
  create,
  getData,
  getSingleRecord,
  remove,
  removeMany,
  update,
};
