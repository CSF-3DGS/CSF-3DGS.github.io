window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    function getNormalizedSlideIndex(carousel, index) {
      var length = carousel.state.length;
      return ((index % length) + length) % length;
    }

    function getSlideVideo(carousel, index) {
      var slideIndex = getNormalizedSlideIndex(carousel, index);
      var slide = carousel.slides.find(function(item) {
        return parseInt(item.dataset.sliderIndex, 10) === slideIndex;
      });

      return slide ? slide.querySelector('video.lazy-carousel-video') : null;
    }

    function loadVideo(video) {
      if (!video || video.querySelector('source')) {
        return;
      }

      var source = document.createElement('source');
      source.src = video.dataset.src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.preload = 'auto';
      video.load();
    }

    function unloadVideo(video) {
      if (!video || !video.querySelector('source')) {
        return;
      }

      video.pause();
      video.removeAttribute('autoplay');
      video.preload = 'none';
      while (video.firstChild) {
        video.removeChild(video.firstChild);
      }
      video.load();
    }

    function playVideo(video) {
      if (!video) {
        return;
      }

      video.setAttribute('autoplay', '');
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function() {});
      }
    }

    function activateCarouselVideo(carousel, index, options) {
      var activeIndex = getNormalizedSlideIndex(carousel, index);
      var activeVideo = getSlideVideo(carousel, activeIndex);

      loadVideo(activeVideo);

      carousel.slides.forEach(function(slide) {
        var video = slide.querySelector('video.lazy-carousel-video');
        var slideIndex = parseInt(slide.dataset.sliderIndex, 10);

        if (slideIndex === activeIndex) {
          playVideo(video);
        } else if (options && options.keepLoadedIndex === slideIndex) {
          video.pause();
        } else {
          unloadVideo(video);
        }
      });
    }

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1.3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
      duration: 300,
      centerMode: true
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    carousels.forEach(function(carousel) {
      if (carousel.element.id === 'results-carousel') {
        activateCarouselVideo(carousel, carousel.state.index);

        carousel.on('before:show', state => {
          var nextIndex = getNormalizedSlideIndex(carousel, state.next);
          activateCarouselVideo(carousel, nextIndex, {
            keepLoadedIndex: getNormalizedSlideIndex(carousel, state.index)
          });
        });

        carousel.on('after:show', state => {
          var nextIndex = getNormalizedSlideIndex(carousel, state.next);
          window.setTimeout(function() {
            activateCarouselVideo(carousel, nextIndex);
          }, options.duration + 50);
        });
      }
    });

    var lazyPageVideos = document.querySelectorAll('video.lazy-page-video');
    if ('IntersectionObserver' in window) {
      var pageVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            playVideo(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '300px 0px'
      });

      lazyPageVideos.forEach(function(video) {
        pageVideoObserver.observe(video);
      });
    } else {
      lazyPageVideos.forEach(function(video) {
        loadVideo(video);
      });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    bulmaSlider.attach();

})
