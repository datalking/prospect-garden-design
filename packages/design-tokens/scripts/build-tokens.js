const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');
const { getDifference } = require('../tokens/utils/strUtils');
const { hslToHex } = require('../tokens/utils/colorUtils');
const {
  compPrefix: prefix4c,
  globalPrefix: prefix4g,
} = require('../tokens/utils/globalConfig');
const compTokens = require('../tokens/themes/pg/components');
const cssPropertiesToCTIMap = require('./utils/cssPropertiesToCTI');

const ctiTransformerBuiltin =
  StyleDictionary.transform['attribute/cti'].transformer;

StyleDictionary.registerTransform({
  name: 'attribute/cti-comp',
  type: 'attribute',
  transformer: (token) => {
    // console.log('==, ', JSON.stringify(prop));

    if (token.path[0] === prefix4c) {
      // 若token属性名以pg-c开头，则根据叶节点的是css property名映射到cti
      return cssPropertiesToCTIMap[token.path[token.path.length - 1]];
    }

    if (token.path[0] === prefix4g) {
      // 若token属性名以pg-g开头，则去掉根节点属性名再映射到cti
      const propPathNew = token.path.slice(1);

      return ctiTransformerBuiltin({ ...token, path: propPathNew });
    }

    // Fallback to the original 'attribute/cti' transformer
    return ctiTransformerBuiltin(token);
  },
});

StyleDictionary.registerTransform({
  name: 'name/cti/kebab-double',
  type: 'name',
  transformer: (token, options) => {
    const pathStr = options.prefix
      ? [options.prefix].concat(token.path).join(' ')
      : token.path.join(' ');
    return pathStr
      .replace(/([a-z])([A-Z])/g, '$1--$2') // get all lowercase letters that are near to uppercase ones
      .replace(/[\s_]+/g, '--') // replace all spaces and low dash
      .toLowerCase(); // convert to lower case
  },
});

StyleDictionary.registerTransform({
  name: 'color/css-modify',
  type: 'value',
  transitive: true,
  transformer: (token, options) => {
    const { value, modify } = token;

    // console.log('==转换color, ', JSON.stringify(token));
    let color = tinycolor(value);
    modify.forEach(({ type, amount }) => {
      color = color[type](amount);
    });

    return color.toRgbString();
  },
  matcher: (token) => token.attributes.category === 'color' && token.modify,
  // matcher: (prop) => !prop.outputAsItIs,
});

StyleDictionary.registerTransform({
  name: 'color/css',
  ...StyleDictionary.transform[`color/css`],
  transitive: true,
  matcher: (token) =>
    token.attributes.category === 'color' && !token.outputAsItIs,
});

StyleDictionary.registerFormat({
  name: 'css/variables-references',
  formatter: function ({ dictionary, options }) {
    return `${this.selectorName} {
      ${dictionary.allProperties
        .map((token) => {
          if (token.name.includes('pg-g--color--base--text--val')) {
            // if (dictionary.usesReference(prop.original.value)) {
            // console.log('==out, ', JSON.stringify(token));
          }
          // let value = JSON.stringify(prop.value);

          // 通过filter实现不输出一部分变量，但会输出一个空行
          if (this.filterInFormatter && !this.filterInFormatter(token)) {
            return '';
          }

          let value = token.value;

          function IsHslColorFormat(v) {
            return (
              // prop.attributes.category === 'color' &&
              v.hasOwnProperty('h') &&
              v.hasOwnProperty('s') &&
              v.hasOwnProperty('l')
            );
          }

          function IsHslPropUsingAnyReference(p) {
            return dictionary.usesReference(token.original.value);
            // p.original.value.h.startsWith('{') ||
            // p.original.value.s.startsWith('{') ||
            // p.original.value.l.startsWith('{')

            // dictionary.getReference(p.original.value.h.toString()) ||
            // dictionary.getReference(p.original.value.s) ||
            // dictionary.getReference(p.original.value.l)
          }

          function outputHslProp(valStr, fallback) {
            // if (valStr.startsWith('{')) {
            if (dictionary.getReference(valStr.toString())) {
              const fbOut = fallback !== undefined ? `, ${fallback}` : '';
              return `var(--${dictionary.getReference(valStr).name}${fbOut})`;
            }
            return valStr;
          }

          if (IsHslColorFormat(value)) {
            // 若是hsl颜色格式，则计算裸数据值
            // const hslStrBeforeHex = `hsl(${value.h},${value.s},${value.l})`;
            // console.log('==hslStrArg, ', hslStrBeforeHex);
            // value = hslToHex(hslStrBeforeHex);
            value = hslToHex(`hsl(${value.h},${value.s},${value.l})`);
          }

          if (options.outputReferences) {
            if (token.attributes.category === 'color') {
              // 这里只处理包含特殊值的color，普通color不处理

              if (IsHslColorFormat(token.original.value)) {
                // 若属性原值是hsl的形式，如 {h:1,s:10%,l:10%}
                if (!IsHslPropUsingAnyReference(token)) {
                  // 且原值不包含其他引用，也就是hsl形式的裸数值，则直接输出该值
                  return `  --${token.name}: ${value};`;
                }

                // 下面处理原值hsl中包含引用其他变量的情况
                const hOut = outputHslProp(
                  token.original.value.h,
                  token.value.h,
                );
                const sOut = outputHslProp(
                  token.original.value.s,
                  token.value.s,
                );
                const lOut = outputHslProp(
                  token.original.value.l,
                  token.value.l,
                );

                // e.g. --color-hsl: hsl(var(--color-btn-h), var(--color-btn-s), 11%);
                return `  --${token.name}: hsl(${hOut}, ${sOut}, ${lOut});`;
              }

              if (
                !IsHslColorFormat(token.original.value) &&
                IsHslColorFormat(token.value)
              ) {
                // 若原值不是hsl，但解析后的值却是hsl，则直接输出解析值对应的裸颜色值
                // 这里对应的场景是一个变量引用的另一个变量是包含hsl的值
                const reference = dictionary.getReference(token.original.value);
                // console.log('==refedHsl, ', JSON.stringify(reference));
                return `  --${token.name}: var(--${reference.name}, ${value});`;
              }
            }

            if (dictionary.usesReference(token.original.value)) {
              // 若是普通css变量
              const reference = dictionary.getReference(token.original.value);
              // console.log('==||=, ', JSON.stringify(reference));
              // console.trace();
              // value = reference.name;

              let fallback = token.value;
              // 处理value的值是对象的情况，主要是书写token值时漏写.value的情况
              // if (
              //   typeof fallback === 'object' &&
              //   fallback.hasOwnProperty('value')
              // ) {
              //   fallback = fallback['value'];
              // }

              if (token.replaceRefs) {
                // 若通过在属性值中加入了此配置，则不是输出一个css变量，而是输出一个中间包含css变量字符串

                // todo 还要处理包含多个引用变量的情况，此处只处理单个引用变量
                function replaceRefWithCssVars(strWithRef) {
                  let retStr = strWithRef;
                  const refRegExp = /{.+}/g;
                  // const matched = str.match(refRegExp);

                  // 从prop.value中获取css变量部分对应的值
                  const removed = strWithRef.replace(refRegExp, ``);

                  // 若prop.value是hsl
                  if (IsHslColorFormat(fallback)) {
                    retStr = strWithRef.replace(
                      refRegExp,
                      `var(--${reference.name}, ${hslToHex(
                        `hsl(${fallback.h},${fallback.s},${fallback.l})`,
                      )})`,
                    );
                  } else {
                    // 若prop.value全是普通字符串，则从字符串中截取引用变量对应的值
                    fallback = getDifference(removed, token.value);

                    retStr = strWithRef.replace(
                      refRegExp,
                      `var(--${reference.name}, ${fallback})`,
                    );
                  }
                  return retStr;
                }

                return `  --${token.name}: ${replaceRefWithCssVars(
                  token.original.value,
                )};`;
              }

              // TODO 处理特殊情况 if (value === undefined) return `  --${prop.name}: ${prop.value};`;
              return `  --${token.name}: var(--${reference.name}, ${fallback});`;
            }
          }
          return `  --${token.name}: ${token.value};`;
        })
        .join('\n')}
    }`;
  },
});

