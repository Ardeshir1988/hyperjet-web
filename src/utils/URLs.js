class URLs {
    static baseUrl(){
        return "http://5.9.250.180/service/";
    }
    static getAuthToken(){
        return 'Basic '+btoa('user1:1user');
    }
}
export default URLs