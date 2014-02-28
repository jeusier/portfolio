/**
 * ProjectController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/project/index`
   *    `/project`
   */
   index: function (req, res) {

    Project.find().done(function(err, projects) {

      if(err != null) return res.json({error:err});

      return res.view({
        projects: projects,
      });

    });

  },

    /**
   * Action blueprints:
   *    `/project/new`
   */
   new: function (req, res) {
    
   return res.view();

  },

      /**
   * Action blueprints:
   *    `/project`
   */
   create: function (req, res) {
    
    // create an instance of the Project model
    Project.create({
      name: req.body.name,
      about: req.body.about,
      description: req.body.description,
      url: req.body.url
    },
    function(err) {
      // handle any errors in saving
      if(err != null) return res.json({error:err});

      // render the template with found projects
      return res.redirect('/project');
    });

  },

    /**
   * Action blueprints:
   *    `/project/show`
   */
   find: function (req, res) {
    
    // find the document by id
    Project.findOne(req.params.id).done(function(err, project) {

      // handle any errors
      if(err != null) return res.json({error:err});


      // render the template with the found project
      return res.view({
        project: project,
      });

    });

  },


  /**
   * Action blueprints:
   *    `/project/:id`
   *    `/project/find/:id`
   */
   show: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'jCurray'
    });
  },


  /**
   * Action blueprints:
   *    `/project/edit`
   */
   edit: function (req, res) {
    
    // Send a JSON response
    Project.findOne(req.params.id).done(function(err, project) {
      
      if(err != null) return res.json({error:err});

      res.view({
        project: project
      });

    });
  },

    /**
   * Action blueprints:
   *    `/project/:id`
   */
   update: function (req, res) {
    
    // Send a JSON response
    Project.findOne(req.params.id).done(function(err, project) {
      
      if(err != null) return res.json({error:err});

      project.name = req.body.name;
      project.about = req.body.about;
      project.description = req.body.description;
      project.url = req.body.url;

      project.save(function(err) {
        
        if(err != null) return res.json({error:err});

      });

      return res.redirect('/project/'+req.params.id);

    });
  },


  /**
   * Action blueprints:
   *    `/project/delete`
   */
   delete: function (req, res) {
    
    Project.findOne(req.params.id).done(function(err, project) {
     
     if(err != null) return res.json({error:err});
      console.log("here");
      console.log(err);
      console.log(err!=null);
      project.destroy(function(err) {
        
        if(err != null) return res.json({error:err});
      
      });

    return res.redirect('/project');

    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProjectController)
   */
  _config: {}

  
};
