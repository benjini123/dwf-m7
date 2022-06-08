import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "do59yvsgz",
  api_key: "467322432179891",
  api_secret: "Lsq66VhMX933KcjMWP5seqaJECw",
});

export async function uploadToCloudinary(photo) {
  cloudinary.uploader
    .upload(photo)
    .then(() => {
      console.log("all good!");
    })
    .catch((err) => {
      throw err.message;
    });
}
