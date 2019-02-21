import './style.scss';

console.log("Hello, World!");

import {config} from './js/export-script'       // импорт объекта
import AppService from './js/export-script-app' // импорт класса
import './js/header.component'                  // импорт js-файла без экспорта

console.log('Config key: ', config.key)
const service = new AppService('Hello App Service!')
service.log()   // данное подключение сработает перед всеми остальными

import $ from 'jquery';
$('.title-2').html('Text must be red.').css('color', 'red');
