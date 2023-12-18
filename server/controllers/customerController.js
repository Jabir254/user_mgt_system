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
