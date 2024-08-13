import {HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamsErrors, InvalidParamsErrors } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
        try {
            const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requireFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamsErrors(field))
            }
        }
        const {name, email, password, passwordConfirmation} = httpRequest.body
        if(password !== passwordConfirmation){
            return badRequest(new InvalidParamsErrors('passwordConfirmation'))
        }
        const isValid = this.emailValidator.isValid(email)
        if (!isValid) {
            return badRequest(new InvalidParamsErrors('email'))
        }
       const account = await this.addAccount.add({
            name,
            email,
            password
        })
        return ok(account)
      } catch (error) {
        return serverError()
      }
    }
}