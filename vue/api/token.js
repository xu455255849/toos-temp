import { get } from "./base.js";

const OSS_API_NAME = "/operator/token/oss";
const IMAGE_API_NAME = "/operator/token/image";

function oss() {
  return get(OSS_API_NAME);
}

function image() {
  return get(IMAGE_API_NAME);
}

export default {
  oss,
  image,
  OSS_API_NAME,
  IMAGE_API_NAME
};
