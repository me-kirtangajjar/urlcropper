import os from 'node:os'
import { createHmac } from 'node:crypto'
import config from '../config/config'
import jwt from 'jsonwebtoken'
import shortid from 'shortid'

export default {
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
        }
    },
    getApplicationHealth: () => {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)} seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            }
        }
    },
    hashPassword: (password: string) => {
        return createHmac('sha256', 'abcdefg').update(password).digest('hex')
    },
    comparePassword: (password: string, hashedPassword: string) => {
        const newHashedPassword = createHmac('sha256', 'abcdefg').update(password).digest('hex')
        return newHashedPassword === hashedPassword
    },
    generateToken: (payload: object) => {
        return jwt.sign(payload, config.JWT_SECRET as string, { expiresIn: '30D' })
    },
    verifyToken: (token: string) => {
        return jwt.verify(token, config.JWT_SECRET as string)
    },
    generateShortId: () => {
        return shortid.generate()
    }
}
