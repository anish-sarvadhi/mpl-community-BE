/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';

import mongoose from 'mongoose';
let model = 'User';
class ApplicationController {
  errors: any;
  constructor(m) {
    model = m;
  }

  async _create(req, res, options = {}, callback = null) {
    try {
      const Model = mongoose.model(model);

      const existingUser = await Model.findOne({ email: req.body.email });

      if (!existingUser) {
        const newUser = await Model.create(req.body);

        if (typeof callback === 'function') {
          return callback(newUser);
        }

        return res.status(201).send({
          success: true,
          data: newUser,
          message: options['message'] || 'Successfully Created',
        });
      }

      return res.status(400).json({ message: 'user already exists!' });
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  async _list(req, res, options = {}, callback = null) {
    try {
      const Model = mongoose.model(model);
      const data = await Model.find({}).populate({ path: '', options: { strictPopulate: false } });

      if (typeof callback === 'function') {
        return callback(data);
      }

      return res.status(200).send({ success: true, data });
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  async _findOne(req, res, callback = null) {
    try {
      const Model = mongoose.model(model);

      const condition = req.condition || {};
      const data = await Model.findOne(condition);

      if (typeof callback === 'function') {
        return callback(data);
      }

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  private isCallback(cb) {
    return typeof cb === 'function';
  }
  private model() {
    return mongoose.model(model);
  }
}

export default ApplicationController;
