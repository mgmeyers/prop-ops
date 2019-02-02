import test from 'ava'
import * as prop from './index'

test('should get props', t => {
  const comparisons = [
    {
      actual: prop.get({ a: 'b' }, 'a'),
      expected: 'b',
      message: 'should get correct value from shallow object',
    },
    {
      actual: prop.get({ a: 'b' }, 'b'),
      expected: null,
      message: 'should return null if no value found',
    },
    {
      actual: prop.get({ a: 'b' }, 'b', 'c'),
      expected: 'c',
      message: 'should return fallback if no value found',
    },
    {
      actual: prop.get({ a: { b: { c: 'd' } } }, 'a.b.c'),
      expected: 'd',
      message: 'should get deeply nested value',
    },
    {
      actual: prop.get({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c'),
      expected: 'd',
      message: 'should get deeply nested value inside array',
    },
    {
      actual: prop.get(Array, 'isArray'),
      expected: Array.isArray,
      message:
        'should get value from any prop accessible through bracket notation',
    },
  ]

  comparisons.forEach(c => {
    t.is(c.actual, c.expected, c.message)
  })

  t.throws(() => {
    prop.get({})
  })
})

test('should set props', t => {
  const comparisons = [
    {
      obj: { a: 'b' },
      propStr: 'a',
      value: 12,
      expected: { a: 12 },
      message: 'should override existing shallow prop',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      value: 12,
      expected: { a: 'b', b: 12 },
      message: 'should add new shallow prop',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b.c',
      value: 12,
      expected: {
        a: { b: { c: 12 } },
      },
      message: 'should override deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b.c',
      value: 12,
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should override deeply nested prop inside array',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[1]',
      value: 12,
      expected: { a: [{ b: { c: 'd' } }, 12] },
      message: 'should set array member',
    },
    {
      obj: {},
      propStr: 'a.[0].b.c',
      value: 12,
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should generate objects and arrays if none exist',
    },
  ]

  const throws = [
    () => {
      prop.set.mutate({})
    },
    () => {
      prop.set.mutate('a', 'something', 12)
    },
    () => {
      prop.set.mutate(1, 'something', 12)
    },
    () => {
      const frozen = Object.freeze({})
      prop.set.mutate(frozen, 'something', 12)
    },
  ]

  comparisons.forEach(c => {
    prop.set.mutate(c.obj, c.propStr, c.value)
    t.deepEqual(c.obj, c.expected, c.message)
  })

  throws.forEach(th => {
    t.throws(th)
  })
})

test('should immutably set props', t => {
  const comparisons = [
    {
      obj: { a: 'b' },
      propStr: 'a',
      value: 12,
      expected: { a: 12 },
      message: 'should override existing shallow prop',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      value: 12,
      expected: { a: 'b', b: 12 },
      message: 'should add new shallow prop',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b.c',
      value: 12,
      expected: {
        a: { b: { c: 12 } },
      },
      message: 'should override deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b.c',
      value: 12,
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should override deeply nested prop inside array',
    },
    {
      obj: {},
      propStr: 'a.[0].b.c',
      value: 12,
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should generate objects and arrays if none exist',
    },
  ]

  const throws = [
    () => {
      prop.set({})
    },
    () => {
      prop.set('a', 'something', 12)
    },
    () => {
      prop.set(1, 'something', 12)
    },
  ]

  comparisons.forEach(c => {
    t.deepEqual(prop.set(c.obj, c.propStr, c.value), c.expected, c.message)
  })

  throws.forEach(th => {
    t.throws(th)
  })

  const initial = { a: { b: 'c' } }
  const newObj = prop.set(initial, 'a.b', 'd')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)

  t.notThrows(() => {
    const frozen = Object.freeze({})
    prop.set(frozen, 'something', 12)
  })
})

test('should immutably merge props', t => {
  const comparisons = [
    {
      obj: { a: { b: 'c' } },
      propStr: 'a',
      value: { d: 'e' },
      expected: { a: { b: 'c', d: 'e' } },
      message: 'should merge existing shallow prop',
    },
    {
      obj: [[0, 1], 2, 3],
      propStr: '[0]',
      value: [5, 6],
      expected: [[5, 6], 2, 3],
      message: 'should merge arrays by index',
    },
    {
      obj: [[0, 1], 2, 3],
      propStr: '[0]',
      value: [, , 5, 6],
      expected: [[0, 1, 5, 6], 2, 3],
      message: 'should merge arrays with empty members',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      value: { d: 'e' },
      expected: { a: 'b', b: { d: 'e' } },
      message: 'should add new shallow prop',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b',
      value: { c: 'c', d: 'd' },
      expected: { a: { b: { c: 'c', d: 'd' } } },
      message: 'should merge deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b',
      value: { c: 'c', d: 'd' },
      expected: {
        a: [{ b: { c: 'c', d: 'd' } }],
      },
      message: 'should merge deeply nested prop inside array',
    },
    {
      obj: {},
      propStr: 'a.[0].b',
      value: { c: 12 },
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should generate objects and arrays if none exist',
    },
  ]

  const throws = [
    () => {
      prop.merge({})
    },
    () => {
      prop.merge('a', 'something', { a: 'b' })
    },
    () => {
      prop.merge(1, 'something', { a: 'b' })
    },
    () => {
      prop.merge({ a: {} }, 'a', [0])
    },
  ]

  comparisons.forEach(c => {
    t.deepEqual(prop.merge(c.obj, c.propStr, c.value), c.expected, c.message)
  })

  throws.forEach(th => {
    t.throws(th)
  })

  const initial = { a: { b: 'c' } }
  const newObj = prop.merge(initial, 'a', { c: 'd' })

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)

  t.notThrows(() => {
    const frozen = Object.freeze({})
    prop.merge(frozen, 'something', {})
  })
})

