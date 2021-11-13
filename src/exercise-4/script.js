const paragraph = document.getElementsByTagName('p')[0];

const inputs = Array.from(document.getElementsByTagName('input'));

const defaults = {
  background: '#ffffff',
  color: '#000000',
  borderRadius: '10px',
  padding: '10px',
};

const mapper = {
  borderRadius: (value) => `${value}px`,
  padding: (value) => `${value}px`,
};

const defaultMapper = (value) => value;

const handleChange = () =>
  inputs
    .map((input) => [input.name, input.value])
    .map(([name, value]) => [name, (mapper[name] ?? defaultMapper)(value)])
    .forEach(([name, value]) => {
      paragraph.style[name] = value;
    });

handleChange();

inputs.map((input) => input.addEventListener('input', handleChange));
