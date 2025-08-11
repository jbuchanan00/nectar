export declare type PostForm = {
    tag: string[],
    image?: Blob | string | null,
    desc?: string | null,
    role: 'canvas' | 'artist' | 'shop',
    aspectRatio?: number | string | null
}

export declare type Post = {
    id: string,
    createdAt: Date | string | number,
    updatedAt: Date | string | number | null,
    role: Role | number,
    mediaType: MediaType | number,
    mediaId: string,
    body: string,
    likeCount: number
}

export declare type User = {
    id: string,
    displayName: string,
    role: Role
}

export declare type PostTags = string[]

export declare type Role = 'canvas' | 'artist' | 'shop'

export declare type MediaType = 'image' | 'gif' | 'video' | 'slideshow'

