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