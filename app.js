/**
 * Created by pnLinh on 05/03/2017.
 */

var app = angular.module('myApp', ['ngMaterial', 'ngAnimate', 'ngRoute', 'ngMessages']);
app.constant('CONFIG', {
    apiKey: "AIzaSyD53OUvDS3ACoalzGlLUxW3RZjflMaRQhA",
    authDomain: "pnlinh-cv.firebaseapp.com",
    databaseURL: "https://pnlinh-cv.firebaseio.com",
    storageBucket: "pnlinh-cv.appspot.com",
    messagingSenderId: "130037086432"
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view/home/home.html',
        controller: 'homeCtl'
    }).when('/project', {
        templateUrl: 'view/project/project.html',
        controller: 'projectCtl'
    }).when('/contact', {
        templateUrl: 'view/contact/contact.html',
        controller: 'contactCtl'
    }).when('/privacy-policy/ev-dict', {
        templateUrl: 'view/privacy-policy/ev-dict.html',
        controller: 'evDictPrivacyCtl'
    })
        .otherwise({redirectTo: '/'});
}]);

app.controller('MainCtl', function ($scope, CONFIG) {
    firebase.initializeApp(CONFIG);
    var vm = this;
    vm.name = "Linh";
})

app.controller('evDictPrivacyCtl', function ($scope, $rootScope) {
    $scope.$parent.currentMenu = "privacy-policy";
    $scope.$parent.isHasImg = false;
    $scope.$parent.showMobileMenu = false;
    jQuery('.preloader').show();
    $scope.$on('$viewContentLoaded', function () {
        showAnimation('#evDict');
    })
})

app.controller('homeCtl', function ($scope, $rootScope) {
    var vm = this;
    $scope.$parent.currentMenu = "home";
    $scope.$parent.isHasImg = true;
    $scope.$parent.showMobileMenu = false;

    $scope.$on('$viewContentLoaded', function () {
        showAnimation('#overview');
    })
    jQuery('.preloader').show();
})

app.controller('projectCtl', function ($scope, $rootScope) {
    var vm = this;
    $scope.$parent.currentMenu = "project";
    $scope.$parent.isHasImg = false;
    $scope.$parent.showMobileMenu = false;
    jQuery('.preloader').show();

    gallery('EVdict');
    gallery('Baucua');
    gallery('GDMessenger');
    gallery('Linkedin');
    gallery('FindMyWork');
    gallery('Instantapp');

    $scope.$on('$viewContentLoaded', function () {
        jQuery('.owl-carousel').owlCarousel({
            loop: false,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                },
                1000: {
                    items: 5,
                    nav: true,
                    margin: 20
                }
            }
        });
        showAnimation('#project');
    })
})

app.controller('contactCtl', function ($scope, $rootScope,$mdToast) {
    var vm = this;
    $scope.$parent.currentMenu = "contact";
    $scope.$parent.isHasImg = false;
    $scope.$parent.showMobileMenu = false;
    jQuery('.preloader').show();
    $scope.$on('$viewContentLoaded', function () {
        showAnimation('#contact');
    })

    vm.submit = function (event) {
        var s = jQuery.find('.btn-submit');
        var l = Ladda.create(s[0]);
        l.start();

        var contactsRef = firebase.database().ref().child('contacts');
        var newPostKey = contactsRef.push().key;
        contactsRef.child(newPostKey).set({
            name: vm.name,
            email: vm.email,
            message : vm.message
        }, function (error) {
            l.stop();
            jQuery('textarea').blur();
            if (error) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error!!')
                        .position('top right')
                        .hideDelay(5000)
                );

            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Success! Thank you for your submission!')
                        .position('top right')
                        .hideDelay(5000)
                );

                $scope.$apply(function(){
                    vm.email="";
                    vm.name="";
                    vm.message="";
                    vm.formSubmit.$setPristine();
                    vm.formSubmit.$setUntouched();
                });
            }
        });
    }
})

function showAnimation(id) {
    setTimeout(function () {
        $('.preloader').hide();
        $('.header-menu').addClass('animated');
        $(id).addClass('animated');

    }, 350);
}

function gallery(id) {
    document.getElementById(id).onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (jQuery(target).hasClass('overlay') || jQuery(target).hasClass('fa') || jQuery(target).hasClass('btn-outline')) {
            var link = jQuery(target).closest('.thumbnail')[0],
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        }
        else
            event.preventDefault();
    };
}
