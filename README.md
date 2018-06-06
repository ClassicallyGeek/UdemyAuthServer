## Server
Build API server from scratch that does token based Authentication

### Topics Covered
* Cookies vs Token Authentication
* jwt
* passport
* bcrypt

### Design

* Signing up
bcrypt for password storage
token creation with jwt

* Signing in
used local strategy plugin for passport

* authenticated request
used jwt strategy plugin for passport

## Notes
config.js should export.module = {} with a property 'secret'
