import { TryCatch } from "../middlewares/error.js";
import { WantedList } from "../models/wantedList.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
// import { recognizeFace } from './faceRecognition.js'; // Import the face recognition logic
// import path from 'path';
// import fs from 'fs';

const getAllWantedList = TryCatch(async (req,res) => {
    const wantedList = await WantedList.find().sort({ createdAt: -1});
    res.json(wantedList);
});

// const recognizeface = TryCatch(async (req, res) => {
//   try {
//       const file = req.file;
//       if (!file) return res.status(400).json({ message: "Please upload an image" });

//       const imagePath = path.join(__dirname, file.path);
//       const detections = await recognizeFace(imagePath);

//       if (detections.length === 0) return res.status(400).json({ message: "No faces detected in the image" });
//       const inputDescriptors = detections[0].descriptor;

//       const wantedList = await WantedList.find();
//       let match = null;

//       for (let item of wantedList) {
//           for (let storedDescriptor of item.faceDescriptors) {
//               if (await compareFaces(inputDescriptors, storedDescriptor)) {
//                   match = item;
//                   break;
//               }
//           }
//           if (match) break;
//       }

//       if (match) {
//           res.json({ message: "Match found", data: match });
//       } else {
//           res.json({ message: "No match found" });
//       }

//       // Optionally, delete the uploaded file after processing
//       fs.unlinkSync(imagePath);
//   } catch (error) {
//       console.error('Error recognizing face:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });

const createWantedListItem = TryCatch(async (req, res,next) => {

    try{
    const { name, description, alias, lastSeen, crimes } = req.body;
    const file = req.file;
    if(!file) return next(new ErrorHandler("Please upload Image"));

    const result = await uploadFilesToCloudinary([file]);
    const image = {
      public_id: result[0].public_id,
      url: result[0].url,
    }

    const newItem = new WantedList({ name, description, alias, lastSeen, crimes,image });
    await newItem.save();
    res.status(201).json(newItem);
  }
  catch(err){
    res.status(400).json({success:false,message:err.message});
  }
});

const updateWantedListItem = TryCatch(async (req, res) => {
      const { id } = req.params;
      const { name, description, alias, lastSeen, crimes, image } = req.body;
      const updatedItem = await WantedList.findByIdAndUpdate(
        id,
        { name, description, alias, lastSeen, crimes, image },
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(updatedItem);  
});

const deleteWantedListItem = TryCatch(async (req, res) => {
      const { id } = req.params;
      const deletedItem = await WantedList.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(204).send();
});


export {getAllWantedList,createWantedListItem,updateWantedListItem,deleteWantedListItem}