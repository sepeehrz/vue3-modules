import axios, {Axios as AxiosClass} from 'axios';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const getApiUrl = () => {
  let isDev = urlParams.get('dev');
  if (isDev) {
    return 'https://localhost:5001/api';
  }
  if (window.location.host === 'admin.lendroll.ir') {
    return 'https://admin.api.lendroll.ir/api';
  } else if (window.location.host === 'org.lendroll.ir') {
    return 'https://org.api.lendroll.ir/api';
  } else if (window.location.host === 'emp.lendroll.ir') {
    return 'https://emp.api.lendroll.ir/api';
  } else if (window.location.host === 'bank.lendroll.ir') {
    return 'https://bank.api.lendroll.ir/api';
  } else {
    return 'https://test.api.lendroll.ir/api';
  }
};
export class Axios extends AxiosClass {
  constructor() {
    super();
    this.defaults = axios.defaults;
    this.defaults.baseURL = getApiUrl();
    this.defaults.headers.common.tenant = 'root';
    this.defaults.headers.common['accept-language'] = 'fa';
    this.defaults.validateStatus = () => true;
  }
}
