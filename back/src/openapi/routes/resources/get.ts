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
  query: z.object({
    type: z.string().optional().openapi({ example: 'BLOG' }),
    topic: z.string().optional().openapi({ example: 'Listas' }),
  })
  },
  responses: {
    200: {
      description: 'Sucessful operation',
      content: {
        'application/json': {
          // FALTARIA CREAR ZOD SCHEMA EN SCHEMAS Y SUSTITUIRLO POR ESTE ZOD OBJECT (dejar el example)
          schema: z.object({}).openapi({ example: {
            "resources": [
              {
                "id": "clgtomj8j000cxn5tu23lmm4e",
                "title": "My resource in Node",
                "description": "Lorem ipsum",
                "url": "http://www.example.com/resource/Node.html",
                "resourceType": "BLOG",
                "createdAt": "2023-04-23T17:27:24.643Z",
                "updatedAt": "2023-04-23T17:27:24.643Z",
                "userEmail": "admin@admin.com",
                "topics": [
                  {
                    "id": "clgtomj8e0008xn5tvyzxwe9a",
                    "name": "Eventos",
                    "categoryId": "clgtomj870004xn5t7yla5883",
                    "createdAt": "2023-04-23T17:27:24.639Z",
                    "updatedAt": "2023-04-23T17:27:24.639Z"
                  },
                  {
                    "id": "clgtomj8e0009xn5taqirdqns",
                    "name": "Listas",
                    "categoryId": "clgtomj870002xn5tr6axu4em",
                    "createdAt": "2023-04-23T17:27:24.639Z",
                    "updatedAt": "2023-04-23T17:27:24.639Z"
                  }
                ]
              },
              {
                "id": "clgtomj8j000bxn5tnr8r9g0o",
                "title": "My resource in React",
                "description": "Lorem ipsum",
                "url": "http://www.example.com/resource/React.html",
                "resourceType": "BLOG",
                "createdAt": "2023-04-23T17:27:24.643Z",
                "updatedAt": "2023-04-23T17:27:24.643Z",
                "userEmail": "admin@admin.com",
                "topics": [
                  {
                    "id": "clgtomj8e0008xn5tvyzxwe9a",
                    "name": "Eventos",
                    "categoryId": "clgtomj870004xn5t7yla5883",
                    "createdAt": "2023-04-23T17:27:24.639Z",
                    "updatedAt": "2023-04-23T17:27:24.639Z"
                  },
                  {
                    "id": "clgtomj8e0009xn5taqirdqns",
                    "name": "Listas",
                    "categoryId": "clgtomj870002xn5tr6axu4em",
                    "createdAt": "2023-04-23T17:27:24.639Z",
                    "updatedAt": "2023-04-23T17:27:24.639Z"
                  }
                ]
              }
            ]
          } }),

          
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
