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
      return res.status(404).json("User Already register");
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
      return res.status(200).json(policyholder);
    }
  } catch (error) {
    console.log(error);
  }
});
//get all the policyholders

router.get("/", async (req, res) => {
  try {
    const policyholder = await PolicyHolder.find();
    return res.status(200).json(policyholder);
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
      return res.status(404).json("Policyholder not found");
    }
    return res.status(200).json(policyholder);
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

    return res.status(200).json(policyholder);
  } catch (error) {
    console.log(error);
  }
});

//delete policyholder

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const policyholder = await PolicyHolder.findByIdAndDelete(id);

    return res.status(200).json("Data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

//Find policy holder by insuredFirstName

router.get("/search/:firstName", async (req, res) => {
  const firstName = req.params.firstName;

  try {
    const policyholder = await PolicyHolder.find({
      insuredFirstName: { $regex: new RegExp(firstName, "i") },
    });

    if (!policyholder) {
      return res.status(404).json({ message: "Policyholder not found" });
    }

    res.status(200).json(policyholder);
  } catch (error) {
    console.error("Error finding policyholder:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Find policy holder by Status
router.get("/search/status/:status", async (req, res) => {
  const status = req.params.status;

  try {
    const policyholder = await PolicyHolder.find({
      Status: status,
    });

    if (!policyholder) {
      return res.status(404).json({ message: "Policyholder not found" });
    }

    res.status(200).json(policyholder);
  } catch (error) {
    console.error("Error finding policyholder:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/deleteByA", async (req, res) => {
  try {
    const result = await PolicyHolder.deleteMany({
      insuredFirstName: { $regex: /^A/i },
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: "No Policyholders with names starting with letter A found",
      });
    }

    res.status(200).send({
      message: `Deleted ${result.deletedCount} Policyholders with names starting with letter A`,
    });
  } catch (error) {
    console.error("Error deleting policyholders:", error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
