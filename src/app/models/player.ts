
export interface Player{
  id?:number;
  player_name: string;
  player_surname: string;
  player_games: bigint;
  player_goals: bigint;
  player_position: string;
  club_id: number;
}
