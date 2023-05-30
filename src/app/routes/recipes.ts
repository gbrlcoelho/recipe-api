import {Router} from 'express'
import {RecipeController} from '../controllers'
import {authenticateToken} from '../middlewares'

export const recipeRoutes = Router()

recipeRoutes.use(authenticateToken)
recipeRoutes.get('/', RecipeController.index)
recipeRoutes.get('/:id', RecipeController.show)
recipeRoutes.post('/', RecipeController.store)
recipeRoutes.put('/:id', RecipeController.update)
recipeRoutes.delete('/:id', RecipeController.delete)
