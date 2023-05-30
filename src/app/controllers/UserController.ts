import {Users} from '@prisma/client'
import {compareSync, hashSync} from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import {sign} from 'jsonwebtoken'
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
        res.status(404).json({
          success: false,
          message: 'User not found',
        })
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
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Email already in use',
        })
        return
      }

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

      if (!user) return res.status(401).send()

      const isSamePassword = compareSync(password, user.password)

      if (!isSamePassword) return res.status(401).send()

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
