/*jslint devel: true*/ 
/*global require, module*/

//configure live reload
var port = 35729,
    lrSnippet = require('connect-livereload')({
        port: port
    }),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function (grunt) {
    'use strict';

    //configure grunt tasks
    grunt.initConfig({
        watch: {
            livereload: {
                files: ['{,*/}*.html', '{,**/*}*.css'],
                options: {
                    livereload: port
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '127.0.0.1'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [lrSnippet, mountFolder(connect, '.')];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/app/index.html'
            }
        }
    });
    
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    //register grunt tasks
    grunt.registerTask('server', function () {
        grunt.task.run(['connect:livereload', 'open', 'watch']);
    });

    //if grunt
    grunt.registerTask('default', ['server']);
};