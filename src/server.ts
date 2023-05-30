import express from 'express'
import {errorHandlerMiddleware} from './app/middlewares'
import {userRoutes} from './app/routes'
import {recipeRoutes} from './app/routes/recipes'

export const server = express()

server.use(express.json())
server.use(errorHandlerMiddleware)
server.use('/users', userRoutes)
server.use('/recipes', recipeRoutes)
