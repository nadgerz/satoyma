/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    "use strict";

    // initializing task configuration
    grunt.initConfig({

        // this enables us to use version, name etc in generated files/dirs
        pkg: grunt.file.readJSON('package.json'),

        // files that our tasks will use
        files: {
            html: {
                src: "index.html"
            },

            less: {
                src: ["css/style.less"]
            },

            js: {
                vendor: {
                    src: [
                        'bower_components//backbone/backbone.js',
                        'bower_components//backbone/index.js',

                        'bower_components//bootstrap/dist/js/bootstrap.js',

                        'bower_components//jquery/dist/jquery.js',

                        'bower_components//jquery-ui/jquery-ui.js',
                        'bower_components//jquery-ui/ui/i18n/datepicker-de.js',
                        'bower_components//jquery-ui/ui/i18n/datepicker-en-GB.js',
                        'bower_components//jquery-ui/ui/i18n/datepicker-es.js',
                        'bower_components//jquery-ui/ui/i18n/datepicker-fr.js',
                        'bower_components//jquery-ui/ui/i18n/datepicker-no.js',

                        'bower_components//lodash/dist/lodash.js',
//            'bower_components//lodash/dist/lodash.underscore.js',

                        'bower_components//moment/benchmarks/clone.js',
                        'bower_components//moment/locale/de-at.js',
                        'bower_components//moment/locale/de.js',
                        'bower_components//moment/locale/en-gb.js',
                        'bower_components//moment/locale/es.js',
                        'bower_components//moment/locale/fr.js',
                        'bower_components//moment/locale/it.js',
                        'bower_components//moment/locale/nl.js',
                        'bower_components//moment/locale/pl.js',
                        'bower_components//moment/locale/pt.js',
                        'bower_components//moment/moment.js',

                        'bower_components//react/JSXTransformer.js',
                        'bower_components//react/react-with-addons.js',
                        'bower_components//react/react.js',

                        'bower_components//requirejs/require.js',

                        'bower_components//underscore/underscore.js',

                        'dummy.js'
                    ],
                }
            }
        },

        concat: {
            options: {
                // Concatenated files will be joined on this string.
                // If you're post-processing concatenated JavaScript files with a minifier,
                // you may need to use a semicolon ';' as the separator.
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
    
            app: {
                // the files to concatenate
                src: [
                    "<%= files.js.vendor.src %>",
                    "src/js/app.js"
                ],

                // the location of the resulting JS file
                //dest: "build/js/app.min.js",
                dest: 'build/dest/<%= pkg.name %>.<%= pkg.version %>.concat.js',

                nonull: true,
            }
        },


        watch: {
            options: {
                // need chrome livereload extension
                // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
                livereload: true
            },

            html: {
                files: ["<%= files.html.src %>"],
                tasks: ["copy"]
            },

            js: {
                files: ["<%= files.js.vendor.src %>"],
                tasks: ["concat"]
            },

            less: {
                files: ["<%= files.less.src %>"],
                tasks: ["less:dev"]
            },

            app: {
                // SELF REFERENTIAL! COOL!
                files: ["<%= concat.app.src %>"],
                tasks: ["concat"]
            }
        },


        copy: {
          main: {
            files: [
              // includes files within path
//              {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

              // includes files within path and its sub-directories
//              {expand: true, src: ['path/**'], dest: 'dest/'},

              // makes all src relative to cwd
//              {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

              // flattens results to a single level
//              {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
            ]
          }
        }
    });


    // loading local tasks
    grunt.loadTasks("tasks");

    // loading external tasks (aka: plugins)
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");

    // creating workflows
//    grunt.registerTask('default', ['concat', 'watch']);
    grunt.registerTask('default', ['concat', 'copy']);
};
