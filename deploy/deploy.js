var DeployUtils = require("./deployutils");
var fs = require('fs');

/*DeployUtils.minifyCss([
    "../static/common/css/reset.css",
    "../static/vote/css/weixin.css",
    "../static/iconfont/iconfont.css"
],"../static/iconfont/iconfont.min.css");
*/

DeployUtils.minifyJs([ 
  "../static/frozen/js/lib/zeptojs/zepto.min.js", 
  "../static/common/js/common.min.js", 
  "../static/modules/mk-meta/index.js",
  "../static/modules/mk-rest/js/rest.js", 
  "../static/frozen/js/frozen.js"
],"../static/common/js/common.min.js");
