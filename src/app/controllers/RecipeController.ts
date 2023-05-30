import {NextFunction, Response} from 'express'
import CustomError from '../errors/CustomErrors'
import {AuthenticatedRequest} from '../interfaces'
import {RecipesRepository} from '../repositories'
import {RecipeSchema} from '../validations'

class RecipeController {
  async index(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as {id: string}
      const recipes = await RecipesRepository.findAll(user.id)

      res.status(200).json({
        success: true,
        message: 'Recipes retrieved successfully',
        recipes,
      })
    } catch (error) {
      console.error('Error retrieving recipes:', error)
      next(error)
    }
  }

  async show(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as {id: string}
      const {id} = req.params
      const recipe = await RecipesRepository.findById(id, user.id)

      if (recipe) {
        res.status(200).json({
          success: true,
          message: 'Recipe retrieved successfully',
          recipe,
        })
      } else {
        throw new CustomError(404, 'Recipe not found')
      }
    } catch (error) {
      console.error('Error retrieving recipe:', error)
      next(error)
    }
  }

  async store(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const {name, description, prepTime} = RecipeSchema.parse(req.body)
      const user = req.user as {id: string}
      console.log('user', user)

      const recipe = await RecipesRepository.create({name, description, prepTime}, user.id)

      res.status(201).json({
        success: true,
        message: 'Recipe created successfully',
        recipe,
      })
    } catch (error) {
      console.error('Error creating recipe:', error)
      next(error)
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as {id: string}
      const {id} = req.params
      const {name, description, prepTime} = RecipeSchema.parse(req.body)

      const recipe = await RecipesRepository.update(id, user.id, {
        name,
        description,
        prepTime,
      })

      if (recipe) {
        res.status(200).json({
          success: true,
          message: 'Recipe updated successfully',
          recipe,
        })
      } else {
        throw new CustomError(404, 'Recipe not found')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
      next(error)
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as {id: string}
      const {id} = req.params

      const recipe = await RecipesRepository.delete(id, user.id)

      if (recipe) {
        res.status(200).json({
          success: true,
          message: 'Recipe deleted successfully',
          recipe,
        })
      } else {
        throw new CustomError(404, 'Recipe not found')
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
      next(error)
    }
  }
}

export default new RecipeController()
