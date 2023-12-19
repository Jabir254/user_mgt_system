/**
 * Get /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJs",
  };
  res.render("index", locals);
};



/**
 * Get
 * New Customer
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add new Customer",
  };
  res.render("customer/add", locals);
};

/**
 * Post
 * New customer Form
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);
  
  const locals = {
    title: "New Customer added",
  };
  res.render("customer/add", locals);
};