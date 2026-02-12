export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-css-modules',
    ],
    rules: {
        'at-rule-no-unknown': null,
        'no-descending-specificity': null,
        'selector-class-pattern': null,
        'font-family-no-missing-generic-family-keyword': null,
        // 宽松模式：禁用现代颜色语法强制
        'color-function-notation': null,
        'alpha-value-notation': null,
        'color-function-alias-notation': null,
    },
}
