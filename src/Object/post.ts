export interface Post {
    kind: string,
    items: [
        {
            kind: string,
            post: {
                kind: string,
                id: string,
                blog: {
                    id: string
                },
                published: string,
                updated: string,
                url: string,
                selfLink: string,
                title: string,
                content?: string | TrustedHTML,
                author: {
                    id: string,
                    displayName: string,
                    url: string,
                    image: {
                        url: string
                    }
                },
                replies: {
                    totalItems: number,
                    selfLink: string
                },
                etag: string
            },
            post_user_info: {
                kind: string,
                userId: string,
                blogId: string,
                postId: string,
                hasEditAccess: boolean
            }
        }
    ]
}