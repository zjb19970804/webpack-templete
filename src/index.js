import 'amfe-flexible';
import { join } from 'lodash';
import './css/index.css';
let div = document.createElement('div');
console.log('12123');
div.innerText = join(['hello', 'webpack'], ' ');
document.getElementsByTagName('body')[0].appendChild(div);
