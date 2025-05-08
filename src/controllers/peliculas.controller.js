import {pool} from '../db.js';

export const getPeliculas = async(req, res) => {
  const [rows] = await pool.query ("SELECT * FROM peliculas")
  res.json(rows)
}

export const getPeliculasById = async(req, res) => {
  const [rows] = await pool.query ("SELECT * FROM peliculas WHERE id = ?", [req.params.id])
 
  if (rows.length <= 0) return res.status(404).json({
    message: "No existe la pelicula con este ID"
  })

  res.json(rows)
}

export const createPeliculas = async (req, res) => {
  const {titulo, duracionmin, clasificacion, alanzamiento} = req.body
  const [rows] = await pool.query("INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamiento) VALUES (?,?,?,?)",
  [titulo, duracionmin, clasificacion, alanzamiento])

  res.send({
    id: rows.insertId,
    titulo,
    clasificacion,
    alanzamiento
  })
}

export const updatePeliculas = async (req, res) => {
  const id = req.params.id
  const {titulo, duracionmin, clasificacion, alanzamiento} =  req.body

  const querySQL = `
  UPDATE peliculas SET
    titulo = ?,
    duracionmin = ?,
    clasificacion = ?,
    alanzamientro = IFNULL(?, '')
  WHERE id = ?
  `
  const [result] = await pool.query(querySQL, [titulo, duracionmin, clasificacion, alanzamiento, id])

  if (result.affectedRows == 0) {
    return res.status(404).json({
      message: 'El ID no existe'
    })
  }

  res.json({ message: 'Actualización correcta'})
}

export const deletePeliculas = async (req, res) => {
  const [result] = await pool.query("DELETE * FROM peliculas WHERE id = ?", [req.params.id])
  if (result.affectedRows <= 0){
    return res.status(404).json({
      message: "No existe registro con este ID"
    })
  }

  res.sendStatus(204)

}