/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    "use strict";

    // initializing task configuration
    grunt.initConfig({

        // this enables us to use version, name etc in generated files/dirs
        pkg: grunt.file.readJSON('package.json'),

        // using meta data
        banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
                "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
                "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" +
                "* Copyright (c) <%= grunt.template.today(\"yyyy\") %>;\n" +
                "* Contributors: <%= _.pluck(pkg.contributors, \"name\").join(\", \") %>;\n" +
                "* Licensed <%= _.pluck(pkg.licenses, \"type\").join(\", \") %> */\n",

        destinations: {
            compiled: {
                coffee: [ "generated/compiled-coffee" ],
                templates: [ "generated/compiled-templates" ]
            },
        },

        outputName: '<%= pkg.name %>.<%= pkg.version %>',

        minifiedName: '<%= outputName %>.min.js',

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
                        'bower_components/backbone/backbone.js',
                        'bower_components/backbone/index.js',

                        'bower_components/bootstrap/dist/js/bootstrap.js',

                        'bower_components/jquery/dist/jquery.js',

                        'bower_components/jquery-ui/jquery-ui.js',
                        'bower_components/jquery-ui/ui/i18n/datepicker-de.js',
                        'bower_components/jquery-ui/ui/i18n/datepicker-en-GB.js',
                        'bower_components/jquery-ui/ui/i18n/datepicker-es.js',
                        'bower_components/jquery-ui/ui/i18n/datepicker-fr.js',
                        'bower_components/jquery-ui/ui/i18n/datepicker-no.js',

                        'bower_components/lodash/dist/lodash.js',
//            'bower_components/lodash/dist/lodash.underscore.js',

                        'bower_components/moment/benchmarks/clone.js',
                        'bower_components/moment/locale/de-at.js',
                        'bower_components/moment/locale/de.js',
                        'bower_components/moment/locale/en-gb.js',
                        'bower_components/moment/locale/es.js',
                        'bower_components/moment/locale/fr.js',
                        'bower_components/moment/locale/it.js',
                        'bower_components/moment/locale/nl.js',
                        'bower_components/moment/locale/pl.js',
                        'bower_components/moment/locale/pt.js',
                        'bower_components/moment/moment.js',

//                        'bower_components/react/JSXTransformer.js',
                        'bower_components/react/react-with-addons.js',
//                        'bower_components/react/react.js',

                        'bower_components/requirejs/require.js',

                        'bower_components/underscore/underscore.js',
                    ],
                },

                app: {
                    src: [
                        "src/js/app.js"
                    ],
                },
            },

            coffee: {
                dest: "<%= destinations.compiled.coffee %>",

                compiled: [
                    "<%= destinations.compiled.coffee %>/config/**/*.js",
                    "<%= destinations.compiled.coffee %>/app.js",
                    "<%= destinations.compiled.coffee %>/data/**/*.js",
                    "<%= destinations.compiled.coffee %>/directives/**/*.js",
                    "<%= destinations.compiled.coffee %>/controllers/**/*.js",
                    "<%= destinations.compiled.coffee %>/services/**/*.js",
                    "<%= destinations.compiled.coffee %>/**/*.js",
                ],

                vendor: {
                    src: [
                        'glibble/neepneep/boopie.coffee',
                    ]
                }
            },

            templates: {
                src: "app/templates/**/*.html",
                compiled: "destinations.compiled.templates %>"
            },

        },


        //
        //    =========================================
        //    ========== task configurations ==========
        //    =========================================
        //
        cafemocha: {
            all: {
                src: 'qa/tests-*.js',
                options: {
                    ui: 'tdd'
                },
            }
        },

        coffee: {
            compile: {
                expand: true,
                cwd: 'coffee',
                src: '**/*.coffee',
                dest: '<%= files.coffee.dest %>',
                ext: '.js',
            }
        },

        open: {
            dev: {
                path: "http://localhost:<%= server.web.port %>"
            }
        },


        browserify: {
            app: {
            // TBD fix these locations
                files: {
                    "<%= files.js.app.compiled %>" : "<%= files.js.app.main %>"
                },

                options: {
                    debug: true,
                    transform: ["coffeeify"]
                }
            }
        },
            
        concat_sourcemap: {
            options: {
                // Concatenated files will be joined on this string.
                // If you're post-processing concatenated JavaScript files with a minifier,
                // you may need to use a semicolon ';' as the separator.
                separator: ';',
                sourcesContent: true,
//                stripBanners: true,
//                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
//                        '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
    
            app: {
                // the files to concatenate
                //
                // If any of these targets do not exist, you will get this error, using concat_sourcemap
                // 'Warning: must provide pattern Use --force to continue.'
                src: [
                    "<%= files.js.vendor.src %>",
                    "<%= files.js.app.src %>",
                    "<%= files.coffee.compiled %>",
                    "<%= files.templates.compiled %>",
                ],

                // the location of the resulting JS file
                dest: 'build/dest/<%= outputName %>.concat.js',

                nonull: true,
            }
        },


        less: {
            options: {
                paths: ["app/css"],
                ieCompat: false
            },

            dev: {
                src: "<%= files.less.src %>",
                dest: "generated/css/style.css"
            },

            dist: {
                options: {
                    cleancss: true,
                    compress: true
                },

                src: "<%= files.less.src %>",
                dest: "dist/css/style.css"
            }
        },


        newer: {
            timestamps: "generated/compilation-timestamps"
        },


        watch: {
            options: {
                // need chrome livereload extension
                // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
                livereload: true
            },

            // targets for watch
            html: {
                files: ["<%= files.html.src %>"],
                tasks: ["copy"]
            },

            js: {
                files: ["<%= files.js.vendor.src %>"],
                tasks: ["concat_sourcemap"]
            },

            coffee: {
                files: ["src/coffee/**/*.coffee"],
                tasks: ["coffee", "concat_sourcemap"]
            },

            // TODO - get this in alphabetical order
            templates: {
                files: ["src/templates/**/*.html"],
                tasks: ["clean", "build"]
            },

            less: {
                files: ["<%= files.less.src %>"],
                tasks: ["less:dev"]
            },

            app: {
                // SELF REFERENTIAL! COOL!
                files: ["<%= concat.app.src %>"],
                tasks: ["concat_sourcemap"]
            }
        },


        handlebars: {
            options: {
                namespace: "JST",
                wrapped: true
            },

            compile: {
                src: "<%= files.templates.src %>",
                dest: "<%= files.templates.compiled %>",
            },
        },


        copy: {
            main: {
                files: [
                    // includes files within path
                    // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

                    // includes files within path and its sub-directories
                    // {expand: true, src: ['path/**'], dest: 'dest/'},

                    // makes all src relative to cwd
                    // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                    // flattens results to a single level
                    // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
                ]
            },

            html: {
                files: {
                    "generated/index.html" : "<%= files.html.src %>",
                    "dist/index.html"      : "<%= files.html.src %>"
                }
            }
        },


        clean: {
            workspaces: [
                "build",
                "dist"
            ],

            example: [{
                dot: true,
                src: [
                    'dist/*',
                    '!dist/.git*'
                ]
            }]
        },


        htmlmin: {
            build: {
                options: {
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '{,*/}*.html',
                    dest: 'dist'
                }]
            }
        },


        uglify: {
            options: {
                banner: "<%= banner %>",
                // mangle: false,
                // beautify: true,
                // compress: false,
                // report: "gzip",
            },

            dist: {
                sourceMapIn: "build/dest/<%= minifiedName %>.map",
                sourceMap:   "build/dest/<%= minifiedName %>.map",
                src: "<%= concat_sourcemap.app.dest %>", // input from the concat_sourcemap process
                dest: 'build/dest/<%= minifiedName %>',
            }
        },


        mongo: {
            web: {
                root: "build",
                port: 8000
            }
        },


        // so a internal task, like 'server start/stop' can grab these from here
        server: {
            web: {
                root: "" + (process.env.SERVER_ROOT || 'build'),
                port: 8000
            }
        },

        license_finder: {
            all: {
                options: {
                    production: true,
                    directory: '/training/subjects/programming/web/satoyma',
                    out: '/training/subjects/programming/web/satoyma/licenses.txt',
//                    csv: true
                }
            }
        }
    });


    //
    // loading local tasks
    grunt.loadTasks("tasks");

    //
    // loading external tasks (aka: plugins)

    //
    // Loads all plugins that match "grunt-", in this case all of our current plugins
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    // load non-grunt- plugins
    var nonGruntPlugins = [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ];

    nonGruntPlugins.forEach(function(task){
        grunt.loadNpmTasks(task);
    });

    //
    // creating workflows
//    grunt.registerTask('default', ['less:dev', 'newer:coffee', 'concat', 'copy', 'server' ]);
//    grunt.registerTask('build', ['clean', 'less:dev', 'newer:coffee', 'concat', 'uglify', 'server' ]);
    grunt.registerTask('default', ['concat_sourcemap', 'copy']);
    grunt.registerTask("build", ["concat_sourcemap", "uglify", "copy"]);
};
