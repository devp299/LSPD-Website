// import * as faceapi from 'face-api.js';
// import { Canvas, Image, ImageData } from 'canvas';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Monkey patch face-api.js to use canvas and image
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const loadModels = async () => {
//   const modelPath = path.join(__dirname, 'models');
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
// };

// export const recognizeFace = async (imagePath) => {
//   const image = await Canvas.loadImage(imagePath);
//   const detections = await faceapi.detectAllFaces(image)
//     .withFaceLandmarks()
//     .withFaceDescriptors();

//   return detections;
// };

// export const compareFaces = async (inputDescriptors, storedDescriptors) => {
//   const threshold = 0.6;
//   for (let i = 0; i < storedDescriptors.length; i++) {
//     const distance = faceapi.euclideanDistance(inputDescriptors, storedDescriptors[i]);
//     if (distance < threshold) {
//       return true;
//     }
//   }
//   return false;
// };
