import {NextFunction, Request, Response} from 'express'
import {AuthenticatedRequest} from '../interfaces'
import {RecipesRepository} from '../repositories'
import {RecipeSchema} from '../validations'

class RecipeController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const recipes = await RecipesRepository.findAll()

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

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const recipe = await RecipesRepository.findById(id)

      if (recipe) {
        res.status(200).json({
          success: true,
          message: 'Recipe retrieved successfully',
          recipe,
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Recipe not found',
        })
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const {name, description, prepTime} = RecipeSchema.parse(req.body)

      const recipe = await RecipesRepository.update(id, {
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
        res.status(404).json({
          success: false,
          message: 'Recipe not found',
        })
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params

      const recipe = await RecipesRepository.delete(id)

      if (recipe) {
        res.status(200).json({
          success: true,
          message: 'Recipe deleted successfully',
          recipe,
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Recipe not found',
        })
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
      next(error)
    }
  }

  async findByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as {id: string}

      const recipes = await RecipesRepository.findByUserId(user.id)

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
}

export default new RecipeController()
