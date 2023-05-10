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
            })
        })
    },
    responses: {
        200: {
            description: 'Resources found',

        },
        404: {

            description: 'Topic not found',
        }
    
    },
});

registry.registerPath({
    method: 'get',
    tags: ['resources'],
    path: `${pathRoot.v1.resources}/topic/slug/:slug`,
    description: 'Returns a list of resources by topic slug',
    summary: 'Takes in a topic slug and returns a list of resources associated with that topic slug',
    request: {
        params: z.object({
            slug: z.string().trim().min(1).openapi({
                description: "topic slug associated with the resources",
            }),
        })
    },
    responses: {
        200: {
            description: 'Resources found',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.string().trim().min(1),
                            slug: z.string().trim().min(1).openapi({ example: 'eventos'})
                        })
                    )
            }

        },
    },
        404: {

            description: 'Topic not found',
        }
    
    },
});


