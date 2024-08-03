import { SignUpController } from './signup'
import { MissingParamsErrors } from '../errors/missing-params-error'

describe('SignUp Controller', () => {
    test('shold return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                passoword: 'any_password',
                passowordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsErrors('name'))
    })
    test('shold return 400 if no email is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                passoword: 'any_password',
                passowordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsErrors('email'))
    })
    test('shold return 400 if no password is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                passowordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsErrors('password'))
    })
})