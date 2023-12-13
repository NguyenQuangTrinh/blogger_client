export interface Bloggers {
    description: string
    id: string
    kind: string
    locale: { language: string, country: string, variant: string }
    name: string
    pages: {
        selfLink: string
        totalItems: number
    }
    posts: {
        selfLink: string
        totalItems: number
    }
    published: string
    selfLink: string
    status: string
    updated: "string"
    url: string
}