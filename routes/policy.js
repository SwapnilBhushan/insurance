const express = require("express");
const PolicyHolder = require("../models/policyHolders");
const router = express.Router();

// Registraion of policy holder
router.post("/", async (req, res) => {
  const {
    insuredFirstName,
    insuredLastName,
    Age,
    DateOfBirth,
    State,
    email,
    PhoneNumber,
    Status,
    Beneficiaries,
    Relationship,
  } = req.body;

  try {
    const policyholder = await PolicyHolder.findOne({ email });
    if (policyholder) {
      return res.status(404).send("User Already register");
    }
    if (!policyholder) {
      const policyholder = new PolicyHolder({
        insuredFirstName,
        insuredLastName,
        Age,
        DateOfBirth,
        State,
        email,
        PhoneNumber,
        Status,
        Beneficiaries,
        Relationship,
      });

      await policyholder.save();
      return res.status(200).send(policyholder);
    }
  } catch (error) {
    console.log(error);
  }
});
//get all the policyholders

router.get("/", async (req, res) => {
  try {
    const policyholder = await PolicyHolder.find();
    return res.status(200).send(policyholder);
    // const firstName = policyholder.map((item, index) => {
    //   return item.insuredFirstName;
    // });
    // console.log(firstName);
    // return res.status(200).send(firstName);
  } catch (error) {
    console.log(error);
  }
});

//Get info of specific policyholder
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const policyholder = await PolicyHolder.findById(id);
    if (!policyholder) {
      return res.status(404).send("Policyholder not found");
    }
    return res.status(200).send(policyholder);
  } catch (error) {
    console.log(error);
  }
});

//update policyholder details

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    insuredFirstName,
    insuredLastName,
    Age,
    DateOfBirth,
    State,
    email,
    PhoneNumber,
    Status,
    Beneficiaries,
    Relationship,
  } = req.body;
  try {
    const policyholder = await PolicyHolder.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          insuredFirstName,
          insuredLastName,
          Age,
          DateOfBirth,
          State,
          email,
          PhoneNumber,
          Status,
          Beneficiaries,
          Relationship,
        },
      },
      { new: true }
    );

    return res.status(200).send(policyholder);
  } catch (error) {
    console.log(error);
  }
});

//delete policyholder

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const policyholder = await PolicyHolder.findByIdAndDelete(id);

    return res.status(200).send("Data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
