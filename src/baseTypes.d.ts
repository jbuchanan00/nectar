export declare type PostForm = {
    tag: string[],
    image?: Blob | string | null,
    desc?: string | null,
    role: 'canvas' | 'artist' | 'shop'
}

export declare type Post = {
    id: string,
    createdAt: Date | string | number,
    updatedAt: Date | string | number | null,
    role: 'canvas' | 'artist' | 'shop',
    mediaType: "image" | "gif" | "video" | "slideshow",
    mediaId: string,
    desc: string,
    likeCount: number
}

export declare type PostTags = {
    tags: string[]
}

