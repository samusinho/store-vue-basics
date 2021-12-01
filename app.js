Vue.createApp({
    data() {
        return {
            products: [{
                name: "Plátano verde",
                price: 1000,
                image: "https://organicosysaludables.com/wp-content/uploads/2021/03/Platano-verde-organico-certificado.jpg",
                stock: 30,

            }, {
                name: "Papa",
                price: 3000,
                image: "https://agro.bayer.co/-/media/bcs-inter/ws_colombia/cultivos/papa/papa.png",
                stock: 5
            }, {
                name: "Zanahoria",
                price: 1800,
                image: "https://www.cocinayvino.com/wp-content/uploads/2016/09/zanahorias2.jpg",
                stock: 7
            }],
            itemsList: []
        }
    },
    methods: {
        addItemTolist(name, price, quantity) {
            const index = this.itemsList.findIndex(item => item.name == name);
            const index_ = this.products.findIndex(item => item.name == name);
            if (index < 0) {
                this.itemsList.push({
                    name,
                    price,
                    quantity,
                    total: price * quantity
                });
            } else {
                const newQuantity = this.itemsList[index].quantity + quantity;
                const item = {
                    ...this.itemsList[index],
                    quantity: newQuantity,
                    total: this.itemsList[index].price * newQuantity
                };
                this.itemsList[index] = item;
            }
            this.products[index_].stock = this.products[index_].stock - quantity;
        },
        removeItemfromList(name, price, quantity) {
            const index = this.itemsList.findIndex(item => item.name == name);
            if (index >= 0) {
                const newQuantity = this.itemsList[index].quantity - quantity;
                if (newQuantity <= 0) {
                    this.itemsList.splice(index, 1);
                }
                else {
                    const item = {
                        ...this.itemsList[index],
                        quantity: newQuantity,
                        total: this.itemsList[index].price * newQuantity
                    };
                    this.itemsList[index] = item;
                }
                const index_ = this.products.findIndex(item => item.name == name);
                this.products[index_].stock = this.products[index_].stock + quantity;
            }
        }
    }
}).mount('#app');

// const ul = document.querySelector('ul');

// function addItemTolist(name, price, quantity) {
//     const li = document.createElement('li');
//     const columns = [name, price, quantity];
//     let row = document.createElement('div');
//     row.className ='row';
//     for (let [index, i] of columns.entries()) {
//         let div = document.createElement('div');
//         div.className ='col-4';
//         let text = i;
//         if (index == 1) text += " COP";
//         if (index == 2) text += " Unidad(es)";
//         div.innerHTML = text;
//         row.appendChild(div);
//     }
//     li.appendChild(row);
//     ul.appendChild(li);
// }