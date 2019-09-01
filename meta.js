'use strict'

module.exports = {
  prompts: {
    name: {
      type: "string",
      required: true,
      label: "Project name"
    },
    description: {
      type: "string",
      required: true,
      label: "Project description",
      default: "A Vue.js project"
    },
    author: {
      type: "string",
      label: "Author"
    },
    license: {
      type: "string",
      label: "License",
      default: "MIT"
    },
    sass: {
       type: "confirm",
       message: "Use sass?",
       default: true
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        }, {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        }, {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    // unit: {
    //   type: 'confirm',
    //   message: 'Set up unit tests',
    // },
    // runner: {
    //   when: 'unit',
    //   type: 'list',
    //   message: 'Pick a test runner',
    //   choices: [
    //     {
    //       name: 'Jest',
    //       value: 'jest',
    //       short: 'jest',
    //     },
    //     {
    //       name: 'Karma and Mocha',
    //       value: 'karma',
    //       short: 'karma',
    //     },
    //     {
    //       name: 'none (configure it yourself)',
    //       value: 'noTest',
    //       short: 'noTest',
    //     },
    //   ],
    // },
    // e2e: {
    //   type: 'confirm',
    //   message: 'Setup e2e tests with Nightwatch?',
    // },
    templates: {
      type: 'checkbox',
      message: 'Which extension parts will you build?',
      choices: [
        {
          name: 'Component (for video component, and/or panel, mobile)',
          value: 'component',
          short: 'Component',
        }, {
          name: 'Panel (and/or mobile)',
          value: 'panel',
          short: 'Panel',
        }, {
          name: 'Overlay (for fullscreen component)',
          value: 'overlay',
          short: 'Overlay',
        }, {
          name: 'Configuration page',
          value: 'config',
          short: 'Config',
        },
      ],
      default: ['component', 'panel', 'overlay', 'config']
    },
    useIdShare: {
      type: 'confirm',
      message: 'Request Identify Share to users?'
    }
  },
  helpers: {
    includes: (list, check) => list.includes(check)
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'component/**/*': 'templates.component',
    'panel/**/*': 'templates.panel',
    'overlay/**/*': 'templates.overlay',
    'config/**/*': 'templates.config',
    'config/index.html': '!templates.config',
    '*/pages/request-permission.vue': 'useIdShare',
    // 'config/test.env.js': 'unit || e2e',
    // 'build/webpack.test.conf.js': "unit && runner === 'karma'",
    // 'test/unit/**/*': 'unit',
    // 'test/unit/index.js': "unit && runner === 'karma'",
    // 'test/unit/jest.conf.js': "unit && runner === 'jest'",
    // 'test/unit/karma.conf.js': "unit && runner === 'karma'",
    // 'test/unit/specs/index.js': "unit && runner === 'karma'",
    // 'test/unit/setup.js': "unit && runner === 'jest'",
    // 'test/e2e/**/*': 'e2e',
  },
  complete (data) {
    console.log([
      '\n---',
      '',
      'All set. Welcome to your new Twitch Extension project!',
      '',
      `Next Steps:\n${!data.inPlace ? '\n  \x1b[33m$\x1b[0m cd ' + data.destDirName : ''}`,
      '  \x1b[33m$\x1b[0m yarn (or `npm install`)',
      '  \x1b[33m$\x1b[0m yarn run dev (or `npm run dev`)'
    ].join('\n'))
  }
}
