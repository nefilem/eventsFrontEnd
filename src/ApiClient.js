import axios from "axios";

export default class ApiClient {
  
    //baseUrl = "http://localhost:3000";
    baseUrl = "https://kgeventsapi.herokuapp.com";

    responseStatusCheck(responseObject) {
        if(responseObject.status >= 200 && responseObject.status < 300){
          return Promise.resolve(responseObject);
    
        }else{
          return Promise.reject(new Error(responseObject.statusText));
        }     
     }

     getItems(url){
        console.log(`getItems(${url})`);
        return axios
        .get(url)
        .then(this.responseStatusCheck)
        .catch((error) => {
            console.log(error);
        })        
     }

     postItems(url, dataToPost) {
       console.log("dataToPost", dataToPost);
       return axios
       .post(url, dataToPost)
       .then(this.responseStatusCheck)
       .catch((error) => {
          console.log(error);
       });
     }

     putItems(url, dataToPost) {
      console.log("dataToPost", dataToPost);
      return axios
      .put(url, dataToPost)
      .then(this.responseStatusCheck)
      .catch((error) => {
         console.log(error);
      });
    }

     deleteItems(url) {      
      return axios
      .delete(url)
      .then(this.responseStatusCheck)
      .catch((error) => {
         console.log(error);
      });
    }

    async getAllEvents() {      
      return this.getItems(baseUrl + "/EventsDB");            
    }

    async createEvent(dName, dLocation, dDatetime, dPrecis, dCreator) {
      return this.postItems(baseUrl + "/EventsDB/create", {name: dName, location: dLocation, datetime: dDatetime, precis: dPrecis, creator: dCreator});
    }
    
    async deleteEvent(id) {
      return this.deleteItems(baseUrl + "/EventsDB/" + id);
    }

    async amendEvent(id, dName, dLocation, dDatetime, dPrecis, dCreator) {
      return this.putItems(baseUrl + "/EventsDB/" + id,  {name: dName, location: dLocation, datetime: dDatetime, precis: dPrecis, creator: dCreator});
    }

    async addUser(dUsername, dPassword) {
        return this.postItems(baseUrl + "/userInfo/register", {username: dUsername, password: dPassword});
    }

}
