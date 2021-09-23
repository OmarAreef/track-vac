  $(document).ready(function() {
        if ($('.services-list').length) {
            $('.services-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 2,
                        margin: 0
                    },
                    576: {
                        items: 3,
                        margin: 20
                    },
                    992: {
                        items: 4,
                        margin: 30
                    }
                }
            });
        }
  });
  