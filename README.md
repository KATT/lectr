lectr
=====

# Setup

```
npm install
npm install bower -g
bower install
node bin/dev
```

# Data structure


````
/courses
/courses/1
/lectures
/lectures/1/comments
```

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