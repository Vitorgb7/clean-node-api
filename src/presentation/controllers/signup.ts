import {HttpRequest, HttpResponse, Controller, EmailValidator} from '../protocols'
import { MissingParamsErrors, InvalidParamsErrors } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

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
        const {email, password, passwordConfirmation} = httpRequest.body
        if(password !== passwordConfirmation){
            return badRequest(new InvalidParamsErrors('passwordConfirmation'))
        }
        const isValid = this.emailValidator.isValid(email)
        if (!isValid) {
            return badRequest(new InvalidParamsErrors('email'))
        }
      } catch (error) {
        return serverError()
      }
    }
}