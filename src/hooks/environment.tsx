const prod = {
    url: { API_URL: "https://project.detvildeweb.dk/go-laravel" }
}
const dev = {
    url: { API_URL: "http://localhost:8000" }
}
export const env = process.env.NODE_ENV === 'development' ? dev : prod

export const paths = {
    API_ROUTE: "/api"
}