"use strict";

/* global WOW, Swiper */
(function ($) {
  function scrollDown_header() {
    var $header = $('.o-header');
    $(window).on('scroll', function () {
      var scrollDistance = $(window).scrollTop();
      if (scrollDistance > 40) $header.addClass('fixed');else $header.removeClass('fixed');
    });
  }

  function burger_menu() {
    var $burger = $('.o-header_burger');
    var $menu = $('.o-header_menu');
    $burger.on('click', function (e) {
      var $it = $(e.currentTarget);
      $it.toggleClass('open');
      $menu.toggleClass('expand');
    });
  }

  function privilege_slider() {
    new Swiper('.t-privilege_wrap.swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      scrollbar: {
        el: '.t-privilege_wrap .swiper-scrollbar'
      },
      breakpoints: {
        // when window width is >= 640px
        992: {
          slidesPerView: 2,
          spaceBetween: 32
        }
      }
    });
  }

  function rules_slider() {
    var arrHeight = [];
    new Swiper('.t-rules_wrap.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      // scrollbar: {
      //     el: '.t-rules_wrap .swiper-scrollbar',
      // },
      pagination: {
        el: '.t-rules_wrap.swiper .swiper-pagination'
      },
      breakpoints: {
        // when window width is >= 640px
        768: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        // when window width is >= 640px
        992: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      }
    });

    var resize = function resize() {
      $.each($('.t-rules_content ul'), function (i, val) {
        arrHeight.push($(val).height());
      });
      $('.t-rules_content ul').css({
        height: Math.max.apply(Math, arrHeight)
      });
    };

    $(window).on('resize', resize);
    resize();
  }

  function ui_matchHeight() {
    $('.t-privilege_content').matchHeight();
  }

  function backToTop() {
    $('.backToTop').on('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    var checkScroll = function checkScroll() {
      var scrollDistance = $(window).scrollTop();
      if (scrollDistance <= 120) $('.backToTop').fadeOut();else $('.backToTop').fadeIn();
    };

    $(window).on('scroll', checkScroll);
    checkScroll();
  }

  $(function () {
    $('.select-location').val('').trigger('change');
    scrollDown_header();
    burger_menu();
    privilege_slider();
    backToTop();
    rules_slider();
    ui_matchHeight();
    new WOW().init();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})(jQuery);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
  // canvas setup
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  var InputHandler = /*#__PURE__*/_createClass(function InputHandler(game) {
    var _this = this;

    _classCallCheck(this, InputHandler);

    this.game = game;
    window.addEventListener('keydown', function (e) {
      if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && _this.game.keys.indexOf(e.key) === -1) _this.game.keys.push(e.key);else if (e.key === ' ') _this.game.player.shootTop();
    });
    window.addEventListener('keyup', function (e) {
      if (_this.game.keys.indexOf(e.key) > -1) _this.game.keys.splice(_this.game.keys.indexOf(e.key), 1);
    });
  });

  var Projecttile = /*#__PURE__*/function () {
    function Projecttile(game, x, y) {
      _classCallCheck(this, Projecttile);

      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
    }

    _createClass(Projecttile, [{
      key: "update",
      value: function update() {
        this.x += this.speed;
        if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
      }
    }, {
      key: "draw",
      value: function draw(context) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, this.width, this.height);
      }
    }]);

    return Projecttile;
  }();

  var Particle = /*#__PURE__*/_createClass(function Particle() {
    _classCallCheck(this, Particle);
  });

  var Player = /*#__PURE__*/function () {
    function Player(game) {
      _classCallCheck(this, Player);

      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 5;
      this.projecttiles = [];
    }

    _createClass(Player, [{
      key: "update",
      value: function update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;else this.speedY = 0;
        this.y += this.speedY; //Handler ProjectTiles

        this.projecttiles.forEach(function (v) {
          v.update();
        });
        this.projecttiles = this.projecttiles.filter(function (f) {
          return !f.markedForDeletion;
        });
      }
    }, {
      key: "draw",
      value: function draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
        this.projecttiles.forEach(function (v) {
          v.draw(context);
        });
      }
    }, {
      key: "shootTop",
      value: function shootTop() {
        if (this.game.ammo > 0) {
          this.projecttiles.push(new Projecttile(this.game, this.x + 80, this.y + 30));
          this.game.ammo--;
        }
      }
    }]);

    return Player;
  }();

  var Enemy = /*#__PURE__*/function () {
    function Enemy(game) {
      _classCallCheck(this, Enemy);

      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.lives = 5;
      this.score = this.lives;
    }

    _createClass(Enemy, [{
      key: "update",
      value: function update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDeletion = true;
      }
    }, {
      key: "draw",
      value: function draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.font = '20px Helvetica';
        context.fillText(this.lives, this.x, this.y);
      }
    }]);

    return Enemy;
  }();

  var Angler1 = /*#__PURE__*/function (_Enemy) {
    _inherits(Angler1, _Enemy);

    var _super = _createSuper(Angler1);

    function Angler1(game) {
      var _this2;

      _classCallCheck(this, Angler1);

      _this2 = _super.call(this, game);
      _this2.width = 228 * 0.2;
      _this2.height = 169 * 0.2;
      _this2.y = Math.random() * (_this2.game.height * 0.9 - _this2.height);
      return _this2;
    }

    return _createClass(Angler1);
  }(Enemy);

  var Layer = /*#__PURE__*/_createClass(function Layer() {
    _classCallCheck(this, Layer);
  });

  var Background = /*#__PURE__*/_createClass(function Background() {
    _classCallCheck(this, Background);
  });

  var UI = /*#__PURE__*/function () {
    function UI(game) {
      _classCallCheck(this, UI);

      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'Helvetica';
      this.color = 'orange';
    }

    _createClass(UI, [{
      key: "draw",
      value: function draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black'; //Score

        context.fillText('Score: ' + this.game.score, 20, 40); // Ammo

        for (var i = 0; i < this.game.ammo; i++) {
          context.fillRect(20 + 5 * i, 50, 3, 20);
        } //Timer


        var formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        context.fillText('Timer: ' + formattedTime + ' s', 20, 100); //Game over message

        if (this.game.gameOver) {
          context.textAlign = 'center';
          var message1, message2;

          if (this.game.score > this.game.winningScore) {
            message1 = 'You win';
            message2 = 'Well done!';
          } else {
            message1 = 'You lose !';
            message2 = 'Try again!';
          }

          context.font = '50px ' + this.fontFamily;
          context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
          context.font = '25px ' + this.fontFamily;
          context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
        }

        context.restore();
      }
    }]);

    return UI;
  }();

  var Game = /*#__PURE__*/function () {
    function Game(width, height) {
      _classCallCheck(this, Game);

      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.keys = [];
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 500;
      this.ui = new UI(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      this.gameTime = 0;
      this.timeLimit = 10000;
    }

    _createClass(Game, [{
      key: "update",
      value: function update(deltaTime) {
        var _this3 = this;

        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;
        this.player.update();

        if (this.ammoTimer > this.ammoInterval) {
          if (this.ammo < this.maxAmmo) this.ammo++;
          this.ammoTimer = 0;
        } else this.ammoTimer += deltaTime;

        this.enemies.forEach(function (e) {
          e.update();
          if (_this3.checkCollision(_this3.player, e)) e.markedForDeletion = true; //Shooting to destroy enemies & scored

          _this3.player.projecttiles.forEach(function (p) {
            if (_this3.checkCollision(p, e)) {
              e.lives--;
              p.markedForDeletion = true;

              if (e.lives <= 0) {
                e.markedForDeletion = true;
                _this3.score += e.score;
                if (_this3.score > _this3.winningScore) _this3.gameOver = true;
              }
            }
          });
        });
        this.enemies = this.enemies.filter(function (e) {
          return !e.markedForDeletion;
        });

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
          this.addEnemy();
          this.enemyTimer = 0;
        } else this.enemyTimer += deltaTime;
      }
    }, {
      key: "draw",
      value: function draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(function (e) {
          return e.draw(context);
        });
      }
    }, {
      key: "addEnemy",
      value: function addEnemy() {
        this.enemies.push(new Angler1(this));
      }
    }, {
      key: "checkCollision",
      value: function checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
      }
    }]);

    return Game;
  }();

  var game = new Game(canvas.width, canvas.height);
  var lastTime = 0; // Animation Loop

  function animate(timeStamp) {
    var deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});