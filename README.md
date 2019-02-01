<a name="module_prop-ops"></a>

## prop-ops
Module description goes here


* [prop-ops](#module_prop-ops)

    * [.get(obj, propString, [fallBack])](#module_prop-ops.get)

    * [.set(obj, propString, value)](#module_prop-ops.set)

        * [.immutable](#module_prop-ops.set.immutable)

    * [.setImmutable(obj, propString, value)](#module_prop-ops.setImmutable)

    * [.has(obj, propString)](#module_prop-ops.has)

    * [.del(obj, propString)](#module_prop-ops.del)

        * [.immutable](#module_prop-ops.del.immutable)

    * [.delImmutable(obj, propString)](#module_prop-ops.delImmutable)


<a name="module_prop-ops.get"></a>

### *prop*.get(obj, propString, [fallBack])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> |  | the object or array to traverse |
| propString | <code>String</code> |  | the path to the desired property |
| [fallBack] | <code>Any</code> | <code></code> | a fall back value to return if the property is not found |

Safely access deeply nested properties of unstructured objects

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
prop.get(objA, 'a.b')
// > 'c'

// Specify a value to return if a property is not found
prop.get(objA, 'a.nope')
// > null
prop.get(objA, 'a.nope', 24)
// > 24

// Traverse an array
const objB = { a: [{ b: 'c' }] }
prop.get(objB, 'a.[0].b')
// > 'c'
```
<a name="module_prop-ops.set"></a>

### *prop*.set(obj, propString, value)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | the object or array to traverse |
| propString | <code>String</code> | the path to the desired property |
| value | <code>Any</code> | the value to set |

Sets deeply nested object properties. `set` will generate objects (or arrays)
to reach the final destination of the input path

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
prop.set(objA, 'a.c', 'd')
// > objA == { a: { b: 'c', c: 'd' } }

const emptyObj = {}
prop.set(emptyObj, 'a.[0].b.c', 12)
// > emptyObj == { a: [{ b: { c: 12 } }] }
```
<a name="module_prop-ops.set.immutable"></a>

#### *set*.immutable
**See**: [setImmutable](setImmutable)  
<a name="module_prop-ops.setImmutable"></a>

### *prop*.setImmutable(obj, propString, value)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | the object or array to traverse |
| propString | <code>String</code> | the path to the desired property |
| value | <code>Any</code> | the value to set |

Like `set`, but will not modify the original object. Also accessible via
`set.immutable(...)`

**Returns**: <code>Object</code> \| <code>Array</code> - an updated version of the `obj`  
**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
const updatedA = prop.setImmutable(objA, 'a.c', 'd')
// Also: prop.set.immutable(objA, 'a.c', 'd')
// > objA     == { a: { b: 'c' } }
// > updatedA == { a: { b: 'c', c: 'd' } }
```
<a name="module_prop-ops.has"></a>

### *prop*.has(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

Check if an object or array has a property

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: [{ b: { c: 'd' } }] }
prop.has(objA, 'a.b')
// > false
prop.has(objA, 'a.[0].b.c')
// > true
```
<a name="module_prop-ops.del"></a>

### *prop*.del(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

Deletes deeply nested object properties

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: [{ b: { c: 'd' } }] }
prop.del(objA, 'a.b')
// noop
prop.del(objA, 'a.[0].b')
// objA == { a: [{}] }
```
<a name="module_prop-ops.del.immutable"></a>

#### *del*.immutable
**See**: [delImmutable](delImmutable)  
<a name="module_prop-ops.delImmutable"></a>

### *prop*.delImmutable(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

Like `del` but will not modify the original object. Also accessible via
`del.immutable(...)`

**Returns**: <code>Object</code> - updated object  
**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: { c: 'd' } } }
const updatedA = prop.del(objA, 'a.b')
// Also: prop.del.immutable(objA, 'a.b')
// > objA == { a: { b: { c: 'd' } } }
// > updatedA == { a: {} }
```
