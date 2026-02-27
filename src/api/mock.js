import Mock from "mockjs"

import { getTableData } from "./mockData/TableData"
import { getCountData } from "./mockData/CountData"
import { getChartData } from "./mockData/ChartData"
import userApi from "@/api/mockData/user.js"
import menuApi from "@/api/mockData/permission.js"

Mock.mock("/api/home/getTableData", "get", getTableData)

Mock.mock("/api/home/getCountData", "get", getCountData)

Mock.mock("/api/home/getChartData", "get", getChartData)

Mock.mock(/\/api\/user\/getUserData.*/, "get", userApi.getUserList)

Mock.mock(/\/api\/user\/deleteUser.*/, "get", userApi.deleteUser)

Mock.mock(/\/api\/user\/addUser.*/, "post", userApi.createUser)

Mock.mock(/\/api\/user\/editUser.*/, "post", userApi.updateUser)

Mock.mock(/\/api\/permission\/getMenu.*/, "post", menuApi.getMenu)