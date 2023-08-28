import {App, Plugin} from 'vue';

import vueFilepond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

const FilePond: any = vueFilepond(FilePondPluginFileEncode);

export const FilePondPlugin: Plugin = {
  install(app: App) {
    app.component('FilePond', FilePond);
  }
};
export default FilePondPlugin;
