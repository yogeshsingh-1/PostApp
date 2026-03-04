import { raw } from "express";
import CustomError from "../utils/customerError.js";

class DbService {
  constructor() {}

  // CREATE
  async create(model, data) {
    const result = await model.create(data);
    return result.toJSON();
  }

  // GET ALL
  async findAll(model, options = { raw: true }) {
    return await model.findAll(options);
  }

  // GET BY ID
  async findById(model, id, options = {}) {
    return await model.findByPk(id, options);
  }

  // UPDATE
  async update(model, id, data) {
    const record = await model.findByPk(id);
    if (!record) throw new CustomError(404, "Record not found");
    const updated = await record.update(data);
    return updated.toJSON();
  }

  // DELETE
  async delete(model, id) {
    const record = await model.findByPk(id);
    if (!record) throw new CustomError(404, "Record not found");

    await record.destroy();
    return true;
  }

  // find one
  async findByFieldName(model, fieldName, value) {
    const record = await model.findOne({
      where: { [fieldName]: value },
      raw: true,
    });
    return record;
  }
}

export default DbService;
