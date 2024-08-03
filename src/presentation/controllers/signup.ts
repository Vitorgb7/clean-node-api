import {HttpRequest, HttpResponse} from '../protocols/http'
import { MissingParamsErrors } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse{
        if (!httpRequest.body.name) {
            return badRequest(new MissingParamsErrors('name'))
        }
        if (!httpRequest.body.email) {
            return badRequest(new MissingParamsErrors('email'))
        }
    }
}