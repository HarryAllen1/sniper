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

export interface GithubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GithubUser;
  labels: Array<{
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
  }>;

  state: 'open' | 'closed';
  locked: boolean;
  assignee: GithubUser;
  assignees: Array<GithubUser>;
  milestone: null | string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: null | string;
  body: string;
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  preformed_via_github_app: any;
}

export type GithubIssues = GithubIssue[];
export interface CreateGithubIssue {
  accept?: string;
  owner?: string;
  repo?: string;
  title: string | number;
  body?: string;
  /**
   * @deprecated
   */
  assignee?: string | null;

  milestone?: string | number | null;
  labels?: Array<string | Record<string, unknown>>;
  assignees?: string[];
}
