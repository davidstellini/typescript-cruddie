import {Model} from "../../interfaces/model/Model";
import {List} from "./List";
import {Parser} from "./Parser";

export class ApiParser<T> implements Parser<T> {
  Parse(objType: { new(): T; }, json: any) {
    const newObj = new objType();
    const relationships = objType["relationships"] || {};

    for (const prop in json) {
        if (json.hasOwnProperty(prop)) {
            if (newObj[prop] == null) {
                if (relationships[prop] == null) {
                    newObj[prop] = json[prop];
                }
                else {
                    newObj[prop] = this.Parse(relationships[prop], json[prop]);
                }
            }
            else {
                console.warn(`Property ${prop} not set because it already existed on the object.`);
            }
        }
    }

    return newObj;
}

ParseList(objType: { new(): T; }, jsonString: string) : List<T>{
  var json = JSON.parse(jsonString);
  var items : List<T>  = new List<T>();
  if (!Array.isArray(json)){
    throw ("Invalid response: " + jsonString);
  }

  json.forEach(modelListItem =>
  {
    var model = <T> modelListItem;
    items.add(model);
  });

  return items;
}
  //
  // static ParseUnsafe<T>(jsonString : string ) : T{
  //   return <T>JSON.parse(jsonString);
  // }
  //
  // static ParseListUnsafe<T>(jsonString : string) : List<T>{
  //   var items : List<T>  = new List<T>();
  //   var resp = JSON.parse(jsonString);
  //   resp.forEach(modelListItem =>
  //   {
  //     var model = <T> modelListItem;
  //     items.add(model);
  //   });
  //
  //   return items;
  // }
}
