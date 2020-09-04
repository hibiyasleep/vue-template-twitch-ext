'use strict'
const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
  runScript
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    includes: (list, check) => list.includes(check),
    toArray: o => JSON.stringify(Object.keys(o).filter(_ => o[_])),
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
  },
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
      default: "A Twitch Extension project built with Vue.js"
    },
    author: {
      type: "string",
      label: "Author",
      message: 'Author'
    },
    license: {
      type: "string",
      label: "License",
      default: "MIT"
    },
    scss: {
      type: "confirm",
      message: "Use SCSS?",
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
      choices: [{
        name: 'Prettier (Recommended)',
        value: 'prettier',
        short: 'prettier'
      }, {
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
      }, ],
    },
    i18n: {
      type: "confirm",
      message: "Use vue-i18n?",
      default: true
    },
    i18nLang: {
      when: 'i18n',
      type: 'list',
      message: 'Pick an default language',
      choices: [{
        name: 'English',
        value: 'en',
        short: 'en',
      },
        {
          name: 'Korean',
          value: 'ko',
          short: 'ko',
        },
        {
          name: 'Japanese',
          value: 'jp',
          short: 'jp',
        },
        {
          name: 'Chinese',
          value: 'zh',
          short: 'zh'
        }
      ]
    },
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
    },
    // needCertGenerate: {
    //   type: 'confirm',
    //   message: 'Would you like to generate the localhost SSL certificate?'
    // },
    autoInstall: {
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [{
        name: 'Yes, use NPM',
        value: 'npm',
        short: 'npm',
      },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
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
        choices: [{
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
        }, ],
        default: ['component', 'panel', 'overlay', 'config']
      },
      useIdShare: {
        type: 'confirm',
        message: 'Request Identify Share to users?'
      }
    }
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    '.prettierrc': 'lintConfig.prettier',
    'component/**/*': 'templates.component',
    'panel/**/*': 'templates.panel',
    'overlay/**/*': 'templates.overlay',
    'config/**/*': 'templates.config',
    '*/pages/request-permission.vue': 'useIdShare',
    'locales/**/*': 'i18n'
    // 'config/index.html': '!templates.config',
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
  complete: async function(data, {
    chalk
  }) {
    const green = chalk.green

    sortDependencies(data, green)
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    // if(data.needCertGenerate) {
    //   await runScript('generate_cert.sh')
    // }

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
    console.log([
      '\n---',
      '',
      'All set. Welcome to your new Twitch Extension project!',
      '',
      `Next Steps:\n${!data.inPlace ? '\n  \x1b[33m$\x1b[0m cd ' + data.destDirName : ''}`,
      '  \x1b[33m$\x1b[0m yarn run dev (or `npm run dev`)'
    ].join('\n'))
  }
}
