/**CSS IMPORT**/
import '../css/app.scss';
/**CSS IMPORT**/

/**ANY OTHER EXTERNAL SCRIPT WRITTEN IN ENCORE STYLE**/
import getMessage from './message';

// const getNiceMessage = require('./message'); -- same shit, the only
// difference is that we use module.export = function in the file that we want to import
/**ANY OTHER EXTERNAL SCRIPT WRITTEN IN ENCORE STYLE**/

/**JQUERY**/
// yarn add jquery --dev
// This will work only if the jquery or any library will be written in encore style
import $ from 'jquery';

// This trick will do the job -- will export the $ as global variable
global.$ = $;
/**JQUERY**/

/**JQUERY ENCORE STYLE**/
$(document).ready(function () {
    alert('From app.js');
});
/**JQUERY ENCORE STYLE**/

/**POPPER.JS**/
// yarn add popper.js --dev
import 'bootstrap';
/**POPPER.JS**/

/**BOOTSTRAP**/
// yarn add bootstrap --dev
import 'bootstrap';
/**BOOTSTRAP**/

console.log(getMessage(5));