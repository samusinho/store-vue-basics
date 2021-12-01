const app = Vue.createApp({
    data() {
        return {
            name: 'he cambiado de nombre :u',
            products: [{
                name: "Plátano verde",
                price: 1000,
                image: "https://organicosysaludables.com/wp-content/uploads/2021/03/Platano-verde-organico-certificado.jpg",
                stock: 10
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
            const productIndex = this.products.findIndex(item => item.name == name);
            if (index < 0) {
                this.itemsList.push({
                    name,
                    price,
                    quantity,
                    total: price * quantity
                });
            } else {
                this.itemsList[index].quantity += quantity;
                this.itemsList[index].total = this.itemsList[index].quantity * this.itemsList[index].price;
            }
            this.products[productIndex].stock -= quantity;
        },
        removeItemFromList(name, quantity) {
            const index = this.itemsList.findIndex(item => item.name == name);
            if (index >= 0) {
                const productIndex = this.products.findIndex(item => item.name == name);
                this.products[productIndex].stock += quantity;
                this.itemsList[index].quantity -= quantity;
                if (this.itemsList[index].quantity <= 0) {
                    this.itemsList.splice(index, 1);
                }
                else {
                    this.itemsList[index].total = this.itemsList[index].quantity * this.itemsList[index].price;
                }
                
            }
        },
        removeDisabled(name) {
            return this.itemsList.findIndex(item => item.name == name) < 0
        }
    }
});
app.component('empty-list', {
    template: `
    <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Compra algo... o moriré!</h4>
        <p>¿Por qué no me has comprado nada?  >:v</p>
        <br>
        <p>
            Aprovecha nuestros descuentos <b>(guiño guiño)</b>
            en este día sin iva.
        </p>
    </div>
    `
});
app.mount('#app');

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