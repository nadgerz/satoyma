/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    "use strict";

    // initializing task configuration
    grunt.initConfig({

        // this enables us to use version, name etc in generated files/dirs
        pkg: grunt.file.readJSON('package.json'),

        vendorJs:  [
            "src/vendor/xxx/xxx.js",

            'bower_components//backbone/backbone.js',
            'bower_components//backbone/index.js',

            'bower_components//bootstrap/dist/js/bootstrap.js',

            'bower_components//jquery/dist/jquery.js',

            'bower_components//jquery-ui/jquery-ui.js',
            'bower_components//jquery-ui/ui/i18n/datepicker-de.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-en-AU.js',
            'bower_components//jquery-ui/ui/i18n/datepicker-en-GB.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-en-NZ.js',
            'bower_components//jquery-ui/ui/i18n/datepicker-es.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-fr-CH.js',
            'bower_components//jquery-ui/ui/i18n/datepicker-fr.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-it-CH.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-it.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-nl-BE.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-nl.js',
            'bower_components//jquery-ui/ui/i18n/datepicker-no.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-pl.js',
//            'bower_components//jquery-ui/ui/i18n/datepicker-pt.js',

//            'bower_components//lodash/dist/lodash.compat.js',
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
                    "src/js/app.js",
                    "<%= vendorJs %>"
                ],
                // the location of the resulting JS file
                //dest: "build/js/app.min.js",
                dest: 'build/dest/<%= pkg.name %>.<%= pkg.version %>.concat.js'
            }
        }
    });


    // loading local tasks
//    grunt.loadTasks("tasks");

    // loading external tasks (aka: plugins)
    grunt.loadNpmTasks("grunt-contrib-concat");

    // creating workflows
    grunt.registerTask('default', ['concat']);

};
