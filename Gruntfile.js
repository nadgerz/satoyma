/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    "use strict";

    // initializing task configuration
    grunt.initConfig({

        // this enables us to use version, name etc in generated files/dirs
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                // separator: ';',
                stripBanners: true
            },
    
            app: {
                // the files to concatenate
                src: [
                    "src/js/vendor/jquery-2.1.1.js",
                    "src/js/app.js"
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
