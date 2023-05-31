import {Users} from '@prisma/client'
import {compareSync, hashSync} from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import {sign} from 'jsonwebtoken'
import CustomError from '../errors/CustomErrors'
import {UsersRepository} from '../repositories'
import {UserSchema} from '../validations'

class UserController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UsersRepository.findAll()

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        users,
      })
    } catch (error) {
      console.error('Error retrieving users:', error)
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params

      const user = await UsersRepository.findById(id)

      if (user) {
        res.status(200).json({
          success: true,
          message: 'User retrieved successfully',
          user,
        })
      } else {
        throw new CustomError(404, 'User not found')
      }
    } catch (error) {
      console.error('Error retrieving user:', error)
      next(error)
    }
  }

  async store(req: Request<{}, {}, Omit<Users, 'id'>>, res: Response, next: NextFunction): Promise<void> {
    try {
      const {name, email, password} = UserSchema.parse(req.body)

      const existingUser = await UsersRepository.findByEmail(email)

      if (existingUser) throw new CustomError(409, 'Email already in use')

      const hashedPassword = hashSync(password, 10)

      const user = await UsersRepository.create({name, email, password: hashedPassword})

      const {password: _, ...userWithoutPassword} = user

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: userWithoutPassword,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body

      const user = await UsersRepository.findByEmail(email)

      if (!user) throw new CustomError(401, 'Invalid credentials')

      const isSamePassword = compareSync(password, user.password)

      if (!isSamePassword) throw new CustomError(401, 'Invalid credentials')

      const token = sign({id: user.id}, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      })

      res.status(200).json({
        success: true,
        token,
      })
    } catch (error) {
      console.error('Error logging in user:', error)
      next(error)
    }
  }
}

export default new UserController()
