const {
  globalPrefix: prefix4g,
  compPrefix: prefix4c,
} = require('../../../utils/globalConfig');

module.exports = {
  header: {
    padding: { value: `0.75rem 1.25rem` },
    'border-width': { value: `{${prefix4g}.size.base.border-width.value}` },
    'border-radius': { value: `{${prefix4g}.size.base.border-radius.value}` },
    'font-size': { value: `{${prefix4g}.size.base.font-size.value}` },

    'text-color': { value: `{${prefix4g}.color.base.text.val.value}` },
    'bg-color': { value: `{${prefix4g}.color.gray.lighter.val.value}` },
    'border-color': {
      value: `{${prefix4g}.color.black.val.value}`,
      modify: [{ type: `setAlpha`, amount: `0.2` }],
    },
    'box-shadow': { value: `none` },
    focus: {
      'text-color': {
        value: `{${prefix4c}.html-details-collapse.header.text-color.value}`,
      },
      'bg-color': {
        value: `{${prefix4c}.html-details-collapse.header.bg-color.value}`,
      },
      'border-color': {
        value: `{${prefix4c}.html-details-collapse.header.border-color.value}`,
      },
      'box-shadow': {
        value: `{${prefix4c}.html-details-collapse.header.box-shadow.value}`,
      },
      outline: { value: `none` },
    },
    open: {
      'text-color': {
        value: `{${prefix4c}.html-details-collapse.header.text-color.value}`,
      },
      'bg-color': {
        value: `{${prefix4c}.html-details-collapse.header.text-color.value}`,
      },
      'border-color': {
        value: `{${prefix4c}.html-details-collapse.header.border-color.value}`,
      },
      'box-shadow': {
        value: `{${prefix4c}.html-details-collapse.header.box-shadow.value}`,
      },
      focus: {
        'text-color': {
          value: `{${prefix4c}.html-details-collapse.header.focus.text-color.value}`,
        },
        'bg-color': {
          value: `{${prefix4c}.html-details-collapse.header.focus.bg-color.value}`,
        },
        'border-color': {
          value: `{${prefix4c}.html-details-collapse.header.focus.border-color.value}`,
        },
        'box-shadow': {
          value: `{${prefix4c}.html-details-collapse.header.focus.box-shadow.value}`,
        },
        outline: {
          value: `{${prefix4c}.html-details-collapse.header.focus.outline.value}`,
        },
      },
    },
    bg: {
      // collapse header arrow using background image
      // 'padding-with-bg-image': { value: `0.75rem 1.25rem 0.75rem 2.75rem` },
      padding: { value: `0.75rem 1.25rem 0.75rem 2.75rem` },
      size: { value: `0.375rem` },
      position: { value: `0.125rem center` },
    },
  },
  content: {
    padding: { value: `1.25rem` },
    'border-width': { value: `{${prefix4g}.size.base.border-width.value}` },
    'border-radius': { value: `{${prefix4g}.size.base.border-radius.value}` },
    'font-size': { value: `{${prefix4g}.size.base.font-size.value}` },

    'text-color': { value: `{${prefix4g}.color.base.text.val.value}` },
    'bg-color': { value: `transparent` },
    'border-color': {
      value: `{${prefix4c}.html-details-collapse.header.border-color.value}`,
    },
    'box-shadow': { value: `none` },
  },
};
