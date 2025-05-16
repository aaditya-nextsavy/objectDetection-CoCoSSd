"use client";
import { useRef, useState } from "react";
import { load as cocoSsdLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";

const Uploader = () => {
  const [mediaURL, setMediaURL] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setMediaURL(url);
    const type = file.type.startsWith("video") ? "video" : "image";
    setMediaType(type);

    setIsProcessing(true); // Start loading
    const net = await cocoSsdLoad();

    // Wait for media to load before detecting
    setTimeout(() => {
      const mediaElement =
        type === "video" ? videoRef.current : imageRef.current;
      if (!mediaElement) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = mediaElement.videoWidth || mediaElement.naturalWidth;
      canvas.height = mediaElement.videoHeight || mediaElement.naturalHeight;

      net.detect(mediaElement).then((predictions) => {
        renderPredictions(predictions, ctx);
        setIsProcessing(false); // End loading after prediction
      });
    }, 100);
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="border p-2 rounded cursor-pointer"
      />

      
<div className="relative mt-4 w-full max-w-[720px]">
  {/* Image */}
  {mediaURL && mediaType === "image" && (
    <img
      src={mediaURL}
      ref={imageRef}
      alt="uploaded"
      className="rounded w-full"
    />
  )}

  {/* Video */}
  {mediaURL && mediaType === "video" && (
    <video
      src={mediaURL}
      ref={videoRef}
      className="rounded w-full"
      autoPlay
      muted
      controls
    />
  )}

  {/* Canvas overlay */}
  {mediaURL && (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  )}

  {/* Processing text overlay */}
  {isProcessing && (
    <div className="absolute top-0 left-0 w-full h-full z-20 bg-black bg-opacity-40 flex items-center justify-center">
      <h3 className="text-3xl text-white animate-pulse font-semibold text-center">
        Processing with AI model...
      </h3>
    </div>
  )}
</div>

    </div>
  );
};

export default Uploader;
