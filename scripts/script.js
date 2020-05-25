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
  template: '<div class="banner"><span class="banner-cont">{{content}}</span><span class="material-icons">close</span></div>'
})

var app = new Vue({
    el: '#app',
    data: {
      active: false,
      ingredients: [],
      steps: [],
      isSticky: false,
      isLiked: false,
      app_name: 'Recipe',
      recipe_name: window.recipe.name,
      navbar_items: [{'name':'overview', 'active': false}, {'name':'ingredients', 'active': false}, {'name':'steps', 'active': false}],
      rating_items: [{'name':'Taste', 'rating': 4.6, 'votes': 129}, {'name':'Ease', 'rating': 4.9, 'votes': 85}],
      main_img: "url(./images/main.jpg)"
  },
  mounted() {

    // Importing the needed ingredients and quantites
    var allIngrs = window.ingrs
    var recipe = window.recipe
    var recipeIngrs = recipe.ingredients

    for(ing in allIngrs) {
      var selectedIngr = allIngrs.find(element => element.id == recipeIngrs[ing].id)
      if(selectedIngr !== undefined){
        console.log(selectedIngr.name + ' : ' + recipeIngrs[ing].quant)
        selectedIngr.quant = recipeIngrs[ing].quant
        this.ingredients.push(selectedIngr)
      }
    }
  
    // Importing the needed steps
    for(step in window.recipe.steps) {
      this.steps.push(window.recipe.steps[step])
    }
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
            if(this.navbar_items[item].name == this.$refs[ref].id){
              this.navbar_items[item].active = true;
            }
          }
          console.log(this.$refs[ref].id + ' is active')
        }
      }
    },

    smoothScroll: function(index){
      var slected_item = this.navbar_items[index].name
      document.querySelector('#' + slected_item).scrollIntoView({ 
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
      console.log(selectedIng.quant*ratio)
      selectedIng.quant = round(selectedIng.quant*ratio,2)

      sendEvent('Click switch size '+ ing.name)
      
    }
  }
})

function sendEvent(name){
  gtag('event', name, {'method': 'Google'});
}

