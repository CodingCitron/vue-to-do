# todo-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### json server
https://www.google.com/search?q=json-server+npm&oq=json-server+npm&aqs=chrome..69i57j0i512l9.3818j0j7&sourceid=chrome&ie=UTF-8
```
    npm install -g json-server //json-server 
    db.json // 작성해야 해당 json을 가져옵니다.
    json-server --watch db.json //서버 실행

<code>
    {
        "todos": [
            { "id": 1 },
            { "id": 1 }
        ]
    }
</code>

    위 같이 생긴 json을 만들면
    http://localhost:3000/todos <- 만들어지고
    http://localhost:3000/todos/1 <- 배열의 첫번째 접근 가능
```
     
### eslin & prettier
``` 
    https://mkonji23.tistory.com/19?category=831983
    https://mkonji23.tistory.com/21?category=831983

    npm install babel-eslint --save-dev
    npm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue --save-dev

    vs code extention eslint install
    file -> preference -> setting -> eslint -> vue 추가
    
    setting.json
    .eslintrc.js 경로 추가
    "eslint.workingDirectories": [
        "./frontend"
    ]

    package.json
    extends 부분 수정
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],

    vue.config.js
    lintOnSave: false <-- eslint 설정 끄기 기능

```

### vue router

```
    //https://router.vuejs.org/installation.html
    npm install vue-router@4 --save
```

### lodash

```
    npm install lodash --save
```

### vuex

```
    //https://vuex.vuejs.org/installation.html
    npm install vuex@next --save
```