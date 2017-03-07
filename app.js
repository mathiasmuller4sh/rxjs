(function (app) {

    app
        .factory('SearchService', function ($http) {
            return {
                search: function (query) {
                    return $http
                        .get('https://www.googleapis.com/youtube/v3/search', {
                            params: {
                                q: query,
                                part: 'snippet',
                                key: 'AIzaSyAIIDixcvOVCHo7MaYobKAr2ZLo7IXV9_I'
                            }
                        })
                        .then(function (resp) {
                            return resp.data;
                        });
                }
            };
        })
        .component('rxApp', {
            template: '<rx-search search="$ctrl.doSearch($event)"></rx-search><rx-list list="$ctrl.results"></rx-list>',
            controller: function (SearchService) {
                const $ctrl = angular.extend(this, {
                    doSearch: function (value) {
                        SearchService
                            .search(value)
                            .then(function (all) {
                                $ctrl.results = all.items;
                            });
                    }
                });
            }
        })
        .component('rxSearch', {
            bindings: {
                search: '&'
            },
            template: '<form ><input ng-model="$ctrl.searchText" ng-change="$ctrl.search({$event:$ctrl.searchText})"></form>',
            controller: function ($http) {

            }
        })
        .component('rxList', {
            bindings: {
                list: '<'
            },
            template: '<div ng-repeat="item in $ctrl.list">' +
            '<img ng-src="{{item.snippet.thumbnails.default.url}}">' +
            '<h5>{{item.snippet.title}}</h5>' +
            '</div>'

        })


})(angular.module('rxjs', []));