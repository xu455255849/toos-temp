export default {
  videoTimeFormat: function(seconds) {
  let h, m, s;
  h =
    Math.floor((seconds / 60 / 60) % 24) < 10
      ? "0" + Math.floor((seconds / 60 / 60) % 24)
      : Math.floor((seconds / 60 / 60) % 24);
  m =
    Math.floor((seconds / 60) % 60) < 10
      ? "0" + Math.floor((seconds / 60) % 60)
      : Math.floor((seconds / 60) % 60);
  s =
    Math.floor(seconds % 60) < 10
      ? "0" + Math.floor(seconds % 60)
      : Math.floor(seconds % 60);
  return h + ":" + m + ":" + s;
},
}


// 实例

import * as custom from './common/filters/custom'

Object.keys(custom).forEach(key => Vue.filt er(key, custom[key]))