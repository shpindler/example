import { isDate, isEqual, isObject, transform } from 'lodash'

function _isObject(value: unknown): value is Record<string, unknown> {
  return isObject(value)
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(
  object: Record<string, unknown>,
  base: Record<string, unknown>,
): Record<string, unknown> {
  function changes(
    object: Record<string, unknown>,
    base: Record<string, unknown>,
  ): Record<string, unknown> {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          _isObject(value) && _isObject(base[key]) && !isDate(value)
            ? changes(value, base[key] as Record<string, unknown>)
            : value
      }
    })
  }
  return changes(object, base)
}
