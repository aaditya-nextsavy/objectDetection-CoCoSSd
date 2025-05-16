import * as tf from "@tensorflow/tfjs";

if (!globalThis._tfInitialized) {
  globalThis._tfInitialized = true;
  tf.ready().then(() => {
    console.log("TensorFlow is ready");
  });
}

export default tf;
