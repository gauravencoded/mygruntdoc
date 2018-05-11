/**********************************************************
 our wrapper function (required by grunt and its plugins)
 all configuration goes inside this function
*********************************************************/
module.exports = function(grunt)
{
   // CONFIGURE GRUNT
   grunt.initConfig({
      // get the configuration info from package.json file
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),

      concat:
      {
        options:{},
        dist:{
          src:['src/**/*.js'],
          dest:'dist/<%= pkg.name %>.js'
        }
      },

      uglify:
      {
        options:
        {
          // banner will be inserted at the top of the output which displays the date and time
          banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
        },
        dist:{
          files:{'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']}
        }
      },
      jshint:
      {
        // define the files to lint
        files: ['gruntfile.js', 'src/**/*.js'],
        // configure JSHint
        options: {
      // more options here if you want to override JSHint defaults
      globals: {
         jQuery: true,
       }
     }
   },
   watch: {
   files: ['<%= jshint.files %>'],
   tasks: ['jshint']
}


   });





 // log something
 grunt.log.write('Hello world! Welcome to Tutorialspoint!!\n');

 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-contrib-jshint');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-contrib-concat');

// Default task(s).
grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
//When you specify both a task and target, only the specified target configuration will be processed.
grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);


grunt.registerTask('simpletask', 'A simple task to logs stuff.', function(arg1, arg2) {
   if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
   } else {
      grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
   }
});


//It is possible to run a task within another task as shown below −
grunt.registerTask('nested', 'My "foo" task.', function() {
   grunt.task.run('simpletask:ran:shyam', 'dist');   // Enqueue bar and baz tasks, to run after foo completes, in-order.
  // grunt.task.run(['simpletask', 'dist']);
});


//asynchronous tasks
grunt.registerTask('asynctask', 'My "asyncfoo" task.', function() {
   // Force task into async mode and grab a handle to the done() function.
   var done = this.async();
   // Run some sync stuff.
   grunt.log.writeln('Processing your task..');
   // Run some async stuff.
   setTimeout(function() {
      grunt.log.writeln('Finished!');
      done();
   }, 2000);
});


//this task can access his name
grunt.registerTask('taskwhoknowshimself', 'My task "foo" .', function(a, b) {
   grunt.log.writeln(this.name, a, b);
});






//dependent tasks

grunt.registerTask('failingtask', 'My task "foo" .', function() {
   return false;
});

//succesfull task
grunt.registerTask('successtask', 'My task "foo" .', function() {
   return true;
});

grunt.registerTask('bar', 'My task "bar" .', function() {
   // Fail task if foo task failed or never ran.
   grunt.task.requires('successtask');
   // This code executes if the foo task executed successfully.
   grunt.log.writeln('Hello, previoud ran good so i am running');
});

grunt.registerTask("dependentS",["successtask","bar"]);





//config knowing tasks
grunt.registerTask('configtasks', 'My task "foo" .', function() {
   // Log the value of the property. Returns null if the property is undefined.
   grunt.log.writeln('The meta.name property is: ' + grunt.config('meta.name'));
   // Also logs the value of the property. Returns null if the property is undefined.
   grunt.log.writeln('The meta.name property is: ' + grunt.config(['meta', 'name']));
});



grunt.registerTask('configneedingtask', 'My task "foo" .', function() {
   // Fail task if meta.name config properties is missing
   // Format 1: String
   grunt.config.requires('meta.name');
   // or Format 2: Array
   grunt.config.requires(['meta', 'name']);
   // Log... conditionally.
   grunt.log.writeln('This only log if meta.name is defined in the config.');
});





};
