'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        
        watch: {
            jsx : {
                files: ['public/js/src/**/*.jsx'],
                tasks: ['react','browserify']
            },
            css: {
                files: 'public/css/src/**/*.scss',
                tasks: ['compass'],
                options: {
                  livereload: true
                }
            }    
        },
        react: {
            files: {
              expand: true,
              cwd: 'public/js/src',
              src: ['**/*.jsx'],
              dest: 'public/js/build',
              ext: '.js' 
            }
        },
        compass: {                 
            dev: {                    
                options: {
                  sassDir: 'public/css/src',
                  cssDir:  'public/css'
                }
            }
        },
        browserify : {
            dist : {
                files : {
                    'public/js/main.js' : 'public/js/build/**/*.js'
                },
                options : {
                    browserifyOptions : {
                        debug : true,
                    }
                }
            }
        },
        concat : {
            dist : {
                src : [
                   'public/js/vendor/jquery.js',
                   'public/js/vendor/custom.modernizr.js',
                   'public/js/vendor/zepto.js',
                   'public/js/vendor/foundation.js',
                   'public/js/vendor/foundation/*.js',
                   'public/js/vendor/underscore.js',
                   'public/js/vendor/backbone.js',
                   'public/js/vendor/react.js',
                ],
                dest : 'public/js/common.js'
            }
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('commonBundle',['concat:dist']);

    grunt.registerTask('jsx',['react']);
    grunt.registerTask('styles',['compass']);
    

};