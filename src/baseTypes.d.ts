export declare type PostForm = {
    tag: string[],
    image?: Blob | string | null,
    description?: string | null,
    role: 'canvas' | 'artist' | 'sharing' | number,
    aspectRatio?: number | string | null
}

export declare type Post = {
    id: string,
    createdAt: Date | string | number,
    updatedAt: Date | string | number | null,
    role: Role | number,
    mediaType: MediaType | number,
    body: string,
    likeCount: number
}

export declare type User = {
    id: string,
    displayName: string,
    role: Role
}

export declare type PostTags = string[]

export declare type Role = 'canvas' | 'artist' | 'sharing'

export declare type MediaType = 'image' | 'gif' | 'video' | 'slideshow'

