//IMPORTANT : All properties of serializable class must be set to null/default.
export  abstract class Serializable {
  //reads object into properties of current object
  readInto(obj : any) : void{
      for (let property in obj) {
        this[property] = obj[property]; //dangerous. Ideally we register the
        // serializable classes on initialization so that we don't set properties
        // in "Object" that don't exist in "this". This also has the advantage of
        // allowing dynamic initialization of the class without knowing the Type
        // ahead of time.

        //Also, recursion for nested properties??
      };
  }

  stringify() : string{
    return JSON.stringify(this);
  }

  // static parse<T extends Serializable>(string : string) : T{
  //   var outputObj : T = JSON.parse(string);
  //   return outputObj;
  // }
}
