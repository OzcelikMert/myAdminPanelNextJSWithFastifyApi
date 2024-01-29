let api = `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ""}/`;

export default {
    get api() { return api;},
    uploads: {
        get images() { return `${api}uploads/images/`},
        get flags() { return `${api}uploads/flags/`}
    }
}