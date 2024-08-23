import { pool } from "../database/connection.js";

const handleQuery = async (query, params = []) => {
  try {
    const [rows] = await pool.query(query, params);
    return { ok: true, data: rows };
  } catch (error) {
    console.error("Error en la consulta a la BD:", error);
    return { ok: false, message: "Error en la consulta" };
  }
};

const ListCategories = async () => {
  const query = "SELECT * FROM categories";
  return await handleQuery(query);
};

const ListCategoriesActive = async () => {
  const query = "SELECT * FROM categories WHERE state_categ=1";
  return await handleQuery(query);
};

const ListNoticies = async () => {
  const query = "SELECT n.* FROM noticies n INNER JOIN categories c ON n.id_category=c.id_category";
  return await handleQuery(query);
};

const ListNoticieActive = async (id_noticie, id_category) => {
  const query = `SELECT n.* FROM noticies n INNER JOIN categories c ON n.id_category=c.id_category
                  WHERE n.id_notice=? && n.state_notice=1 && c.id_category=?`;
  return await handleQuery(query, [id_noticie, id_category]);
};

const ListGallery = async () => {
  const query = "SELECT id_gallery, name_image, state_image, id_notice FROM gallery_images";
  return await handleQuery(query);
};

const ListNoticiesByCategoryActive = async (id_category) => {
  const query = `SELECT * FROM noticies n 
                  INNER JOIN categories c ON n.id_category=c.id_category 
                  WHERE c.id_category=? AND c.state_categ=1 AND n.state_notice=1`;
  return await handleQuery(query, [id_category]);
};

const ListFirstThreeNoticies = async (id_category, id_noticie) => {
  const query = `SELECT n.* FROM noticies n
                  INNER JOIN categories c ON n.id_category = c.id_category
                  WHERE c.id_category = ? AND n.id_notice <> ? AND n.state_notice=1
                  ORDER BY n.date_time DESC
                  LIMIT 3;`;
  return await handleQuery(query, [id_category, id_noticie]);
};

const GetNoticieByCategory = async (id_category, id_noticie) => {
  const query = `SELECT *, c.name FROM noticies n 
                  INNER JOIN categories c ON n.id_category=c.id_category 
                  WHERE c.id_category=? AND n.id_notice=?`;
  return await handleQuery(query, [id_category, id_noticie]);
};

const GetGalleryNotice = async (id_notice) => {
  const query = `SELECT * FROM gallery_images 
                  WHERE id_notice=?`;
  return await handleQuery(query, [id_notice]);
};

const RegisterCategory = async (name) => {
  const query = "INSERT INTO categories (name, state_categ) VALUES (?, 1)";
  return await handleQuery(query, [name]);
};

const RegisterNoticeByCategory = async (id_category, img_banner, img_card, title, state_notice, description) => {
  const query = `INSERT INTO noticies (id_category, img_banner, img_card, title, state_notice, description) 
                  VALUES (?, ?, ?, ?, ?, ?)`;
  return await handleQuery(query, [id_category, img_banner, img_card, title, state_notice, description]);
};

const RegisterGallery = async (id_notice, name_image) => {
  const query = `INSERT INTO gallery_images (id_notice, name_image, state_image) 
                  VALUES (?, ?, 1)`;
  return await handleQuery(query, [id_notice, name_image]);
};

const ActiveInactiveStateCategory = async (state_categ, id_category) => {
  const query = `UPDATE categories SET state_categ=? 
                  WHERE id_category=?`;
  return await handleQuery(query, [state_categ, id_category]);
};

const ActiveInactiveStateNoticie = async (state_notice, id_category, id_notice) => {
  const query = `UPDATE noticies n 
                  INNER JOIN categories c ON c.id_category = n.id_category 
                  SET n.state_notice=? WHERE c.id_category = ? AND n.id_notice = ?`;
  return await handleQuery(query, [state_notice, id_category, id_notice]);
};

const ActiveInactiveStateGallery = async (state_image, id_notice, id_gallery) => {
  const query = `UPDATE gallery_images SET state_image=? 
                  WHERE id_notice=? && id_gallery=?`;
  return await handleQuery(query, [state_image, id_notice, id_gallery]);
};

const UpdateCategory = async (name, id_category) => {
  const query = `UPDATE categories SET name=? 
                  WHERE id_category=?`;
  return await handleQuery(query, [name, id_category]);
};

const UpdateNoticies = async (img_banner, img_card, title, description, id_category, id_notice) => {
  const query = `UPDATE noticies n 
                  INNER JOIN categories c ON n.id_category = c.id_category 
                  SET n.img_banner = ?, n.img_card = ?, n.title = ?, n.description = ?, n.date_time=CURRENT_TIMESTAMP
                  WHERE c.id_category = ? AND n.id_notice = ?`;
  return await handleQuery(query, [img_banner, img_card, title, description, id_category, id_notice]);
};

const UpdateGallery = async (id_notice, name_image, id_gallery) => {
  const query = `UPDATE gallery_images SET id_notice=? ,name_image=?
                  WHERE id_gallery=?`;
  return await handleQuery(query, [id_notice, name_image, id_gallery]);
};

const DeleteCategory = async (id_category) => {
  const query = `DELETE FROM categories 
                  WHERE id_category=?`;
  return await handleQuery(query, [id_category]);
};

const DeleteNotice = async (id_notice) => {
  const query = `DELETE FROM noticies 
                  WHERE id_notice=?`;
  return await handleQuery(query, [id_notice]);
};

const DeleteGallery = async (id_gallery) => {
  const query = `DELETE FROM gallery_images 
                  WHERE id_gallery=?`;
  return await handleQuery(query, [id_gallery]);
};

export const noticiesModel = {
  ListCategories,
  ListCategoriesActive,
  ListNoticies,
  ListNoticieActive,
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
