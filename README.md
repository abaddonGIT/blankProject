blankProject
============

Заготовка для развертывания проекта на основе grunt.

###Содержание
1. grunt модули:
    - **[grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)**
    - **[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)**
    - **[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)**
    - **[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)**
    - **[grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)**
    - **[grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith)**
    - **[grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)**
    - **[grunt-bower-task](https://github.com/yatskevich/grunt-bower-task)**
    - **[grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)**
    - **[load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)**
    - **[grunt-newer](https://github.com/tschaub/grunt-newer)**
2. Подгружаемые через **bower** библиотеки
    - **jQuery**
    - **fancybox**
    - **font-awesome**
3. css
    - **normalize.css** - сброс стилей
    - **style.less** - содержит стандартные примеси

###Как использовать
Рассчитано на использование **Grunt~0.4.1** и Node.js versions >= 0.8.0
Установить **grunt-cli**:
    
    npm install -g grunt-cli
Запустить установку компонентов:

    npm install
###Доступные комбинированные таски для проекта
- **css** - Объединение в один файл и сжатие
      grunt css
- **js** - Объединение в один файл и сжатие
      grunt js
- **build** - запускает все таски для получения окончательной версии проекта
      grunt build
Окончательная версия проекта будет сохранена в папку **dist**