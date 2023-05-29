import {Users} from '@prisma/client'
import {prisma} from '../database'

class UsersRepository {
  async findAll(): Promise<Omit<Users, 'password'>[]> {
    return prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
  }

  async create(user: Omit<Users, 'id'>) {
    return prisma.users.create({
      data: user,
    })
  }

  async findById(id: string) {
    return prisma.users.findUnique({
      where: {id},
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.users.findUnique({
      where: {email},
    })
  }
}

export default new UsersRepository()
