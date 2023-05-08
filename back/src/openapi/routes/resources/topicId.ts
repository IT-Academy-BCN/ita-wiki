import { registry } from '../../registry'
import { z } from '../../zod'
import { pathRoot } from '../../../routes/routes'

registry.registerPath({
    method: 'get',
    tags: ['resources'],
    path: `${pathRoot.v1.resources}/topic/:topicId`,
    description: 'Returns a list of resources by topic',
    summary: 'Takes in a topic id and returns a list of resources associated with that topic ID',
    request: {
        params: z.object({
            topicId: z.string().trim().min(1).openapi({
                description: "ID of topic for which to retrieve resources",
                // z.object({params: z.object({ topicId: z.string().trim().min(1)})})      
            })
        })
    },
    responses: {
        200: {
            description: 'Resources found',

        },
        404: {

            description: 'Topic not found',}
    
    },
});

