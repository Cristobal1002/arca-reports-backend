export class NewCustomError extends Error {
    constructor({ message, code, data }) {
        super(message);
        this.message = message || "Ocurrió un error desconocido";
        this.code = code || 400;
        this.data = data || {};
        Object.setPrototypeOf(this, NewCustomError.prototype);
    }

    serialize() {
        console.log("serializing");
        return {
            code: this.code,
            message: this.message,
            error: this.data,
        };
    }
}

export const CustomError = ({ message, code, data }) => {
    return new NewCustomError({ message, code, data });
};
