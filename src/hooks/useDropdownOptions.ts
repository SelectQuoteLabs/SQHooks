import React from 'react';

/**
 * Transforms your array of objects into the shape our form system expects.
 * Our form system expects an Array of Objects with a shape of [{label: String, value: String}]
 * @param {string} label
 * @param {string} value
 * @param {array} items [{item}]
 */
export function useDropdownOptions<TItem = {[key: string]: unknown}>(
  label: keyof TItem,
  value: keyof TItem,
  items?: TItem[]
) {
  return React.useMemo(() => {
    if (items && !isObjectArray(items)) {
      throw Error(
        'The items provided to useDropdownOptions must be an array of objects'
      );
    }

    return (
      items?.map((item) => ({label: item[label], value: item[value]})) || []
    );
  }, [items, label, value]);
}

const isObjectArray = (array: Object[]) => {
  return (
    Array.isArray(array) &&
    array.every(
      (object) => object instanceof Object && object.constructor === Object
    )
  );
};
