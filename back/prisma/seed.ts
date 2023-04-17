// import { TopicSchema, ResourceSchema } from '../src/schemas'
// import { prisma } from '../src/prisma/client'
import '../src/prisma/middleware'

import { register } from './seedEngine/register'

const data = {
  users: [
    {
      name: 'Guillem Parrado',
      email: 'gp@example.com',
      password: 'password1',
      dni: '12345678A',
      status: 'ACTIVE',
    },
    {
      name: 'Iván Legrán',
      email: 'il@example.com',
      password: 'password2',
      dni: '23456789B',
      status: 'ACTIVE',
    },
    {
      name: 'Oriol Sastre',
      email: 'os@example.com',
      password: 'password3',
      dni: '34567891C',
      status: 'ACTIVE',
    },
    {
      name: 'Cristina Carrillo',
      email: 'cc@example.com',
      password: 'password4',
      dni: '45678912D',
      status: 'ACTIVE',
    },
    {
      name: 'Dani Morera',
      email: 'dm@example.com',
      password: 'password5',
      dni: '56789123E',
      status: 'ACTIVE',
    }
  ],
  topics: [
    {
      topic: 'React',
    },
    {
      topic: 'Javascript',
    },
    {
      topic: 'Node',
    },
    {
      topic: 'Python',
    },
    {
      topic: 'Django',
    },
    
  ],
  resources: [
    {
      title: 'My resource in React',
      description: 'Lorem ipsum',
      url: 'http://www.example.com/resource/React.html',
      resource_type: 'BLOG',
      topicId: 0,  // The topic index in the topics array
      userId: 3    // The user index in the users array
    },
    {
      title: 'My resource in Node',
      description: 'Lorem ipsum',
      url: 'http://www.example.com/resource/Node.html',
      resource_type: 'BLOG',
      topicId: 1,  // The topic index in the topics array
      userId: 3    // The user index in the users array
    },
    {
      title: 'My second resource in React',
      description: 'Lorem ipsum',
      url: 'http://www.example.com/resource/React2.html',
      resource_type: 'BLOG',
      topicId: 2,  // The topic index in the topics array
      userId: 3    // The user index in the users array
    },
    {
      title: 'My resource in Javascript',
      description: 'Lorem ipsum',
      url: 'http://www.example.com/resource/Javascript.html',
      resource_type: 'BLOG',
      topicId: 1,  // The topic index in the topics array
      userId: 4    // The user index in the users array
    }
  ],
}

register(data)