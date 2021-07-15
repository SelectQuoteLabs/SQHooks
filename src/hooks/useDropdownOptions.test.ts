import {renderHook} from '@testing-library/react-hooks';
import {useDropdownOptions} from '.';

type MockItem = {
  firstName: string;
  lastName: string;
  ID: number;
};

const mockData = [
  {firstName: 'Franken', lastName: 'Berry', ID: 123},
  {firstName: 'Count', lastName: 'Chocula', ID: 456},
  {firstName: 'Boo', lastName: 'Berry', ID: 789},
  {firstName: 'Fruit', lastName: 'Brute', ID: 135},
  {firstName: 'Yummy', lastName: 'Mummy', ID: 246},
];

const setupRenderHook = <TMockItem>(
  label: keyof TMockItem,
  value: keyof TMockItem,
  items?: TMockItem[]
) => {
  return renderHook(() => useDropdownOptions<TMockItem>(label, value, items), {
    initialProps: {items: null},
  });
};

it('should return an array of objects with the correct properties', () => {
  const {result} = setupRenderHook<MockItem>('firstName', 'ID', [mockData[0]]);

  expect(Object.keys(result.current[0])).toHaveLength(2);
  expect(result.current[0]).toHaveProperty('label');
  expect(result.current[0]).toHaveProperty('value');
});

it('should return an array of objects with the correct values', () => {
  const {result} = setupRenderHook<MockItem>('firstName', 'ID', [mockData[0]]);
  const {label, value} = result.current[0];

  expect(label).toEqual(mockData[0].firstName);
  expect(value).toEqual(mockData[0].ID);
});

it('should return an empty array if no items provided', () => {
  const {result} = setupRenderHook('hello', 'test');

  expect(result.current).toBeInstanceOf(Array);
  expect(result.current).toHaveLength(0);
});

it('should return object array based on provided items', () => {
  const {result} = setupRenderHook<MockItem>('firstName', 'ID', mockData);

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
