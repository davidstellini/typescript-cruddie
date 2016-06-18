
import {Model} from "../../interfaces/model/Model";
import {List} from "./List";
import {Serializable} from "../../interfaces/model/Serializable";
//APIModelList using Request Library
import {DataRepository} from "../../interfaces/data/DataRepository";
import {ApiParser} from "./ApiParser";
import * as popsicle from "popsicle";
import {ApiRequestDecorator} from "./ApiRequestDecorator";
import {Parser} from "./Parser";

export abstract class ApiRepository<T extends Model> implements DataRepository<T>
{
    public requestDecorator : ApiRequestDecorator = null;
    public parser : Parser<T> = null; //new ApiParser<T>();
    abstract getModelType() : { new(): any; };
    ///Return current url with no trailing slash
    getUrl() : string {
      throw new Error("You must either override getUrl() and supply a base URL value, or " +
      "provide your own implementation for find(), findAll() and all crud " +
      "operations in this class." );
    }



    exists(modelID : string) : Promise<boolean> {

      throw new Error("Not implemented.");
    }

    getRange(modelIDList : List<string>) : Promise<List<T>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }

    findAllWith(query : string) : Promise<List<T>> {
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

    if (this.requestDecorator !== null) {
      options = this.requestDecorator.decorateRequest(options);
    }
    return options;
  }



    public buildRequestAndParseAsT<T> (
      url : string,
      requestType : string,
      model : T,
      parser : Parser<T>
    ) : Promise<T> {
      let options = this.buildReqOptions(requestType, url, model);

      return new Promise<T>( (resolve, reject) =>{
        return popsicle.request(options).then((response) =>
        {
          if (response.statusType() !== 2) {
            reject(response);
          }

          var resp : T;
          try {
             resp = parser.Parse(this.getModelType(), response.body);
             resolve(resp);
          } catch (e) {
            reject(e);
          }
        }).catch(r => {reject(r)});
      });
    }

    public buildRequestAndParseAsTList<T extends Model> (
      url : string,
      requestType : string,
      model : T,
      parser : Parser<T>
    ) : Promise<List<T>> {

      let options = this.buildReqOptions(requestType, url, model);

      return new Promise<List<T>>( (resolve, reject) =>{
        popsicle.request(options).then((response) =>
        {
          if (response.statusType() !== 2) {
            reject(response);
          }

          var resp : List<T>;
          try {
              resp = parser.ParseList(this.getModelType(), response.body);
              resolve(resp);
           } catch (e) {
             reject(e);
           }
        }).catch(r => {reject(r)});
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
       return this.buildRequestAndParseAsT<T>(url, requestType, model, this.parser);
     }

     //Build a request with list type.
     public buildRequestAndParseAsModelList(
       url : string,
       requestType : string,
       model : any
     ) : Promise<List<T>> {
       return this.buildRequestAndParseAsTList<T>(url, requestType, model, this.parser);
     }




  find(modelID : string) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + modelID,
      'GET',
      null
    );
  }


  findAll() : Promise<List<T>> {
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
  removeItem(modelID : string) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + modelID,
      'DELETE',
      null
    );
  }


  saveItem(modelItem : T, modelID : string) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + modelID,
      'PUT',
      modelItem
    );
  }
}
