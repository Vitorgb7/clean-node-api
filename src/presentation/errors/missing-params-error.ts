export class MissingParamsErrors extends Error {
    constructor (paramName: string) {
        super(`missing param: ${paramName}`)
        this.name = 'MissingParamsErrors'
    } 
}