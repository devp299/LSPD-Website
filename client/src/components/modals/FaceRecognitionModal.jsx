import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getAllWanted } from '../../api.js'; // Adjust the import according to your file structure
import toast, { Toaster } from 'react-hot-toast';

const FaceRecognitionModal = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedIndividual, setMatchedIndividual] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/weights';
      try {
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
        toast.error('Error loading face recognition models. Please try again later.');
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
    // setResult('Processing image...');

    try {
      const img = await faceapi.fetchImage(image);
      const userDetections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

      if (!userDetections) {
        toast.error('Uploaded image does not contain a detectable face.')
        // setResult('Uploaded image does not contain a detectable face.');
        setIsProcessing(false);
        return;
      }

      const wantedList = await getAllWanted();
      let matchFound = false;

      for (const wanted of wantedList.data) {
        const wantedImg = await faceapi.fetchImage(wanted.image.url);
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
      
      {matchFound ? toast.success('Face matched with a wanted individual!') : toast.error('No match found.')};
    } catch (error) {
      console.error('Error during face comparison:', error);
      setResult('An error occurred during face comparison. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMatchedIndividual(null);
    onClose();
  };

  return (
    <div className="wanted-modal" onClick={onClose}>
      <div className="wanted-face-modal-content" onClick={(e) => e.stopPropagation()}>
        <IconButton className="wanted-close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <h3>Face Recognition</h3>
        <div className="upload-section">
          {!image ? (
            <>
              <label htmlFor="file" className="labelFile">
                <span>
                  <svg
                    xmlSpace="preserve"
                    viewBox="0 0 184.69 184.69"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    version="1.1"
                    width="60px"
                    height="60px"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                              C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                              C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                              c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                              c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                              c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                              c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                              v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                            style={{ fill: '#010002' }}
                          ></path>
                        </g>
                        <g>
                          <path
                            d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                              c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                              L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                              c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                              C104.91,91.608,107.183,91.608,108.586,90.201z"
                            style={{ fill: '#010002' }}
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <p>Click here to select a file!</p>
              </label>
              <input
                className="face-input"
                name="text"
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </>
          ) : (
            <>
              <img src={image} alt="Uploaded Image" width="200" />
              <button className="compare-faces" onClick={compareFaces} disabled={!modelsLoaded || isProcessing}>
                Compare Faces
                {isProcessing && <div className="loader"></div>}
              </button>
            </>
          )}
        </div>
        {/* {result && <p>{result}</p>} */}
        {matchedIndividual && (
          <div className="wanted-modal" onClick={closeModal}>
          <div className="wanted-modal-content" onClick={(e) => e.stopPropagation()}>
            <IconButton className="wanted-close" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
            <div className="brutalist-card__icon wanted-modal-image">
              <img
                src={matchedIndividual.image.url}
                alt={matchedIndividual.name}
                className="criminal-photo"
              />
              <h6 style={{ color: "#ffb463" }}>{matchedIndividual.name}</h6>
            </div>
            <p><strong style={{ color: "#ffb463" }}>Alias :</strong> {matchedIndividual.alias}</p>
            <p><strong style={{ color: "#ffb463" }}>Description :</strong> {matchedIndividual.description}</p>
            <p><strong style={{ color: "#ffb463" }}>Crimes :</strong> {matchedIndividual.crimes}</p>
            <p><strong style={{ color: "#ffb463" }}>Last Seen :</strong> {matchedIndividual.lastSeen}</p>
          </div>
        </div>
        )}
      </div>
      <Toaster/>
    </div>
  );
};

export default FaceRecognitionModal;
