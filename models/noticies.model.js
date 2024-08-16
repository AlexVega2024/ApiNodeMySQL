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

const ListNoticies = async () => {
  try {
    const query = "SELECT n.* FROM noticies n INNER JOIN categories c on n.id_category=c.id_category";
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

const ListFirstThreeNoticies = async (id_category, id_noticie) => {
  try {
    const query = `SELECT n.* FROM noticies n
                  INNER JOIN categories c ON n.id_category = c.id_category
                  WHERE c.id_category = ? && n.id_notice <> ?
                  ORDER BY n.date_time DESC
                  LIMIT 3;`;
    const data = await pool.query(query, [id_category, id_noticie]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const GetNoticieByCategory = async (id_category, id_noticie) => {
  try {
    const query = `SELECT *, c.name FROM noticies n INNER JOIN categories c on n.id_category=c.id_category 
                  WHERE c.id_category=? && N.id_notice=?`;
    const data = await pool.query(query, [id_category, id_noticie]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const GetGalleryByNoticeAndCategory = async (id_noticie, id_category) => {
  try {
    const query = `SELECT gi.id_gallery, gi.name_image, gi.state_image, gi.id_notice FROM gallery_images gi 
                    INNER JOIN noticies n ON gi.id_notice=n.id_notice
                    INNER JOIN categories c ON n.id_category = c.id_category
                    WHERE n.id_notice=? && c.id_category=?`
    const data = await pool.query(query, [id_noticie, id_category]);
    return data[0];
  } catch (error) {
    
  }
}

const RegisterCategory = async (name, state_categ) => {
  try {
    const query = `INSERT INTO categories (name, state_categ) 
                    VALUES (?, ?)`
    const data = await pool.query(query, [name, state_categ]);
    return data[0];
  } catch (error) {
    
  }
}

const RegisterNoticeByCategory = async (id_category, img_banner,img_card, title, state_notice, date_time, description) => {
  try {
    const query = `INSERT INTO noticies (id_category,img_banner,img_card, title, state_notice, date_time, description) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`
    const data = await pool.query(query, [id_category, img_banner,img_card, title, state_notice, date_time, description]);
    return data[0];
  } catch (error) {
    
  }
}

const ActiveInactiveStateCategory = async (state_categ, id_category) => {
  try {
    const query = "UPDATE categories SET state_categ=? WHERE id_category = ?";
    const data = await pool.query(query, [state_categ, id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ActiveInactiveStateNoticie = async (state_notice, id_category, id_notice) => {
  try {
    const query = "UPDATE categories c INNER JOIN noticies n on c.id_category = n.id_category SET n.state_notice=? WHERE c.id_category = ? && n.id_notice = ?";
    const data = await pool.query(query, [state_notice, id_category, id_notice]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

export const noticiesModel = {
  ListCategories,
  ListNoticies,
  ListNoticiesByCategory,
  ListFirstThreeNoticies,
  GetNoticieByCategory,
  GetGalleryByNoticeAndCategory,
  RegisterCategory,
  RegisterNoticeByCategory,
  ActiveInactiveStateCategory,
  ActiveInactiveStateNoticie
};