function getSDConfig(themeName) {
  return {
    // 指定source时，tokens文件的声明顺序不重要，可以去掉component文件夹
    // include: ['tokens/global/**/*.js', `tokens/theme/pg/**/*.js`],
    include: [
      // 'tokens/globals/**/*.js',
      // `tokens/themes/pg/index.js`,
      // `tokens/themes/pg/components/index.js`,
    ],
    source: [
      `tokens/themes/${themeName}/index.js`,
      `tokens/themes/${themeName}/components/index.js`,
    ],
    platforms: {
      // scss: {
      //   transformGroup: 'scss',
      //   buildPath: `build/${themeName}/`,
      //   files: [
      //     {
      //       destination: 'variables.scss',
      //       format: 'scss/variables',
      //     },
      //   ],
      // },
      themesCss: {
        transforms: [
          'attribute/cti-comp',
          'name/cti/kebab-double',
          // 'size/rem',
          'color/css-modify',
          'color/css',
        ],
        buildPath: `dist/`,
        files: [
          {
            destination: `${themeName}-vars.css`,
            format: 'css/variables-references',
            selectorName: `.pg-t-${themeName}`,
            filterInFormatter: (token) => {
              return !token.name.includes(`${prefix4c}`);
            },
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      compCss: {
        transforms: [
          'attribute/cti-comp',
          'name/cti/kebab-double',
          // 'size/rem',
          'color/css-modify',
          'color/css',
        ],
        buildPath: `dist/${themeName}/`,
        files: Object.keys(compTokens[prefix4c]).map((compType) => {
          return {
            destination: `${compType}-vars.css`,
            format: 'css/variables-references',
            selectorName: `.pg-t-${themeName}`,
            filterInFormatter: (token) => {
              return token.name.includes(`${prefix4c}--${compType}`);
            },
            options: {
              outputReferences: true,
            },
          };
        }),
      },
      bundleCss: {
        transforms: [
          'attribute/cti-comp',
          'name/cti/kebab-double',
          // 'size/rem',
          'color/css-modify',
          'color/css',
        ],
        buildPath: `dist/`,
        files: [
          {
            destination: `${themeName}-vars-bundle.css`,
            format: 'css/variables-references',
            selectorName: `.pg-t-${themeName}`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      // ... platformN
    },
  };
}

function startBuildMultiThemes() {
  const themeNameArr = ['halfmoon'];
  // const themeNameArr = ['pg', 'bootstrap', 'halfmoon'];
  // const themeNameArr = ['halfmoon', 'spectrum', 'pg'];
  themeNameArr.forEach((themeName) => {
    console.log('\n==============================================');
    console.log(`\nprocessing:  [${themeName}]`);
    const SD = StyleDictionary.extend(getSDConfig(themeName));
    SD.buildAllPlatforms();
    console.log('\nend processing');
  });
}
console.log('build started');

startBuildMultiThemes();

// startBuildThemeVariants();
console.log('\n==============================================');
console.log('\nbuild completed!');