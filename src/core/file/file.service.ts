import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { v4 } from 'uuid'

import { FileTypes } from '@/constants/fileTypes'

@Injectable()
export class FileService {
    createFile(type: FileTypes, file): string {
        try {
            const fileExtension = file.name.split('.').pop()
            const fileName = `${v4()}.${fileExtension}`
            const filePath = path.resolve(__dirname, '..', 'static', type)

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.data)

            return `${type}/${fileName}`
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    removeFile(filePath: string) {
        try {
            fs.rmSync(path.resolve(__dirname, '..', 'static', filePath))

            return filePath
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
