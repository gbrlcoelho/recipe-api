import express from 'express'
import {errorHandlerMiddleware} from './app/middlewares'
import {recipeRoutes, userRoutes} from './app/routes'

export const server = express()

server.use(express.json())
server.use(errorHandlerMiddleware)
server.use('/users', userRoutes)
server.use('/recipes', recipeRoutes)
