import { registry } from '../registry'

export const setCookieHeader = registry.registerComponent(
  'headers',
  'Set-Cookie',
  {
    schema: {
      type: 'string',
      example:
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGdieTNyemYwMDAweG44eDdzeXJvMnc2IiwiaWF0IjoxNjgxMjEyNzAzLCJleHAiOjE2ODEyOTkxMDN9.G1F5XQLYu0uwxnJDx_qDUV3avIUPxHb3Ld-XZYvUfNM; path=/; httponly',
      description: 'Sets the JWT session cookie',
    },
  }
)

