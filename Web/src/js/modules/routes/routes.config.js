/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($stateProvider, $urlRouterProvider, Route) {

        // Default route
        //$urlRouterProvider.otherwise('/app/dashboard');
        $urlRouterProvider.otherwise('/login');

        // Application Routes States
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: Route.base('Partial/account/login.html')
            })
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: Route.base('app.html'),
              resolve: {
                  _assets: Route.require('icons', 'screenfull', 'sparklines', 'slimscroll', 'toaster', 'animate')
              }
          })
             .state('user', {
                 url: '/user',
                 templateUrl: Route.base('user.html'),
                 resolve: {
                     assets: Route.require('icons', 'animate')
                 }
             })

            .state('app.members', {
                url: '/members',
                templateUrl: Route.base('Partial/members.html')
            })

            .state('app.member', {
                url: '/member',
                templateUrl: Route.base('Partial/member.html'),
                resolve: {
                    assets: Route.require('icons', 'animate')
                }
            })

            .state('user.members', {
                url: '/members',
                templateUrl: Route.base('Partial/user.members.html')
            })
        .state('user.profile', {
            url: '/profile',
            templateUrl: Route.base('Partial/account/profile.html'),
        })




    .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: Route.base('admin.dashboard.html'),
        resolve: {
            assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart')
        }
    })

    .state('user.dashboard', {
        url: '/dashboard',
        templateUrl: Route.base('Partial/dashboard.html'),
        resolve: {
            assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart')
        }
    })


        .state('user.Payments', {
            url: '/Payments',
            templateUrl: Route.base('Partial/Payment/list.payment.html'),
            resolve: {
                assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart')
            }
        })



            .state('app.settings', {
                url: '/settings',
                templateUrl: Route.base('Partial/settings.html'),
                resolve: {
                    assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart', 'ui.select')
                }
            })

            .state('user.settings', {
                url: '/settings',
                templateUrl: Route.base('Partial/settings.html'),
                resolve: {
                    assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart', 'ui.select')
                }
            })

            //.state('user.settings', {
            //    url: '/settings',
            //    templateUrl: Route.base('Partial/settings.html'),
            //    resolve: {
            //        assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart', 'ui.select')
            //    }
            //})


            .state('app.users', {
                url: '/users',
                templateUrl: Route.base('Partial/account/list.user.html'),
                resolve: {
                    assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart', 'ui.select')
                }
            })

            .state('app.user', {
                url: '/user',
                templateUrl: Route.base('Partial/account/user.html'),
                resolve: {
                    assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart', 'ui.select')
                }
            })

















      
    .state('app.ui', {
        url: '/ui',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.ui.buttons', {
        url: '/buttons',
        templateUrl: Route.base('ui.buttons.html')
    })
    .state('app.ui.notifications', {
        url: '/notifications',
        templateUrl: Route.base('ui.notifications.html'),
        controller: 'NotificationController'
    })
    .state('app.ui.bootstrapui', {
        url: '/bootstrapui',
        templateUrl: Route.base('ui.bootstrap-ui.html')
    })
    .state('app.ui.panels', {
        url: '/panels',
        templateUrl: Route.base('ui.panels.html'),
        resolve: {
            assets: Route.require('jquery-ui')
        }
    })
    .state('app.ui.navtree', {
        url: '/navtree',
        title: 'Nav Tree',
        templateUrl: Route.base('ui.nav-tree.html'),
        resolve: {
            assets: Route.require('angularBootstrapNavTree')
        }
    })
    .state('app.ui.nestable', {
        url: '/nestable',
        title: 'Nestable',
        templateUrl: Route.base('ui.nestable.html'),
        resolve: {
            assets: Route.require('nestable')
        }
    })
    .state('app.ui.sortable', {
        url: '/sortable',
        title: 'Sortable',
        templateUrl: Route.base('ui.sortable.html'),
        resolve: {
            assets: Route.require('htmlSortable')
        }
    })
    .state('app.ui.grid', {
        url: '/grid',
        templateUrl: Route.base('ui.grid.html')
    })
    .state('app.ui.grid-masonry', {
        url: '/grid-masonry',
        templateUrl: Route.base('ui.grid-masonry.html')
    })
    .state('app.ui.typo', {
        url: '/typo',
        templateUrl: Route.base('ui.typo.html')
    })
    .state('app.ui.palette', {
        url: '/palette',
        templateUrl: Route.base('ui.palette.html')
    })
    .state('app.ui.localization', {
        url: '/localization',
        title: 'Localization',
        templateUrl: Route.base('ui.localization.html')
    })
    .state('app.maps', {
        url: '/maps',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.maps.google', {
        url: '/google',
        templateUrl: Route.base('maps.google.html'),
        resolve: {
            assets: Route.require('loadGoogleMapsJS', function () {
                return loadGoogleMaps();
            }, 'ui.map')
        }
    })
    .state('app.maps.vector', {
        url: '/vector',
        templateUrl: Route.base('maps.vector.html'),
        resolve: {
            assets: Route.require('vectormap', 'vectormap-maps')
        }
    })
    .state('app.icons', {
        url: '/icons',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.icons.feather', {
        url: '/feather',
        templateUrl: Route.base('icons.feather.html')
    })
    .state('app.icons.fa', {
        url: '/fa',
        templateUrl: Route.base('icons.fa.html')
    })
    .state('app.icons.weather', {
        url: '/weather',
        templateUrl: Route.base('icons.weather.html')
    })
    .state('app.icons.climacon', {
        url: '/climacon',
        templateUrl: Route.base('icons.climacon.html')
    })
    .state('app.forms', {
        url: '/forms',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.forms.inputs', {
        url: '/inputs',
        templateUrl: Route.base('form.inputs.html'),
        resolve: {
            assets: Route.require('moment', 'textAngular', 'textAngularSetup')
        }
    })
    .state('app.forms.validation', {
        url: '/validation',
        templateUrl: Route.base('form.validation.html')
    })
    .state('app.forms.wizard', {
        url: '/wizard',
        templateUrl: Route.base('form.wizard.html')
    })
    .state('app.forms.upload', {
        url: '/upload',
        title: 'Form upload',
        templateUrl: Route.base('form.upload.html'),
        resolve: {
            assets: Route.require('angularFileUpload', 'filestyle')
        }
    })
    .state('app.forms.xeditable', {
        url: '/xeditable',
        templateUrl: Route.base('form.xeditable.html'),
        resolve: {
            assets: Route.require('xeditable')
        }
    })
    .state('app.forms.imagecrop', {
        url: '/imagecrop',
        templateUrl: Route.base('form.imagecrop.html'),
        resolve: {
            assets: Route.require('ngImgCrop', 'filestyle')
        }
    })
    .state('app.forms.uiselect', {
        url: '/uiselect',
        templateUrl: Route.base('form.uiselect.html'),
        controller: 'UISelectController',
        resolve: {
            assets: Route.require('ui.select')
        }
    })
    .state('app.forms.slider', {
        url: '/slider',
        templateUrl: Route.base('form.slider.html'),
        resolve: {
            assets: Route.require('vr.directives.slider')
        }
    })
    .state('app.charts', {
        url: '/charts',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.charts.flot', {
        url: '/flot',
        templateUrl: Route.base('charts.flot.html'),
        resolve: {
            assets: Route.require('flot-chart', 'flot-chart-plugins')
        }
    })
    .state('app.charts.pie', {
        url: '/pie',
        templateUrl: Route.base('charts.pie.html'),
        resolve: {
            assets: Route.require('ui.knob', 'easypiechart')
        }
    })
    .state('app.tables', {
        url: '/tables',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.tables.responsive', {
        url: '/responsive',
        templateUrl: Route.base('table.responsive.html')
    })
    .state('app.tables.ngtable', {
        url: '/ngtable',
        templateUrl: Route.base('table.ngtable.html'),
        resolve: {
            assets: Route.require('ngTable', 'ngTableExport')
        }
    })
    .state('app.tables.xeditable', {
        url: '/xeditable',
        templateUrl: Route.base('table.xeditable.html'),
        resolve: {
            assets: Route.require('xeditable')
        }
    })
    .state('app.extras', {
        url: '/extras',
        template: '<div ui-view ng-class="app.views.animation"></div>'
    })
    .state('app.extras.calendar', {
        url: '/calendar',
        templateUrl: Route.base('extras.calendar.html'),
        resolve: {
            assets: Route.require('jquery-ui', 'moment', 'ui.calendar', 'gcal')
        }
    })
    .state('app.extras.tasks', {
        url: '/tasks',
        templateUrl: Route.base('extras.tasks.html'),
        controller: 'TasksController as taskctrl'
    })
    .state('app.extras.invoice', {
        url: '/invoice',
        templateUrl: Route.base('extras.invoice.html')
    })
    .state('app.extras.search', {
        url: '/search',
        templateUrl: Route.base('extras.search.html'),
        resolve: {
            assets: Route.require('moment')
        }
    })
    .state('app.extras.price', {
        url: '/price',
        templateUrl: Route.base('extras.price-table.html')
    })
    .state('app.extras.template', {
        url: '/template',
        templateUrl: Route.base('extras.template.html')
    })
    .state('app.extras.timeline', {
        url: '/timeline',
        templateUrl: Route.base('extras.timeline.html')
    })
    .state('app.extras.projects', {
        url: '/projects',
        templateUrl: Route.base('extras.projects.html')
    })
    .state('app.extras.gallery', {
        url: '/gallery',
        templateUrl: Route.base('extras.gallery.html'),
        resolve: {
            assets: Route.require('blueimp-gallery')
        }
    })
    .state('app.extras.profile', {
        url: '/profile',
        templateUrl: Route.base('extras.profile.html'),
        resolve: {
            assets: Route.require('loadGoogleMapsJS', function () {
                return loadGoogleMaps();
            }, 'ui.map')
        }
    })
  // Mailbox
  .state('app-fh.mailbox', {
      url: '/mailbox',
      abstract: true,
      templateUrl: Route.base('mailbox.html'),
      resolve: {
          assets: Route.require('moment')
      }
  })
    .state('app-fh.mailbox.folder', {
        url: '/folder',
        abstract: true
    })
    .state('app-fh.mailbox.folder.list', {
        url: '/:folder',
        views: {
            'container@app-fh.mailbox': {
                templateUrl: Route.base('mailbox.folder.html')
            }
        }
    })
    .state('app-fh.mailbox.folder.list.view', {
        url: '/:id',
        views: {
            'mails@app-fh.mailbox.folder.list': {
                templateUrl: Route.base('mailbox.view-mail.html')
            }
        },
        resolve: {
            assets: Route.require('textAngular', 'textAngularSetup')
        }
    })
    .state('app-fh.mailbox.compose', {
        url: '/compose',
        views: {
            'container@app-fh.mailbox': {
                templateUrl: Route.base('mailbox.compose.html')
            }
        },
        resolve: {
            assets: Route.require('textAngular', 'textAngularSetup')
        }
    })
  // Single Page Routes
  .state('page', {
      url: '/page',
      templateUrl: Route.base('page.html'),
      resolve: {
          assets: Route.require('icons', 'animate')
      }
  })
    .state('page.login', {
        url: '/login',
        templateUrl: Route.base('page.login.html')
    })
    .state('page.register', {
        url: '/register',
        templateUrl: Route.base('page.register.html')
    })
    .state('page.recover', {
        url: '/recover',
        templateUrl: Route.base('page.recover.html')
    })
    .state('page.lock', {
        url: '/lock',
        templateUrl: Route.base('page.lock.html')
    })
  // Layout dock
  .state('app-dock', {
      url: '/dock',
      abstract: true,
      templateUrl: Route.base('app-dock.html'),
      controller: function ($rootScope, $scope) {
          $rootScope.app.layout.isDocked = true;
          $scope.$on('$destroy', function () {
              $rootScope.app.layout.isDocked = false;
          });
          // we can't use dropdown when material and docked
          // main content overlaps dropdowns (forced for demo)
          $rootScope.app.layout.isMaterial = false;
      },
      resolve: {
          assets: Route.require('icons', 'screenfull', 'sparklines', 'slimscroll', 'toaster', 'animate')
      }
  })
    .state('app-dock.dashboard', {
        url: '/dashboard',
        templateUrl: Route.base('dashboard.html'),
        resolve: {
            assets: Route.require('flot-chart', 'flot-chart-plugins', 'easypiechart')
        }
    })
  // Layout full height
  .state('app-fh', {
      url: '/fh',
      abstract: true,
      templateUrl: Route.base('app-fh.html'),
      resolve: {
          assets: Route.require('icons', 'screenfull', 'sparklines', 'slimscroll', 'toaster', 'animate')
      }

  })
    .state('app-fh.columns', {
        url: '/columns',
        templateUrl: Route.base('layout.columns.html')
    })
    .state('app-fh.chat', {
        url: '/chat',
        templateUrl: Route.base('extras.chat.html')
    });
    }

})();

