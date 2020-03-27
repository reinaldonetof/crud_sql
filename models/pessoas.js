const findAll = connection => {
  return new Promise(async (resolve, reject) => {
    const pessoas = await connection("pessoas").select("*");
    pessoas ? resolve(pessoas) : reject("list not found");
  });
};

const deleteOne = (connection, id) => {
  return new Promise((resolve, reject) => {
    const pessoa = connection("pessoas")
      .where({ id })
      .delete();
    pessoa ? resolve(pessoa) : reject("Was not found");
  });
};

const create = (connection, { nome, nascimento, cargo }) => {
  return new Promise(async (resolve, reject) => {
    const newPerson = await connection("pessoas").insert({
      nome,
      nascimento,
      cargo
    });
    newPerson ? resolve() : reject("Problem to insert");
  });
};

const findOne = (connection, id) => {
  return new Promise(async (resolve, reject) => {
    const results = await connection("pessoas")
      .select("*")
      .where({ id });
    results.length > 0 ? resolve(results[0]) : reject({});
  });
};

const update = (connection, id, { nome, nascimento, cargo }) => {
  return new Promise(async (resolve, reject) => {
    await knex("pessoas")
      .where({ id })
      .update({
        nome,
        nascimento,
        cargo
      });
  });
};

module.exports = {
  findAll,
  deleteOne,
  create,
  findOne,
  update
};
