# Schema
```text
User
- _id
- name
- email
- password

User 1 ---- * Task

Task
- _id
- title
- description
- status
- owner -> User._id
- version
```
