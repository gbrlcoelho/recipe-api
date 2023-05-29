import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.status(401).send()
    const token = req.headers.authorization.split(' ')[1]
    verify(token, process.env.JWT_SECRET as string)
    next()
  } catch (error) {
    return res.status(401).send()
  }
}
