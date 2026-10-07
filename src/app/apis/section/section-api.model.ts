export enum FieldType {
 TEXT = "text",
 TEXTAREA = "textarea",
 RICH_TEXT = "rich_text",
 NUMBER = "number",
 EMAIL = "email",
 URL = "url",
 DATE = "date",
 IMAGE = "image",
 FILE = "file",
 BOOLEAN = "boolean",
 SELECT = "select",
 MULTI_SELECT = "multi_select"
}

export interface SectionFieldOption {
 label: string
 value: string
}

export interface SectionField {
 key: string
 label: string
 type: FieldType
 required?: boolean
 placeholder?: string
 defaultValue?: unknown
 options?: SectionFieldOption[]
}

export interface SectionCreateRequest {
 name: string
 slug: string
 description?: string
 fields?: SectionField[]
 isActive?: boolean
 order?: number
}

export interface SectionUpdateRequest {
 name?: string
 slug?: string
 description?: string
 fields?: SectionField[]
 isActive?: boolean
 order?: number
}

export interface SectionIdParams {
 id: string
}

export interface Section {
 _id: string
 name: string
 slug: string
 description?: string
 fields: SectionField[]
 isActive: boolean
 order: number
 createdAt: string
 updatedAt: string
 __v: number
}