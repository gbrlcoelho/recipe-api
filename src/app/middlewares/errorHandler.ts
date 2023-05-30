import {NextFunction, Request, Response} from 'express'
import {ZodError} from 'zod'
import CustomError from '../errors/CustomErrors'

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      message: error.message,
    })
    return
  }

  if (error instanceof ZodError) {
    res.status(422).json({
      message: error.errors,
    })
    return
  }
  res.status(500).json({
    success: false,
    message: 'Server error',
  })
}
