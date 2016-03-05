
import {Model} from "../../interfaces/model/Model";
import {List} from "./List";
import {Serializable} from "../../interfaces/model/Serializable";
//APIModelList using Request Library
import {DataRepository} from "../../interfaces/data/DataRepository";
import {ApiParser} from "./ApiParser";
import * as popsicle from "popsicle";

export abstract class ApiRepository<T extends Model> implements DataRepository<T>
{

    abstract getModelType() : { new(): any; };
    ///Return current url with no trailing slash
    abstract getUrl() : string;

    exists(modelID : string) : Promise<boolean> {
      throw new Error("Not implemented.");
    }

    getRange(modelIDList : List<string>) : Promise<List<T>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }

    //Build request options
  public buildReqOptions(requestType : string, url : string, model : any) : any {

    var options = {
      method : requestType,
      url : url
    }

    if (model !== null){
      options['json'] = true;
      options['body'] = model;
    }

    return options;
  }



    public buildRequestAndParseAsT<T extends Model> (
      url : string,
      requestType : string,
      model : T
    ) : Promise<T> {
      let options = this.buildReqOptions(requestType, url, model);

      return new Promise<T>( (resolve, reject) =>{
        popsicle.request(options).then((response) =>
        {
          resolve(ApiParser.Parse<T>(this.getModelType(), response.body));
        });
      });
    }

    public buildRequestAndParseAsTList<T extends Model> (
      url : string,
      requestType : string,
      model : T
    ) : Promise<List<T>> {

      let options = this.buildReqOptions(requestType, url, model);

      return new Promise<List<T>>( (resolve, reject) =>{
        popsicle.request(options).then((response) =>
        {
          resolve(ApiParser.ParseList<T>(this.getModelType(), response.body));
        });
      });
    }


    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
     public buildRequestAndParseAsModel (
       url : string,
       requestType : string,
       model : any
     ) : Promise<T> {

       let options = this.buildReqOptions(requestType, url, model);

       return this.buildRequestAndParseAsT<T>(url, requestType, model);
     }

     //Build a request with list type.
     public buildRequestAndParseAsModelList(
       url : string,
       requestType : string,
       model : any
     ) : Promise<List<T>> {

       let options = this.buildReqOptions(requestType, url, model);

       return this.buildRequestAndParseAsTList<T>(url, requestType, model);
     }




  getItem(modelID : string) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + modelID,
      'GET',
      null
    );
  }


  getAllItems() : Promise<List<T>> {
    return this.buildRequestAndParseAsModelList(
      this.getUrl(),
      'GET',
      null
    );
}

  addItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'POST',
      modelItem
    );
}

//TODO: Investigate - removeItem obviously won't return an item because it has been removed.
// check how API is working
  removeItem(emptyModelWithID : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + emptyModelWithID,
      'DELETE',
      null
    );
  }


  saveItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'PUT',
      modelItem
    );
  }
}
