<script type="text/javascript">

		//Make new Link for jsonP data
		function makeLink(sub,after,count)
		{
	
			var newLink = 'http://www.reddit.com/';
			if (sub != 0)
			{
			
				newLink += 'r/' + sub;
			}
			newLink += '.json?jsonp=?';
			if (after != 0)
			{
				newLink += '&count='+count+'&after='+after;
			}
			return newLink;
		}


		//Load next page 
		function Next()
		{
			if(!processing)
			{
				currentIndex++;	
			

				if(currentIndex == titleArray.length)
				{
					processing = 1;
					currentIndex--;
					loadMore(nextLink);
				}
				else{
					document.getElementById('embededSite').src = linkArray[currentIndex];
					document.getElementById('title').innerHTML=titleArray[currentIndex];
				}	

			}
			//alert("Next");

		}

		//Load previous page
		function Previous()
		{
			
			if(currentIndex > 0)
			{
				currentIndex--; 
				document.getElementById('embededSite').src = linkArray[currentIndex]; 
				document.getElementById('title').innerHTML=titleArray[currentIndex];
			}
			//alert("Previous");

		}
		
		//Load more pages to the link and title array
		function loadMore(site)
		{	
			
			$.getJSON(
				site,
				function PopulateArray(data)
				{
					//alert("Populating Array");
					nextLink = makeLink(subReddit,data.data.after,(25));
					//alert(nextLink);
					//alert(nextLink);
					$.each(
            			data.data.children.slice(0, 25),
            			function (i, post) {
							if(post.data.url.search("www.reddit.com")==-1)
							{
								if(post.data.url.search("www.youtube.com")!=-1)
								{
									var afterEqual = post.data.url.substr(post.data.url.indexOf("=") + 1);
									titleArray.push(post.data.title);
									linkArray.push('//www.youtube.com/embed/' + afterEqual);

								}
								else
								{
									titleArray.push(post.data.title);
									linkArray.push(post.data.url);
								}
							}
							//alert(post.data.url);
              				//$("#reddit-content").append( '<br>' + post.data.title );
              				//$("#reddit-content").append( '<br>' + post.data.url );
              				//$("#reddit-content").append( '<br>' + post.data.permalink );
              				//$("#reddit-content").append( '<br>' + post.data.ups );
              				//$("#reddit-content").append( '<br>' + post.data.downs );
              				//$("#reddit-content").append( '<hr>' );
 
            			}
          			)
					processing = 0;
					next();
        		}
			)
			//.success(function() { alert("second success"); })
			.error(function() { alert("error"); })
			//.complete(function() { alert("complete"); });
			
			
		}


</script>
