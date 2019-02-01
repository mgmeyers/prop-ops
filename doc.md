<a name="module_prop-ops"></a>

## prop-ops
Module description goes here


* [prop-ops](#module_prop-ops)

    * [.get(obj, propString, [fallBack])](#module_prop-ops.get)

    * [.set(obj, propString)](#module_prop-ops.set)

    * [.setImmutable(obj, propString)](#module_prop-ops.setImmutable)

    * [.has(obj, propString)](#module_prop-ops.has)

    * [.del(obj, propString)](#module_prop-ops.del)

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

const objA = { a: { b: "c" } }
prop.get(objA, 'a.b')
// > 'c'

// Specify a value to return if a property is not found
prop.get(objA, 'a.nope')
// > null
prop.get(objA, 'a.nope', 24)
// > 24

// Traverse an array
const objB = { a: [{ b: "c" }] }
prop.get(objB, 'a.[0].b')
// > 'c'
```
<a name="module_prop-ops.set"></a>

### *prop*.set(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | ie. 'report.properties.is_big_box' |

Safely sets deeply nested object properties

**Returns**: <code>Object</code> - updated object  
<a name="module_prop-ops.setImmutable"></a>

### *prop*.setImmutable(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | ie. 'report.properties.is_big_box' |

Safely sets deeply nested object properties and returns a new object

**Returns**: <code>Object</code> - updated object  
<a name="module_prop-ops.has"></a>

### *prop*.has(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | ie. 'report.properties.is_big_box' |

Safely check if passed object has deeply nested property

**Returns**: <code>Boolean</code> - if obj has value under passed propString or not  
<a name="module_prop-ops.del"></a>

### *prop*.del(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | ie. 'report.properties.is_big_box' |

Safely delete deeply nested object properties

**Returns**: <code>Object</code> - updated object  
<a name="module_prop-ops.delImmutable"></a>

### *prop*.delImmutable(obj, propString)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | ie. 'report.properties.is_big_box' |

Safely delete deeply nested object properties

**Returns**: <code>Object</code> - updated object  
