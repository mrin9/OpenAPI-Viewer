/* For Delayed Event Handler Execution */
function debounce (fn, delay) {
    var timeoutID = null;
    return function () {
      clearTimeout(timeoutID)
      var args = arguments
      var that = this
      timeoutID = setTimeout(function () {
        fn.apply(that, args)
      }, delay)
    }
}

function copyToClipboard(elId) {
    /* Get the text field */
    var copyText = document.getElementById(elId);
  
    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
    return copyText.value;
}

/* For changing JSON-Schema to a Sample Object, as per the schema */ 
function schemaToObj (schema, obj) {
    if (schema.type==="object" || schema.properties){
        for( let key in schema.properties ){
            let temp = Object.assign({}, schema.properties[key] );
            obj[key] = schemaToObj(temp,{});
        }
    }
    else if (schema.type==="array" || schema.items ){
        let temp = Object.assign({}, schema.items );
        obj = [schemaToObj(temp,{})]
    }
    else{
        return getSampleValueByType(schema);
    }
    return obj;
}

function getSampleValueByType(schemaObj) {
    if (schemaObj.example) {
      return schemaObj.example;
    }
    if (Object.keys(schemaObj).length === 0) {
        return null;
    }
  
    const typeValue = schemaObj.format || schemaObj.type || (schemaObj.enum ? 'enum' : null);
    switch (typeValue) {
      case 'int32':
      case 'int64':
      case 'integer':
        return 0;
      case 'float':
      case 'double':
      case 'number':
        return 0.5;
      case 'string':
        return schemaObj.enum
          ? schemaObj.enum[0]
          : schemaObj.pattern
            ? rx(new RegExp(schemaObj.pattern))
            : "string"
      case 'byte':
        return btoa('string');
      case 'binary':
        return 'binary';
      case 'boolean':
        return false;
      case 'date':
        return (new Date(0)).toISOString().split('T')[0];
      case 'date-time':
        return (new Date(0)).toISOString();
      case 'dateTime':
        return (new Date(0)).toISOString();
      case 'password':
        return 'password';
      case 'enum':
        return schemaObj.enum[0];
      default:
        if (schemaObj.nullable){
            return null;
        }
        else{
            console.warn('Unknown schema value', schemaObj);
            return '?';
        }
        
    }
  }

function schemaToElTree(schema, obj, name) {
    if (schema.type==="object" || schema.properties){
        for( let key in schema.properties ){
            let temp = Object.assign({}, schema.properties[key] );
            if (schema.properties[key].type==="object" || schema.properties[key].properties){
                obj.push({
                    "label": {label:key , type:schema.properties[key].type, descr:schema.properties[key].description},
                    "children": schemaToElTree(temp, [], key)
                });
            }
            else if (schema.properties[key].type==="array" || schema.properties[key].items){
                let typeOfArr="";
                if (schema.properties[key].items.properties){
                    typeOfArr = "array of objects";
                }
                else {
                    typeOfArr = "array of " + schema.properties[key].items.type;
                }
                obj.push({
                    "label"   : {label:"[ "+key+" ]", type:typeOfArr, descr:schema.properties[key].description},
                    "children": schemaToElTree(temp, [], key)
                });
            }
            else{
                let typeOfField="";
                if (schema.properties[key].enum){
                    typeOfField = "Enum: " + schema.properties[key].enum.join(" | ");
                }
                else{
                    typeOfField = schema.properties[key].type;
                }
                obj.push({
                    "label": {label:key, type:typeOfField, descr:schema.properties[key].description},
                });
            }
        }
    }
    else if (schema.type==="array"){
        if (schema.items.type==="object" || schema.items.properties){
            let temp = Object.assign({}, schema.items);
            return schemaToElTree(temp, []);
        }
        else if (schema.items.type==="array"){
            obj.push({
                "label": {label:"[ "+schema.items.type+" ]", type:schema.items.type, descr:schema.items.description }
            });
        }
        else{
            return;
            /*
            obj.push({
                "label": {label:"["+schema.items.type+" ]", type:schema.items.type, descr:schema.items.description}
            });
            */
        }
    }
    else{
        obj.push({
            "label" : {label:name, type:schema.type, descr:schema.description}
        });
    }
    return obj;
}

export { debounce, schemaToObj, schemaToElTree, test }
