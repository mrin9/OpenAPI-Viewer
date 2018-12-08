import SwaggerParser  from 'swagger-parser';
import converter from 'swagger2openapi';


export default function ProcessSpec(specUrl){

    console.time("%Time to Process Spec");
    return converter.convertUrl(specUrl,{}).then(function(convertedObj) {
        console.info("%c Convertion to OpenAPI 3.0 - Success !!! ","color:cornflowerblue");
        let parser = new SwaggerParser();    
        return parser.validate(
            convertedObj.openapi, 
            { 
                validate: {spec: false, schema:false } 
            }
        );
    })
    .then(function(deReffedSpec) {
        console.info("%c OpenAPI 3.0 Dereferencing - Success !!! ","color:cornflowerblue");

        let methods=['get','put','post','delete','patch','options','head'];
        let tags=[];
        let totalPathCount=0;
        // For each path find the tag and push it into the corrosponding tag
        for (let path in deReffedSpec.paths) {
            let commonPathProp = {
                "summary"    : deReffedSpec.paths[path].summary,
                "description": deReffedSpec.paths[path].description,
                "servers"    : deReffedSpec.paths[path].servers?deReffedSpec.paths[path].servers:[],
                "parameters" : deReffedSpec.paths[path].parameters?deReffedSpec.paths[path].parameters:[]
            };

            methods.forEach(function(methodName){
                let tagObj;
                let tagText;
                
                if (deReffedSpec.paths[path][methodName]){
                    let fullPath = deReffedSpec.paths[path][methodName];
                    // If path.methods are tagged, else generate it from path 
                    if(fullPath.tags){
                        tagText = fullPath.tags[0];
                    }
                    else {
                        let firstWordEndIndex = path.indexOf("/",1);
                        if (firstWordEndIndex === -1){
                            firstWordEndIndex = (path.length-1);
                        }
                        else{
                            firstWordEndIndex=firstWordEndIndex-1;
                        }
                        tagText = path.substr(1,firstWordEndIndex);
                    }
                    tagObj = tags.find(v => v.name == tagText);

                    if (!tagObj){
                        tagObj = { 
                            show    : true,
                            "name"  : tagText,
                            "paths" : []
                        }
                        tags.push(tagObj);
                    }

                    //Generate Path summary and Description if it is missing for a method
                    let summary = fullPath.summary?fullPath.summary:"";
                    let description = fullPath.description?fullPath.description:"";
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
                    
                    //Update Responses
                    tagObj.paths.push({
                        "show"        : true,
                        "expanded"    : false,
                        "summary"     : summary,
                        "method"      : methodName,
                        "description" : fullPath.description,
                        "path"        : path,
                        "operationId" : fullPath.operationId,
                        "requestBody" : fullPath.requestBody,
                        "parameters"  : fullPath.parameters ? commonPathProp.parameters.concat(fullPath.parameters):commonPathProp.parameters,
                        "servers"     : fullPath.servers    ? commonPathProp.servers.concat(fullPath.servers):commonPathProp.servers,
                        "responses"   : fullPath.responses,
                        "depricated"  : fullPath.deprecated,
                        "security"    : fullPath.security,
                        "commonSummary"     : commonPathProp.summary,
                        "commonDescription" : commonPathProp.description,
                    });
                    totalPathCount++;
                }
            }); // End of Methods

        }

        let securitySchemes={};
        let servers=[];

        securitySchemes = (deReffedSpec.components? deReffedSpec.components.securitySchemes:{});
        servers = deReffedSpec.servers;

        let parsedSpec = {
            "info"    : deReffedSpec.info,
            "tags"    : tags,
            "externalDocs": deReffedSpec.externalDocs,
            "securitySchemes": securitySchemes, 
            "servers" : servers, // In swagger 2, its generated from schemes, host and basePath properties
            "basePath": deReffedSpec.basePath, // Only available in swagger V2 
            "totalPathCount" : totalPathCount
        }
        console.timeEnd("Time to Process Spec");
        return Promise.resolve(parsedSpec);
    })
    .catch(function(err) {
        console.error(err);
    });
    
}




export {convertSpec}
