Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.component('banner', {
  props: ['content'],
  data: function(){
    return {
      isOn: true
    }
  },
  methods: {
    closeBanner: function(){
      this.isOn = false
    }
  },
  template: `<div class="banner" v-if="isOn">
              <span class="banner-cont">{{content}}</span>
              <button class="close-ban" @click="closeBanner()">
                <span class="material-icons">close</span>
              </button>
            </div>`
})

var app = new Vue({
    el: '#app',
    data: {
      recipeId: 0,
      active: false,
      ingredients: [],
      steps: [],
      isSticky: false,
      isLiked: false,
      app_name: 'Recipes',
      recipe_des: "",
      recipe_name: "",
      navbar_items: [{'name':'overview', 'active': false}, {'name':'ingredients', 'active': false}, {'name':'steps', 'active': false}],
      rating_items: [],
      main_img: ""
  },
  mounted() {

    // Importing the needed ingredients and quantites
    var allIngrs = window.ingrs
    var recipe = window.recipe[this.recipeId]
    var recipeIngrs = recipe.ingredients

    for(ing in recipeIngrs) {
      var selectedIngr = allIngrs.find(element => element.id == recipeIngrs[ing].id)
      if(selectedIngr !== undefined){
        selectedIngr.quant = recipeIngrs[ing].quant
        this.ingredients.push(selectedIngr)
      }
    }
  
    // Importing the needed steps
    for(step in recipe.steps) {
      this.steps.push(recipe.steps[step])
    }

    // Importing the description, name and img
    this.recipe_des = recipe.recipe_des
    this.recipe_name = recipe.name 
    this.rating_items = recipe.rating
    this.main_img = recipe.main_img
    
  },

  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 80) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
      this.highlightNav()
    },

    highlightNav: function() {

      var currentScroll = window.scrollY

      for (var ref in this.$refs) {
        var itemScroll = this.$refs[ref].offsetTop
        
        if(itemScroll +20 > currentScroll && itemScroll -20 < currentScroll){

          for (var item in this.navbar_items) {
            this.navbar_items[item].active = false;
            if((this.navbar_items[item].name + '-link') == this.$refs[ref].id){
              this.navbar_items[item].active = true;
            }
          }
        }
      }
    },

    smoothScroll: function(index){
      var slected_item = this.navbar_items[index].name
      document.querySelector('#' + slected_item + '-link').scrollIntoView({ 
        behavior: 'smooth' 
      });
    },

    toggleDone: function(index){
      var status = this.ingredients[index].done
      this.ingredients[index].done = !status
      sendEvent('ing checked ' + index)
    },

    toggleStep: function(index) {
      for(step in this.steps){
        this.steps[step].active = false
      }
      this.steps[index].active = true
      sendEvent('Step selected ' + index)
    },
    
    copyUrl: function() {
      var dummy = document.createElement('input'),
      text = window.location.href;
      document.body.appendChild(dummy);
      dummy.value = text + '?share=app';
      dummy.select();
      document.execCommand('copy');
      alert("Link copied!");
      document.body.removeChild(dummy);
      sendEvent('Click share')
    },

    likeToggle: function() {
      this.isLiked = !this.isLiked
      sendEvent('Click like')
    },

    switchSize: function(ing) {
      var currentSize =  ing.selectedSize
      var sizes = []
      var getSizes = function () {
        for(size in ing.sizes){
          sizes.push(size)
        }
      }

      getSizes();

      var currentIndex = sizes.indexOf(currentSize)
      var newSize = ''
      if(currentIndex < (sizes.length - 1)) {
        newSize = sizes[++currentIndex]
      } else {
        newSize = sizes[0]
      }

      var ratio = (ing.sizes[newSize]/ing.sizes[currentSize])

      // Rounding the new quantity
      function round(value, precision) {
          var multiplier = Math.pow(10, precision || 0);
          return Math.round(value * multiplier) / multiplier;
      }
      
      //Changing the quantity and size for the ingredient 
      var selectedIng = this.ingredients.find(element => element.id == ing.id)
      selectedIng.selectedSize = newSize
      selectedIng.quant = round(selectedIng.quant*ratio,2)

      sendEvent('Click switch size '+ ing.name)
      
    }
  }
})

function sendEvent(name){
  gtag('event', name, {'method': 'Google'});
}

