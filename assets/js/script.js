// -------------------- Simple Sidebar Theme function ------------------------
$(function() {
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  $(window).resize(function(e) {
    if($(window).width()<=768){
      $("#wrapper").removeClass("toggled");
    }else{
      $("#wrapper").addClass("toggled");
    }
  });
});

// -------------- input con enter -----------------------    
$('#poke-input').on("keyup", (event) => {
  if (event.keyCode === 13) {
  event.preventDefault();
  $('#searchPokemon').click();
  }
});

// ------------------------------ Jenny's Pokedex -----------------------------------
$('#searchPokemon').on('click',() => {  // al hacer click en botón Buscar...
  let pokemon = $('.form-control').val(); // Pokemón ingresado
  console.log(pokemon);
  let selectGen = $('select option:selected').val(); // Opción Generación seleccionada
  console.log(selectGen);

  let validar = () => { // función de validación del dato ingresado
    let patron = /[a-zA-Z0-9]/gim; // se permite ingresar solo letras o números
      if (pokemon.match(patron)) { // si Pokemon es válido...
        console.log("Palabra ingresada permitida");
        $('.searchError').html(``);

        const Pokedex = () => { // Función de la Pokedex API
          $.ajax({  // Conectándose a Poke API con ajax...
              type: "GET",
              url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
              dataType: "json",
              success: function (response) {  // si funciona la conexión guarda la información en una variable
                console.log(`---------- Datos recibidos de Poke API ----------`);
                console.log(response);
                let infoPokemon = response;

                var spritedefault = infoPokemon.sprites.other.dream_world.front_default;
                console.log(spritedefault);
                if (spritedefault === null) {
                  var spritedefault = infoPokemon.sprites.other.front_default;
                  console.log(spritedefault);
                }
                console.log(spritedefault);


                // Busca la clase para inyectar en el html los datos del Pokemon dentro
                $('.pokemonCard').html(`  
                <div class="pokemonCard__img">
                  <img src="${spritedefault}" alt="${infoPokemon.id}">
                      <div class="pokemonCard__title">
                          <div class="pokemonCard__title__number">N° ${infoPokemon.id}</div>
                          <div class="pokemonCard__title__name">${infoPokemon.name}</div>
                      </div>
                  </div>
                  <div class="pokemonCard__other">
                  <div class="pokemonCard__data my-4">
                  <p>Altura: ${infoPokemon.height/10} m</p>
                  <p>Peso: ${infoPokemon.weight/10} kg</p>
                  </div>
                  <button type="button" class="pokebutton btn my-3" id="pokeGallery" data-toggle="modal" data-target="#ModalGallery">Ver Galería</button>
                  <button type="button" class="pokebutton btn my-3" id="pokeAttacks" data-toggle="modal" data-target="#ModalAttacks">Ver Ataques</button>
                  <button type="button" class="pokebutton btn my-3" id="pokeBase" data-toggle="modal" data-target="#ModalBase">Ver Punto de base</button>
                  </div>
                `);

                                    
                // contando y mostrando los tipos del Pokemon para usar más adelante...
                console.log(infoPokemon.name);
                console.log("Tiene " + infoPokemon.types.length + " tipos");
                console.log("Los tipos son: " );
                $('.pokemonCard .pokemonCard__data').prepend(`</p>`);

                for (i=0 ; i < infoPokemon.types.length; i++) { 
                  let pokeTypeNum = infoPokemon.types[i].type.name;
                  console.log(pokeTypeNum);
                  $('.pokemonCard .pokemonCard__data').prepend(`<span>${pokeTypeNum} </span>`);
                }  
                  $('.pokemonCard .pokemonCard__data').prepend(`<p>Tipo:`); 
                  let pokeType = infoPokemon.types[0].type.name;
                  console.log("Su tipo principal es "+ pokeType);
                
                
                // Coloreando diseño del resultado según el tipo principal del Pokemon...
                switch (pokeType) { 
                  case "bug":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--bug");
                    $(".pokemonCard__title__name").addClass("type-bug");
                    break;
                  case "dark":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--dark");
                    $(".pokemonCard__title__name").addClass("type-dark");
                    break;
                  case "dragon":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--dragon");
                    $(".pokemonCard__title__name").addClass("type-dragon");
                    break;
                  case "electric":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--electric");
                    $(".pokemonCard__title__name").addClass("type-electric");
                    break;
                  case "fairy":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--fairy");
                    $(".pokemonCard__title__name").addClass("type-fairy");
                    break;
                  case "fighting":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--fighting");
                    $(".pokemonCard__title__name").addClass("type-fighting");
                    break;
                  case "fire":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--fire");
                    $(".pokemonCard__title__name").addClass("type-fire");
                    break;
                  case "flying":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--flying");
                    $(".pokemonCard__title__name").addClass("type-flying");
                    break;
                  case "ghost":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--ghost");
                    $(".pokemonCard__title__name").addClass("type-ghost");
                    break;
                  case "grass":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--grass");
                    $(".pokemonCard__title__name").addClass("type-grass");
                    break;
                  case "ground":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--ground");
                    $(".pokemonCard__title__name").addClass("type-ground");
                    break;
                  case "ice":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--ice");
                    $(".pokemonCard__title__name").addClass("type-ice");
                    break;
                  case "normal":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--normal");
                    $(".pokemonCard__title__name").addClass("type-normal");
                    break;
                  case "poison":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--poison");
                    $(".pokemonCard__title__name").addClass("type-poison");
                    break;
                  case "psychic":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--psychic");
                    $(".pokemonCard__title__name").addClass("type-psychic");
                    break;
                  case "rock":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--rock");
                    $(".pokemonCard__title__name").addClass("type-rock");
                    break;
                  case "steel":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--steel");
                    $(".pokemonCard__title__name").addClass("type-steel");
                    break;
                  case "water":
                    $(".pokemonCard").removeClass().addClass("pokemonCard card--water");
                    $(".pokemonCard__title__name").addClass("type-water");
                    break;
                } 

                // Imágenes del Pokemon para la galería
                $('#ModalGallery .modal-body').empty(); // se vacía el Modal de galería para llenarlo :)
                console.log(`---------- Buscando sprites para la galería :D ----------`);
                for (propiedad in infoPokemon.sprites) {  // recorriendo todas los sprites que contenga el Pokemon...
                    let pokeSprite = infoPokemon.sprites[propiedad]; // guarda sprite en un let
                    console.log(pokeSprite);
                    if (pokeSprite !== null && typeof pokeSprite !== 'object') { // si no es un elemento null u objeto se insertan en modal de galeria
                      $('#ModalGallery .modal-body').append(`<div class="pokemon__sprite"> 
                      <img src="${pokeSprite}"></div>`);
                      continue;
                    }
                    else if (typeof pokeSprite === 'object') { // si es un objeto se recorre también en busca de MÁS sprites 
                      for (propiedad in pokeSprite) { 
                        let pokeSpriteObj = pokeSprite[propiedad];  // se van guardando en un let 
                        console.log(pokeSpriteObj); 
                        console.log(pokeSpriteObj.front_default); 
                        console.log(typeof pokeSpriteObj);
                        if (pokeSpriteObj.front_default !== null && pokeSpriteObj.front_default !== undefined && typeof pokeSpriteObj.front_default !== 'object') {
                            $('#ModalGallery .modal-body').append(`<div class="pokemon__sprite"> 
                            <img src="${pokeSpriteObj.front_default}"></div>`);
                        }
                        else if (typeof pokeSpriteObj === 'object' || pokeSpriteObj === undefined) {
                            console.log(`Hasta aquí nomás llegó la búsqueda, no necesito tantos sprites :)`);
                            break;
                        }
                        else {
                            console.log(`No hay más sprites en ${pokeSprite} :(`);
                        }
                      }
                    }
                    else {
                      console.log(`No hay más sprites en ${infoPokemon.sprites}`);
                    }
                }

                // Lista de ataques
                $('#ModalAttacks .modal-body').empty(); // se vacía el Modal de ataques para llenarlo
                console.log(`---------- Buscando ataques para la lista :D ----------`);
                infoPokemon.moves.forEach((movimiento,index) => { // recorriendo todos los ataques...
                    $('#ModalAttacks .modal-body').append(`<p>${index+1} - ${movimiento.move.name}</p>`);
                });
                
                // Puntos de base
                console.log(`---------- Buscando los puntos base :D ----------`);
                for (i=0 ; i < infoPokemon.stats.length; i++) { 
                  let Stat = infoPokemon.stats[i].base_stat;
                  console.log(Stat);
                }
                
                
                // construyendo Chart de Puntos de base
                var options = {
                  animationEnabled: true,
                  title: {
                    text: "Puntos base",                
                    fontColor: "Black"
                  },	
                  axisY: {
                    tickThickness: 0,
                    lineThickness: 0,
                    valueFormatString: " ",
                    includeZero: true,
                    gridThickness: 0                    
                  },
                  axisX: {
                    tickThickness: 0,
                    lineThickness: 0,
                    labelFontSize: 18,
                    labelFontColor: "Peru"				
                  },
                  data: [{
                    indexLabelFontSize: 20,
                    toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#777\"><strong>{y}</strong></span>",
                    indexLabelPlacement: "inside",
                    indexLabelFontColor: "white",
                    indexLabelFontWeight: 400,
                    indexLabelFontFamily: "Verdana",
                    color: "rgb(255, 103, 77)",
                    type: "bar",
                    dataPoints: [
                      { y: infoPokemon.stats[0].base_stat, label: `${infoPokemon.stats[0].base_stat}`, indexLabel: "PS" },
                      { y: infoPokemon.stats[1].base_stat, label: `${infoPokemon.stats[1].base_stat}`, indexLabel: "Ataque" },
                      { y: infoPokemon.stats[2].base_stat, label: `${infoPokemon.stats[2].base_stat}`, indexLabel: "Defensa" },
                      { y: infoPokemon.stats[3].base_stat, label: `${infoPokemon.stats[3].base_stat}`, indexLabel: "Ataque Especial" },
                      { y: infoPokemon.stats[4].base_stat, label: `${infoPokemon.stats[4].base_stat}`, indexLabel: "Defensa Especial" },
                      { y: infoPokemon.stats[5].base_stat, label: `${infoPokemon.stats[5].base_stat}`, indexLabel: "Velocidad" },
                      
                    ]
                  }]
                };

                $("#BasePointChart").CanvasJSChart(options);

                $('#pokeBase').on('click',() => {
                  $('#BasePointChart').toggle({ display: "flex"});
                });

                $(".pokemonCard").css({ display: "flex"}); // cambia el display del div del pokemon para que aparezca
              },
              error: function(error){ // si no funciona API mostrará un mensaje de error
                  console.error(error.status);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Pokemon ingresado no existe',
                    footer: 'Intenta nuevamente'
                });
              }
          });
        } // fin Pokedex()

        switch (selectGen) { // validando la opción seccionada...
          case '1':
            console.log("Has seleccionado 1ra Generación");
            if (pokemon >= 1 && pokemon <= 151) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 1ra Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '2':
            console.log("Has seleccionado 2da Generación");
            if (pokemon >= 151 && pokemon <= 251) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 2da Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '3':
            console.log("Has seleccionado 3ra Generación");
            if (pokemon >= 252 && pokemon <= 386) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 3ra Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '4':
            console.log("Has seleccionado 4ta Generación");
            if (pokemon >= 387 && pokemon <= 493) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 4ta Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '5':
            console.log("Has seleccionado 5ta Generación");
            if (pokemon >= 494 && pokemon <= 649) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 5ta Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '6':
            console.log("Has seleccionado 6ta Generación");
            if (pokemon >= 650 && pokemon <= 721) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 6ta Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '7':
            console.log("Has seleccionado 7ma Generación");
            if (pokemon >= 722 && pokemon <= 809) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 7ma Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          case '8':
            console.log("Has seleccionado 8va Generación");
            if (pokemon >= 810 && pokemon <= 893) {
              Pokedex ();
              $('.searchError').html(``).css({ display: "none"});
            }
            else {
              $('.searchError').html(`El pokemón ingresado no corresponde la 8va Generación.`).css({ display: "flex"});
              $('.pokemonCard').html(` `);
            }
            break;
          default:
            Pokedex ();
            $('.pokemonCard').html(` `);
            $(".searchError").css({ display: "none"});
            break;
        }
      } 
      else { // si no es válido el Pokemón ingresado...
        console.log("La palabra ingresada no es permitida");
        $('.pokemonCard').html(``);
        $('.searchError').html(`Pokémon no válido. Ingrésalo nuevamente.`).css({ display: "flex"});
      }
  } // fin Validar()

  $('pokemon').on('submit', validar());
}); // fin del evento 'Click'


