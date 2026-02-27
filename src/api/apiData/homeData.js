
import request from "../request";

// 表格数据
export function getTableData() {
    return request(
        {
            url: "/home/getTableData",
            method: "get",
            mock: false,
        }
    )
}
// 
export function getCountData() {
    return request(
        {
            url: "/home/getCountData",
            method: "get",
            mock: false,
        }
    )
}

// 图表数据
export function getChartData() {
    return request({
        url: "/home/getChartData",
        method: "get",
        mock: false
    })
}

