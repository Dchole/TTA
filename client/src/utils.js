import Axios from "axios"

export const tokenConfig = token => {
  const config = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  }

  return config
}

export const resetToken = async () => {
  const res = await Axios("api/user/token", {
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
  const { data } = res
  return data
}
