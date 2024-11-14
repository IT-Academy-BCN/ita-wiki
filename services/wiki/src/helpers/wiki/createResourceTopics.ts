import db from '../../db/knex'
import { Topic } from '../../db/knexTypes'

export const createResourceTopics = async (
  resourceId: string,
  topicIds: Topic[]
) => {
  const resourceTopics = topicIds.map((topicId) => ({
    resource_id: resourceId,
    topic_id: topicId.id,
    created_at: new Date(),
  }))

  await db('topic_resource').insert(resourceTopics)
}
