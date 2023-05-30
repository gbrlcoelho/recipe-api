import {Recipes} from '@prisma/client'
import {prisma} from '../database'

class RecipesRepository {
  async findAll(): Promise<Recipes[]> {
    return prisma.recipes.findMany()
  }

  async findById(id: string): Promise<Recipes | null> {
    return prisma.recipes.findUnique({
      where: {id},
    })
  }

  async create(recipe: Omit<Recipes, 'id' | 'userId'>, userId: string): Promise<Recipes> {
    return prisma.recipes.create({
      data: {
        ...recipe,
        user: {
          connect: {id: userId},
        },
      },
    })
  }

  async update(id: string, recipe: Partial<Recipes>): Promise<Recipes | null> {
    return prisma.recipes.update({
      where: {id},
      data: recipe,
    })
  }

  async delete(id: string): Promise<Recipes | null> {
    return prisma.recipes.delete({
      where: {id},
    })
  }

  async findByUserId(userId: string): Promise<Recipes[]> {
    return prisma.recipes.findMany({
      where: {userId},
    })
  }
}

export default new RecipesRepository()
