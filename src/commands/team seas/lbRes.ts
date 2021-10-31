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

interface Config {}

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

export interface TeamSeasLBRes {
  recent: Recent[];
  teams: Team[];
  most: Most[];
  config: Config;
  teams_alpha: TeamsAlpha[];
  teams_most_donations: TeamsMostDonation[];
}
