const deepClone = obj => {
  
  // If we are dealing with a falsy value 
  // (null, undefined, the empty string, false, 0, etc.), 
  // return as-is
  if(!obj) {
  	return obj; 
  }

  // Check if we are dealing with a simple primitive/scalar type.
  // If so, return it as-is
  if(isScalar(obj)) {
    return obj;
  }

  // If we are dealing with an object of a Built-in type, 
  // e.g., new Boolean(true), new Number(123), new String('Jamie'),
  // normalize it to its primitives equivalent
  const primitive = normalizeToPrimitive(obj);

  // If we got a valid primitive of type Number, String or Boolean,
  // just return it
  if(typeof primitive !== "undefined") {
    return primitive;
  }
  

  // We are dealing with a complex object 
  // (such as an array, Date, HTML DOM Node, or an object literal)

  let clone;

  if (isArray(obj)) {
    clone = [];

    obj.forEach((element, index) => clone[index] = deepClone(element));
  } else if (obj instanceof Date) {
    clone = new Date(obj);
  } else if (obj.nodeType && typeof obj.cloneNode === "function") { // handle (HTML) DOM nodes
    clone = obj.cloneNode(true);    
  } else { // We have an object literal
    clone = {};
                    
    for(const x in obj) {
      clone[x] = deepClone(obj[x]);
    }
  }
  
  return clone;
};


/** Helper functions **/

function isScalar(obj) {
  return (
    !isArray(obj) && (typeof obj !== "object")
  );
}

function isArray(data) {
  return ((typeof Array.isArray === 'function')
    ? Array.isArray(data) 
    : Object.prototype.toString.call(data) === '[object Array]'
  );
}

/** 
 * Normalize objects of the built-in types -- Boolean, Number, String --
 * to their primitive equivalents.
 * For example, new Boolean(true), new Number(123), new String('Jamie')
 */
function normalizeToPrimitive(obj) { 
  let primitive;

  for(let type of [Boolean, Number, String]) {
    if (obj instanceof type) {
      primitive = type(obj); 
      break;
    }
  }

  return primitive;
}