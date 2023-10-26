import { TUserVote, TVoteCount } from "../types"


 const getDownvote = (
  currUserVote: number,
  currDownvote: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === 1 && currVote === 'cancel')
  )
    return currDownvote
  if (
    (currUserVote === 0 && currVote === 'down') ||
    (currUserVote === 1 && currVote === 'down')
  )
    return currDownvote + 1
  return currDownvote - 1
}

 const getUpvote = (
  currUserVote: number,
  currUpvote: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'down') ||
    (currUserVote === -1 && currVote === 'cancel')
  )
    return currUpvote
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === -1 && currVote === 'up')
  )
    return currUpvote + 1
  return currUpvote - 1
}

 const getTotal = (
  currUserVote: number,
  currTotal: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === -1 && currVote === 'cancel')
  )
    return currTotal + 1
  if (
    (currUserVote === 1 && currVote === 'cancel') ||
    (currUserVote === 0 && currVote === 'down')
  )
    return currTotal - 1
  if (currUserVote === 1 && currVote === 'down') return currTotal - 2
  return currTotal + 2
}

 const getUserVote = (currVote: TUserVote) => {
  if (currVote === 'up') return 1
  if (currVote === 'down') return -1
  return 0
}

const updateCachedVoteCount = (
  currentVoteCount: TVoteCount,
  vote: TUserVote
) => {
  const { downvote, upvote, total, userVote } = currentVoteCount

  return {
    downvote: getDownvote(userVote, downvote, vote),
    upvote: getUpvote(userVote, upvote, vote),
    total: getTotal(userVote, total, vote),
    userVote: getUserVote(vote),
  }
}

export {getDownvote, getUpvote, getTotal, getUserVote, updateCachedVoteCount}