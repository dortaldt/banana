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

var app = new Vue({
    el: '#app',
    data: {
      active: false,
      ingredients: [],
      isSticky: false,
      isLiked: false,
      app_name: 'Recipe',
      recipe_name: 'Banana Bread',
      navbar_items: [{'name':'overview', 'active': false}, {'name':'ingredients', 'active': false}, {'name':'steps', 'active': false}],
      rating_items: [{'name':'Taste', 'rating': 4.6, 'votes': 129}, {'name':'Ease', 'rating': 4.9, 'votes': 85}],
      main_img: "url(https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_1825/k%2Farchive%2F027ca667115cd10e50a49074535c2a699d68083c)",
      // ingredients: [
      //   {
      //     'name':'unsalted butter',
      //     'quant': 8,
      //     'scale': 'tablespoon',
      //     'done': false
      //   },
      //   {
      //     'name':'eggs',
      //     'quant': 2,
      //     'scale': 'large',
      //     'done': false
      //   },
      //   {
      //     'name':'milk',
      //     'quant': 1/4,
      //     'scale': 'cup',
      //     'done': false
      //   },
      //   {
      //     'name':'bananas (very ripe)',
      //     'quant': 3,
      //     'scale': 'medium',
      //     'done': false
      //   },
      //   {
      //     'name':'cooking spray',
      //     'quant': 1,
      //     'scale': '',
      //     'done': false
      //   },
      //   {
      //     'name':'granulated sugar',
      //     'quant': 1,
      //     'scale': 'cup',
      //     'done': false
      //   },
      //   {
      //     'name':'vanilla extract',
      //     'quant': 1,
      //     'scale': 'teaspoon',
      //     'done': false
      //   },
      //   {
      //     'name':'all-purpose flour',
      //     'quant': 2,
      //     'scale': 'cup',
      //     'done': false
      //   },
      //   {
      //     'name':'baking soda',
      //     'quant': 1,
      //     'scale': 'teaspoon',
      //     'done': false
      //   },
      //   {
      //     'name':'salt',
      //     'quant': 1/4,
      //     'scale': 'teaspoon',
      //     'done': false
      //   },
      //   {
      //     'name':'chopped nuts or chocolate chips (optional)',
      //     'quant': 1/2,
      //     'scale': 'cup',
      //     'done': false
      //   }
      // ],
    steps:[
      {
        'name': 'Preheat the oven',
        'ing': '',
        'content': 'Let’s start with preheating the oven to 350°F(175°C)',
        'active': true
      },
      {
        'name': 'Prepare the pan',
        'ing': '8x5-inch (255x130cm) loaf pan',
        'content': 'Line an 8x5-inch (255x130cm) loaf pan with parchment paper, letting the excess hang over the long sides to form a sling',
        'active': false
      },
      {
        'name': 'Melt the butter',
        'ing': '8 tablespoons unsalted butter',
        'content': 'In a microwave, or over a low heat stove, melt the butter so it becomes liquid',
        'active': false
      },
      {
        'name': 'Mix the “drys”',
        'ing': '2 cups all-purpose flour · 1 teaspoon baking soda · 1/4 teaspoon salt',
        'content': 'Now take all the dry ingredients — flour, baking soda, and salt, and mix them in a medium bowl.',
        'active': false
      },
      {
        'name': 'Mash in the bananas',
        'ing': '3 bananas (very ripe)',
        'content': 'In a large bowl, using a fork or handheld masher, mash the bananas until they turn into a uniform pulp.',
        'active': false
      },
      {
        'name': 'Add the “wets”',
        'ing': '2 large eggs · 1 teaspoon vanilla extract · 8 tablespoons unsalted butter · 1/4 cup milk',
        'content': 'Add the wet ingredients— eggs, milk, melted butter, vanilla extract, and sugar (yeh, it’s not wet, but now it will) to the meshed bananas pulp and mix it until it becomes a unified batter.',
        'active': false
      },
      {
        'name': 'Add the “drys”',
        'ing': '',
        'content': 'Slowly, while stirring the batter, add the pre-mixed “drys” into the pulp.',
        'active': false
      },
      {
        'name': 'Pure the batter into the pan',
        'ing': '',
        'content': 'Almost there! Now pure the batter into the pan.',
        'active': false
      },
      {
        'name': 'Bake for 50 mins',
        'ing': '',
        'content': 'Depends on your oven, it should take 45-50 mins for the bread to be ready. ',
        'active': false
      },
      {
        'name': 'Cool',
        'ing': '',
        'content': 'Let the bread cool for 10 mins inside the pan, and then 10 mins outside of the pan',
        'active': false
      },
      {
        'name': 'Enjoy',
        'ing': '',
        'content': 'Enjoy your fresh home-made banana bread!',
        'active': false
      }
    ]
  },
  mounted() {
      this.ingredients = window.ingrs
      for(ing in this.ingredients){
        this.ingredients[ing].quant = 1;
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
      dummy.value = text;
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
  }
})

function sendEvent(name){
  gtag('event', name, {'method': 'Google'});
  console.log('GA fire ' + name)
}

