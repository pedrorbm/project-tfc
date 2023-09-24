const Match = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 3,
  awayTeamId: 2,
  awayTeamGoals: 0,
  inProgress: true,
}

const Matches = [Match]

const MatchesProgress = [
  {
    id: 40,
    homeTeamId: 12,
    homeTeamGoals: 4,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Palmeiras'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  },
]

const MatchInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  }
]

const MatchNotProgress = [
  {
    id: 40,
    homeTeamId: 12,
    homeTeamGoals: 4,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Palmeiras'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  }
]

export {
  Match,
  Matches,
  MatchesProgress,
  MatchInProgress,
  MatchNotProgress
}
