var a = {
  maxTitle: function (value) {
    let val = new String(value);
    return val.length > 23 ? val.slice(0, 23).trim() + "..." : val.trim();
  }
  
}


let dateServer = value => value.replace(/(d{4})(d{2})(d{2})/g, '$1-$2-$3')



export { dateServer }

import * as custom from './common/filters/custom'

Object.keys(custom).forEach(key => Vue.filt er(key, custom[key]))