import {HttpRequest, HttpResponse} from '../protocols/http'
import { MissingParamsErrors } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
    handle (httpRequest: HttpRequest): HttpResponse{
        const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requireFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamsErrors(field))
            }
        }
    }
}