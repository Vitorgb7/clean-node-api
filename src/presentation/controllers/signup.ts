import {HttpRequest, HttpResponse} from '../protocols/http'
import { MissingParamsErrors } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamsErrors } from '../errors/InvalidParamsErrors'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    handle (httpRequest: HttpRequest): HttpResponse{
        try {
            const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requireFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamsErrors(field))
            }
        }
        const isValid = this.emailValidator.isValid(httpRequest.body.email)
        if (!isValid) {
            return badRequest(new InvalidParamsErrors('email'))
        }
      } catch (error) {
        return {
            statusCode: 500,
            body: new ServerError()
        }
      }
    }
}