


// Test TriviaCtrl

describe("Unit: Test TriviaCtrl", function() {


    beforeEach(
        module('triviaApp')
    );


    beforeEach(function() {

        module('triviaApp.services');
        module('triviaApp.mocks');
    });

    var TriviaCtrl, scope, aUserService, aScoreKeeper, aMakeQuestion, DreamFactory, MovieService;



    beforeEach(inject(function($controller, $rootScope, UserService, ScoreKeeper, MakeQuestion, DreamFactoryMock, MovieServiceMock) {

        scope = $rootScope.$new();
        aUserService = UserService;
        aScoreKeeper = ScoreKeeper;
        DreamFactory = DreamFactoryMock;
        MovieService = MovieServiceMock;
        aMakeQuestion = MakeQuestion;


        TriviaCtrl = $controller('TriviaCtrl', {

            $scope: scope,
            UserService: aUserService,
            ScoreKeeper: aScoreKeeper,
            DreamFactory: DreamFactory,
            MovieService: MovieService,
            MakeQuestion: aMakeQuestion

        });
    }));


    it("should be initialized for guests", function() {

        expect(scope.user).toEqual(aUserService.getUser());
        expect(scope.score).toEqual(aScoreKeeper.getScore());
        expect(scope.question).toBe('');
        expect(scope.userAnswer).toBe('');
        expect(scope.cheatAnswer).toBe('');
        expect(scope._actualAnswer).toBe('');
    });

    describe("Test $scope.init()", function() {


        afterEach(function() {
            DreamFactory.ready = true;
        });


        it("should not broadcast 'getMovie', if DreamFactory.ready === false", function() {

            DreamFactory.ready = false;

            spyOn(scope, "$broadcast");

            scope.init();

            expect(scope.$broadcast).not.toHaveBeenCalled();
        });


        it("should broadcast 'getMovie' if DreamFactory.ready === true", function() {

            spyOn(scope, "$broadcast");

            scope.init();

            expect(scope.$broadcast).toHaveBeenCalledWith('getMovie');
        });
    });



    it("should broadcast and respond to an event 'verify:answer' with 'userAnswer' when scope.verifyAnswer(userAnswer)", function() {

        spyOn(scope, '$broadcast').andCallThrough();
        spyOn(scope, '_verifyAnswer');
        spyOn(scope, '_saveUserScore');
        spyOn(scope, '_resetForm');


        var userAnswer = 'test';
        scope.verifyAnswer(userAnswer);

        expect(scope.$broadcast).toHaveBeenCalledWith('verifyAnswer', userAnswer);
        expect(scope._verifyAnswer).toHaveBeenCalledWith(userAnswer);
        expect(scope._saveUserScore).toHaveBeenCalled();
        expect(scope._resetForm).toHaveBeenCalled();
        expect(scope.$broadcast).toHaveBeenCalledWith('getMovie');
    });


    describe("Test scope._verifyAnswer", function() {

        beforeEach(function() {

            scope.userAnswer = 'my test answer';
            scope._actualAnswer = 'my test answer';
        });

        afterEach(function() {
            scope.userAnswer = '';
            scope._actualAnswer = '';
        });


        it("should compare both answers and return a boolean", function() {

            var isCorrectAnswer = scope._verifyAnswer(scope.userAnswer);
            expect(isCorrectAnswer).toBe(true);
        })
    });






});