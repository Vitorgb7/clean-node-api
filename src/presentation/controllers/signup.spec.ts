import { SignUpController } from './signup'

describe('SignUp Controller', () => {
    test('shold return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                passoword: 'any_password',
                passowordConfirmation: 'any_passoword'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('missing param: name'))
    })
})