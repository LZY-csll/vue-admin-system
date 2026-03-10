type Env = "development" | "test" | "prod"

type EnvItem = {
    baseApi: string,
    mockApi: string
}

const env = (import.meta.env.MODE as Env) || "prod"
const EnvConfig: Record<Env, EnvItem> = {
    development: {
        baseApi: "/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    },
    test: {
        baseApi: "//test.fucture.com/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    },
    prod: {
        baseApi: "//fucture.com/api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    }
}

const config = {
    env,
    ...EnvConfig[env],

    mock: false
}
export default config