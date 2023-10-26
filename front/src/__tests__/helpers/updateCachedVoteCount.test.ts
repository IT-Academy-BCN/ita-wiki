import { describe, expect } from 'vitest'
import {
  getDownvote,
  getUpvote,
  getTotal,
  getUserVote,
  updateCachedVoteCount,
} from '../../helpers/updateCachedVoteCount'

describe('getDownvote', () => {
  it('should return the current downvote when user has not voted yet AND votes UP', () => {
    const currUserVote = 0
    const currDownvote = 2
    const currVote = 'up'

    const result = getDownvote(currUserVote, currDownvote, currVote)

    expect(result).toBe(currDownvote)
  })

  it('should increment the downvote count when user has not voted yet AND votes DOWN', () => {
    const currUserVote = 0
    const currDownvote = 3
    const currVote = 'down'

    const result = getDownvote(currUserVote, currDownvote, currVote)

    expect(result).toBe(currDownvote + 1)
  })

  it('should decrement the downvote count when user has already voted DOWN and votes CANCEL', () => {
    const currUserVote = -1 // User cancels (currVote === 'cancel')
    const currDownvote = 5
    const currVote = 'cancel'

    const result = getDownvote(currUserVote, currDownvote, currVote)

    expect(result).toBe(currDownvote - 1)
  })
})

describe('getUpvote', () => {
  it('should return the current upvote when user has not voted AND votes down', () => {
    const currUserVote = 0
    const currUpvote = 0
    const currVote = 'down'

    const result = getUpvote(currUserVote, currUpvote, currVote)

    expect(result).toBe(currUpvote)
  })
  it('should increment the upvote count when user has not voted yet AND votes UP', () => {
    const currUserVote = 0
    const currUpvote = 0
    const currVote = 'up'

    const result = getUpvote(currUserVote, currUpvote, currVote)

    expect(result).toBe(currUpvote + 1)
  })
  it('should decrement the upvote count when user has already voted UP and votes CANCEL', () => {
    const currUserVote = 1
    const currUpvote = 1
    const currVote = 'up'

    const result = getUpvote(currUserVote, currUpvote, currVote)

    expect(result).toBe(currUpvote - 1)
  })
})

describe('getTotal', () => {
  it('should increment total by 1 if user has not voted yet AND votes UP', () => {
    const currUserVote = 0
    const currTotal = 0
    const currVote = 'up'

    const result = getTotal(currUserVote, currTotal, currVote)

    expect(result).toBe(currTotal + 1)
  })
  it('should decrement total by 2 if user has not voted yet AND votes UP', () => {
    const currUserVote = 1
    const currTotal = 2
    const currVote = 'down'

    const result = getTotal(currUserVote, currTotal, currVote)

    expect(result).toBe(currTotal - 2)
  })
  it('should increment total by 2 if user has voted DOWN AND votes UP', () => {
    const currUserVote = -1
    const currTotal = 2
    const currVote = 'down'

    const result = getTotal(currUserVote, currTotal, currVote)

    expect(result).toBe(currTotal + 2)
  })
})

describe('getUserVote', () => {
  it('should return 1 if user votes UP, 0 if user votes CANCEL, -1 if user votes DOWN', () => {
    const resultUp = getUserVote('up')

    expect(resultUp).toBe(1)

    const resultCancel = getUserVote('cancel')
    expect(resultCancel).toBe(0)

    const resultDown = getUserVote('down')

    expect(resultDown).toBe(-1)
  })
})

describe('updateCachedVoteCount', () => {
  it('updates the cachedVoteCount by calling the 4 helper functions', () => {
    const voteCount = {
      downvote: 0,
      upvote: 0,
      total: 0,
      userVote: 0,
    }

    const result = updateCachedVoteCount(voteCount, 'up')

    expect(result).toStrictEqual({
      downvote: 0,
      upvote: 1,
      total: 1,
      userVote: 1,
    })
  })
})
