/**
 * Created by abaddon on 05.12.2014.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        distFolder: 'dist',
        concatName: 'built',
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
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= distFolder %>/js/min/sourcemap.map'
                },
                files: {
                    '<%= distFolder %>/js/min/<%= concatName %>.min.js': ['<%= distFolder %>/js/<%= concatName %>.js']
                }
            },
            libs: {
                files: {
                    '<%= distFolder %>/js/libs/min/libs.min.js': ['<%= distFolder %>/js/libs/libs.js']
                }
            }
        },
        cssmin: {
            css: {
                src: ['<%= distFolder %>/css/<%= concatName %>.css'],
                dest: '<%= distFolder %>/css/min/<%= concatName %>.min.css'
            }
        },
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
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['css']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['js']
            }
        }
    });

    require('load-grunt-tasks')(grunt);


    grunt.registerTask('css', ['newer:autoprefixer', 'newer:concat:css', 'newer:cssmin']);
    grunt.registerTask('img', ['sprite', 'imagemin']);
    grunt.registerTask('js', ['newer:concat:js', 'newer:uglify:js']);
    grunt.registerTask('libsJs', ['concat:libs', 'uglify:libs']);
};