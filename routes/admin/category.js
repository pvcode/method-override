const express = require("express");
const Router = express.Router();
const Category = require("./../../models/category");

const notify = require("./../../configs/notify");
const paths = require("./../../configs/path");
const configsSystem = require("./../../configs/system");
const folderView = paths.FOLDER_VIEWS + "/category";
const {validateCategory} = require("./../../helpers/validate")

// index page
Router.get("/", (req, res) => {
  Category.find({})
    .sort({ ordering: 1 })
    .then(items => {
      res.render(`${folderView}/index`, {
        pageTitle: "Category Management",
        items,
        messages: req.flash()
      });
    });
});

// add category page
Router.get("/add", (req, res) => {
  res.render(paths.FOLDER_VIEWS + "/category/add", {
    pageTitle: "Category Management - Add"
  });
});

// form add process
Router.post("/", (req, res) => {
  validateCategory(req,res);
  let errors = req.validationErrors();
  
  let item = Object.assign(req.body);

  if (errors) {
    res.render(`${folderView}/add`, {
      pageTitle: "Category Management",
      errors,
      item
    });
  } else {
    new Category(item).save().then(itemResult => {
      req.flash("success", "Save thành công");
      res.redirect(`/${configsSystem.PREFIX_ADMIN}/category/`);
    });
  }
});

//  edit category
Router.get("/edit/:id", (req, res) => {
  let item = { title: "", ordering: 0, content: "", id: "" };
  Category.findOne({
    _id: req.params.id
  })
    .then(item => {
      res.render(`${folderView}/edit`, { pageTitle: "Category - Edit", item });
    })
    .catch(errors => {
      req.flash("warning", "Không tồn tại category");
      res.redirect(`/${configsSystem.PREFIX_ADMIN}/category/`);
    });
});
Router.put("/:id", (req, res) => {
    let id = req.params.id;

    validateCategory(req,res);

    let errors = req.validationErrors();

    let item = Object.assign(req.body);


    if (errors) {
        res.render(`${folderView}/edit`, { pageTitle: "Category - Edit", item, errors });
      
    } else {
        Category.findOne({
            _id : id
        })
        .then( itemResult => {
            itemResult.title = item.title;
            itemResult.ordering = item.ordering;
            itemResult.content = item.content;
            itemResult.status = item.status;

            itemResult.save()
                .then( () => {
                    req.flash('success', 'Category updated!');
                    res.redirect(`/${configSystem.PREFIX_ADMIN}/category/`);
                })
        })
    }
});
// Delete
Router.get('/delete/:id', (req, res) => {
    Category.remove({_id: req.params.id})
        .then(()=>{
            req.flash('success', 'Delete thành công');
            res.redirect(`/${configsSystem.PREFIX_ADMIN}/category/`);
        });
});

module.exports = Router;
