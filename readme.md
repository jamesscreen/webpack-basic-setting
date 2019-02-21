# Установка и настройка webpack

Это готовый шаблон для сборки проектов.
Сюда входит:
- подключен препроцессор sass/scss
- подключен jQuery
- подключен локальный шрифт "Open Sans"
- в readme.md есть небольшой гайд как это все настраивалось :)


## 1. Устанавливаем Node.js с официального сайта nodejs.org

### Как посмотреть версию?

node -v

v10.15.1


npm -v

6.4.1


## 2. Инициализация проекта, появится файл с настройками package.json

npm init


## 3. Установка webpack и webpack-cli. Так же есть гайд по установке на сайте: https://webpack.js.org/guides/installation

npm i -D webpack webpack-cli

После установки появится каталог node_modules. Если используется git, то необходимо занести его в игнор-лист.

Создаем в корне файл .gitignore, пишем следующую строку, после чего сохраныем.

node_modules/*


## 4. Создаем файл конфигурации webpack с названием "webpack.config.js" и пишем базовую конфигурацию с указанием входного файла - index.js и выходного - main.js, а также укажем выходную папку (где будут храниться все собранные файлы) - dist/

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  }
}


## 5. Тестируем. Вводим в консоли:

webpack

и если получаем ошибку, типа:
"webpack" не является внутренней или внешней
командой, исполняемой программой или пакетным файлом.


Все получилось!
"
Hash: e4754154e701fceaefe7
Version: webpack 4.29.3
Time: 578ms
Built at: 2019-02-13 14:00:08
  Asset       Size  Chunks             Chunk Names
main.js  963 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 29 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
"

В index.html добавляем <script src="dist/main.js"></script>

И проверить, все ли работает в браузере :)


## 6. Оптимизируем выполнение сборки. Редактируем скрипт в package.json, приводим к виду:

"scripts" : {
  "dev" : "webpack --mode development",
  "build" : "webpack --mode production"
}

Теперь набирая в консоли 

npm run dev

не оптимизированную версию. И

npm run build

получим сжатый код в каталоге dist.


## 7. Подключаем SASS

Устанавливаем компоненты:

npm i -D style-loader css-loader sass-loader node-sass extract-text-webpack-plugin

В webpack 4 может быть ошибка с xtractTextPlugin, тогда нужно его переустановить так:

npm i -D extract-text-webpack-plugin@next

Добавляем запись в начало документа webpack.config.js:

const ExtractTextPlugin = require('extract-text-webpack-plugin');

Теперь указываем webpack-у, что нужно обрабатывать .scss файлы при помощи "ExtractTextPlugin"-,CSS- и Sass-загрузчик. Вставляем следующий код:

output: {
  ...
},
module: {
  rules: [
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
  ]
}

А после фигурной скобки делаем ссылку на ExtractTextPlugin, чтобы показать webpack-у, что все css файлы нужно соеденить в один файл "style.css"

plugins: [
  new ExtractTextPlugin('style.css')
]

Подключаем к index.html файл стилей style.css из каталога dist/, который появится там сразу после сборки проекта.

<link rel="stylesheet" href="dist/style.css">

Добавим блок в index.html с классом ".title", например так:

<h1 class="title">Must be red color text.</h1>

Создадим каталог в ./src/ с именем scss и там делаем файл style.scss. Заполняем следующим, тестовым, содержимым:

"
@import url('https://fonts.googleapis.com/css?family=Roboto');
$color-text : green;

.title {
  font-family: 'Roboto', sans-serif;
  color: $color-text;
}
"

Обязательно нужно подключить файл стилей ко входному файлу index.js (в противном случае в выходном каталоге Мы не получим заветный css-файл):

import './style.scss';

Запускаем - npm run dev
И наблюдаем в браузере как меняет заголовок стиль шрифта и цвет текста.


## 8. Подключаем jQuery

Установим jQuery

npm i -S jquery

Для тестирования работоспособности пропишем во входном файле:

import $ from 'jquery';
$('.title-2').html('Text must be red.').css('color', 'red');


## 9. @font-face в webpack

npm i -S file-loader

webpack.config.js добавляем в rules:

"
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: [{
    loader: 'file-loader?name=fonts/[name].[ext]'
  }]
}
"

В каталоге src содаем папку где будут храниться шрифты "fonts".
Внутри fonts кидаем шрифты форматов: ttf, woff, woff2, eot, svg. В моем случае я положил туда шрифты 'Open Sans' с различными значениями font-style и font-width.
Так же создаем файл с именем "opensans.scss" в котором при помощи правила от HTML5 - "@font-face" подключим все шрифты. Выглядеть этот файл будет так:

"
@font-face {
    font-family: 'Open Sans';
    src:
      local('Open Sans Light'),
      local('OpenSans-Light'),
      url('fonts/opensanslight.woff2') format('woff2'),
      url('fonts/opensanslight.woff') format('woff'),
      url('fonts/opensanslight.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: 'Open Sans';
    src:
      local('Open Sans Light Italic'),
      local('OpenSansLight-Italic'),
      url('fonts/opensanslightitalic.woff2') format('woff2'),
      url('fonts/opensanslightitalic.woff') format('woff'),
      url('fonts/opensanslightitalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
}
... и так далее...
"

Далее импортируем созданный ранее файл шрифтов в файл стилей style.scss, при помощи команды:

@import './fonts/opensans.scss';

