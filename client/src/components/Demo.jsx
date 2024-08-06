import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { getAllWanted } from '../api.js'; // Adjust the import according to your file structure

const FaceRecognition = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchedIndividual, setMatchedIndividual] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
      try {
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
        setResult('Error loading face recognition models. Please try again later.');
      }
    };

    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const compareFaces = async () => {
    if (!modelsLoaded) {
      setResult('Models are still loading. Please wait.');
      return;
    }

    if (!image) {
      setResult('Please upload an image.');
      return;
    }

    setIsProcessing(true);
    setResult('Processing image...');

    try {
      const img = await faceapi.fetchImage(image);
      const userDetections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

      if (!userDetections) {
        setResult('Uploaded image does not contain a detectable face.');
        return;
      }

      const wantedList = await getAllWanted();
      let matchFound = false;

      for (const wanted of wantedList.data) { // Adjust according to the structure of your data
        const wantedImg = await faceapi.fetchImage(wanted.image.url); // Ensure 'imageUrl' is the correct field
        const wantedDetections = await faceapi.detectSingleFace(wantedImg).withFaceLandmarks().withFaceDescriptor();

        if (!wantedDetections) {
          continue;
        }

        const distance = faceapi.euclideanDistance(userDetections.descriptor, wantedDetections.descriptor);

        if (distance < 0.6) {
          setMatchedIndividual(wanted);
          matchFound = true;
          break;
        }
      }

      setResult(matchFound ? 'Face matched with a wanted individual!' : 'No match found.');
    } catch (error) {
      console.error('Error during face comparison:', error);
      setResult('An error occurred during face comparison. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="face-recognition">
      <h2>Face Recognition</h2>
      <div className="upload-section">
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded Image" width="200" />}
        </div>
      </div>
      <button onClick={compareFaces} disabled={!modelsLoaded || isProcessing}>
        {isProcessing ? 'Processing...' : 'Compare Faces'}
      </button>
      {result && <p>{result}</p>}
      {matchedIndividual && (
        <div className="matched-individual">
          <h3>Matched Individual Details:</h3>
          <p>Name: {matchedIndividual.name}</p>
          <p>Age: {matchedIndividual.alias}</p>
          <p>LastSeen: {matchedIndividual.lastSeen}</p>
          <p>Crime: {matchedIndividual.crimes}</p>
          <img src={matchedIndividual.image.url} alt={matchedIndividual.name} width="200" />
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
