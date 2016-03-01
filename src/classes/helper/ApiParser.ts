import {Model} from "../../interfaces/model/Model";
import {ModelFactory} from "../../interfaces/model/modelFactory";
import {List} from "./List";

export class ApiParser {

  static Parse<T extends Model>(response : string ) : T{
    return <T>JSON.parse(response);
    //return (this.factory.create()).parse<T>(response);
  }

  static ParseList<T extends Model>(response : string) : List<T>{
    var items : List<T>  = new List<T>();
    var resp = JSON.parse(response);
    resp.forEach(modelListItem =>
    {
      var model = <T> modelListItem;
      items.add(model);
    });

    return items;
  }
}
