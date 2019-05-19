class URLs {
    static baseUrl(){
        return "http://192.168.1.36:8080/service/";
    }
    static getAuthToken(){
        return 'Basic '+btoa('user1:1user');
    }
}
export default URLs