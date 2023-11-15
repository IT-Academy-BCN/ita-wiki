import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

import { z } from 'zod'

// Adds method .openapi to Zod types
extendZodWithOpenApi(z)

export { z }
