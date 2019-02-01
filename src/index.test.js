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
      prop.set({})
    },
    () => {
      prop.set('a', 'something', 12)
    },
    () => {
      prop.set(1, 'something', 12)
    },
    () => {
      const frozen = Object.freeze({})
      prop.set(frozen, 'something', 12)
    },
  ]

  comparisons.forEach(c => {
    prop.set(c.obj, c.propStr, c.value)
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
    t.deepEqual(
      prop.setImmutable(c.obj, c.propStr, c.value),
      c.expected,
      c.message
    )
  })

  throws.forEach(th => {
    t.throws(th)
  })

  const initial = { a: { b: 'c' } }
  const newObj = prop.setImmutable(initial, 'a.b', 'd')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)

  t.notThrows(() => {
    const frozen = Object.freeze({})
    prop.setImmutable(frozen, 'something', 12)
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
      prop.del('a', 'something')
    },
    () => {
      const frozen = Object.freeze({ something: 12 })
      prop.del(frozen, 'something')
    },
    () => {
      const sealed = Object.seal({ something: 12 })
      prop.del(sealed, 'something')
    },
  ]

  comparisons.forEach(c => {
    prop.del(c.obj, c.propStr)
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
  const newObj = prop.delImmutable(initial, 'a.b.c')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)
  t.deepEqual(prop.delImmutable(newObj, 'a'), {})

  t.throws(() => {
    prop.delImmutable('a', 'something', 12)
  })

  t.notThrows(() => {
    const frozen = Object.freeze({ something: 12 })
    prop.delImmutable(frozen, 'something')
  })

  t.notThrows(() => {
    const sealed = Object.seal({ something: 12 })
    prop.delImmutable(sealed, 'something')
  })
})
