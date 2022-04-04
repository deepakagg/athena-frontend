export type ReportFilter = {
    key: string,
    value: string,
    type: 'input' | 'select' | 'date'
    label: string | null
}
 
export type ReportPanelLayout = {
    size: number,
    height?: number | null;
    order: number,
    title: string,
    type: 'table' | 'chart' | 'bar' | 'pie' | 'line' | 'map',
    filters?: ReportFilter[] | null
    dataTransform: (data: any) => any
}

export type ReportLayout = {
    title: string,
    panels: ReportPanelLayout[]
    filters?: ReportFilter[] | null
}

export type Report = {
    api: string,
    layout: ReportLayout,
    data: any
}