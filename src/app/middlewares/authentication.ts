import {NextFunction, Response} from 'express'
import {verify} from 'jsonwebtoken'
import {AuthenticatedRequest} from '../interfaces/AuthenticatedRequest'

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.status(401).send()
    const token = req.headers.authorization.split(' ')[1]
    const payload = verify(token, process.env.JWT_SECRET as string)

    req.user = payload
    next()
  } catch (error) {
    return res.status(401).send()
  }
}
