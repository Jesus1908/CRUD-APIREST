import { Router } from "express"
import { createPeliculas, deletePeliculas, getPeliculas, getPeliculasById, updatePeliculas } from "../controllers/peliculas.controller.js"

const router = Router()

router.get('/peliculas', getPeliculas)
router.get('/peliculas/:id', getPeliculasById)

router.post('/peliculas', createPeliculas)

router.put('/peliculas/:id', updatePeliculas)

router.delete('/peliculas/:id', deletePeliculas)

export default router