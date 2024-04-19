export enum UserEnum {
    USER_ID = "USER_ID",
    USER_NAME = "USER_NAME",
    USER_LEVEL = "USER_LEVEL",
    USER_POINTS = "USER_POINTS",
    USER_EMAIL = "USER_EMAIL",
}

export enum FiltersEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    IN_ANALYSIS = 'IN_ANALYSIS',
    CONCLUDED = 'CONCLUDED',
    TO_CHANGE = 'TO_CHANGE',
}

export interface IDocument {
    doc_path: string
    final_date: string
    urgency: number
    status: DocumentStatusEnum
    doc_id: string
    responsible_user?: string
}

export enum DocumentStatusEnum {
    TO_DO = "to_do",
    IN_PROGRESS = 'IN_PROGRESS',
    IN_ANALYSIS = 'IN_ANALYSIS',
    CONCLUDED = 'CONCLUDED',
    TO_CHANGE = 'TO_CHANGE',
}