
import request from "../request";


export type TableItem = {
    name: string
    todayBuy: number
    monthBuy: number
    totalBuy: number
}

type TableDataResp = {
    tableData: TableItem[]
}

export type CountItem = {
    name: string
    value: number
    icon: string
    color: string
}

type ChartOrderDataItem = Record<string, number> & { date: string }

type ChartUserDataItem = {
    date: string
    new: number
    active: number
}

type ChartVideoDataItem = {
    name: string
    value: number
}

type ChartDataResp = {
    orderData: {
        date: string[]
        data: ChartOrderDataItem[]
    }
    userData: ChartUserDataItem[]
    videoData: ChartVideoDataItem[]
}
// 表格数据
export function getTableData(): Promise<TableDataResp> {
    return request<TableDataResp>(
        {
            url: "/home/getTableData",
            method: "get",
            mock: false,
        }
    )
}
// 
export function getCountData(): Promise<CountItem[]> {
    return request<CountItem[]>(
        {
            url: "/home/getCountData",
            method: "get",
            mock: false,
        }
    )
}

// 图表数据
export function getChartData(): Promise<ChartDataResp> {
    return request<ChartDataResp>({
        url: "/home/getChartData",
        method: "get",
        mock: false
    })
}

