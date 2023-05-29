import express from 'express'
import {userRoutes} from './app/routes'

export const server = express()

server.use(express.json())
server.use('/users', userRoutes)