// --------------------------- Modals Bootstrap ---------------------------
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

// --------------------------- Tooltips Bootstrap --------------------------
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// --------------------------- Canvas JS Chart ----------------------------
window.onload = function () {

  //Better to construct options first and then pass it as a parameter
  var options = {
    title: {
      text: "Mejores Pokémon en poder total en Pokémon Espada y Escudo"              
    },
    data: [              
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "splineArea",
      dataPoints: [
        { label: "Tyranitar",  y: 600  },
        { label: "Hydreigon ", y: 600  },
        { label: "Goodra", y: 600  },
        { label: "Kommo-o",  y: 600  },
        { label: "Dragapult ",  y: 600  }
      ]
    }
    ]
  };
  $("#chartContainer").CanvasJSChart(options); 


  var options = {
    title: {
      text: "Mejores Pokémon en ataque en Pokémon Espada y Escudo"              
    },
    data: [              
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "column",
      dataPoints: [
        { label: "Haxorus",  y: 147  },
        { label: "Rhyperior", y: 140  },
        { label: "Conkeldurr", y: 140  },
        { label: "Darmanitan",  y: 140  },
        { label: "Excadrill",  y: 135  }
      ]
    }
    ]
  };
  $("#chartContainer2").CanvasJSChart(options); 


  var options = {
    title: {
      text: "Mejores Pokémon en defensa en Pokémon Espada y Escudo"              
    },
    data: [              
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "line",
      dataPoints: [
        { label: "Shuckle",  y: 230  },
        { label: "Steelix", y: 200  },
        { label: "Avalugg", y: 184  },
        { label: "Cloyster",  y: 180  },
        { label: "Onix",  y: 160  }
      ]
    }
    ]
  };
  $("#chartContainer3").CanvasJSChart(options); 

  
}

