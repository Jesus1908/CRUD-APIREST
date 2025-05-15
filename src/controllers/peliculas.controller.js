import {pool} from '../db.js';

export const getPeliculas = async(req, res) => {
  try {
  const [rows] = await pool.query ("SELECT * FROM peliculas")
  res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'No se concreto la consulta',
  })
  }
}

export const getPeliculasById = async(req, res) => {
  try {
    const [rows] = await pool.query ("SELECT * FROM peliculas WHERE id = ?", [req.params.id])
   
    if (rows.length <= 0) return res.status(404).json({
      message: 'No existe la película con este ID'
    })

    res.json(rows[0])
  } catch (error) {
  return res.status(500).json({
    message: 'Error al obtener la película',
  })
  }
}

export const createPeliculas = async (req, res) => {
  try {
    const {titulo, duracionmin, clasificacion, alanzamiento} = req.body; // Usar "alanzamiento"
    const [rows] = await pool.query(
      "INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamiento) VALUES (?,?,?,?)", // Usar "alanzamiento"
      [titulo, duracionmin, clasificacion, alanzamiento]
    );

    res.send({
      id: rows.insertId,
      titulo,
      duracionmin,
      clasificacion,
      alanzamiento // Usar "alanzamiento"
    });
  } catch (error) {
    return res.status(500).json({
      message: 'No se pudo crear la película',
    });
  }
};

export const updatePeliculas = async (req, res) => {
  try {
    const id = req.params.id
    const {titulo, duracionmin, clasificacion, alanzamiento} =  req.body

    const querySQL = `
    UPDATE peliculas SET
      titulo = ?,
      duracionmin = ?,
      clasificacion = ?,
      alanzamiento = IFNULL(?, '')
      WHERE id = ?
    `
    const [result] = await pool.query(querySQL, [titulo, duracionmin, clasificacion, alanzamiento, id])

  res.json({ message: 'Actualización correcta'})   
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar la película',
    })
  }
}


export const deletePeliculas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM peliculas WHERE id = ?", [req.params.id])
    if (result.affectedRows <= 0){
      return res.status(404).json({
      message: "No existe registro con este ID"
    })
  }
  res.sendStatus(204)
}
  catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar la película',
    })
  } 
}