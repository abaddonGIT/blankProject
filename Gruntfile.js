/**
 * Created by abaddon on 05.12.2014.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        distFolder: 'dist',
        concatName: 'build',
        /*Объединение файлов*/
        concat: {
            css: {
                src: ['css/*.css'],
                dest: '<%= distFolder %>/css/<%= concatName %>.css'
            },
            js: {
                src: ['js/*.js'],
                dest: '<%= distFolder %>/js/<%= concatName %>.js'
            },
            libs: {
                src: ['js/libs/**/*.js'],
                dest: '<%= distFolder %>/js/libs/libs.js'
            }
        },
        /*Сжатие js файлов*/
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= distFolder %>/js/sourcemap.map'
                },
                files: {
                    '<%= distFolder %>/js/<%= concatName %>.min.js': ['<%= distFolder %>/js/<%= concatName %>.js']
                }
            },
            libs: {
                files: {
                    '<%= distFolder %>/js/libs/min/libs.min.js': ['<%= distFolder %>/js/libs/libs.js']
                }
            }
        },
        /*Сжатие css файлов*/
        cssmin: {
            css: {
                src: ['<%= distFolder %>/css/<%= concatName %>.css'],
                dest: '<%= distFolder %>/css/<%= concatName %>.min.css'
            }
        },
        /*Создание спрайтов*/
        sprite: {
            dist: {
                src: ['img/sprites/*.png'],
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
                    targetDir: 'js/libs',
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
                src: 'js/libs/**',
                dest: '<%= distFolder %>/'
            }
        },
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['css']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['js']
            },
            prefix: {
                files: ['css/*.css'],
                tasks: ['newer:autoprefixer']
            }
        }
    });

    require('load-grunt-tasks')(grunt);


    grunt.registerTask('css', ['newer:autoprefixer', 'newer:concat:css', 'newer:cssmin']);
    grunt.registerTask('img', ['sprite', 'imagemin']);
    grunt.registerTask('js', ['newer:concat:js', 'newer:uglify:js']);
    grunt.registerTask('build', ['css', 'js', 'img', 'copy']);
};