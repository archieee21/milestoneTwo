const Property = require("../models/property.js"); // main property model
const PropertyDetails = require("../models/propertyDetails.js"); // details model (if needed)

const getData = async (req, res) => {
  try {
    const allData = await Property.find(); // <-- changed from PropertyProProperty
    res.status(200).json(allData);
    console.log(allData);
    return allData;
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createData = async (req, res) => {
  const data = req.body;
  const newData = new Property(data); // <-- changed from PropertyProProperty
  try {
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const editData = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedData = await Property.findByIdAndUpdate(id, data, {
      new: true,
    }); // <-- updated
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Property.findByIdAndRemove(id);
    res.send("Record Deleted Successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  createData,
  deleteData,
  editData,
};
