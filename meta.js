'use strict'

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Application Name',
      default: 'twitch-ext-your-app'
    },
    appver: {
        type: 'string',
        required: true,
        message: 'Application Version',
        default: '0.0.1'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'An electron-vue project'
    },
    usesass: {
        type: 'confirm',
        message: 'Use Sass / Scss?',
        required: true
    },
    plugins: {
      type: 'checkbox',
      message: 'Select which Vue plugins to install',
      choices: ['axios', 'vue-router', 'vuex'],
      default: ['axios', 'vue-router', 'vuex']
    },
    eslint: {
      type: 'confirm',
      require: true,
      message: 'Use linting with ESLint?',
      default: true
    },
    eslintConfig: {
      when: 'eslint',
      type: 'list',
      message: 'Which ESLint config would you like to use?',
      choices: [
        {
          name: 'Standard (https://github.com/feross/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ]
    },
    // unit: {
    //   type: 'confirm',
    //   message: 'Set up unit testing with Karma + Mocha?',
    //   required: true
    // },
    // e2e: {
    //   type: 'confirm',
    //   message: 'Set up end-to-end testing with Spectron + Mocha?',
    //   require: true
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
    }
  },
  helpers: {
    isEnabled(list, check, opts) {
      if(list[check]) return opts.fn(this)
      else return opts.inverse(this)
    },
    deps(plugins) {
      let output = ''
      let dependencies = {
        'axios': '^0.19.0',
        'vue-router': '^3',
        'vuex': '^3'
      }

      if(Object.keys(plugins).length > 0) output += ',\n'

      Object.keys(plugins).forEach((p, i) => {
        output += `    "${p}": "${dependencies[p]}"`
        if (i !== Object.keys(plugins).length - 1) output += ',\n'
      })

      return output
    },
    testing(unit, e2e, opts) {
      if(unit || e2e) {
        return opts.fn(this)
      }
    }
  },
  filters: {
    // 'src/renderer/routes.js': 'plugins[\'vue-router\']',
    // 'src/renderer/components/LandingPageView/CurrentPage.vue': 'plugins[\'vue-router\']',
    // 'src/renderer/router/**/*': 'plugins[\'vue-router\']',
    // 'src/renderer/store/**/*': 'plugins[\'vuex\']',
    'component': "templates['component']",
    'panel': "templates['panel']",
    'overlay': "templates['overlay']",
    'config': "templates['config']",
    // 'test/e2e/**/*': 'e2e',
    // 'test/unit/**/*': 'unit',
    // 'test/.eslintrc': 'e2e || unit',
    '.eslintignore': 'eslint',
    '.eslintrc.js': 'eslint',
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
