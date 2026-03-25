const app = {};
app.currentLink='homeLink';

app.navClick=function(){
    $('header nav a').on('click', function(event){
        if($(window).width()<=800 ) {
                $('.hamburger').toggleClass("is-active");
                $('header ul').toggleClass('displayHamburger');
            
        }
        const navLinks=['homeLink', 'aboutLink', 'skillsLink', 'projectsLink','contactLink'];
        event.preventDefault();
        const previousLink = navLinks.indexOf(app.currentLink);
        const clickedLink=navLinks.indexOf($(this).attr('id'));
        if(previousLink!==clickedLink) {
            $(`#${app.currentLink}`).removeClass('theActive');
            $(`#${app.currentLink}`).addClass('notActive');
            if (previousLink < clickedLink) {
                i = previousLink + 1;
            }
            else {
                i = previousLink - 1;
            }
            const t = setInterval(function () {
                $(`#${navLinks[i]}`).addClass('theActive');
                const x = setTimeout(function () {
                    if (i !== clickedLink) {
                        $(`#${navLinks[i]}`).removeClass('theActive');
                        if (previousLink < clickedLink) {
                            i++;
                        }
                        else {
                            i--;
                        }
                    }
                    else {
                        clearInterval(x);
                    }
                }, 250);
                if (i === clickedLink) {
                    clearInterval(t);
                    $(this).removeClass('notActive');
                    $(this).addClass('theActive')
                }
            }, 300);
        }
        app.currentLink = $(this).attr('id');
        const section = app.currentLink.replace('Link', '');
        $(document).off("scroll");
        let topValue;
        if ($(window).width() >= 510) {
            topValue = $(`#${section}`).offset().top
        }
        else {
            topValue = $(`#${section}`).offset().top - 40

        }

        $('html, body').animate({
            'scrollTop': topValue


        }, 1400, 'swing', function () {
            app.onScroll();
        });
      
    });
}

app.logoClick= function () {
$('#logo').on('click', function (){
    document.location.href = "#home";
});
}

app.hamburgerClick= function() {
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $('header ul').toggleClass('displayHamburger');
    });
}

app.downloadCV= function() {
    $('.cv').on ('click', function() {
        window.open('./assets/AbirResume.pdf', '_blank');
    
    });
}

app.onScroll= function() {
    $(document).on("scroll", function() {
        if ($(window).width() <= 800) {
            $('.hamburger').removeClass("is-active");
            $('header ul').removeClass('displayHamburger');

        }
        const  scrollPos = $(document).scrollTop();
        $('header nav a').each(function () {
            const currLink = $(this);
            const refElement = $(currLink.attr("href"));
            
            if (scrollPos >= refElement.position().top && scrollPos < refElement.position().top + refElement.height()) {
                currLink.addClass("theActive");
                currLink.removeClass("notActive");
                app.currentLink=currLink.attr('id');
                
            }
            else {
                currLink.blur();
                currLink.removeClass("theActive");
                currLink.addClass("notActive");
            }
        });
    });
    }

    //to filter the projects
    app.projectTypeFilter=function() {
        $('.projectTypes li a').on('click', function(event){
            event.preventDefault();
            $('.projectTypes li a')
            $('.projectTypes li a').removeClass('projectActive');
            $('.projectTypes li a').addClass('notActive');
            $projectType=$(this);
            $projectType.removeClass('notActive');
            $projectType.addClass('projectActive');
            if ($projectType.attr('data-type')==='all'){
                $('.projects').addClass('slide-in-bottom');
                $('.projects').show();
                return;
           }
            $('.projects').each(function () {
                const $project = $(this);
                if ($project.attr('data-type') !== $projectType.attr('data-type')){
                    $project.hide();
                }
                else {
                    $project.addClass('slide-in-bottom');
                    $project.show();
                }

            });
        });
    }

    app.sendEmail=function() {
        $('form').on('submit', function(event){
            event.preventDefault();
            $('main form div img').css('display', 'block');
            Email.send({
                SecureToken: "35df6492-4423-4240-8376-3f71bff14f54",
                To: 'abir.halwa@gmail.com',
                From: $('#email').val(),
                Subject: `An email from ${$('#name').val()}`,
                Body: $('#message').val(),
            }).then(function(m){
                $('main form div img').css('display', 'none');
                $('form').trigger("reset");
                $('form p').text('Thank you! Your message has been successfully sent. I will contact you very soon!');
                console.log(m);
            });
        });
    }
    app.validateInput= function() {
              $('.contactFields').focusout(function(){
             if (!$(this)[0].checkValidity()) {
                 $(this).addClass('invalid');
         }
         else {
                 $(this).removeClass('invalid');

         }
    })
    }
app.init = function () {
    app.hamburgerClick();
    app.navClick();
    app.logoClick();
    app.onScroll();
    app.downloadCV();
    app.projectTypeFilter();
    app.sendEmail();
}

$(function () {
app.init();
});