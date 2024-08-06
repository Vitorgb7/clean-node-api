export class InvalidParamsErrors extends Error {
    constructor (paramName: string) {
        super(`Invalid param: ${paramName}`)
        this.name = 'InvalidParamsErrors'
    } 
}