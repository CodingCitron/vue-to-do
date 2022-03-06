module.exports = {
    // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
    root: true,
    // 추가적인 규칙들을 적용
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        //'eslint:recommended', // 사용하지 않는 변수는 허용하지 않는 규칙 https://eslint.org/docs/rules/no-unused-vars
        'plugin:vue/essential',
        'prettier',
        'plugin:prettier/recommended',
    ],
    // 코드 정리 플러그인 추가
    plugins: ['vue', 'prettier'],
    // 사용자 편의 규칙 추가
    rules: {
        //https://eslint.vuejs.org/rules/no-unused-components.html
        'vue/no-unused-components': 'off',
        /*https://islet4you.tistory.com/entry/ESLint-%EC%A0%81%EC%9A%A9%EC%8B%9C-multi-word-component-names-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
        
        //eslint-disable-next-line
        
        https://eslint.vuejs.org/rules/multi-word-component-names.html
        */

        'vue/no-multiple-template-root': 'off',
        'vue/no-v-model-argument': 'off',
        'vue/multi-word-component-names': 'off',
        'generator-star-spacing': 'off',
        'prettier/prettier': [
            'error', //<- 있으면 아래 규칙 안지켰을 때 에러 표시함
            // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
            // https://prettier.io/docs/en/options.html
            // https://velog.io/@kyusung/eslint-prettier-config 옵션 설명
            {
                singleQuote: true,
                semi: false,
                useTabs: false,
                tabWidth: 4,
                trailingComma: 'all',
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: 'avoid',
                endOfLine: 'auto',
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
}
//여기 수정 시 다시 프론트 서버 켜야함
