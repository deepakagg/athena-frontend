import { Report } from "./types";


export const report: Report = {
    api: '',
    data: {},
    layout: {
        title: '',
        filters: null,
        panels: [
            {
                size: 12,
                order: 1,
                type: 'table',
                title: 'Panel Table',
                dataTransform: (data: any) => {
                }
            }
        ]
    }
}