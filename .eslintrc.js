module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base/legacy",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
       "react"
    ],
    "settings": {
       "react": {
            "pragma":"React",
            "version": "detect"
        }
    },
    "rules": {
        "no-console": "off",
        "quotes": ["off", "double"],
        "react/button-has-type": "error",
        "react/jsx-sort-props": "error",
        "semi-style": "error",
        "comma-spacing": "error",
        "no-use-before-define": "off",
        "no-case-declarations": "off",
        "max-len": ["error", { "code": 120, "tabWidth": 4 }],
        "no-unused-vars": "warn",
        "react/no-set-state": "error",
        "react/no-unused-state": "error",
        "react/state-in-constructor": "off",
        "react/jsx-closing-tag-location": "error",
        "react/jsx-indent": "error",
        "react/jsx-max-props-per-line": ["warn", { "maximum": 3 }]
    }
};