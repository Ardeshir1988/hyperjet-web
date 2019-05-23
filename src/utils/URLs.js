class URLs {
    static baseUrl(){
        return "https://maxproapp.com/service/";
    }
    static getAuthToken(){
        return 'Basic '+btoa('user1:1user');
    }
}
export default URLs