// ------------------------------ Go to top -------------------------------
$(document).ready(function(){
 
	$('.go-top').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.go-top').slideDown(300);
		} else {
			$('.go-top').slideUp(300);
		}
	});
 
});

// ------------------------ Pokemon card function--------------------------
$(document).ready(function(){
    
var source = $("card-template").innerHTML;
var template = Handlebars.compile(source);

var eveelutions = [
   {
     name: "Eevee",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/1200px-133Eevee.png",
     type: "normal",
     hp: 55,
     attack: 55,
     defense: 50,
     spAttack: 45,
     spDefense: 65,
     speed: 55,
     ability1: "Run Away",
     ability2: "Anticipation"
   },
   {
     name: "Vaporeon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/f/fd/134Vaporeon.png/1200px-134Vaporeon.png",
     type: "water",
     hp: 130,
     attack: 65,
     defense: 60,
     spAttack: 110,
     spDefense: 95,
     speed: 65,
     ability1: "Absorb",
     ability2: "Hydration"
   },
   {
     name: "Jolteon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/b/bb/135Jolteon.png/1200px-135Jolteon.png",
     type: "electric",
     hp: 65,
     attack: 65,
     defense: 60,
     spAttack: 110,
     spDefense: 95,
     speed: 130,
     ability1: "Volt Absorb",
     ability2: "Quick Feet"
   },
     {
     name: "Flareon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/d/dd/136Flareon.png/1200px-136Flareon.png",
     type: "fire",
     hp: 65,
     attack: 130,
     defense: 60,
     spAttack: 95,
     spDefense: 110,
     speed: 65,
     ability1: "Flash Fire",
     ability2: "Guts"
   },
   {
     name: "Espeon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/a/a7/196Espeon.png/1200px-196Espeon.png",
     type: "psychic",
     hp: 65,
     attack: 65,
     defense: 60,
     spAttack: 130,
     spDefense: 95,
     speed: 110,
     ability1: "Synchronize",
     ability2: "Magic Bounce"
   },
   {
     name: "Umbreon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/3/3d/197Umbreon.png/600px-197Umbreon.png",
     type: "dark",
     hp: 95,
     attack: 65,
     defense: 110,
     spAttack: 60,
     spDefense: 130,
     speed: 65,
     ability1: "Synchronize",
     ability2: "Inner Focus"
   },
   {
     name: "Leafeon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/f/f5/470Leafeon.png/600px-470Leafeon.png",
     type: "grass",
     hp: 65,
     attack: 110,
     defense: 130,
     spAttack: 60,
     spDefense: 65,
     speed: 95,
     ability1: "Leaf Guard",
     ability2: "Chlorophyll"
   },
   {
     name: "Glaceon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/2/23/471Glaceon.png/600px-471Glaceon.png",
     type: "ice",
     hp: 65,
     attack: 60,
     defense: 110,
     spAttack: 130,
     spDefense: 95,
     speed: 65,
     ability1: "Snow Cloak",
     ability2: "Ice Body"
   },
   {
     name: "Sylveon",
     imageAddress: "https://cdn.bulbagarden.net/upload/thumb/e/e8/700Sylveon.png/600px-700Sylveon.png",
     type: "fairy",
     hp: 95,
     attack: 65,
     defense: 65,
     spAttack: 110,
     spDefense: 130,
     speed: 60,
     ability1: "Cute Charm",
     ability2: "Pixilate"
   }
];

var container = document.getElementById("cards");

for (var i = 0; i < eveelutions.length; i++) {
   var html = template(eveelutions[i]);
   container.insertAdjacentHTML("beforeend", html);
 }

});
