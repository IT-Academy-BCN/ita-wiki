import { resourcesGetSchema } from '../../../schemas/resourcesGetSchema'
import { registry } from '../../registry'
import { z } from '../../zod'

const pathRoot = '/api/v1/resources'
registry.registerPath({
  method: 'get',
  tags: ['resources'],
  path: `${pathRoot}`,
  description: 'Returns a collection of resources based on type and topic',
  summary: 'Returns a collection of resources',
  request: {
  query: resourcesGetSchema
  },
  responses: {
    200: {
      description: 'Sucessful operation',
      content: {
        'application/json': {
          // FALTARIA CREAR ZOD SCHEMA EN SCHEMAS Y SUSTITUIRLO POR ESTE ZOD OBJECT (dejar el example)
          schema: z.object({}).openapi({ example: 
            {
              resources: [
                {
                  id: "clh4tra53000bxnmnzsf4dqq9",
                  title: "My resource in React",
                  description: "Lorem ipsum",
                  url: "http://www.example.com/resource/React.html",
                  resourceType: "BLOG",
                  createdAt: "2023-05-01T12:36:32.151Z",
                  updatedAt: "2023-05-01T12:36:32.151Z",
                  user: {
                    name: "Kevin Mamaqi",
                    email: "admin@admin.com",
                  },
                  topics: [
                    {
                      topic: {
                        id: "clh4tra4z0008xnmn7zrgvce7",
                        name: "Eventos",
                        categoryId: "clh4tra4t0004xnmn13adhwjv",
                        createdAt: "2023-05-01T12:36:32.148Z",
                        updatedAt: "2023-05-01T12:36:32.148Z",
                      },
                    },
                    {
                      topic: {
                        id: "clh4tra4z0009xnmn97g0hm6o",
                        name: "Listas",
                        categoryId: "clh4tra4t0002xnmnhj48vvba",
                        createdAt: "2023-05-01T12:36:32.148Z",
                        updatedAt: "2023-05-01T12:36:32.148Z",
                      },
                    },
                  ],
                },
                {
                  id: "clh4tra53000cxnmnf8f4gkao",
                  title: "My resource in Node",
                  description: "Lorem ipsum",
                  url: "http://www.example.com/resource/Node.html",
                  resourceType: "BLOG",
                  createdAt: "2023-05-01T12:36:32.151Z",
                  updatedAt: "2023-05-01T12:36:32.151Z",
                  user: {
                    name: "Kevin Mamaqi",
                    email: "admin@admin.com",
                  },
                  topics: [
                    {
                      topic: {
                        id: "clh4tra4z0008xnmn7zrgvce7",
                        name: "Eventos",
                        categoryId: "clh4tra4t0004xnmn13adhwjv",
                        createdAt: "2023-05-01T12:36:32.148Z",
                        updatedAt: "2023-05-01T12:36:32.148Z",
                      },
                    },
                    {
                      topic: {
                        id: "clh4tra4z0009xnmn97g0hm6o",
                        name: "Listas",
                        categoryId: "clh4tra4t0002xnmnhj48vvba",
                        createdAt: "2023-05-01T12:36:32.148Z",
                        updatedAt: "2023-05-01T12:36:32.148Z",
                      },
                    },
                  ],
                },
              ],
            }
          }),
        },
      }
    },
    500: {
      description: 'Internal error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: "{\"message\":\"\\nInvalid `.findMany()` invocation in\\n/ita-wiki/back/src/controllers/getResourcesController.ts:27:8\\n" }),
          }),
        },
      },
    },
  },
})
