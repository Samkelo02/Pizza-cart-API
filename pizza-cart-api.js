document.addEventListener('alpine:init', () => {
    //alert("Alpine loaded...")

    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {
          //alert('Pizza cart loading...')

          axios.get('https://pizza-cart-api.herokuapp.com/api/pizzas')
          .then((result) => {
            //console.log(result.data);
            this.pizzas = result.data.pizzas
        })

        .then(() => {
          return this.createCart();
        })
        .then((result)  =>{
          this.cartId = result.data.cart_code;
        });

        },

        createCart() {
          // /api/pizza-cart/create
          return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
           
          
        },

        pizzaImage(pizza)  {
          return '${pizza.size}.png'
        },

        message: 'Eating pizzas',
        username: 'Samke',
        pizzas: [],
        cartId: '',
        add(pizza) {

          const params ={
            cart_code: this.cartId,
            pizza_id: pizza.id
          }

          axios
          .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
          .then(() => this.message = "Pizza added to the cart")
          .catch(err => alert(err) );
          //alert(JSON.stringify(pizza))
        }

      }

    });

})