const mongoose = require("mongoose");

const StatusValues = ["Accepted", "Rejected", "Pending", "Ignored"];

const connectionSchema = new mongoose.Schema(
  {
    fromId: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // enum: StatusValues, this or in other way , to shoe err message
      enum: {
        values: StatusValues,
        message: "{VALUE} is not supported for status type ",
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionSchema.index({ fromId: 1, toId: 1 });
const ConnectionRequestModel = mongoose.model(
  "connectionRequest",
  connectionSchema,
  "connectionRequests"
); // in mongoDb collection name will be plural , connectionRequest => connectionRequests
module.exports = ConnectionRequestModel;
