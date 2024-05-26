export const users = [
  { name: 'farouk', username: '@mestiri', avatar: '/static/images/avatar/2.jpg', online: true },
  { name: 'Khalil', username: '@kraiem', avatar: '/static/images/avatar/3.jpg', online: false },
  { name: 'rania', username: '@rania', avatar: '/static/images/avatar/1.jpg', online: true },
  { name: 'ala aydi', username: '@ala', avatar: '/static/images/avatar/4.jpg', online: false },
  { name: 'maher', username: '@ghariani', avatar: '/static/images/avatar/5.jpg', online: true },
];

export const chats = [
  { id: '1', sender: users[0], messages: [{ id: '1', content: 'Hi, I am working on the project.', timestamp: 'Wednesday 9:00am', sender: users[0] }, { id: '2', content: 'Sounds great! Keep up the good work.', timestamp: 'Wednesday 9:10am', sender: 'You' }] },
  { id: '2', sender: users[1], messages: [{ id: '1', content: 'Hi Rania, I am thinking about taking a vacation.', timestamp: 'Wednesday 9:00am', sender: users[1] }, { id: '2', content: 'Great idea! Any idea where you want to go?', timestamp: 'Wednesday 9:05am', sender: 'You' }] },
  { id: '3', sender: users[2], messages: [{ id: '1', content: 'Hey!', timestamp: '5 mins ago', sender: users[2], unread: true }] },
  { id: '4', sender: users[3], messages: [{ id: '1', content: 'Hey Rania, I was thinking about home improvement.', timestamp: 'Wednesday 9:00am', sender: users[3] }, { id: '2', content: 'Interesting! What improvements are you considering?', timestamp: 'Wednesday 9:05am', sender: 'You' }] },
  { id: '5', sender: users[4], messages: [{ id: '1', content: 'Sup', timestamp: '20 mins ago', sender: users[4], unread: true }] },
  { id: '6', sender: users[0], messages: [{ id: '1', content: 'Heyo', timestamp: ' 8 mins ago', sender: 'You', unread: true }] },
  { id: '7', sender: users[2], messages: [{ id: '1', content: "Hey Rania, I've finished the requirements doc.", timestamp: '13 mins ago', sender: users[2], unread: true }] },
];
