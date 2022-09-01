import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// export type Post = {
//   _id: string;
//   slug: string;
//   content: MDXRemoteSerializeResult;
//   title: string;
//   date: string;
//   excerpt: string;
//   coverImage: string;
//   readingTime: string;
//   tweets: any[];
// };

type coverImage = {
  id: 2;
  data: {
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {};
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      provider_metadata: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type Post = {
  id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  publishedAt: string;
  excerpt: string;
  coverImage: any;
  readingTime: string;
};

export type Snippet = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  description: string;
  logo: string;
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  stars: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};