test('should merge props', t => {
  const comparisons = [
    {
      obj: { a: { b: 'c' } },
      propStr: 'a',
      value: { d: 'e' },
      expected: { a: { b: 'c', d: 'e' } },
      message: 'should merge existing shallow prop',
    },
    {
      obj: [[0, 1], 2, 3],
      propStr: '[0]',
      value: [5, 6],
      expected: [[5, 6], 2, 3],
      message: 'should merge arrays by index',
    },
    {
      obj: [[0, 1], 2, 3],
      propStr: '[0]',
      value: [, , 5, 6],
      expected: [[0, 1, 5, 6], 2, 3],
      message: 'should merge arrays with empty members',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      value: { d: 'e' },
      expected: { a: 'b', b: { d: 'e' } },
      message: 'should add new shallow prop',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b',
      value: { c: 'c', d: 'd' },
      expected: { a: { b: { c: 'c', d: 'd' } } },
      message: 'should merge deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b',
      value: { c: 'c', d: 'd' },
      expected: {
        a: [{ b: { c: 'c', d: 'd' } }],
      },
      message: 'should merge deeply nested prop inside array',
    },
    {
      obj: {},
      propStr: 'a.[0].b',
      value: { c: 12 },
      expected: {
        a: [{ b: { c: 12 } }],
      },
      message: 'should generate objects and arrays if none exist',
    },
  ]

  const throws = [
    () => {
      prop.merge.mutate({})
    },
    () => {
      prop.merge.mutate('a', 'something', { a: 'b' })
    },
    () => {
      prop.merge.mutate(1, 'something', { a: 'b' })
    },
    () => {
      prop.merge.mutate({ a: {} }, 'a', [0])
    },
    () => {
      const frozen = Object.freeze({})
      prop.merge.mutate(frozen, 'something', {})
    },
  ]

  comparisons.forEach(c => {
    prop.merge.mutate(c.obj, c.propStr, c.value)
    t.deepEqual(c.obj, c.expected, c.message)
  })

  throws.forEach(th => {
    t.throws(th)
  })
})

test('should check existence of props', t => {
  const comparisons = [
    { obj: { a: 'b' }, propStr: 'a', expected: true },
    { obj: { a: 'b' }, propStr: 'b', expected: false },
    { obj: { a: { b: { c: 'd' } } }, propStr: 'a.b.c', expected: true },
    { obj: { a: [{ b: { c: 'd' } }] }, propStr: 'a.[0].b.c', expected: true },
    { obj: Array, propStr: 'isArray', expected: true },
  ]

  comparisons.forEach(c => {
    t.is(prop.has(c.obj, c.propStr), c.expected)
  })

  t.throws(() => {
    prop.has({})
  })
})

test('should delete props', t => {
  const comparisons = [
    {
      obj: { a: 'b' },
      propStr: 'a',
      expected: {},
      message: 'should delete shallow prop',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      expected: { a: 'b' },
      message: 'should do nothing for non-existent props',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b.c',
      expected: {
        a: { b: {} },
      },
      message: 'should delete deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b.c',
      expected: {
        a: [{ b: {} }],
      },
      message: 'should delete deeply nested prop in an array',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0]',
      expected: {
        a: [],
      },
      message: 'should delete array member',
    },
  ]

  const throws = [
    () => {
      prop.del.mutate('a', 'something')
    },
    () => {
      const frozen = Object.freeze({ something: 12 })
      prop.del.mutate(frozen, 'something')
    },
    () => {
      const sealed = Object.seal({ something: 12 })
      prop.del.mutate(sealed, 'something')
    },
  ]

  comparisons.forEach(c => {
    prop.del.mutate(c.obj, c.propStr)
    t.deepEqual(c.obj, c.expected, c.message)
  })

  throws.forEach(th => {
    t.throws(th)
  })
})

test('should immutably delete props', t => {
  const comparisons = [
    {
      obj: { a: 'b' },
      propStr: 'a',
      expected: {},
      message: 'should delete shallow prop',
    },
    {
      obj: { a: 'b' },
      propStr: 'b',
      expected: { a: 'b' },
      message: 'should do nothing for non-existent props',
    },
    {
      obj: { a: { b: { c: 'd' } } },
      propStr: 'a.b.c',
      expected: {
        a: { b: {} },
      },
      message: 'should delete deeply nested prop',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0].b.c',
      expected: {
        a: [{ b: {} }],
      },
      message: 'should delete deeply nested prop in an array',
    },
    {
      obj: { a: [{ b: { c: 'd' } }] },
      propStr: 'a.[0]',
      expected: {
        a: [],
      },
      message: 'should delete array member',
    },
  ]

  comparisons.forEach(c => {
    t.deepEqual(prop.del(c.obj, c.propStr), c.expected, c.message)
  })

  const initial = { a: { b: { c: 'd' } } }
  const newObj = prop.del(initial, 'a.b.c')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)
  t.deepEqual(prop.del(newObj, 'a'), {})

  t.throws(() => {
    prop.del('a', 'something', 12)
  })

  t.notThrows(() => {
    const frozen = Object.freeze({ something: 12 })
    prop.del(frozen, 'something')
  })

  t.notThrows(() => {
    const sealed = Object.seal({ something: 12 })
    prop.del(sealed, 'something')
  })
})
