const {
  findAll,
  deleteOne,
  create,
  findOne,
  update,
} = require("../models/pessoas");

const index = async (connection, req, res) => {
  params = {
    pageSize: req.query.pageSize || 2,
    currentPage: req.query.page || 0,
  };
  const listaPessoas = await findAll(connection, params);
  res.render("pessoas/index", { listaPessoas });
};

const deletePerson = async (connection, req, res) => {
  await deleteOne(connection, req.params.id);
  res.redirect("/pessoas");
};

const createForm = (req, res) => {
  res.render("pessoas/create");
};

const createProcess = async (connection, req, res) => {
  await create(connection, req.body);
  res.redirect("/pessoas");
};

const updateForm = async (connection, req, res) => {
  const pessoa = await findOne(connection, req.params.id);
  res.render("pessoas/update", { pessoa });
};

const updateProcess = async (connection, req, res) => {
  await update(connection, req.params.id, req.body);
  res.redirect("/pessoas");
};

module.exports = {
  index,
  deletePerson,
  createForm,
  createProcess,
  updateForm,
  updateProcess,
};
