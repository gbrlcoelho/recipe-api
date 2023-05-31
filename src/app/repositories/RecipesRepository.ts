import {Recipes} from '@prisma/client'
import {prisma} from '../database'

class RecipesRepository {
  async findAll(userId: string): Promise<Recipes[]> {
    return prisma.recipes.findMany({
      where: {userId},
    })
  }

  async findById(id: string, userId: string): Promise<Recipes | null> {
    return prisma.recipes.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    })
  }

  async create(recipe: Omit<Recipes, 'id' | 'userId'>, userId: string): Promise<Recipes> {
    return prisma.recipes.create({
      data: {
        ...recipe,
        userId,
      },
    })
  }

  async update(id: string, userId: string, recipe: Partial<Recipes>): Promise<Recipes | null> {
    const recipeToUpdate = await this.findById(id, userId)
    if (!recipeToUpdate) return null

    return prisma.recipes.update({
      where: {id: recipeToUpdate?.id},
      data: recipe,
    })
  }

  async delete(id: string, userId: string): Promise<Recipes | null> {
    const recipeToDelete = await this.findById(id, userId)
    if (!recipeToDelete) return null

    return prisma.recipes.delete({
      where: {id: recipeToDelete?.id},
    })
  }
}

export default new RecipesRepository()
