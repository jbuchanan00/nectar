export declare type PostForm = {
    tag: string[],
    image?: Blob | string | null,
    desc?: string | null,
    role?: string | null
}

export declare type Post = {
    id: string,
    createdAt: Date | string | number,
    updatedAt: Date | string | number,
    role: 'canvas' | 'artist' | 'shop',
    mediaType: "image" | "gif" | "video" | "slideshow",
    mediaId: string,
    likeCount: number
}

export declare type PostTags = {
    tags: string[]
}

