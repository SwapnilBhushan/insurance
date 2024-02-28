const express = require("express");
const Claims = require("../models/claims");
const uniqueID = require("generate-unique-id");

const router = express.Router();

router.post("/:id", async (req, res) => {
  const ID = req.params.id;
  const claimID = uniqueID({ length: 15 });
  console.log(claimID);
  const {
    lineOfBuisness,
    insuredFullName,
    insuredFName,
    insuredLName,
    insuredDOB,
    dateOfDeath,
    Status,
    effectiveDate,
    insuredState,
  } = req.body;

  try {
    const claims = new Claims({
      ID,
      claimNumber: claimID,
      lineOfBuisness,
      insuredFullName,
      insuredFName,
      insuredLName,
      insuredDOB,
      dateOfDeath,
      Status,
      effectiveDate,
      insuredState,
    });

    await claims.save();
    return res.status(200).send(claims);
  } catch (error) {
    console.log(error);
  }
});

//get all the claims

router.get("/", async (req, res) => {
  try {
    const claim = await Claims.find();
    return res.status(200).send(claim);
    // const firstName = policyholder.map((item, index) => {
    //   return item.insuredFirstName;
    // });
    // console.log(firstName);
    // return res.status(200).send(firstName);
  } catch (error) {
    console.log(error);
  }
});

//get claim by specific id

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const claim = await Claims.findById(id);
    if (!claim) {
      return res.status(404).send("No Claim found");
    }
    return res.status(200).send(claim);
  } catch (error) {
    console.log(error);
  }
});

//update claim info
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    lineOfBuisness,
    insuredFullName,
    insuredFName,
    insuredLName,
    insuredDOB,
    dateOfDeath,
    Status,
    effectiveDate,
    insuredState,
  } = req.body;
  try {
    const claims = await Claims.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          lineOfBuisness,
          insuredFullName,
          insuredFName,
          insuredLName,
          insuredDOB,
          dateOfDeath,
          Status,
          effectiveDate,
          insuredState,
        },
      },
      { new: true }
    );

    return res.status(200).send(claims);
  } catch (error) {
    console.log(error);
  }
});

//delete claim

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const claims = await Claims.findByIdAndDelete(id);

    return res.status(200).send("Data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

//

router.get("/search/:claimNumber", async (req, res) => {
  const claimNumber = req.params.claimNumber;

  try {
    const claim = await Claims.find({
      claimNumber: { $regex: new RegExp(claimNumber, "i") },
    });

    if (!claim) {
      return res.status(404).json({ message: "Claims not found" });
    }

    res.status(200).json(claim);
  } catch (error) {
    console.error("Error finding Claim:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
