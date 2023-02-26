import axios from 'axios'

// /submit

const url = 'api/v1'

class ApiService {
  static postStory(email, desc, picArr, agrees) {
    return axios.post(`${url}/submit`, {
      email: email,
      desc: desc,
      picArr: picArr,
      agrees: agrees,
    })
  }
}

export default ApiService
