import {HttpRequest, HttpResponse} from '../protocols/http'
import { MissingParamsErrors } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse{
        const requireFields = ['name', 'email']
        for (const field of requireFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamsErrors(field))
            }
        }
    }
}