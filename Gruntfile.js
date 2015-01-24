/**
 * Created by abaddon on 05.12.2014.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        distFolder: 'dist',
        cssName: 'style',
        jsName: 'base',
        soriteFolder: 'img/sprites',
        /*Объединение файлов*/
        concat: {
            js: {
                src: ['js/*.js'],
                dest: '<%= distFolder %>/js/<%= jsName %>.js'
            }
        },
        /*Сжатие js файлов*/
        uglify: {
            js: {
                files: {
                    '<%= distFolder %>/js/<%= concatName %>.min.js': ['<%= distFolder %>/js/<%= jsName %>.js']
                }
            }
        },
        /*Сжатие css файлов*/
        cssmin: {
            css: {
                src: ['css/<%= cssName %>.css'],
                dest: '<%= distFolder %>/css/<%= cssName %>.min.css'
            }
        },
        /*Создание спрайтов*/
        sprite: {
            dist: {
                src: ['<%= soriteFolder %>/*.png'],
                destImg: 'img/sprite.png',
                destCSS: 'css/sprite.less',
                cssFormat: 'less',
                imgPath: '../img/sprite.png',
                algorithm: 'left-right',
                engineOpts: {
                    'imagemagick': true
                }
            }
        },
        /*Оптимизация изображений*/
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['*.{png,jpg,gif}'],
                        dest: '<%= distFolder %>/img/'
                    }
                ]
            }
        },
        /*Подгрузка библиотек*/
        bower: {
            install: {
                options: {
                    targetDir: 'js/vendors',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
            }
        },
        /*Добавляет префиксы для css3*/
        autoprefixer: {
            options: {
                browsers: ['last 8 versions']
            },
            dist: {
                files: {
                    'css/style.css': 'css/style.css'
                }
            }
        },
        /*Копирует файлы в рабочую папку с заменой путей*/
        copy: {
            html: {
                src: '*.html',
                dest: 'dist/',
                options: {
                    process: function (content, srcpath) {
                        return content.replace("/style.css", "/build.min.css")
                            .replace("/base.js", "/build.min.js");
                    }
                }
            },
            libs: {
                expand: true,
                src: 'js/vendors/**',
                dest: '<%= distFolder %>/'
            }
        }
    });

    require('load-grunt-tasks')(grunt);


    grunt.registerTask('css', ['newer:autoprefixer', 'newer:cssmin']);
    grunt.registerTask('img', ['sprite', 'imagemin']);
    grunt.registerTask('js', ['newer:concat:js', 'newer:uglify:js']);
    grunt.registerTask('build', ['css', 'js', 'img', 'copy']);
};