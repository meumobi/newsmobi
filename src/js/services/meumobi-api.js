'use strict';

angular

.module('meumobi.api', ['ngResource', 'meumobi.settings'])
// Simple Authentication for Angular.js App: http://beletsky.net/2013/11/simple-authentication-in-angular-dot-js-app.html
.factory('errorInterceptor', ['$q', '$rootScope', '$location',
function($q, $rootScope, $location) {
	return {
		request: function(config) {
			$rootScope.$broadcast('loading:show');
			return config || $q.when(config);
		},
		requestError: function(request) {
			$rootScope.$broadcast('loading:hide');
			return $q.reject(request);
		},
		response: function(response) {
			$rootScope.$broadcast('loading:hide');
			return response || $q.when(response);
		},
		responseError: function(response) {
			$rootScope.$broadcast('loading:hide');
			console.log("[API:errorInterceptor]: BEGIN");
			console.log(response);
			console.log("[API:errorInterceptor]: END");
			if (response && response.status === 0) {} // network offline or CORS error
			if (response && response.status === 404) {}
			if (response && response.status === 401) {
				delete localStorage.user;
				$rootScope.go('/login');
			}
			if (response && response.status >= 500) {}
			return $q.reject(response);
		}
	};
}
])

.factory('API', function($http, SITE, $rootScope) {
var api = (function() {
	return {
		get: function(endp, success, error) {
			$http({
				method: 'GET',
				url: SITE.API_URL + SITE.DOMAIN + endp,
				responseType: 'json',
				headers: {
					//'If-None-Match': localStorage['ETag']
				}
			})
			.success(success)
			.error(error);
		},
		post: function(endp, obj, success, error) {
			$http({
				method: 'POST',
				url: SITE.API_URL + SITE.DOMAIN + endp,
				data: JSON.stringify(obj),
				responseType: 'json',
				headers: {
					"Content-Type": "application/json",
				}
			})
			.success(success)
			.error(error);
		},
		put: function(endp, obj, success, error) {
			$http({
				method: 'PUT',
				url: SITE.API_URL + SITE.DOMAIN + endp,
				data: JSON.stringify(obj),
				responseType: 'json',
				headers: {
					"Content-Type": "application/json",
				}
			})
			.success(success)
			.error(error);
		},
		del: function(endp, id, success, error) {
			$http({
				method: 'DELETE',
				url: SITE.API_URL + SITE.DOMAIN + endp,
				responseType: 'json',
			})
			.success(success)
			.error(error);
		}
	}
})();

var app = {
	Categories: (function() {
		var path = '/categories/';
		return {
			query: function(success, error) {
				api.get(path, success, error);
			}
		}
	})(),
	Items: (function() {
		var path = '/items/';
		return {
			latest: function(success, error) {
				api.get(path + 'latest', success, error);
			}
		}
	})(),
	Login: (function() {
		var path = '/visitors/';
		return {
			signin: function(obj, success, error) {
				api.post(path + 'login', obj, success, error);
			},
			get: function(success, error) {
				api.get(path, success, error);
			},
			save: function(obj, success, error) {
				api.put(path, obj, success, error);
			},
			device: function(obj, success, error) {
				api.post(path + 'devices', obj, success, error);
			},
			update: function(obj, success, error) {
				api.put(path + 'devices/' + obj.uuid, obj, success, error);
			}
		}
	})(),
	Mail: (function() {
		var path = '/mail/';
		return {
			save: function(obj, success, error) {
				api.post(path, obj, success, error);
			}
		}
	})()
}
return app;
});
