// "use client";
// import { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import { load as cocoSsdLoad } from "@tensorflow-models/coco-ssd";
// // import * as tf from "@lib/tf-setup";
// // import tf from "@lib/tf-setup"; // no `* as`
// import * as tf from "@tensorflow/tfjs";
// import { renderPredictions } from "@/utils/render-predictions";

// let detectInterval;

// const detector = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   const showMyVideo = () => {
//     if (webcamRef !== null && webcamRef.current.video?.readyState === 4) {
//       const myVideoWidth = webcamRef.current.video.videoWidth;
//       const myVideoHeight = webcamRef.current.video.videoHeight;

//       webcamRef.current.video.width = myVideoWidth;
//       webcamRef.current.video.height = myVideoHeight;
//     }
//   };

//   useEffect(() => {
//     runCoco();
//     // showMyVideo();
//   }, []);

//   const runCoco = async () => {
//     setIsLoading(true);
//     const net = await cocoSsdLoad();
//     setIsLoading(false);

//     detectInterval = setInterval(() => {
//       runObjectDetection(net);
//     }, 10);
//   };

//   async function runObjectDetection(net) {
//     if (
//       canvasRef.current &&
//       webcamRef.current !== null &&
//       webcamRef.current.video?.readyState === 4
//     ) {
//       canvasRef.current.width = webcamRef.current.video.videoWidth;
//       canvasRef.current.height = webcamRef.current.video.videoHeight;

//       const detectedObjects = await net.detect(
//         webcamRef.current.video,
//         undefined,
//         0.6
//       );
//       console.log("results from the detectedobjects ", detectedObjects);
//       const context = canvasRef.current.getContext("2d");
//       renderPredictions(detectedObjects, context);
//     }
//   }

//   return isLoading ? (
//     <div>LOADING AI</div>
//   ) : (
//     <div>
//       <div className="relative flex justify-center items-center p-2 rounded-md">
//         {/* webcam */}
//         <Webcam
//           ref={webcamRef}
//           className="relative rounded-md w-[800px] h-[540px]"
//           muted
//           onLoadedData={showMyVideo}
//         />
//         {/* canvas */}
//         <canvas
//           ref={canvasRef}
//           className="absolute top-0 left-0 right-0 h-[540px] z-99 w-full"
//         />
//       </div>
//       Detector
//     </div>
//   );
// };

// export default detector;


"use client";

import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import {renderPredictions} from "@/utils/render-predictions";

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  async function runCoco() {
    setIsLoading(true); // Set loading state to true when model loading starts
    const net = await cocoSSDLoad();
    setIsLoading(false); // Set loading state to false when model loading completes

    detectInterval = setInterval(() => {
      runObjectDetection(net); // will build this next
    }, 10);
  }

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      // find detected objects
      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6
      );

      //   console.log(detectedObjects);

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context);
    }
  }

  const showmyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    // showmyVideo();
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="">Loading AI Model...</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          {/* webcam */}
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full h-[540px] lg:h-[720px]"
            muted
            onLoadedData={showmyVideo}
          />
          {/* canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;