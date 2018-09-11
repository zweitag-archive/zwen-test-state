# zwen-test-state

*zwen-test-state* helps setting up mock state for your redux app.

## Installation
```
npm i -d zwen-test-state
```
or
```
yarn add zwen-test-state
```

## Usage
Setting up a template for a fake state can be as simple as this:
```
import State from 'zwen-test-state';

const template = {
  people: {
    '$KEY(_id)': {
      _id: 'random.word',
      name: 'name.firstName',
      pets: ['$REL(pets)'],
    },
  },
  pets: {
    '$KEY(_id)': {
      _id: 'random.word',
      name: 'name.firstName',
    },
  },
};

const myState = new State(template);
```
And to create an actual test state:
```
const settings = {
  'people': '$AMOUNT(3)',
  'people.pets': '$AMOUNT(1)',
  'pets': '$RANGE(10...12)',
};

state.addTestCase('standard', settings);
```
After setup all you have to do is use this state in your tests (or, as mock
state in your app).
```
it('should add a person', () => {
  const stateBefore = state.getTestCase('standard');
  // ... do your thing
  expect(Object.keys(state.people).toHaveLength(4);
});
```
You can be as explicit or implicit as you need when configuring your test cases. It usually is a good idea to define them in a separate file and adjust the state before exporting it:
```
// ... set up the State
const crazyTestCase = state.getTestCase('withAliens');

Object.values(crazyTestCase.people).forEach(person => {
  person.isAlien = true;
});

export crazyTestCase;
```

## Keywords
### `$KEY(your_key_name)` (template)
The key for the properties of an object. Refers to the sub-object's own properties. Use this to define objects with this structure:
```
const people = {
  '$KEY(_id)': { // will be the same as _id for each person
    _id: 'random.word',
  },
};
```

### `$REL(state_name)` (template)
You can create references to other state objects. In the example above each person would get an array of `pet`s, provided that `state.pets` is an object. You should combine this either with `$KEY()` or your own custom key.
```
{
  pets: ['$REL(pets)'] // fills this array with random keys of state.pets
}
```

### faker properties (template)
Use [faker](https://github.com/Marak/Faker.js#readme) properties to fill your test state with mock data. You can use all of the faker methods:
```
name: 'name.firstName' // will call faker.name.firstName()
```

### Seed (State)
If you always want the same result of your state you can add a  `seed` to your `State`. This gets passed directly to faker.
```
const myState = new State(template, seed); // with seed being a number
```

### `$AMOUNT(X)` (settings)
To create a fix amount of something – for Objects or Arrays.
```
const settings = {
  'people.pets': '$AMOUNT(2)', // every person gets 2 pets
};
```

### `$RANGE(X...Y)` (settings)
Same as `AMOUNT`, but with a random number in a range.
```
const settings = {
  'people.pets': '$RANGE(1...3)', // every person gets 1, 2 or 3 pets
};
```

## Contribution
Currently this package is limited to very basic state creation. If you see something that you think should be in here or something that should not (a bug?), feel free to create an [issue]() or [pull request]().
