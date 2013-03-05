lectr
=====

# Setup

```
npm install
npm install bower -g
bower install
node bin/dev
```

# Endpoints
````
/courses
/courses/1
/lectures
/lectures/1/comments

```

# Files

courses.json
lectures.json
comments.json

# Data scheme
```
course
    id
    name

lecture
    id
    courseId
    title
    description
    duration
    url

comment
    id
    lectureId
    time
    description
    created
    modified
```