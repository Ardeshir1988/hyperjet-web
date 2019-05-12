import store from 'store';


class DataManager {
    

    static setUserMobile(mobile){
        store.set('user',{mobile:mobile})
    }

    static getUserMobile(){
        let user=store.get('user');
        if (user)
        return user.mobile;
        else return 0;
    }
   static saveProductToBasket(id,name,img,price){

        let storedBasket =store.get('basket');
        if (storedBasket) {
            let productIndex = storedBasket.findIndex(function (item) {
                return item.id === parseInt(id)
            });
            if (productIndex>=0) {
                storedBasket[productIndex].quantity+=1;
                store.set('basket',storedBasket);
            }else {
                let product = {id: id, name: name, image: img, price: price, quantity: 1};
                storedBasket.push(product);
                store.set('basket', storedBasket);
            }
        }
        else {
                let basket = [];
                let product = {id: id, name: name, image: img, price: price, quantity: 1};
                basket.push(product);
                store.set('basket', basket);
            }


    }
    static removeProductFromBasket(id){
        let storedBasket =store.get('basket');
        if (storedBasket) {
            let productIndex = storedBasket.findIndex(function (item) {
                return item.id === parseInt(id)
            });
            if (productIndex>=0) {
                console.log(storedBasket.splice(productIndex, 1));
                store.set('basket',storedBasket.splice(productIndex, 1).concat(storedBasket.slice(-productIndex)));
            }
        }
    }
     static getBasketData(){
        return  store.get('basket');
    }
     getOrderData(){

    }
}
export default DataManager