export interface Task {
    id: number
    title: string
    description: string
    completed: boolean
    projectId: number
    tags: string[]
}
export interface Project {
    id: number
    name: string
    color: string
}
export interface Tag {
    id: number
    name: string
    color: string
}