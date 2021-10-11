interface GithubAuthor {
  name: string;
  email: string;
  date: string;
}
export type GithubCommits = GithubCommit[];
export interface GithubCommit {
  sha: string;
  node_id: string;
  commit: {
    author: GithubAuthor;
    committer: GithubAuthor;
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: any;
      payload: any;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: GithubUser;
  committer: GithubUser;
  parents: Array<{ sha: string; url: string; html_url: string }>;
}
interface GithubUser {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}
