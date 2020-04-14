import Axios from "axios"

export const tokenConfig = token => {
  const config = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }

  return config
}

export const resetToken = async refresh => {
  const res = await Axios.post("api/user/token", refresh)
  const { data } = res
  localStorage.setItem("token", data.accessToken)
  return data
}
