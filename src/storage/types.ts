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
    metadata?: IMetadataDocument
}

export enum DocumentStatusEnum {
    TO_DO = "TO_DO",
    IN_PROGRESS = 'IN_PROGRESS',
    IN_ANALYSIS = 'IN_ANALYSIS',
    CONCLUDED = 'CONCLUDED',
    TO_CHANGE = 'TO_CHANGE',
}

export interface IMetadataDocument {
    title:string
    dates:string
    content:string
    access_points:string
    social_tags: ISocialTags
}

export interface ISocialTags {
    race: string
    gender:string
    sexuality:string
    regionality:string
}