import test from 'ava'
import * as prop from './index'

test('gets props', t => {
  t.is(prop.get({ a: 'b' }, 'a'), 'b')
  t.is(prop.get({ a: 'b' }, 'a'), 'b')
  t.is(prop.get({ a: 'b' }, 'b'), null)
  t.is(prop.get({ a: { b: { c: 'd' } } }, 'a.b.c'), 'd')
  t.is(prop.get({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c'), 'd')
  t.is(prop.get(Array, 'isArray'), Array.isArray)
  t.throws(() => {
    prop.get({})
  })
})

test('sets props', t => {
  t.deepEqual(prop.set({ a: 'b' }, 'a', 12), { a: 12 })
  t.deepEqual(prop.set({ a: 'b' }, 'b', 12), { a: 'b', b: 12 })
  t.deepEqual(prop.set({ a: { b: { c: 'd' } } }, 'a.b.c', 12), {
    a: { b: { c: 12 } },
  })
  t.deepEqual(prop.set({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c', 12), {
    a: [{ b: { c: 12 } }],
  })
  t.deepEqual(prop.set({}, 'a.[0].b.c', 12), {
    a: [{ b: { c: 12 } }],
  })

  const initial = { a: 'b' }
  const newObj = prop.set(initial, 'a', 'b')

  t.is(initial, newObj)

  t.throws(() => {
    prop.set({})
  })
})

test('immutably sets props', t => {
  t.deepEqual(prop.setImmutable({ a: 'b' }, 'a', 12), { a: 12 })
  t.deepEqual(prop.setImmutable({ a: 'b' }, 'b', 12), { a: 'b', b: 12 })
  t.deepEqual(prop.setImmutable({ a: { b: { c: 'd' } } }, 'a.b.c', 12), {
    a: { b: { c: 12 } },
  })
  t.deepEqual(prop.setImmutable({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c', 12), {
    a: [{ b: { c: 12 } }],
  })
  t.deepEqual(prop.setImmutable({}, 'a.[0].b.c', 12), {
    a: [{ b: { c: 12 } }],
  })

  const initial = { a: { b: 'c' } }
  const newObj = prop.setImmutable(initial, 'a.b', 'd')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)

  t.throws(() => {
    prop.setImmutable({})
  })
})

test('checks existence of props', t => {
  t.true(prop.has({ a: 'b' }, 'a'))
  t.true(prop.has({ a: { b: { c: 'd' } } }, 'a.b.c'))
  t.true(prop.has({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c'))
  t.true(prop.has(Array, 'isArray'))

  t.throws(() => {
    prop.has({})
  })
})

test('deletes props', t => {
  t.deepEqual(prop.del({ a: 'b' }, 'a'), {})
  t.deepEqual(prop.del({ a: { b: { c: 'd' } } }, 'a.b.c'), {
    a: { b: {} },
  })
  t.deepEqual(prop.del({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c', 12), {
    a: [{ b: {} }],
  })

  const initial = { a: { b: { c: 'd' } } }
  const newObj = prop.del(initial, 'a.b')

  t.is(initial, newObj)
  t.deepEqual(prop.del(newObj, 'a'), {})
})

test('deletes props immutably', t => {
  t.deepEqual(prop.delImmutable({ a: 'b' }, 'a'), {})
  t.deepEqual(prop.delImmutable({ a: { b: { c: 'd' } } }, 'a.b.c'), {
    a: { b: {} },
  })
  t.deepEqual(prop.delImmutable({ a: [{ b: { c: 'd' } }] }, 'a.[0].b.c', 12), {
    a: [{ b: {} }],
  })

  const initial = { a: { b: { c: 'd' } } }
  const newObj = prop.delImmutable(initial, 'a.b.c')

  t.not(initial, newObj)
  t.not(initial.a, newObj.a)
  t.deepEqual(prop.delImmutable(newObj, 'a'), {})
})
