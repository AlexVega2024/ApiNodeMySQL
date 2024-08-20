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

const ListCategoriesActive = async () => {
  try {
    const query = "SELECT * FROM categories WHERE state_categ=1";
    const data = await pool.query(query);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ListNoticies = async () => {
  try {
    const query =
      `SELECT n.* FROM noticies n INNER JOIN categories c on n.id_category=c.id_category`;
    const data = await pool.query(query);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ListGallery = async () => {
  try {
    const query = `SELECT id_gallery, name_image, state_image, id_notice FROM gallery_images`;
    const data = await pool.query(query);
    return data[0];
  } catch (error) {}
};

const ListNoticiesByCategoryActive = async (id_category) => {
  try {
    const query =
      "SELECT * FROM noticies n INNER JOIN categories c on n.id_category=c.id_category where c.id_category=? && c.state_categ=1 && n.state_notice=1";
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

const GetGalleryNotice = async (id_notice) => {
  try {
    const query = `SELECT id_gallery, name_image, state_image, id_notice FROM gallery_images WHERE id_notice=?`;
    const data = await pool.query(query, [id_notice]);
    return data[0];
  } catch (error) {}
};

const RegisterCategory = async (name) => {
  try {
    const query = `INSERT INTO categories (name, state_categ) 
                    VALUES (?, 1)`;
    const data = await pool.query(query, [name]);
    return data[0];
  } catch (error) {}
};

const RegisterNoticeByCategory = async (
  id_category,
  img_banner,
  img_card,
  title,
  state_notice,
  description
) => {
  try {
    const query = `INSERT INTO noticies (id_category,img_banner,img_card, title, state_notice, description) 
                  VALUES (?, ?, ?, ?, ?, ?)`;
    const data = await pool.query(query, [
      id_category,
      img_banner,
      img_card,
      title,
      state_notice,
      description,
    ]);
    return data[0];
  } catch (error) {
    console.log("Error en el modelo: ", error);
  }
};

const RegisterGallery = async (id_notice, name_image) => {
  try {
    const query = `INSERT INTO gallery_images (id_notice, name_image, state_image) 
                    VALUES (?, ?, 1)`;
    const data = await pool.query(query, [id_notice, name_image]);
    return data[0];
  } catch (error) {}
};

const ActiveInactiveStateCategory = async (state_categ, id_category) => {
  try {
    const query = "UPDATE categories SET state_categ=? WHERE id_category = ?";
    const data = await pool.query(query, [state_categ, id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ActiveInactiveStateNoticie = async (
  state_notice,
  id_category,
  id_notice
) => {
  try {
    const query =
      `UPDATE categories c INNER JOIN noticies n on c.id_category = n.id_category 
      SET n.state_notice=? WHERE c.id_category = ? && n.id_notice = ?`;
    const data = await pool.query(query, [
      state_notice,
      id_category,
      id_notice,
    ]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ActiveInactiveStateGallery = async (state_image, id_notice) => {
  try {
    const query = "UPDATE gallery_images SET state_image=? WHERE id_notice = ?";
    const data = await pool.query(query, [state_image, id_notice]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const UpdateCategory = async (name, id_category) => {
  try {
    const query = "UPDATE categories SET name=? WHERE id_category=?";
    const data = await pool.query(query, [name, id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const UpdateNoticies = async (
  img_banner,
  img_card,
  title,
  description,
  id_category,
  id_notice
) => {
  try {
    const query = `UPDATE noticies n INNER JOIN categories c ON n.id_category = c.id_category 
                  SET n.img_banner = ?, n.img_card = ?, n.title = ?, n.description = ?,  n.date_time=CURRENT_TIMESTAMP
                  WHERE c.id_category = ? && n.id_notice = ?`;
    const data = await pool.query(query, [
      img_banner,
      img_card,
      title,
      description,
      id_category,
      id_notice,
    ]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const UpdateGallery = async (name_image, id_notice, id_gallery) => {
  try {
    const query = "UPDATE gallery_images SET name_image=? WHERE id_notice=? && id_gallery=?";
    const data = await pool.query(query, [name_image, id_notice, id_gallery]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const DeleteCategory = async (id_category) => {
  try {
    const query = "DELETE FROM categories WHERE id_category=?";
    const data = await pool.query(query, [id_category]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const DeleteNotice = async (id_notice) => {
  try {
    const query = "DELETE FROM noticies WHERE id_notice=?";
    const data = await pool.query(query, [id_notice]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const DeleteGallery = async (id_gallery) => {
  try {
    const query = "DELETE FROM gallery_images WHERE id_gallery=?";
    const data = await pool.query(query, [id_gallery]);
    return data[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

export const noticiesModel = {
  ListCategories,
  ListCategoriesActive,
  ListNoticies,
  ListNoticiesByCategoryActive,
  ListFirstThreeNoticies,
  GetNoticieByCategory,
  ListGallery,
  GetGalleryNotice,
  RegisterCategory,
  RegisterNoticeByCategory,
  RegisterGallery,
  ActiveInactiveStateCategory,
  ActiveInactiveStateNoticie,
  ActiveInactiveStateGallery,
  UpdateCategory,
  UpdateNoticies,
  UpdateGallery,
  DeleteCategory,
  DeleteNotice,
  DeleteGallery
};
