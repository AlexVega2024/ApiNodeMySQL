import { pool } from "../database/connection.js";

const ListCategories = async () => {
  try {
    const query = "SELECT * FROM categories";
    const data = await pool.query(query);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ListNoticiesByCategory = async (id_category) => {
  try {
    const query = "SELECT * FROM noticies n INNER JOIN categories c on n.id_category=c.id_category where c.id_category=?";
    const data = await pool.query(query, [id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ActiveInactiveStateCategory = async (new_state, id_category) => {
  try {
    const query = "UPDATE categories SET state_categ=? WHERE id_category = ?";
    const data = await pool.query(query, [new_state, id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ActiveInactiveStateNoticie = async (new_state, id_category, id_notice) => {
  try {
    const query = "UPDATE categories c INNER JOIN noticies n on c.id_category = n.id_category SET n.state_notice=? WHERE c.id_category = ? && n.id_notice = ?";
    const data = await pool.query(query, [new_state, id_category, id_notice]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

export const noticiesModel = {
  ListCategories,
  ListNoticiesByCategory,
  ActiveInactiveStateCategory,
  ActiveInactiveStateNoticie
};