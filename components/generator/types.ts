export interface Comment {
  username: string;
  handle: string;
  text: string;
  avatar?: string;
  time?: string;
  replies?: Comment[];
  likes?: string;
  reactionIcons?: string[];
}

export interface GeneratedContent {
  post: string;
  author?: {
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
  };
  comments: Comment[];
  likes?: string;
  commentsCount?: string;
  shares?: string;
  views?: string;
  time?: string;
  gradient?: string;
}
