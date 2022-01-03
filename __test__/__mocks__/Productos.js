const dbMock = require("./productos.mock")


module.exports = {
  find: jest.fn().mockResolvedValue(dbMock),
  create: jest.fn().mockReturnValueOnce(true),
  deleteOne: jest.fn().mockReturnValueOnce(true),
};

