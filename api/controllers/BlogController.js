/**
 * BlogController
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
   *    `/blog/index`
   *    `/blog`
   */

   index: function (req, res) {

    Blog.find().done(function(err, blogs) {

      if(err != null) return res.json({error:err});

      return res.view({
        blogs: blogs,
      });

    });

  },

  /**
   * Action blueprints:
   *    `/blog/new`
   */
   new: function (req, res) {
    
   return res.view();

  },

  /**
   * Action blueprints:
   *    `/blog`
   */
   create: function (req, res) {
    
    // create an instance of the Project model
    Blog.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    },
    function(err) {
      // handle any errors in saving
      if(err != null) return res.json({error:err});

      // render the template with found projects
      return res.redirect('/blog');
    });

  },


    /**
   * Action blueprints:
   *    `/blog/:id`
   */
   find: function (req, res) {
    
    // find the document by id
    Blog.findOne(req.params.id).done(function(err, blog) {

      // handle any errors
      if(err != null) return res.json({error:err});


      // render the template with the found project
      return res.view({
        blog: blog
      });

    });

  },

  /**
   * Action blueprints:
   *    `/blog/edit`
   */
   edit: function (req, res) {
    
    // Send a JSON response
    Blog.findOne(req.params.id).done(function(err, blog) {
      
      if(err != null) return res.json({error:err});

      res.view({
        blog: blog
      });

    });
  },


   /**
   * Action blueprints:
   *    `/blog:id`
   */
   update: function (req, res) {
    
    // Send a JSON response
    Blog.findOne(req.params.id).done(function(err, blog) {
      
      if(err != null) return res.json({error:err});

      blog.title = req.body.title;
      blog.content = req.body.content;
      blog.tags = req.body.tags;

      blog.save(function(err) {
        
        if(err != null) return res.json({error:err});

      });

      return res.redirect('/blog/'+req.params.id);

    });
  },


  /**
   * Action blueprints:
   *    `/blog/delete`
   */
   delete: function (req, res) {
    
    Blog.findOne(req.params.id).done(function(err, blog) {
     
     if(err != null) return res.json({error:err});
      console.log("here");
      console.log(err);
      console.log(err!=null);
      blog.destroy(function(err) {
        
        if(err != null) return res.json({error:err});
      
      });

    return res.redirect('/blog');

    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BlogController)
   */
  _config: {}

  
};
