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
      isSticky: false,
      isLiked: false,
      app_name: 'Recipe',
      recipe_name: 'Banana Bread',
      navbar_items: [{'name':'overview', 'active': false}, {'name':'ingridients', 'active': false}, {'name':'steps', 'active': false}],
      rating_items: [{'name':'Taste', 'rating': 4.6, 'votes': 129}, {'name':'Ease', 'rating': 4.9, 'votes': 85}],
      main_img: "url(https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_1825/k%2Farchive%2F027ca667115cd10e50a49074535c2a699d68083c)",
      ingridients: [
        {
          'name':'unsalted butter',
          'quant': 8,
          'scale': 'tablespoon',
          'done': false
        },
        {
          'name':'eggs',
          'quant': 2,
          'scale': 'large',
          'done': false
        },
        {
          'name':'milk',
          'quant': 1/4,
          'scale': 'cup',
          'done': false
        },
        {
          'name':'bananas (very ripe)',
          'quant': 3,
          'scale': 'medium',
          'done': false
        },
        {
          'name':'cooking spray',
          'quant': 1,
          'scale': '',
          'done': false
        },
        {
          'name':'granulated sugar',
          'quant': 1,
          'scale': 'cup',
          'done': false
        },
        {
          'name':'vanilla extract',
          'quant': 1,
          'scale': 'teaspoon',
          'done': false
        },
        {
          'name':'chopped nuts or chocolate chips (optional)',
          'quant': 1/2,
          'scale': 'cup',
          'done': false
        }
      ],
    steps:[
      {
        'name': 'Melt the butter',
        'ing': '8 tablespoons  unsalted butter',
        'content': 'Melt the butter in the microwave or over low heat on the stovetop. → Alternatively, for a more cake-like banana bread, soften the butter (but do not melt) and cream it with the sugar in a stand mixer in the next step.',
        'active': true
      },
      {
        'name': 'Melt the butter',
        'ing': '8 tablespoons  unsalted butter',
        'content': 'Melt the butter in the microwave or over low heat on the stovetop. → Alternatively, for a more cake-like banana bread, soften the butter (but do not melt) and cream it with the sugar in a stand mixer in the next step.',
        'active': false
      },
      {
        'name': 'Melt the butter',
        'ing': '8 tablespoons  unsalted butter',
        'content': 'Melt the butter in the microwave or over low heat on the stovetop. → Alternatively, for a more cake-like banana bread, soften the butter (but do not melt) and cream it with the sugar in a stand mixer in the next step.',
        'active': false
      },
      {
        'name': 'Melt the butter',
        'ing': '8 tablespoons  unsalted butter',
        'content': 'Melt the butter in the microwave or over low heat on the stovetop. → Alternatively, for a more cake-like banana bread, soften the butter (but do not melt) and cream it with the sugar in a stand mixer in the next step.',
        'active': false
      }
    ]
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
      var status = this.ingridients[index].done
      this.ingridients[index].done = !status
    },
    toggleStep: function(index) {
      for(step in this.steps){
        this.steps[step].active = false
      }
      this.steps[index].active = true
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
    },

    likeToggle: function() {
      this.isLiked = !this.isLiked
    }
  }
})

