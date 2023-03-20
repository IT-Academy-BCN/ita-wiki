import { Middleware } from "koa"


// TODO: specify types
export const login : Middleware = (ctx: any, next: any) => {
    //TODO
}

// TODO: specify types
export const register : Middleware = (ctx: any, next: any) => {
    //TODO
}

export const demo : Middleware = (ctx: any, next: any) => {
    ctx.body =  "<h1>Koa Demo Is Working!</h1>"
}
