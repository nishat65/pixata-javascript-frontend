import axios from 'axios';

import Constant from '../constant/Constant';

class FetchApi {
  constructor(endPoint) {
    this.url = Constant.baseUrl;
    this.endPoint = endPoint;
    this.static = Constant.staticUrl;
  }

  async getAllApi() {
    const getAllRes = await axios.get(`${this.url}${this.endPoint}`);
    return getAllRes;
  }

  async getApi(params) {
    const getRes = await axios({
      method: 'get',
      url: `${this.url}${this.endPoint}/${params}`,
    });
    return getRes;
  }

  async postApi(params) {
    const postRes = await axios({
      method: 'post',
      url: `${this.url}${this.endPoint}`,
      data: params,
    });
    return postRes;
  }

  async patchApi(params, token) {
    const patchRes = await axios({
      method: 'patch',
      url: `${this.url}${this.endPoint}/${token}`,
      data: params,
    });
    return patchRes;
  }

  async deleteApi(params, token) {
    const deleteRes = await axios({
      method: 'delete',
      url: `${this.url}${this.endPoint}/${token}`,
    });
    return deleteRes;
  }
}

export default FetchApi;
