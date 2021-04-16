import {renderHook} from '@testing-library/react-hooks';
import {useDropdownOptions} from '.';
import {Item} from './useDropdownOptions';

const mockData = [
  {firstName: 'Franken', lastName: 'Berry', ID: 123},
  {firstName: 'Count', lastName: 'Chocula', ID: 456},
  {firstName: 'Boo', lastName: 'Berry', ID: 789},
  {firstName: 'Fruit', lastName: 'Brute', ID: 135},
  {firstName: 'Yummy', lastName: 'Mummy', ID: 246},
];

const setupRenderHook = (label: string, value: string, items?: Item[]) => {
  return renderHook(() => useDropdownOptions(label, value, items), {
    initialProps: {items: null},
  });
};

it('should return an array of objects with the correct properties', () => {
  const {result} = setupRenderHook('firstName', 'ID', [mockData[0]]);

  expect(Object.keys(result.current[0])).toHaveLength(2);
  expect(result.current[0]).toHaveProperty('label');
  expect(result.current[0]).toHaveProperty('value');
});

it('should return an array of objects with the correct values', () => {
  const {result} = setupRenderHook('firstName', 'ID', [mockData[0]]);
  const {label, value} = result.current[0];

  expect(label).toEqual(mockData[0].firstName);
  expect(value).toEqual(mockData[0].ID);
});

it('should return an array of one object with default values if no items provided', () => {
  const {result} = setupRenderHook('hello', 'test');

  expect(result.current).toBeInstanceOf(Array);
  expect(result.current).toHaveLength(1);
  expect(result.current[0]).toBeInstanceOf(Object);

  const {label, value} = result.current[0];
  expect(label).toEqual('- -');
  expect(value).toBeNull();
});

it('should return object array based on provided items', () => {
  const {result} = setupRenderHook('firstName', 'ID', mockData);

  expect(result.current).toMatchInlineSnapshot(`
    Array [
      Object {
        "label": "Franken",
        "value": 123,
      },
      Object {
        "label": "Count",
        "value": 456,
      },
      Object {
        "label": "Boo",
        "value": 789,
      },
      Object {
        "label": "Fruit",
        "value": 135,
      },
      Object {
        "label": "Yummy",
        "value": 246,
      },
    ]
  `);
});
