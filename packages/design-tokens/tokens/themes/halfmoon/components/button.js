const {
  globalPrefix: prefix4g,
  compPrefix: prefix4c,
} = require('../../../utils/globalConfig');

module.exports = {
  height: { value: '3.2rem' },
  padding: { value: '0 1.5rem' },
  'border-width': { value: `{${prefix4g}.size.border.base.width.value}` },
  'border-radius': { value: `{${prefix4g}.size.border.base.radius.value}` },
  'box-shadow-color': {
    value: `{${prefix4g}.color.black.val.value}`,
    modify: [{ type: `setAlpha`, amount: `0.05` }],
  },
  'box-shadow': {
    value: `0 0.2rem 0 {${prefix4c}.button.box-shadow-color.value}`,
    replaceRefs: 'all',
  },
  'border-color': {
    value: `{${prefix4g}.color.black.val.value}`,
    modify: [{ type: `setAlpha`, amount: `0.2` }],
  },
  'bg-color': { value: `{${prefix4g}.color.white.val.value}` },
  'text-color': { value: `{${prefix4g}.color.base.text.light.value}` },
  'font-size': { value: '2rem' },
  'text-align': { value: 'center' },
  'line-height': { value: `{${prefix4c}.button.height.value}` },
  hover: {
    'text-color': { value: `{${prefix4c}.button.text-color.value}` },
    'bg-color': { value: `{${prefix4g}.color.gray.lighter.val.value}` },
    'border-color': { value: `{${prefix4c}.button.border-color.value}` },
    'box-shadow': { value: `{${prefix4c}.button.box-shadow.value}` },
  },
  focus: {
    'text-color': { value: `{${prefix4c}.button.text-color.value}` },
    'bg-color': { value: `{${prefix4c}.button.bg-color.value}` },
    'border-color': { value: `{${prefix4c}.button.border-color.value}` },
    'box-shadow-color': {
      value: `{${prefix4g}.color.brand.primary.val.value}`,
      modify: [{ type: `setAlpha`, amount: `0.6` }],
    },
    'box-shadow': {
      value: `0 0 0 0.2rem {${prefix4c}.button.focus.box-shadow-color.value}`,
      replaceRefs: 'all',
    },
    outline: { value: `none` },
  },
  disabled: {
    opacity: { value: `0.6` },
    // 'text-color': { value: `{${prefix4c}.button.text-color.value}` },
    // 'bg-color': { value: `{${prefix4c}.button.bg-color.value}` },
    // 'border-color': { value: `{${prefix4c}.button.border-color.value}` },
    // 'box-shadow': { value: `none` },
  },
  primary: {
    'text-color': {
      value: `{${prefix4g}.color.text.on-primary-color-bg.value}`,
    },
    'bg-color': { value: `{${prefix4g}.color.brand.primary.val.value}` },
    'border-color': { value: `transparent`, outputAsItIs: true },
    'box-shadow': { value: `{${prefix4c}.button.box-shadow.value}` },
    hover: {
      'text-color': { value: `{${prefix4c}.button.primary.text-color.value}` },
      'bg-color': { value: `{${prefix4g}.color.brand.primary.light.value}` },
      'border-color': {
        value: `{${prefix4c}.button.primary.border-color.value}`,
      },
      'box-shadow': { value: `{${prefix4c}.button.primary.box-shadow.value}` },
    },
    focus: {
      'text-color': { value: `{${prefix4c}.button.primary.text-color.value}` },
      'bg-color': { value: `{${prefix4c}.button.primary.bg-color.value}` },
      'border-color': {
        value: `{${prefix4c}.button.primary.border-color.value}`,
      },
      'box-shadow-color': {
        value: `{${prefix4g}.color.brand.primary.val.value}`,
        modify: [{ type: `setAlpha`, amount: `0.3` }],
      },
      'box-shadow': {
        value: `0 0 0 0.3rem {${prefix4c}.button.primary.focus.box-shadow-color.value}`,
        replaceRefs: 'all',
      },
      outline: { value: `{${prefix4c}.button.focus.outline.value}` },
    },
    disabled: {
      // 'text-color': { value: `{${prefix4c}.button.primary.text-color.value}` },
      // 'bg-color': { value: `{${prefix4c}.button.primary.bg-color.value}` },
      // 'border-color': {
      //   value: `{${prefix4c}.button.primary.border-color.value}`,
      // },
      // 'box-shadow': { value: `none` },
    },
  },
  secondary: {
    'text-color': {
      value: `{${prefix4g}.color.text.on-secondary-color-bg.value}`,
    },
    'bg-color': { value: `{${prefix4g}.color.brand.secondary.val.value}` },
    'border-color': { value: `transparent`, outputAsItIs: true },
    'box-shadow': { value: `{${prefix4c}.button.box-shadow.value}` },
    hover: {
      'text-color': {
        value: `{${prefix4c}.button.secondary.text-color.value}`,
      },
      'bg-color': { value: `{${prefix4g}.color.brand.secondary.light.value}` },
      'border-color': {
        value: `{${prefix4c}.button.secondary.border-color.value}`,
      },
      'box-shadow': {
        value: `{${prefix4c}.button.secondary.box-shadow.value}`,
      },
    },
    focus: {
      'text-color': {
        value: `{${prefix4c}.button.secondary.text-color.value}`,
      },
      'bg-color': { value: `{${prefix4c}.button.secondary.bg-color.value}` },
      'border-color': {
        value: `{${prefix4c}.button.secondary.border-color.value}`,
      },
      'box-shadow-color': {
        value: `{${prefix4g}.color.brand.secondary.val.value}`,
        modify: [{ type: `setAlpha`, amount: `0.3` }],
      },
      'box-shadow': {
        value: `0 0 0 0.3rem {${prefix4c}.button.secondary.focus.box-shadow-color.value}`,
        replaceRefs: 'all',
      },
      outline: { value: `{${prefix4c}.button.focus.outline.value}` },
    },
    disabled: {
      'text-color': { value: `{${prefix4c}.button.primary.text-color.value}` },
      'bg-color': { value: `{${prefix4c}.button.primary.bg-color.value}` },
      'border-color': {
        value: `{${prefix4c}.button.primary.border-color.value}`,
      },
      'box-shadow': { value: `none` },
    },
  },
  success: {
    'text-color': {
      value: `{${prefix4g}.color.text.on-success-color-bg.value}`,
    },
    'bg-color': { value: `{${prefix4g}.color.semantic.success.val.value}` },
    'border-color': { value: `transparent`, outputAsItIs: true },
    'box-shadow': { value: `{${prefix4c}.button.box-shadow.value}` },
    hover: {
      'text-color': { value: `{${prefix4c}.button.success.text-color.value}` },
      'bg-color': { value: `{${prefix4g}.color.semantic.success.light.value}` },
      'border-color': {
        value: `{${prefix4c}.button.success.border-color.value}`,
      },
      'box-shadow': { value: `{${prefix4c}.button.success.box-shadow.value}` },
    },
    focus: {
      'text-color': { value: `{${prefix4c}.button.success.text-color.value}` },
      'bg-color': { value: `{${prefix4c}.button.success.bg-color.value}` },
      'border-color': {
        value: `{${prefix4c}.button.success.border-color.value}`,
      },
      'box-shadow-color': {
        value: `{${prefix4g}.color.semantic.success.val.value}`,
        modify: [{ type: `setAlpha`, amount: `0.3` }],
      },
      'box-shadow': {
        value: `0 0 0 0.3rem {${prefix4c}.button.success.focus.box-shadow-color.value}`,
        replaceRefs: 'all',
      },
      outline: { value: `{${prefix4c}.button.focus.outline.value}` },
    },
    disabled: {
      // 'text-color': { value: `{${prefix4c}.button.success.text-color.value}` },
      // 'bg-color': { value: `{${prefix4c}.button.success.bg-color.value}` },
      // 'border-color': {
      //   value: `{${prefix4c}.button.success.border-color.value}`,
      // },
      // 'box-shadow': { value: `none` },
    },
  },
  danger: {
    'text-color': {
      value: `{${prefix4g}.color.text.on-danger-color-bg.value}`,
    },
    'bg-color': { value: `{${prefix4g}.color.semantic.danger.val.value}` },
    'border-color': { value: `transparent`, outputAsItIs: true },
    'box-shadow': { value: `{${prefix4c}.button.box-shadow.value}` },
    hover: {
      'text-color': { value: `{${prefix4c}.button.danger.text-color.value}` },
      'bg-color': { value: `{${prefix4g}.color.semantic.danger.light.value}` },
      'border-color': {
        value: `{${prefix4c}.button.danger.border-color.value}`,
      },
      'box-shadow': { value: `{${prefix4c}.button.danger.box-shadow.value}` },
    },
    focus: {
      'text-color': { value: `{${prefix4c}.button.danger.text-color.value}` },
      'bg-color': { value: `{${prefix4c}.button.danger.bg-color.value}` },
      'border-color': {
        value: `{${prefix4c}.button.danger.border-color.value}`,
      },
      'box-shadow-color': {
        value: `{${prefix4g}.color.semantic.danger.val.value}`,
        modify: [{ type: `setAlpha`, amount: `0.3` }],
      },
      'box-shadow': {
        value: `0 0 0 0.3rem {${prefix4c}.button.danger.focus.box-shadow-color.value}`,
        replaceRefs: 'all',
      },
      outline: { value: `{${prefix4c}.button.focus.outline.value}` },
    },
    disabled: {
      // 'text-color': { value: `{${prefix4c}.button.danger.text-color.value}` },
      // 'bg-color': { value: `{${prefix4c}.button.danger.bg-color.value}` },
      // 'border-color': {
      //   value: `{${prefix4c}.button.danger.border-color.value}`,
      // },
      // 'box-shadow': { value: `none` },
    },
  },
};