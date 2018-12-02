import SwaggerParser  from 'swagger-parser';

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
            : 'string';
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
      case 'password':
        return 'password';
      case 'enum':
        return schemaObj.enum[0];
      default:
        // tslint:disable-next-line:no-console
        console.warn('Unknown schema value', schemaObj);
        return '?';
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


function parseSpec(specUrl){
    let tags=[];
    var parser = new SwaggerParser();
    let methods=['get','put','post','delete','patch'];
    console.time("Time to Parse Spec");

    return parser.validate(specUrl, { validate: {spec: false, schema:false }, function(err, api){
        debugger;
    } })
    .then(function(api) {

        // If Tags are defined in the Spec then store it in an Array, else  create a Default Tag
        if (api.tags){
            tags = api.tags.sort((a,b) => (a.name < b.name) ? -1 : (a.name  > b.name ) ? 1 : 0);
        }

        // For each path find the tag and push it into the corrosponding tag
        for (let path in api.paths) {
            methods.forEach(function(methodName){
               
                let tag;
                if (api.paths[path][methodName]){

                    // Get the tag from Tags array
                    if(api.paths[path][methodName].tags){
                        tag = tags.find(v => v.name == api.paths[path][methodName].tags[0] );

                    }
                    else{
                        let tagText="";
                        let firstWordEndIndex = path.indexOf("/",1);
                        if (firstWordEndIndex === -1){
                            firstWordEndIndex = (path.length-1);
                        }
                        else{
                            firstWordEndIndex=firstWordEndIndex-1;
                        }
                        tagText = path.substr(1,firstWordEndIndex);
                        tag = tags.find(v => v.name == tagText);
                        if (!tag){
                            tag = { "name": tagText, show:true}
                            tags.push(tag);
                        }
                        //tag = tags.find(v => v.name == defaultTag.name );
                    }

                    if (!tag.paths){
                        tag.paths=[];
                        tag.show=true;
                    }

                    //Fix Path.summary (if missing copy it from description)

                    let summary = api.paths[path][methodName].summary?api.paths[path][methodName].summary:"";
                    let description = api.paths[path][methodName].description?api.paths[path][methodName].description:"";
                    if (!summary && description){
                        if (description.length > 100){
                            let charIndex = -1;
                            charIndex = description.indexOf("\n");
                            if (charIndex === -1 || charIndex > 100){
                                charIndex = description.indexOf(". ");
                            }
                            if (charIndex === -1 || charIndex > 100){
                                charIndex = description.indexOf(".");
                            }
                            
                            if (charIndex === -1 || charIndex > 100){
                                summary = description;
                            }
                            else{
                                summary = description.substr(0, charIndex);
                            }
                        }
                        else{
                            summary = description;
                        }
                    }
                    
                    tag.paths.push({
                        "method"      : methodName,
                        "path"        : path,
                        "show"        : true,
                        "expanded"    : false,
                        "operationId" : api.paths[path][methodName].operationId,
                        "summary"     : summary,
                        "description" : api.paths[path][methodName].description,
                        "consumes"    : api.paths[path][methodName].consumes,
                        "produces"    : api.paths[path][methodName].produces,
                        "parameters"  : api.paths[path][methodName].parameters,
                        "responses"   : api.paths[path][methodName].responses,
                        "security"    : api.paths[path][methodName].security,
                        "depricated"  : api.paths[path][methodName].deprecated,
                    });
                }
            });
        }

        let parsedSpec = {
            "info"    : api.info,
            "host"    : api.host,
            "basePath": api.basePath,
            "schemes" : api.schemes,
            "tags"    : tags
        }
        console.timeEnd("Time to Parse Spec");
        //return Promise.resolve(tags);
        return Promise.resolve(parsedSpec);
    })
    
}

export { parseSpec, debounce, schemaToObj, schemaToElTree }
