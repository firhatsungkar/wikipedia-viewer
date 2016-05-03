(function($){
	new Vue({
		el: "#app",
		data: {
			alert: "",
			query: "",
			offset: 0,
			scrollTop: 0,
			up: false,
			result: []
		},
		ready: function() {
			var that = this,
				wheight = document.body.scrollHeight
			window.addEventListener('scroll', function(e){
				that.scrollTop = document.body.scrollTop
				if(that.scrollTop > wheight){
					that.up = true
				}
				if(that.scrollTop < wheight)
				{
					that.up = false
				}
			})
		},
		methods: {
			getWikipediaData: function(reset){
				var that = this
				query = that.query
				that.alert = "Some articles about "+ that.query + " ..."
				if(reset)
				{
					that.result = []
					that.offset = 0
				}
				$.ajax({
					url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+query+'&format=json&sroffset='+that.offset,
					data: {
						format: 'json'
					},
					dataType: 'jsonp'
				}).done( function(data) {
					$.each(data.query.search, function(i, val) {
						that.result.push({
							title: val.title,
							body: val.snippet + "...",
							url: "https://en.wikipedia.org/wiki/"+val.title
						})
					})

					that.offset += 10
				})
			},

			doThis: function(query){
				alert(query)
			}
		}
	})

	Vue.transition('fade', {
		enter: function(el){
			console.log(el)
			el.classList.remove("bounceOutDown")
			el.classList.add("bounceInUp")
		},
		leave: function(el){
			el.classList.remove("bounceInUp")
			el.classList.add("bounceOutDown")
		}
	})
})(jQuery);