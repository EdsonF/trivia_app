angular.module('triviaApp.mocks', [])

    .service('DreamFactoryMock', [function () {
        return {
            ready: true,
            api: {

                user: {
                    login: function (creds) {
                        if ((creds.email === 'valid') && (creds.password === 'valid')) {
                            return true;

                            /*
                             return {
                             app_groups: [],
                             displayName: 'Valid User',
                             email: 'valid@valid.com',
                             first_name: 'valid_firstName',
                             id: 1,
                             is_sys_admin: false,
                             last_login_date: '02/02/2014 00:00:00',
                             last_name: 'valid_lastName',
                             no_group_apps: [],
                             session_id: '0000000000',
                             ticket: '',
                             ticket_expiry: '',
                             user_data: [],
                             user_source: 0
                             }
                             */
                        } else {
                            return false;
                            /*
                             return {"error": [
                             {"message": "Invalid user name and password combination.",
                             "code": 400,
                             "context": null
                             }
                             ]}
                             */
                        }
                    },
                    logout: function () {
                        return true;
                    },

                    register: function () {
                        return true;
                    }

                }

            },
            isReady: function () {
                return this.ready;
            }
        }
    }])
    .service('UserServiceMock', [function () {

        return {

            setUser: function () {
                return true;
            }



        }
    }])
    .service('MovieServiceMock', ['$q', function ($q) {

        return {
            getMovie: function () {
                var movie = {"total": 1, "movies": [
                    {"id": "16815", "title": "Melvin and Howard", "year": 1980, "mpaa_rating": "R", "runtime": 95, "release_dates": {"theater": "1980-09-19", "dvd": "1999-10-12"}, "ratings": {"critics_rating": "Fresh", "critics_score": 94, "audience_rating": "Upright", "audience_score": 61}, "synopsis": "", "posters": {"thumbnail": "http://content9.flixster.com/movie/28/52/285295_mob.jpg", "profile": "http://content9.flixster.com/movie/28/52/285295_pro.jpg", "detailed": "http://content9.flixster.com/movie/28/52/285295_det.jpg", "original": "http://content9.flixster.com/movie/28/52/285295_ori.jpg"}, "abridged_cast": [
                        {"name": "Paul Le Mat", "id": "363427263", "characters": ["Melvin Dummar"]},
                        {"name": "Jason Robards", "id": "162656868", "characters": ["Howard Hughes"]},
                        {"name": "Mary Steenburgen", "id": "162663795", "characters": ["Lynda Dummar"]},
                        {"name": "Jack Kehoe", "id": "351527442", "characters": ["Jim Delgado"]},
                        {"name": "Michael J. Pollard", "id": "359853588", "characters": ["Little Red"]}
                    ], "alternate_ids": {"imdb": "0081150"}, "links": {"self": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815.json", "alternate": "http://www.rottentomatoes.com/m/melvin_and_howard/", "cast": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/cast.json", "clips": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/clips.json", "reviews": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/reviews.json", "similar": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/similar.json"}}
                ], "links": {"self": "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Melvin+and+Howard&page_limit=30&page=1"}, "link_template": "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q={search-term}&page_limit={results-per-page}&page={page-number}"}


                var defer = $q.defer();
                defer.resolve(movie);
                return defer.promise;

            }
        }
    }]);

