const env = import.meta.env.MODE || "prod"
const EnvConfig = {
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

export default {
    env,
    ...EnvConfig[env],
    // mock为false，默认调用所有真实接口(当然我这里只有development里的baseApi是真的，但也是本地mock模拟的)
    mock: false
}