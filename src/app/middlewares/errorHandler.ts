import {NextFunction, Request, Response} from 'express'
import {ZodError} from 'zod'

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
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
