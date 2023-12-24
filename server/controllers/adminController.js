

AdminBro.registerAdapter(AdminBroMongoose);
class adminController {
  adminBro = new AdminBro({
    databases: [Admin],
    rootPath: "/admin",
  });

  
}

// app.use(adminBro.options.rootPath, router)
module.exports = adminController;
