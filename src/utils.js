import fast from 'fast.js';


export const rgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const generateConfig = (rules) => {
  let rulesAsString = '';

  const filteredRules = fast.filter(rules, ((rule) => rule.isTurnedOn));

  fast.forEach(filteredRules, (rule, i, rules) => {
    rulesAsString += `    "${rule.name}": "${rule.value}"`;

    if (i !== rules.length - 1) {
      rulesAsString += ',\n';
    }
  });

  return `{
  "rules": {
${rulesAsString}
  }
}`;
};