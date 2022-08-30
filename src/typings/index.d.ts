interface LinkFlairRichtext {
  e: string;
  t: string;
  a: string;
  u: string;
}

interface RedditVideo {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface SecureMedia {
  reddit_video: RedditVideo;
}

interface AuthorFlairRichtext {
  e: string;
  t: string;
  a: string;
  u: string;
}

interface Gildings {
  gid_1: number;
  gid_2?: number;
}

interface Source {
  url: string;
  width: number;
  height: number;
}

interface Resolution {
  url: string;
  width: number;
  height: number;
}

interface Source2 {
  url: string;
  width: number;
  height: number;
}

interface Resolution2 {
  url: string;
  width: number;
  height: number;
}

interface Gif {
  source: Source2;
  resolutions: Resolution2[];
}

interface Source3 {
  url: string;
  width: number;
  height: number;
}

interface Resolution3 {
  url: string;
  width: number;
  height: number;
}

interface Mp4 {
  source: Source3;
  resolutions: Resolution3[];
}

interface Source4 {
  url: string;
  width: number;
  height: number;
}

interface Resolution4 {
  url: string;
  width: number;
  height: number;
}

interface Obfuscated {
  source: Source4;
  resolutions: Resolution4[];
}

interface Source5 {
  url: string;
  width: number;
  height: number;
}

interface Resolution5 {
  url: string;
  width: number;
  height: number;
}

interface Nsfw {
  source: Source5;
  resolutions: Resolution5[];
}

interface Variants {
  gif: Gif;
  mp4: Mp4;
  obfuscated: Obfuscated;
  nsfw: Nsfw;
}

interface Image {
  source: Source;
  resolutions: Resolution[];
  variants: Variants;
  id: string;
}

interface RedditVideoPreview {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface Preview {
  images: Image[];
  enabled: boolean;
  reddit_video_preview: RedditVideoPreview;
}

interface ResizedIcon {
  url: string;
  width: number;
  height: number;
}

interface StaticIcon {
  url: string;
  width: number;
  format?: any;
  height: number;
}

interface ResizedStaticIcon {
  url: string;
  width: number;
  height: number;
}

interface Icon {
  url: string;
  width: number;
  format: string;
  height: number;
}

interface Zero2 {
  resized_icons: ResizedIcon[];
  awardings_required: number;
  static_icon: StaticIcon;
  resized_static_icons: ResizedStaticIcon[];
  icon: Icon;
}

interface ResizedIcon2 {
  url: string;
  width: number;
  height: number;
}

interface StaticIcon2 {
  url: string;
  width: number;
  format?: any;
  height: number;
}

interface ResizedStaticIcon2 {
  url: string;
  width: number;
  height: number;
}

interface Icon2 {
  url: string;
  width: number;
  format: string;
  height: number;
}

interface Nine2 {
  resized_icons: ResizedIcon2[];
  awardings_required: number;
  static_icon: StaticIcon2;
  resized_static_icons: ResizedStaticIcon2[];
  icon: Icon2;
}

interface ResizedIcon3 {
  url: string;
  width: number;
  height: number;
}

interface StaticIcon3 {
  url: string;
  width: number;
  format?: any;
  height: number;
}

interface ResizedStaticIcon3 {
  url: string;
  width: number;
  height: number;
}

interface Icon3 {
  url: string;
  width: number;
  format: string;
  height: number;
}

interface Three2 {
  resized_icons: ResizedIcon3[];
  awardings_required: number;
  static_icon: StaticIcon3;
  resized_static_icons: ResizedStaticIcon3[];
  icon: Icon3;
}

interface ResizedIcon4 {
  url: string;
  width: number;
  height: number;
}

interface StaticIcon4 {
  url: string;
  width: number;
  format?: any;
  height: number;
}

interface ResizedStaticIcon4 {
  url: string;
  width: number;
  height: number;
}

interface Icon4 {
  url: string;
  width: number;
  format: string;
  height: number;
}

interface Six2 {
  resized_icons: ResizedIcon4[];
  awardings_required: number;
  static_icon: StaticIcon4;
  resized_static_icons: ResizedStaticIcon4[];
  icon: Icon4;
}

interface TiersByRequiredAwardings {
  '0': Zero2;
  '9': Nine2;
  '3': Three2;
  '6': Six2;
}

interface ResizedIcon5 {
  url: string;
  width: number;
  height: number;
}

interface ResizedStaticIcon5 {
  url: string;
  width: number;
  height: number;
}

interface AllAwarding {
  giver_coin_reward?: number;
  subreddit_id?: any;
  is_new: boolean;
  days_of_drip_extension: number;
  coin_price: number;
  id: string;
  penny_donate?: number;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium: number;
  tiers_by_required_awardings: TiersByRequiredAwardings;
  resized_icons: ResizedIcon5[];
  icon_width: number;
  static_icon_width: number;
  start_date?: any;
  is_enabled: boolean;
  awardings_required_to_grant_benefits?: number;
  description: string;
  end_date?: any;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: ResizedStaticIcon5[];
  icon_format: string;
  icon_height: number;
  penny_price?: number;
  award_type: string;
  static_icon_url: string;
}

interface RedditVideo2 {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface Media {
  reddit_video: RedditVideo2;
}

interface Data2 {
  approved_at_utc?: any;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title?: any;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: LinkFlairRichtext[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: string;
  downs: number;
  thumbnail_height: number;
  top_awarded_type?: any;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: string;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: Record<string, unknown>;
  thumbnail_width: number;
  author_flair_template_id: string;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: SecureMedia;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category?: any;
  secure_media_embed: Record<string, unknown>;
  link_flair_text: string;
  can_mod_post: boolean;
  score: number;
  approved_by?: any;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: string;
  author_flair_richtext: AuthorFlairRichtext[];
  gildings: Gildings;
  post_hint: string;
  content_categories?: any;
  is_self: boolean;
  mod_note?: any;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category?: any;
  banned_by?: any;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html?: any;
  likes?: any;
  suggested_sort?: any;
  banned_at_utc?: any;
  url_overridden_by_dest: string;
  view_count?: any;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: Preview;
  all_awardings: AllAwarding[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: string;
  treatment_tags: any[];
  visited: boolean;
  removed_by?: any;
  num_reports?: any;
  distinguished?: any;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by?: any;
  removal_reason?: any;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons?: any;
  author: string;
  discussion_type?: any;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: string;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: Media;
  is_video: boolean;
  link_flair_template_id: string;
}

interface Child {
  kind: string;
  data: Data2;
}
interface Data {
  after: string;
  dist: number;
  modhash: string;
  geo_filter: string;
  children: Child[];
  before?: any;
}

export interface RedditRes {
  kind: string;
  data: Data;
}

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

interface Meta {
  id: string;
  uuid: string;
  sort: string;
  src: string;
  section: string;
  stems: string[];
  offensive: boolean;
}

interface Sound {
  audio: string;
  ref: string;
  stat: string;
}

interface Pr {
  mw: string;
  sound: Sound;
}

interface Hwi {
  hw: string;
  prs: Pr[];
}

interface Def {
  sseq: any[][][];
}

interface Uro {
  ure: string;
  fl: string;
}

export interface MWResponse {
  meta: Meta;
  hwi: Hwi;
  fl: string;
  def: Def[];
  uros: Uro[];
  et: string[][];
  date: string;
  shortdef: string[];
}

export interface Metadata {
  operation: string;
  provider: string;
  schema: string;
}

export interface Derivative {
  id: string;
  text: string;
}

export interface Pronunciation {
  dialects: string[];
  phoneticNotation: string;
  phoneticSpelling: string;
  audioFile: string;
}

export interface Construction {
  text: string;
}

export interface Note {
  text: string;
  type: string;
}

export interface Register {
  id: string;
  text: string;
}

export interface Example {
  text: string;
  notes: Note[];
  registers: Register[];
}

export interface SemanticClass {
  id: string;
  text: string;
}

export interface Example2 {
  text: string;
}

export interface SemanticClass2 {
  id: string;
  text: string;
}

export interface Synonym {
  language: string;
  text: string;
}

export interface ThesaurusLink {
  entry_id: string;
  sense_id: string;
}

export interface DomainClass {
  id: string;
  text: string;
}

export interface Domain {
  id: string;
  text: string;
}

export interface Note2 {
  text: string;
  type: string;
}

export interface Subsens {
  definitions: string[];
  examples: Example2[];
  id: string;
  semanticClasses: SemanticClass2[];
  shortDefinitions: string[];
  synonyms: Synonym[];
  thesaurusLinks: ThesaurusLink[];
  domainClasses: DomainClass[];
  domains: Domain[];
  notes: Note2[];
}

export interface Synonym2 {
  language: string;
  text: string;
}

export interface ThesaurusLink2 {
  entry_id: string;
  sense_id: string;
}

export interface DomainClass2 {
  id: string;
  text: string;
}

export interface Domain2 {
  id: string;
  text: string;
}

export interface Sens {
  constructions: Construction[];
  definitions: string[];
  examples: Example[];
  id: string;
  semanticClasses: SemanticClass[];
  shortDefinitions: string[];
  subsenses: Subsens[];
  synonyms: Synonym2[];
  thesaurusLinks: ThesaurusLink2[];
  domainClasses: DomainClass2[];
  domains: Domain2[];
}

export interface GrammaticalFeature {
  id: string;
  text: string;
  type: string;
}

export interface Entry {
  etymologies: string[];
  homographNumber: string;
  pronunciations: Pronunciation[];
  senses: Sens[];
  grammaticalFeatures: GrammaticalFeature[];
}

export interface LexicalCategory {
  id: string;
  text: string;
}

export interface Phras {
  id: string;
  text: string;
}

export interface LexicalEntry {
  derivatives: Derivative[];
  entries: Entry[];
  language: string;
  lexicalCategory: LexicalCategory;
  phrases: Phras[];
  text: string;
}

export interface Result {
  id: string;
  language: string;
  lexicalEntries: LexicalEntry[];
  type: string;
  word: string;
}

export interface OxfordRes {
  id: string;
  metadata: Metadata;
  results: Result[];
  word: string;
}
interface Recent {
  ff: number;
  name: string;
  team_name: string;
  message_public: string;
  flair: string;
  pounds: string;
  pounds_color: string;
  created_at: number;
}

interface Team {
  id: string;
  text: string;
}

interface Most {
  ff: number;
  name: string;
  team_name: string;
  message_public: string;
  flair: string;
  pounds: string;
  pounds_color: string;
  created_at: number;
}

interface TeamsAlpha {
  team: string;
  total_donation: string;
  total_members: string;
  sort_donation: string;
}

interface TeamsMostDonation {
  team: string;
  total_donation: string;
  total_members: string;
  sort_donation: string;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition2 {
  text: string;
  icon: string;
  code: number;
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition2;
  uv: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

export interface Condition3 {
  text: string;
  icon: string;
  code: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition3;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

export interface Forecast {
  forecastday: Forecastday[];
}

export interface WeatherAPIRes {
  location: Location;
  current: Current;
  forecast: Forecast;
  error?: any;
}
