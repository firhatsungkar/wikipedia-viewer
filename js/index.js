(function($){
	new Vue({
		el: "#app",
		ready: function(){
			this.alert  = "Some random interesting articles ..."
		},
		data: {
			alert: "",
			query: "",
			offset: 0,
			result: []
		},
		methods: {
			getWikipediaData: function(reset){
				var that = this
				query = that.query
				that.alert = "Some articles about "+ that.query
				if(reset)
				{
					that.result = []
				}
				$.ajax({
					url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+query+'&format=json&sroffset=0',
					data: {
						format: 'json'
					},
					dataType: 'jsonp'
				}). done( function(data) {
					$.each(data.query.search, function(i, val) {
						that.result.push({
							title: val.title,
							body: val.snippet,
							url: "https://en.wikipedia.org/wiki/"+val.title
						})
						console.log(that.result)
					});
				})
			},

			doThis: function(query){
				alert(query)
			}
		}
	})
})(jQuery);