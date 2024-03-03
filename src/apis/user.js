import axios from "../configs/axios"

export const userRegister = async (fromData) =>
  await axios.post("/user/register", fromData)
export const userLogin = async (fromData) =>
  await axios.post("/user/login", fromData)
export const userLoginWithFacebook = async (fromData) =>
  await axios.post("/user/loginWithFace", fromData)

export const userBookmark = async (restaurantId) =>
  await axios.post("/user/bookmark", { restaurantId })
