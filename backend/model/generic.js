// module.exports = class ModelGeneric {
//   // model;
//   constructor(model) {
//     console.log("Model received:", model); 
//     this.model = model;
//   }
//   async getAll(filters = {}) {
//     // console.log("Model:", this.model); // Debugging line
//     // return await this.model.find(filters); 
//     try {
//       // const users = 
//       await this.model.find(filters);
//       res.status(200).json(users);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }

//   async getById(id) {
//     // return await this.model.findById(id);
//     try {
//       const result = await this.model.findById(id);
//       if (!result) return res.status(404).json({ error: "result not found" });
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }

//   async create(data) {
//     // const instance = new this.model(data); //runtime
//     // return await instance.save();
//     try {
//       const instance = new this.model(data); 
//       await instance.save();
//       res.status(201).json(instance);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }

//   async update(id, data) {
//     // return await this.model.findByIdAndUpdate(id, data, { new: true });
//      try {
//        const result = await this.model.findByIdAndUpdate(id, data, { new: true });
//        if (!result) return res.status(404).json({ error: "result not found" });
//        res.status(200).json(result);
//      } catch (err) {
//        res.status(400).json({ error: err.message });
//      }
//   }

//   async delete(id) {
//     // return await this.model.findByIdAndDelete(id);
//     try {
//       const result = await this.model.findByIdAndDelete(id);
//       if (!result) return res.status(404).json({ error: "result not found" });
//       res.status(200).json({ message: "result deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// };
module.exports = class ModelGeneric {
  constructor(model) {
    this.model = model;
  }

  async getAll(filters = {}) {
    try {
      const results = await this.model.find(filters);
      return results;
    } catch (err) {
      throw new Error(`Error retrieving data: ${err.message}`);
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findById(id);
      if (!result) throw new Error("Result not found");
      return result;
    } catch (err) {
      throw new Error(`Error retrieving data: ${err.message}`);
    }
  }

  async create(data) {
    try {
      const instance = new this.model(data);
      const savedInstance = await instance.save();
      return savedInstance;
    } catch (err) {
      throw new Error(`Error creating data: ${err.message}`);
    }
  }

  async update(id, data) {
    try {
      const updatedResult = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedResult) throw new Error("Result not found");
      return updatedResult;
    } catch (err) {
      throw new Error(`Error updating data: ${err.message}`);
    }
  }

  async delete(id) {
    try {
      const deletedResult = await this.model.findByIdAndDelete(id);
      if (!deletedResult) throw new Error("Result not found");
      return { message: "Result deleted successfully" };
    } catch (err) {
      throw new Error(`Error deleting data: ${err.message}`);
    }
  }
};
