const findAll = (connection, params) => {
  return new Promise(async (resolve, reject) => {
    const offset = params.currentPage * params.pageSize;
    const pageSize = params.pageSize;
    const count = await connection("pessoas").count("*");
    const totalPages = parseInt(count[0].total / pageSize);
    const pessoas = await connection("pessoas")
      .select("*")
      .limit(pageSize)
      .offset(offset);
    pessoas && count
      ? resolve({
          data: pessoas,
          pagination: {
            pages: totalPages,
            pageSize,
            currentPage: params.currentPage,
          },
        })
      : reject("list not found");
  });
};

const deleteOne = (connection, id) => {
  return new Promise((resolve, reject) => {
    const pessoa = connection("pessoas").where({ id }).delete();
    pessoa ? resolve(pessoa) : reject("Was not found");
  });
};

const create = (connection, { nome, nascimento, cargo }) => {
  return new Promise(async (resolve, reject) => {
    const newPerson = await connection("pessoas").insert({
      nome,
      nascimento,
      cargo,
    });
    newPerson ? resolve() : reject("Problem to insert");
  });
};

const findOne = (connection, id) => {
  return new Promise(async (resolve, reject) => {
    const results = await connection("pessoas").select("*").where({ id });
    results.length > 0 ? resolve(results[0]) : reject({});
  });
};

const update = (connection, id, { nome, nascimento, cargo }) => {
  return new Promise(async (resolve, reject) => {
    await knex("pessoas").where({ id }).update({
      nome,
      nascimento,
      cargo,
    });
  });
};

module.exports = {
  findAll,
  deleteOne,
  create,
  findOne,
  update,
};
